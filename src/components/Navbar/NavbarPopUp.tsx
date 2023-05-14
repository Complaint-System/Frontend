import { CgProfile } from "react-icons/cg";
import defualtAvatar from "../../assets/defaultAvatar.png";

import { useNavigate } from "react-router-dom";
type Props = {};
const NavbarPopUp = ({ user, logout }: any) => {
  const navigate = useNavigate();
  return (
    <div className="w-[350px] h-fit bg-bgPrimary  absolute right-0 top-[50px] z-40 drop-shadow-xl border border-white/5 rounded-md p-4 animate-scrollIn">
      <div className="flex flex-row items-center space-x-4">
        <img
          src={user.profileImage || defualtAvatar}
          className="w-20 h-20 rounded-full drop-shadow-md"
        />

        <div className="w-full text-center">
          <h4 className="text-lg font-bold text-textPrimary">{user.name}</h4>
          <span className="text-sm text-textPrimary">{user.email}</span>
        </div>
      </div>
      <hr className="mt-4 text-dark/10" />

      <div className="mt-4 w-full text-center space-x-6 flex flex-row justify-center">
        <button
          className="w-full p-2 bg-green text-xs text-white rounded-md transition-all hover:bg-darkGreen flex flex-row justify-center items-center gap-2"
          onClick={() => navigate("/me")}
        >
          <CgProfile className="scale-125" />
          <span>Profile</span>
        </button>

        <button
          onClick={() => logout()}
          type="button"
          className="w-full p-2 bg-gray3 text-xs font-bold text-white hover:bg-gray3/80 rounded-md transition-all"
        >
          Logout
        </button>
      </div>
    </div>
  );
};
export default NavbarPopUp;
