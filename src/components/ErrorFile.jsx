import ErrorFileSVG from "../assets/icons/ErrorFileSVG";

export default function ErrorFile() {
  return (
    <div className="text-center text-3xl flex flex-col items-center w-[550px] mx-auto h-[350px] shadow-lg rounded-2xl bg-gray-700 justify-center">
      <ErrorFileSVG />
      <p className="mt-5 font-thin">
        <span className="text-red-300 font-medium">Cuidado! </span> <br />Debes ingresar tu semáforo primero
      </p>
    </div>
  );
}
