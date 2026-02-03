export default function Badge({
  text,
  mode,
}: {
  text: string;
  mode: "Light" | "Dark" | "Blured";
}) {
  const modeClass =
    mode === "Light"
      ? "bg-[#FFFFFF] border border-[#D1D1D1] text-black"
      : mode === "Dark"
        ? "bg-linear-to-l bg-from-[#151515] backdrop-blur-[10px] to-black/10 border-2 border-[#4444443a] text-white"
        : mode === "Blured"
          ? "bg-white/20  backdrop-blur-[10px] border-2 border-white/10  text-white"
          : mode === "Light";
  return (
    <div
      className={`${modeClass}  w-fit text-md px-5 py-2.25 rounded-full text-center flex flex-row items-center gap-3 z-10 `}
    >
      <div className="w-2.75 h-2.75 rounded-[3px] bg-[#6D785A]"></div>
      <p className="text-[16px]">{text}</p>
    </div>
  );
}
