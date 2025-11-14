export const transformPlaybackUrl = (playbackUrl: string) => {
  const engineUrl: string = import.meta.env.VITE_ENGINE_URL;
  const segments: string[] = playbackUrl.split("/");

  const secureUrl = `${engineUrl}/ace/m/${segments[segments.length - 2]}/${
    segments[segments.length - 1]
  }`;

  return secureUrl;
};
