import { useContext } from "react";
import SearchSVG from "../assets/icons/SearchSVG";

export default function SearchBar() {

  const { handleSubmit, handleFileChange } = useContext();

  return (
    <form className="w-[80%] mt-5 mx-auto h-16 flex justify-center" onSubmit={handleSubmit}>
      <input className="w-[60%] mr-2 text-gray-400 h-full bg-[rgb(42,57,66,46%)] rounded-full px-5 placeholder:text-center" type="text" placeholder="sube tu foto" onChange={handleFileChange} />
      <button type="submit"><SearchSVG /></button>
    </form>
  );
}
