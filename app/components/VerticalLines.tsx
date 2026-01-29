export default function VerticalLines() {
  return (
    <div className="absolute inset-0 w-full pointer-events-none">
      {[10, 30, 50, 70, 90].map((left) => (
        <div
          key={left}
          style={{
            left: `${left}%`,
            borderWidth: left === 30 || left === 70 ? "1px" : "3px",
            bottom: 0,
            top: left === 30 || left === 50 || left === 70 ? "6%" : "0",
          }}
          className="absolute border-l border-dotted border-[#DEDEDE] opacity-40"
        />
      ))}
    </div>
  );
}
