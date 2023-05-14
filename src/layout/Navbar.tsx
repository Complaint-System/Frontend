import { useAuth } from "../context/AuthProvider";
import defaultAvatar from "../assets/defaultAvatar.png";
import NavbarPopUp from "../components/Navbar/NavbarPopUp";
import { useState } from "react";

type Props = {
  title: string;
  searchBar?: boolean;
  name?: string;
  image?: string;
};

const Navbar = ({ title }: Props) => {
  const { session, logout } = useAuth();
  const { user } = session;
  const [popup, setPopup] = useState(false);

  return (
    <nav className="h-20 absolute top-0 left-0 w-full flex items-center px-10 py-2 z-10">
      <h3 className="uppercase text-dark  font-black text-xl ">{title}</h3>

      <div className="absolute right-10 flex flex-row justify-center items-center space-x-4 max-w-[180px] ">
        {/* <span className="text-white text-center  text-clip ">{user.name}</span> */}
        <img
          onClick={() => setPopup((prev) => !prev)}
          src={user.profileImage || defaultAvatar}
          className="w-10 h-10 rounded-full drop-shadow-md cursor-pointer "
        />

        {popup && <NavbarPopUp user={user} logout={logout} />}
      </div>
    </nav>
  );
};
export default Navbar;
