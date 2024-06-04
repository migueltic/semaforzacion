import NoFileSVG from "../assets/icons/NoFileSVG";

export default function NoInputFile() {
  return (
    <div className="w-[550px] mx-auto h-[350px] shadow-lg rounded-2xl bg-gray-700 text-center text-3xl flex flex-col justify-center items-center">
      <NoFileSVG />
      <p>
        Sube tu semáforo
      </p>
    </div>  
  );
}