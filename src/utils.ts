/**
 * Function to format time in seconds to hh:mm:ss format.
 */
export function formatDuration(seconds: number): string {
  const totalMin = Math.floor(seconds / 60);
  const sec = Math.floor(seconds % 60);
  const hr = Math.floor(totalMin / 60);
  const min = Math.floor(totalMin % 60);
  return `${hr === 0 ? "" : `${hr}:`}${min}:${sec <= 9 ? `0${sec}` : sec}`;
}
