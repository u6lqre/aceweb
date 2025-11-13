import Hls from "hls.js";
import { useEffect, useRef } from "react";

type Props = {
  src: string | null;
  setLoading: (state: boolean) => void;
};

function VideoPlayer({ src, setLoading }: Props) {
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
    }
  }, [src]);

  return (
    <div className="w-full rounded-lg relative bg-neutral-2">
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
