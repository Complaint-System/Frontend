import { BsCameraFill } from "react-icons/bs";
import defaultAvatar from "../../assets/defaultAvatar.png";
type Props = {};
const Header = ({ name, profileImage }: any) => {
  return (
    <>
      <div
        className="group w-[150px] h-[150px] overflow-hidden  drop-shadow-md cursor-pointer relative mx-auto"
        typeof="sub"
      >
        <input
          type="file"
          className="w-full h-full absolute left-0 top-0 opacity-0 z-20 cursor-pointer"
        />
        <BsCameraFill className="transition-all absolute z-10  bottom-0 left-[80%] -translate-x-1/2 scale-[1.5] -translate-y-4 text-gray" />
        <img
          src={profileImage ? profileImage : defaultAvatar}
          className="rounded-full w-full aspect-square object-cover border-8 border-green/20 group-hover:border-green/50 transition-colors "
        />
      </div>
      <div className="flex flex-row space-x-5 mx-auto w-fit mt-4">
        <div className="flex flex-col justify-center items-center">
          <h2 className="text-lg font-bold text-textPrimary">3</h2>
          <h5 className="text-sm text-textPrimary/50 font-light">Projects</h5>
        </div>
        <div className="flex flex-col justify-center items-center">
          <h2 className="text-lg font-bold text-textPrimary">24</h2>
          <h5 className="text-sm text-textPrimary/50 font-light">Tickets</h5>
        </div>
      </div>
      <h2 className="text-center text-textPrimary mt-4 text-xl font-bold capitalize">
        {name}
      </h2>
    </>
  );
};
export default Header;
