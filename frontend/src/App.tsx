import { useRef, useState, type FormEvent } from "react";
import VideoPlayer from "./components/VideoPlayer";
import SearchBox from "./components/SearchBox";

type Props = {};

function App({}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [videoSrc, setVideoSrc] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setLoading(!loading);
    fetchStream(inputRef.current?.value);
  };

  const fetchStream = async (contentId: string | undefined) => {
    const engineApiUrl: string = import.meta.env.VITE_API_URL;

    try {
      const response = await fetch(`${engineApiUrl}/streams/${contentId}`);
      if (!response.ok) throw new Error(`HTTP error: ${response.status}`);

      const data = await response.json();
      setVideoSrc(data.playbackUrl);
    } catch (err) {
      console.error("Error fetching stream: ", err);
    }
  };

  return (
    <div className="flex flex-col items-center gap-10 w-full">
      <SearchBox
        handleSubmit={handleSubmit}
        inputRef={inputRef}
        loading={loading}
      />
      <VideoPlayer src={videoSrc} setLoading={setLoading} />
    </div>
  );
}

export default App;
