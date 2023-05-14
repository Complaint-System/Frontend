import { IconType } from "react-icons/lib";

type Props = {
  Icon: IconType;
  IconStyle?: string;
  textStyle?: string;
  DivStyle?: string;
  text: string;
  onClickFn?: React.MouseEventHandler<any>;
};
const SidebarElem = ({
  Icon,
  IconStyle,
  textStyle,
  DivStyle,
  text,
  onClickFn,
}: Props) => {
  return (
    <div className={`w-full px-6 flex flex-row space-x-6 ${DivStyle}`}>
      <Icon className={`cursor-pointer scale-[1.5] ${IconStyle} `} />
      <span
        onClick={onClickFn}
        className={`text-xs uppercase  font-extrabold cursor-pointer transition-all text-textPrimary ${textStyle}`}
      >
        {text}
      </span>
    </div>
  );
};
export default SidebarElem;
