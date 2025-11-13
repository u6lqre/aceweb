import { useEffect, useRef, useState, type FormEvent } from "react";
import VideoPlayer from "./components/VideoPlayer";
import SearchBox from "./components/SearchBox";
import { Info } from "lucide-react";

type Props = {};

function App({}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [videoSrc, setVideoSrc] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error>();

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

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.value = "";
      inputRef.current.focus();
    }
  }, [error]);

  return (
    <div className="flex flex-col items-center gap-10 w-full">
      <SearchBox
        handleSubmit={handleSubmit}
        inputRef={inputRef}
        loading={loading}
      />

      <div className="w-full flex flex-col gap-0.5">
        <VideoPlayer
          src={videoSrc}
          setLoading={setLoading}
          setError={setError}
        />
        {error && (
          <p className="text-red-500 flex items-center gap-1.5 justify-center">
            <Info size={16} />
            {error.message}. Please try again with another content_id.
          </p>
        )}
      </div>
    </div>
  );
}

export default App;
