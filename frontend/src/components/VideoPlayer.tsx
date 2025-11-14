import Hls from "hls.js";
import { useEffect, useRef } from "react";

type Props = {
  src: string | null;
  setLoading: (state: boolean) => void;
  setError: (error: Error | null) => void;
};

function VideoPlayer({ src, setLoading, setError }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const hls = new Hls();

  useEffect(() => {
    if (Hls.isSupported() && videoRef.current && src) {
      hls.loadSource(src);
      hls.attachMedia(videoRef.current);

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        setLoading(false);
        videoRef.current?.play();
      });

      hls.on(Hls.Events.ERROR, (_name, data) => {
        const errorFatal = data.fatal;
        if (errorFatal) {
          setLoading(false);
          setError(new Error(data.error.message || "Unknown error."));
          hls.destroy();
        }
      });

      return () => {
        hls.destroy();
        setError(null);
      };
    }
  }, [src]);

  return (
    <div className="w-full rounded-lg">
      <video
        ref={videoRef}
        height={360}
        width={640}
        controls
        className="w-full rounded-lg"
      >
        <source type="application/x-mpegURL" />
      </video>
    </div>
  );
}

export default VideoPlayer;
