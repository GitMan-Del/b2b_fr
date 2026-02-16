import Badge from "./Badge";
import Btn from "./btn";

export default function Section2() {
  // Păstrăm array-ul tău original intact
  const positions = [0];
  const steps = [10, 20, 20, 20, 20];

  steps.reduce((acc, step) => {
    const next = acc + step;
    positions.push(next);
    return next;
  }, 0);

  const stats = [
    { value: "-25", text: "Surcoûts évités grâce à l’anticipation des risques." },
    { value: "-30", text: "Retards non planifiés par rapport à des projets de rénovation standards." },
    { value: "+20", text: "Efficience budgétaire grâce à des choix techniques optimisés." },
    { value: "-40", text: "Problèmes post-livraison et travaux correctifs." },
    { value: "+15", text: "Valorisation de l’actif à la livraison." },
  ];

  return (
    <section className="min-h-screen md:h-[100vh] w-full flex items-start md:justify-center justify-between z-10 flex-col md:px-20 px-4 pb-10 md:pb-20 relative overflow-hidden">
      {/* Header – neschimbat */}
      <div className="flex-col flex items-start justify-center gap-3.25 mt-6 md:mt-0">
        <Badge text="Nos Expertises B2B" mode="Light" />
        <h4 className="max-w-[245px] md:max-w-none text-[35px] md:text-[70px] font-bold text-left text-[#151515] leading-tight">
          Un Projet <span className="text-[#6D785A]">Bien Piloté</span> Est{" "}
          <br className="hidden md:block" />
          Un Actif Qui Performe
        </h4>
      </div>

      {/* Buton – vizibil pe mobil jos, pe desktop în poziția ta originală */}
      <div className="w-full flex justify-center md:hidden mt-10">
        <Btn text="Discuter de votre project" />
      </div>
      <div className="w-full h-fit md:flex hidden justify-end items-center mt-26">
        <Btn text="Discuter de votre project" />
      </div>

      {/* Stats container */}
      <div className="relative w-full flex-grow mt-10 md:mt-0">
        {/* MOBIL: stack vertical */}
        <div className="md:hidden flex flex-col gap-10 px-2 py-8">
          {stats.map((item, i) => (
            <div key={i} className="flex items-start gap-4">
              <div className="w-3 h-3 rounded-full bg-[#6D785A] mt-2 shrink-0" />
              <div>
                <p className="text-5xl font-extrabold text-[#151515]">
                  {item.value}
                  <span className="text-[#6D785A]">%</span>
                </p>
                <p className="text-[#5C5C5C] text-[15px] mt-2 leading-snug font-medium max-w-[90%]">
                  {item.text}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* DESKTOP: poziționare absolută – aproape identic cu originalul tău */}
        <div className="hidden md:block absolute inset-0 pointer-events-none z-20 mt-20">
          {[
            { left: 10, value: "-25", bottom: "28%", text: stats[0].text },
            { left: 30, value: "-30", bottom: "20%", text: stats[1].text },
            { left: 50, value: "+20", bottom: "15%", text: stats[2].text },
            { left: 70, value: "-40", bottom: "10%", text: stats[3].text },
            { left: 90, value: "+15", bottom: "5%", text: stats[4].text },
          ].map((item, i) => (
            <div
              key={i}
              className="absolute w-fit flex flex-col items-start left-0"
              style={{
                left: `${item.left}%`,
                bottom: item.bottom,
              }}
            >
              <div className="w-2.5 h-2.5 rounded-xs bg-[#6D785A] mb-2" />

              <p className="text-[40px] font-extrabold text-[#151515] mb-1 md:-translate-x-20.25">
                {item.value}
                <span className="text-[#6D785A]">%</span>
              </p>

              <p className="text-[#5C5C5C] text-[13px] md:text-[14px] lg:text-[15px] max-w-37.5 font-medium text-left leading-tight md:-translate-x-20.25">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}