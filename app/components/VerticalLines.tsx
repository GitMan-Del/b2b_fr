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
        items: [
          "Chef de projet dédié",
          "Planning Gantt",
          "Points hebdomadaires",
        ],
      },
      {
        number: "3",
        title: "Exécution & Suivi",
        items: [
          "Suivi en temps réel",
          "Photos d'avancement",
          "Planning prévisionnel",
        ],
      },
      {
        number: "4",
        title: "Livraison",
        items: ["Réception des travaux", "DOE complets", "Garanties actives"],
      },
    ];
    // ──────────────────────────────────────────────
    // Var2:
    // ──────────────────────────────────────────────
    const positionsVar2 = [10, 30, 50, 70, 90];

    return (
      <div className="absolute inset-0 w-full z-20 p-0">
        {positionsVar2.map((left) => {
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
              className="absolute border-l border-dashed border-[#212121] opacity-10"
            />
          );
        })}

        <div className="relative w-full h-full z-30">
          {steps.map((step, index) => {
            const isEven = index % 2 === 0;
            // Poziții verticale progresive de la ~35–18%
            const topPosition = 35 + index * 15; // 35 → 55 → 75 → 95 %

            return (
              <React.Fragment key={step.number}>
                {/* Badge-ul cu numărul pasului */}
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

                {/* Blocul de text (p + listă) */}
                <div
                  className="absolute text-white"
                  style={{
                    left: isEven ? "55%" : "20%",
                    // left: steps[index]?.number === "1" || steps[index]?.number === "3" ? "55%" : "20%", // doar test: #$%1
                    top: `${topPosition - 1}%`, // ușor deasupra badge-ului pentru aliniere vizuală
                  }}
                >
                  <p
                    className="text-xl font-semibold mb-3"
                    style={{ color: "#6D785A", fontSize: "40px" }} //
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
    );
  }

  return null;
}
