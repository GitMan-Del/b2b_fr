import Badge from "./Badge";
import BtnComp from "./btn";
import VerticalLines from "./VerticalLines";

export default function Steps() {
  return (
    <div className="bg-[#151515] text-white min-h-screen h-[250vh] flex flex-col items-left relative justify-start p-10 pt-31 w-full">
      <div className=" bg-[#151515] w-full h-full absolute inset-0  to-[#00000000] z-10"></div>

      <VerticalLines variant="Var2" />
      <div className="z-20 flex flex-col items-start justify-center gap-3.25 ">
        <Badge text="Projets d'envergure" mode="Dark" />
        <h5 className="max-w-245 text-[70px] font-bold  text-left text-white">
          Un Processus <span className="text-[#6D785A]">Structuré</span> <br/> Pour
          vos Projets
        </h5>
          </div>
          <div className="absolute bottom-0 left-1/2 transform  -translate-x-1/2 z-30">
            <BtnComp text="Voir tous les étapes" />
      </div>
    </div>
  );
}
