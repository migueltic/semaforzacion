import { useContext } from "react";
import { AppContext } from "../utils/Context";
import NoInputFile from "./NoInputFile";
import ErrorFile from "./ErrorFile";
import OutputSuccess from "./OutputSuccess";

export default function Output() {

  const { imageData, detections } = useContext(AppContext);

  return (
    <div className="w-[300px] mt-5 h-[280px] lg:w-[550px] mx-auto lg:h-[350px] shadow-lg rounded-2xl bg-gray-700 text-center text-xl lg:text-3xl ">
      {
        (imageData === null) ? <NoInputFile /> : (detections?.length > 0 && imageData !== null) ? <OutputSuccess /> : <ErrorFile />
      }
    </div>
  );
}
