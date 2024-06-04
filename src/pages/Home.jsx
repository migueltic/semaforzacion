import InputFile from "../components/InputFile";
import Output from "../components/Output";

export default function Home() {
  return (
    <div className="my-10 w-full h-full flex items-center justify-center">
      <div className="bg-[rgb(42,57,66,46%)] w-[90%] h-[550px] rounded-3xl p-14 flex items-center">
        <div className="w-1/2">
          <h1 className="text-3xl font-bold"><span className="text-5xl text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-yellow-400 to-green-500">Detector de señal de semáforo</span> </h1>
          <p className="text-gray-400 text-2xl font-medium mt-5">Sube tu foto de semáforo</p>
          <br />
          <InputFile />
        </div>
        <div className="w-1/2">
          <Output />
        </div>
      </div>
    </div>
  );
}