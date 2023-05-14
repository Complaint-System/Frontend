import { useState, useEffect, useRef } from "react";
import { HiDotsVertical } from "react-icons/hi";

const DotOptions = ({ options, horizontal }: any) => {
  const [showOptions, setShowOptions] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const bgColor = "bg-gray2";
  const bgHover = "bg-blue";
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setShowOptions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);

  return (
    <div className="relative w-fit h-fit top-0 drop-shadow-lg" ref={ref}>
      <HiDotsVertical
        className={`cursor-pointer top-0 left-0 scale-125 text-white/40 hover:text-white/80 transition-colors ${
          horizontal && "rotate-90"
        }`}
        onClick={() => setShowOptions((prev) => !prev)}
      />
      {showOptions && (
        <div
          id="overflow-hidden"
          className={`animate-scrollIn group rounded-sm min-w-[100px] ${bgColor} border-[#bfbfbf] flex flex-col justify-center items-center h-fit absolute ${
            horizontal ? "right-[-10px] top-4" : "right-[16px] top-0"
          } `}
        >
          {options.map((element: any, index: number) => (
            <div
              key={index}
              className={`z-40 text-center cursor-pointer border-b-2  last:border-none p-2 border-[#bfbfbf]/20 w-full transition-colors hover:bg-white/20`}
              onClick={() => {
                element?.function();
                setShowOptions(false);
              }}
            >
              <span
                className={`capitalize text-sm font-bold ${element.textStyle}`}
              >
                {element.name}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default DotOptions;
