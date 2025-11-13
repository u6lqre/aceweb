import { LoaderCircle } from "lucide-react";
import { type FormEvent, type Ref } from "react";

type Props = {
  handleSubmit: (e: FormEvent) => void;
  inputRef: Ref<HTMLInputElement>;
  loading: boolean;
};

function SearchBox({ handleSubmit, inputRef, loading }: Props) {
  return (
    <form onSubmit={handleSubmit} className="flex gap-1.5 w-min">
      <input
        ref={inputRef}
        type="text"
        placeholder="content_id"
        className="placeholder:text-neutral-2 p-1.5 pl-2.5 border border-neutral-2 rounded-[10px] w-[250px] text-white focus:border-neutral-3 duration-300"
      />
      <button
        className={`rounded-[10px] cursor-pointer w-36 flex justify-center items-center gap-1.5 duration-300 ${
          loading ? "bg-neutral-5" : "bg-white"
        }`}
      >
        {loading ? (
          <>
            Cargando... <LoaderCircle size={16} className="animate-spin" />
          </>
        ) : (
          "Reproducir"
        )}
      </button>
    </form>
  );
}

export default SearchBox;
