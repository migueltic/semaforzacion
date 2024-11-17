import InputFile from "../components/InputFile";
import Output from "../components/Output";

export default function Home() {
  return (
    <div className="my-20 w-full h-full flex items-center justify-center">
      <div className="bg-[rgb(42,57,66,46%)] w-[90%] h-[550px] rounded-3xl p-7 lg:p-14 flex flex-col lg:flex-row items-center">
        <div className="lg:w-1/2 lg:pl-14">
          <h1 className="text-3xl font-semibold lg:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-yellow-400 to-green-500">Detector de señal de semáforo</h1>
          <p className="text-gray-400 text-lg lg:text-2xl font-medium mt-5 animate-pulse">Sube la foto aquí</p>
          <br />
          <InputFile />
        </div>
        <div className="lg:w-1/2">
          <Output />
        </div>
      </div>
    </div>
  );
}