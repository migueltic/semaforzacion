import { useContext } from "react";
import { AppContext } from "../utils/Context";

export default function OutputSuccess() {

  const { imageData, detections } = useContext(AppContext);

  return (
    <>
      {imageData && (
        <div className="lg:absolute lg:top-[105px]">
          <h2 className="hidden lg:inline-block text-3xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-yellow-400 to-green-500 my-5">Resultado</h2>
          <img className='w-[300px] h-[280px] lg:w-[550px] lg:h-[350px] object-cover shadow-lg rounded-2xl' src={`data:image/jpeg;base64,${imageData}`} alt="Detección de semáforo" />
          <ul className="lg:mt-5">
            {detections.map((detection, index) => (
              <li className={`text-lg ${detection.color == 'Green' ? 'text-green-500' : detection.color == 'Yellow' ? 'text-yellow-400' : 'text-red-700'}`} key={index}>{`Color: ${detection.color}`}</li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}