import { useEffect, useRef, useState } from "react";

import { MdKeyboardArrowDown } from "react-icons/md";

type Props = {};
const OptionsSelect = ({ name, options }: any) => {
  const [option, setOption] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOption(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);

  return (
    <div
      ref={ref}
      onClick={() => setOption((prev: any) => !prev)}
      className={`select-none  min-w-[150px] bg-orange relative ${
        option ? "rounded-t-md" : "rounded-md"
      } z-40`}
    >
      <div className="relative w-full h-fit  cursor-pointer border-2 hover:bg-blue/10 transition-colors border-white/10 text-dark rounded-md p-2 font-bold text-center uppercase text-xs flex justify-between items-center   ">
        {name}
        <MdKeyboardArrowDown className={`w-4 h-4 ${option && "rotate-180"}`} />
      </div>
      <div className="overflow-auto max-h-[250px] w-full  drop-shadow-lg absolute top-[39px] left-0 bg-bgSecondary">
        {option &&
          options.map((element: any) => (
            <div
              className="w-full border-b text-textPrimary border-dark/10 py-3 px-2 truncate cursor-pointer text-center capitalize hover:bg-blue/10 transition-colors"
              onClick={element.fn}
            >
              {element.name}
            </div>
          ))}
      </div>
    </div>
  );
};
export default OptionsSelect;
