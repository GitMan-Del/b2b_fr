import Badge from "./components/Badge";
import Btn from "./components/btn";

export default function Section2() {
  const positions = [0]; // pornim de la 0
  const steps = [10, 20, 20, 20, 20]; // cât % adaugi de fiecare dată (sau ajustezi)

  steps.reduce((acc, step) => {
    const next = acc + step;
    positions.push(next);
    return next;
  }, 0);

  return (
    <section className="min-h-screen h-[150vh] w-full flex items-start justify-center z-10 flex-col px-20 pb-20 relative">
      <div className="flex-col flex items-start justify-center  gap-3.25 ">
        <Badge text="Nos Expertises B2B" mode="Light" />
        <h4 className="max-w-245 text-[70px] font-bold  text-left text-[#151515]">
          Un Projet <span className="text-[#6D785A]">Bien Piloté</span> Est{" "}
          <br />
          Un Actif Qui Performe
        </h4>
      </div>

      <div className="w-full h-fit flex justify-end items-center mt-26">
        <Btn text="Discuter de votre project" />
      </div>

      <div className="absolute inset-0 b w-full pointer-events-none z-20 mt-20">
        {[
          {
            left: 10,
            value: "-25",
            bottom: "28%",
            text: "Surcoûts évités grâce à l’anticipation des risques.",
          },
          {
            left: 30,
            value: "-30",
            bottom: "20%",
            text: "Retards non planifiés par rapport à des projets de rénovation standards.",
          },
          {
            left: 50,
            value: "+20",
            bottom: "15%",
            text: "Efficience budgétaire grâce à des choix techniques optimisés.",
          },
          {
            left: 70,
            value: "-40",
            bottom: "10%",
            text: "Problèmes post-livraison et travaux correctifs.",
          },
          {
            left: 90,
            value: "+15",
            bottom: "5%",
            text: "Valorisation de l’actif à la livraison.",
          },
        ].map((item) => (
          <div
            key={item.left}
            className="absolute w-fit flex flex-col items-left -translate-x-1.25"
            style={{
              left: `${item.left}%`,
              bottom: item.bottom,
            }}
          >

            {/* Punctul verde */}
            <div className="w-2.5 h-2.5 rounded-xs bg-[#6D785A] mb-2" />
            {/* Procentul mare – Sub punct */}
              <p className="text-[40px] font-extrabold text-[#151515] mb-1 -translate-x-20.25">{item.value}<span className="text-[#6D785A]">%</span></p>
            {/* Textul descriptiv – jos, sub punct */}
            <p
              className="text-[#5C5C5C] text-[13px] md:text-[14px] lg:text-[15px] max-w-37.5 font-medium text-left leading-tight -translate-x-20.25"
              >
              {item.text}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
