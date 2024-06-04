import NoFileSVG from "../assets/icons/NoFileSVG";

export default function NoInputFile() {
  return (
    <div className="w-full text-center text-3xl flex flex-col items-center">
      <NoFileSVG />
      <p>
        Sube tu semáforo
      </p>
    </div>  
  );
}