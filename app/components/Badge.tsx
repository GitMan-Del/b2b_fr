export default function Badge({
  text,
  mode,
}: {
  text: string;
  mode: "Light" | "Dark";
}) {
  const modeClass =
    mode === "Light"
      ? "bg-[#FFFFFF] border border-[#D1D1D1] text-black"
      : "bg-black ";

  return (
    <div
      className={`${modeClass} w-fit text-md px-5 py-3.25 rounded-full text-center flex flex-row items-center gap-3 `}
    >
      <div className="w-2.75 h-2.75 rounded-[3px] bg-[#6D785A]"></div>
      <p className="text-[16px]">{text}</p>
    </div>
  );
}
