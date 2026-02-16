import Badge from "./Badge";
import BtnComp from "./btn";
import VerticalLines from "./VerticalLines";

export default function Steps() {
  return (
    <div className="bg-[#151515] text-white flex flex-col min-h-screen md:min-h-[250vh] h-fit items-start relative justify-start md:p-10 p-6 md:pt-31 pt-20 w-full overflow-hidden">
      {/* Overlay gradient – neschimbat */}
      <div className="bg-gradient-to-b from-[#151515] via-[#151515] to-transparent absolute inset-0 z-10 pointer-events-none" />


      {/* Header part – responsive doar pe text size & max-width */}
      <div className="relative z-20 flex flex-col items-start justify-center gap-6 md:gap-3.25 px-2 md:px-0 w-full">
        <Badge text="Projets d'envergure" mode="Dark" />
       <h5 className="max-w-245 md:text-[70px] text-[40px] font-bold  text-left text-white">
          Un Processus <span className="text-[#6D785A]">Structuré</span> <br/> Pour
          vos Projets
        </h5>
      </div>

      <VerticalLines variant="Var2" />
      {/* Butonul – jos pe mobil, poziția ta absolută pe desktop */}
      <div className="z-30 mt-12 md:mt-0 absolute bottom-10 left-1/2 -translate-x-1/2 w-full flex justify-center px-4 md:px-0">
        <BtnComp text="Voir tous les étapes" />
      </div>
    </div>
  );
}