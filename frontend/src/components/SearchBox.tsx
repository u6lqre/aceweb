import { useForm } from "react-hook-form";
import { LoaderCircle } from "lucide-react";
import { useEffect } from "react";

type Props = {
  loading: boolean;
  onSubmit: (contentId: string) => void;
  error: Error | null;
};

type FormValues = {
  contentIdInput: string;
};

function SearchBox({ onSubmit, loading, error }: Props) {
  const { register, handleSubmit, reset } = useForm<FormValues>();

  useEffect(() => {
    if (error) {
      reset({ contentIdInput: "" });
    }
  }, [error]);

  return (
    <form
      onSubmit={handleSubmit((data) => onSubmit(data.contentIdInput))}
      className="flex items-center gap-2.5 w-min"
    >
      <input
        {...register("contentIdInput", { required: true })}
        type="text"
        placeholder="content_id"
        className="placeholder:text-neutral-2 y-1.5 px-2.5 h-[33px] bg-neutral-1 rounded-[10px] w-[250px] text-white duration-300 ease-in-out border-2 border-black focus:ring-2 box-content ring-neutral-2"
      />
      <button
        className={`rounded-[10px] cursor-pointer px-3 py-1.5 w-36 flex justify-center items-center gap-1.5 duration-300 ${
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
