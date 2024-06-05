import { useContext } from "react";
import ErrorFileSVG from "../assets/icons/ErrorFileSVG";
import { AppContext } from "../utils/Context";

export default function ErrorFile() {

  const { detections } = useContext(AppContext);

  return (
    <div className="text-center text-3xl flex flex-col items-center w-[550px] mx-auto h-[350px] shadow-lg rounded-2xl bg-gray-700 justify-center">
      <ErrorFileSVG />
      <p className="mt-5 font-thin">
        {
          (detections?.length === 0) ?
            <p><span className="text-red-300 font-medium">Cuidado! </span> <br />Ningún semáforo fue detectado</p>
            :
            <p><span className="text-red-300 font-medium">Cuidado! </span> <br />Debes ingresar tu semáforo primero</p>
        }
      </p>
    </div>
  );
}
