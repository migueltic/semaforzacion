import { useContext } from "react";
import ErrorFileSVG from "../assets/icons/ErrorFileSVG";
import { AppContext } from "../utils/Context";

export default function ErrorFile() {

  const { detections } = useContext(AppContext);

  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
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
