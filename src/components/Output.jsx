import { useContext } from "react";
import { AppContext } from "../utils/Context";

export default function Output() {

  const {imageData, detections} = useContext(AppContext);
  
  return (
    <>
      {imageData && (
        <div className="flex flex-col items-center justify-center">
          <h2 className="text-3xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-yellow-400 to-green-500 my-5">Resultado</h2>
          <img className='w-[550px] h-[350px] object-cover shadow-lg rounded-2xl' src={`data:image/jpeg;base64,${imageData}`} alt="Detección de semáforo" />
          <ul className="mt-5">
            {detections.map((detection, index) => (
              <li className={`text-lg ${detection.color == 'Green' ? 'text-green-500' : detection.color == 'Yellow' ? 'text-yellow-400' : 'text-red-700'}`} key={index}>{`Color: ${detection.color}`}</li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
