import { useEffect, useState } from "react";
import VideoPlayer from "./components/VideoPlayer";
import SearchBox from "./components/SearchBox";
import { Info } from "lucide-react";
import { rewriteEngineUrl } from "./utils/rewriteEngineUrl";
import { extractAceStreamId } from "./utils/extractAceStreamId";

type Props = {};

function App({}: Props) {
  const [videoSrc, setVideoSrc] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const onSubmit = (contentId: string) => {
    setLoading(true);
    const id = extractAceStreamId(contentId);
    id ? fetchStream(id) : setError(new Error("Link de AceStream inválido."));
  };

  const fetchStream = async (contentId: string | undefined) => {
    const apiUrl: string = import.meta.env.VITE_API_URL;

    try {
      const response = await fetch(`${apiUrl}/streams/${contentId}`);
      if (!response.ok) throw new Error(`HTTP error: ${response.status}`);

      const data = await response.json();

      const playbackUrl = rewriteEngineUrl(data.playbackUrl);
      setVideoSrc(playbackUrl);
    } catch (err) {
      setError(new Error(`${err}`));
    }
  };

  useEffect(() => {
    if (error) {
      setLoading(false);
      console.error(error.message);
    }
  }, [error]);

  return (
    <div className="flex flex-col items-center gap-10 w-full">
      <div className="flex flex-col gap-5">
        <h1 className="text-white text-center font-bold text-4xl">
          Acestream,
          <br />
          desde tu navegador 🌍
        </h1>
        <SearchBox loading={loading} onSubmit={onSubmit} error={error} />
      </div>

      <div className="w-full flex flex-col gap-2.5">
        <VideoPlayer
          src={videoSrc}
          setLoading={setLoading}
          setError={setError}
        />
        {error && (
          <p className="text-red-500 flex items-center gap-1.5 justify-center">
            <Info size={16} />
            Error al cargar stream, pruebe con otro link.
          </p>
        )}
      </div>
    </div>
  );
}

export default App;
