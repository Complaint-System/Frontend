import { MdSpaceDashboard } from "react-icons/md";
import { HiClipboardDocumentList } from "react-icons/hi2";
import { CgProfile } from "react-icons/cg";
import { FiLogOut } from "react-icons/fi";
import { TiMessages } from "react-icons/ti";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import SidebarElem from "../components/util/SidebarElem";
import { memo } from "react";

import logo from "../assets/logo.png";

type Props = {};

const Sidebar = (props: Props) => {
  const { logout } = useAuth();

  return (
    <div className="h-screen fixed w-[200px] top-0 bg-bgPrimary py-6 flex flex-col space-y-8 drop-shadow-xl z-10">
      <div className="w-full px-10 py-1 cursor-pointer drop-shadow-lg">
        <img src={logo} alt="" className="w-full" />
      </div>
      <Link to="/dashboard">
        <SidebarElem
          Icon={MdSpaceDashboard}
          textStyle="hover:text-green/70"
          IconStyle="text-orange"
          DivStyle="justify-start items-start pl-8"
          text="Dashboard"
        />
      </Link>

      <Link to="/projects">
        <SidebarElem
          Icon={HiClipboardDocumentList}
          textStyle="hover:text-green/70"
          IconStyle="text-orange"
          DivStyle="justify-start items-start pl-8 "
          text="Projects"
        />
      </Link>

      <Link to="/me">
        <SidebarElem
          Icon={CgProfile}
          textStyle="hover:text-green/70"
          IconStyle="text-orange"
          DivStyle="justify-start items-start pl-8"
          text="Profile"
        />
      </Link>

      <hr className="w-full text-textPrimary/20" />

      <SidebarElem
        Icon={FiLogOut}
        textStyle="hover:text-green/70"
        IconStyle="text-red"
        DivStyle="justify-start items-start pl-8"
        text="Logout"
        onClickFn={() => logout()}
      />
    </div>
  );
};
export default memo(Sidebar);
