
import React from "react";

interface VerticalLinesProps {
  variant?: "Var1" | "Var2";
}

export default function VerticalLines({
  variant = "Var1",
}: VerticalLinesProps) {
  if (variant === "Var1") {
    // Your original style – sparse, emphasis on 30/70, center + edges centered
    const positions = [10, 30, 50, 70, 90];

    return (
      <div className="absolute inset-0 w-full pointer-events-none z-10">
        {positions.map((left) => {
          const isThin = left === 30 || left === 70;
          const needsTopOffset = left === 30 || left === 50 || left === 70;
          const needsCentering = left === 10 || left === 50 || left === 90;

          return (
            <div
              key={left}
              style={{
                left: `${left}%`,
                borderLeftWidth: isThin ? "1px" : "3px",
                top: needsTopOffset ? "1.4%" : "0",
                bottom: 0,
                transform: needsCentering ? "translateX(-50%)" : "none",
              }}
              className="absolute border-l border-dashed border-[#DEDEDE] opacity-40"
            />
          );
        })}
      </div>
    );
  }

  if (variant === "Var2") {
    const steps = [
      {
        number: "1",
        title: "Audit & Diagnostic",
        items: ["Rapport technique", "Devis détaillé", "Planning prévisionnel"],
      },
      {
        number: "2",
        title: "Planification",
        items: ["Chef de projet dédié", "Planning Gantt", "Points hebdomadaires"],
      },
      {
        number: "3",
        title: "Exécution & Suivi",
        items: ["Suivi en temps réel", "Photos d'avancement", "Planning prévisionnel"],
      },
      {
        number: "4",
        title: "Livraison",
        items: ["Réception des travaux", "DOE complets", "Garanties actives"],
      },
    ];

    return (
      <>
        {/* === DESKTOP: exact layout-ul tău original === */}
        <div className="hidden md:block absolute inset-0 w-full z-20 pointer-events-none">
          {/* Liniile verticale – neschimbate */}
          {[10, 30, 50, 70, 90].map((left) => {
            const isThin = left === 30 || left === 70;
            const needsTopOffset = left === 50 ? "35%" : "0";
            const needsCentering = left === 10 || left === 50 || left === 90;

            return (
              <div
                key={left}
                style={{
                  left: `${left}%`,
                  borderLeftWidth: isThin ? "1px" : "3px",
                  top: needsTopOffset,
                  bottom: 0,
                  opacity: left === 50 ? 1 : 0.1,
                  borderColor: left === 50 ? "#6D785A" : "#DEDEDE",
                  transform: needsCentering ? "translateX(-50%)" : "none",
                }}
                className="absolute border-l border-dashed border-[#212121]"
              />
            );
          })}

          {/* Badge-uri + texte absolute – exact ca la tine */}
          <div className="relative w-full h-full">
            {steps.map((step, index) => {
              const isEven = index % 2 === 0;
              const topPosition = 35 + index * 15; // progresia ta

              return (
                <React.Fragment key={step.number}>
                  {/* Badge central cu pătrățel */}
                  <div
                    className="absolute w-9 h-9 rounded-lg bg-[#090a08] border-2 border-[#6D785A]/20 flex items-center justify-center text-[#6D785A] font-bold text-lg shadow-sm z-30"
                    style={{
                      left: "50%",
                      top: `${topPosition}%`,
                      transform: "translate(-50%, -50%)",
                    }}
                  >
                    <div className="w-3 h-3 rounded-[3px] bg-[#6D785A]"></div>
                  </div>

                  {/* Text + listă – poziții stânga/dreapta alternant */}
                  <div
                    className="absolute text-white"
                    style={{
                      left: isEven ? "55%" : "20%",
                      top: `${topPosition - 1}%`,
                    }}
                  >
                    <p
                      className="text-xl font-semibold mb-3"
                      style={{ color: "#6D785A", fontSize: "40px" }}
                    >
                      <span className="text-white">Step {step.number}.</span>{" "}
                      {step.title}
                    </p>
                    <ul className="text-sm space-y-1.5 list-disc text-[20px] pl-5 opacity-90 marker:text-[#6D785A]/70">
                      {step.items.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* === MOBIL: stack vertical curat, fără poziții absolute === */}
        <div className="md:hidden relative z-20 px-4 py-16 flex flex-col gap-20">
          {steps.map((step) => (
            <div key={step.number} className="flex flex-col gap-5 max-w-lg mx-auto w-full">
              {/* Badge + titlu */}
              <div className="flex items-center gap-4">
                <div className="min-w-[56px] h-14 rounded-xl bg-[#090a08] border-2 border-[#6D785A]/30 flex items-center justify-center">
                  <div className="w-6 h-6 rounded-md bg-[#6D785A]"></div>
                </div>

                <div>
                  <div className="text-3xl font-bold text-[#6D785A]">
                    Step {step.number}.
                  </div>
                  <h4 className="text-2xl font-semibold text-white mt-1">
                    {step.title}
                  </h4>
                </div>
              </div>

              {/* Lista */}
              <ul className="space-y-3 list-disc pl-8 text-lg text-gray-300 marker:text-[#6D785A]/60">
                {step.items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </>
    );
  }

  return null;
}