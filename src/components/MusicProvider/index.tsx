import { FilePaths } from "../../utils";
import type { PropsWithChildren } from "react";
import Snackbar from "react-native-snackbar";
import type { Track } from "react-native-track-player";
import { setupPlayer } from "../../../track-player-service";
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
import { convertMusicFileToTrack, setQueueUninterrupted } from "./tracks";

interface MusicContext {
  tracks: Track[];
  requestRefetch: () => Promise<Track[]>;
  loading: boolean;
}

const MusicContext = createContext<MusicContext>({
  tracks: [],
  requestRefetch: async () => [],
  loading: false,
});

export function MusicProvider({ children }: PropsWithChildren): JSX.Element {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [loading, setLoading] = useState(false);
  const [isPlayerSetup, setIsPlayerSetup] = useState(false);

  useEffect(() => {
    setupPlayer()
      .then(setIsPlayerSetup)
      .catch(() => {
        Snackbar.show({
          text: "Failed to setup player. Please re-start the app.",
          duration: Snackbar.LENGTH_INDEFINITE,
        });
      });
  }, []); // Needs to setup player before any interaction with the player

  const requestRefetch: MusicContext["requestRefetch"] =
    useCallback(async () => {
      let output: Track[] = [];

      if (isPlayerSetup) {
        setLoading(true);

        let isMusicFilesReadPermissions = false;

        if (Platform.OS === "android") {
          isMusicFilesReadPermissions = await PermissionsAndroid.check(
            "android.permission.READ_MEDIA_AUDIO"
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
        }

        // TODO: add permission handler for other OS when creating app for those envs.

        if (isMusicFilesReadPermissions) {
          const songsResults = await getAll({
            minSongDuration: 1000,
            sortOrder: SortSongOrder.ASC,
            sortBy: SortSongFields.TITLE,
          });

          if (typeof songsResults === "string") {
            console.log(songsResults);
          } else {
            output = convertMusicFileToTrack(songsResults);
            try {
              await setQueueUninterrupted(output);
              await FileSystem.writeFile(
                Dirs.DocumentDir + FilePaths.musicFilePath,
                JSON.stringify(output)
              );
            } catch (error) {
              console.log(error);
            }
            setTracks(output);
          }
        } else {
          Snackbar.show({
            text: "Couldn't access music files due to permission denied.",
            duration: Snackbar.LENGTH_LONG,
          });
        }
        setLoading(false);
      }
      return output;
    }, [isPlayerSetup]);

  useEffect(() => {
    if (isPlayerSetup) {
      FileSystem.readFile(Dirs.DocumentDir + FilePaths.musicFilePath)
        .then((data) => {
          const parsedTracks = JSON.parse(data) as Track[];
          setTracks(parsedTracks);
          setQueueUninterrupted(parsedTracks).catch(console.log);
        })
        .catch(console.log);
    }
  }, [isPlayerSetup]);

  return (
    <MusicContext.Provider value={{ requestRefetch, tracks, loading }}>
      {children}
    </MusicContext.Provider>
  );
}

export function useMusicFiles(): MusicContext {
  return useContext(MusicContext);
}
