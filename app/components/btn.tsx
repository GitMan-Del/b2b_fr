export default function BtnComp({ text }: { text?: string }) {
  return (
    <>
      <button className="flex rounded-[5px] rounded-br-[20px] py-2.25 pr-2 pl-7 gap-6.25 font-medium flex-row bg-[#151515] text-white text-[20px] hover:cursor-pointer hover:rotate-1 transition duration-300 ease-in-out items-center mt-7.75">
        {text ? text : "Discuter de votre project"}
        <div className="p-5 bg-[rgb(109,120,90)]  rounded inline-flex rounded-br-[15px] ">
          <svg
            viewBox="0 0 16 18"
            className="w-5 h-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.49475 16.552L15.2187 10.828L13.3334 8.94267L8.94275 13.3333V0H6.27608V13.3333L1.88542 8.94267L0 10.828L5.72408 16.552C6.22416 17.0519 6.90231 17.3328 7.60942 17.3328C8.31652 17.3328 8.99467 17.0519 9.49475 16.552Z"
              fill="currentColor"
            />
          </svg>
        </div>
      </button>
    </>
  );
}
