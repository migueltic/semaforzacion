import { useContext } from "react";
import { AppContext } from "../utils/Context";
import NoInputFile from "./NoInputFile";
import ErrorFile from "./ErrorFile";
import OutputSuccess from "./OutputSuccess";

export default function Output() {

  const {imageData, detections, status} = useContext(AppContext);
  
  return (
    <>
      {
        imageData === null ? <NoInputFile /> : (detections?.length > 0 && detections?.length !== undefined) ?  <OutputSuccess /> : ''
      }
      {
        status === 400 ? <ErrorFile /> : ''
      }
    </>
  );
}
