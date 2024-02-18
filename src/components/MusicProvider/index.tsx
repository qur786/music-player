import type { PropsWithChildren } from "react";
import { Dirs, FileSystem } from "react-native-file-access";
import { PermissionsAndroid, Platform } from "react-native";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  SortSongFields,
  SortSongOrder,
  getAll,
} from "react-native-get-music-files";

export type MusicFile = Exclude<Awaited<ReturnType<typeof getAll>>, string>;

interface MusicContext {
  musicFiles: MusicFile;
  requestRefetch: () => Promise<MusicFile>;
  loading: boolean;
}

const MUSIC_FILE_PATH = "/music-file-path.json";

const MusicContext = createContext<MusicContext>({
  musicFiles: [],
  requestRefetch: async () => [],
  loading: false,
});

export function MusicProvider({ children }: PropsWithChildren): JSX.Element {
  const [musicFiles, setMusicFiles] = useState<MusicFile>([]);
  const [loading, setLoading] = useState(false);

  const requestRefetch: MusicContext["requestRefetch"] =
    useCallback(async () => {
      setLoading(true);

      let output: MusicFile = [];
      let isMusicFilesReadPermissions = false;
      let isExternalStorageReadPermissions = false;
      if (Platform.OS === "android") {
        isMusicFilesReadPermissions = await PermissionsAndroid.check(
          "android.permission.READ_MEDIA_AUDIO"
        );

        isExternalStorageReadPermissions = await PermissionsAndroid.check(
          "android.permission.READ_EXTERNAL_STORAGE"
        );

        if (isMusicFilesReadPermissions === false) {
          const result = await PermissionsAndroid.request(
            "android.permission.READ_MEDIA_AUDIO",
            {
              title: "Music player audio files read permission.",
              message: "App needs to access local audio files.",
              buttonPositive: "Ask me later",
              buttonNegative: "Cancel",
              buttonNeutral: "Ok",
            }
          );

          isMusicFilesReadPermissions =
            result === PermissionsAndroid.RESULTS.GRANTED;
        }

        if (isExternalStorageReadPermissions === false) {
          const result = await PermissionsAndroid.request(
            "android.permission.READ_EXTERNAL_STORAGE",
            {
              title: "Music player external storage permission.",
              message: "App needs to access local files.",
              buttonPositive: "Ask me later",
              buttonNegative: "Cancel",
              buttonNeutral: "Ok",
            }
          );
          isExternalStorageReadPermissions =
            result === PermissionsAndroid.RESULTS.GRANTED;
        }
      }

      // TODO: add permission handler for other OS when creating app for those envs.

      if (isMusicFilesReadPermissions) {
        const songsResults = await getAll({
          minSongDuration: 1000,
          sortOrder: SortSongOrder.DESC,
          sortBy: SortSongFields.TITLE,
        });

        if (typeof songsResults === "string") {
          console.log(songsResults);
          // TODO: notify user that could not find any music files
        } else {
          // TODO: use try catch
          output = songsResults;
          await FileSystem.writeFile(
            Dirs.DocumentDir + MUSIC_FILE_PATH,
            JSON.stringify(songsResults)
          );
          setMusicFiles(songsResults);
        }
      } else {
        // TODO: notify user that user needs to allow permission to access music files.
      }
      setLoading(false);
      return output;
    }, []);

  useEffect(() => {
    FileSystem.readFile(Dirs.DocumentDir + MUSIC_FILE_PATH)
      .then((data) => {
        setMusicFiles(JSON.parse(data) as MusicFile);
      })
      .catch(console.log);
  }, []);

  return (
    <MusicContext.Provider value={{ requestRefetch, musicFiles, loading }}>
      {children}
    </MusicContext.Provider>
  );
}

export function useMusicFiles(): MusicContext {
  return useContext(MusicContext);
}
