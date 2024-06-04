import { useContext } from "react";
import { AppContext } from "../utils/Context";
import SearchSVG from "../assets/icons/SearchSVG";

export default function InputFile() {

  const { handleSubmit, handleFileChange } = useContext(AppContext);

  return (
    <form className="flex items-center gap-2" onSubmit={handleSubmit}>
      <input className="file-input file-input-bordered file-input-accent w-full max-w-xs" type="file" placeholder="xd" onChange={handleFileChange} />
      <button type="submit"><SearchSVG /></button>
    </form>
  );
}