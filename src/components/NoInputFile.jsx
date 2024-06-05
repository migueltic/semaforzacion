import NoFileSVG from "../assets/icons/NoFileSVG";

export default function NoInputFile() {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <NoFileSVG />
      <p>
        Sube tu semáforo
      </p>
    </div>  
  );
}