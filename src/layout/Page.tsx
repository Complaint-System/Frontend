import HeroBg from "../components/util/HeroBg";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Spinner from "../components/util/Spinner";
import { useContext, useEffect, useState } from "react";

import { AppContext } from "../context/AppProvider";

type Props = {
  children: React.ReactNode;
  title: string;
};

function Page({ children, title }: Props) {
  const { loading } = useContext(AppContext);
  const [showChildren, setShowChildren] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowChildren(true);
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <>
      <Sidebar />
      <div className="w-100% pb-20 min-h-screen ml-[200px] relative flex flex-col loginBg">
        <Navbar title={title} />
        <HeroBg />
        <div className="mt-32 px-14 relative">
          <div className=" bg-bgPrimary min-h-[400px] pb-12 rounded-md p-6 drop-shadow-xl">
            {loading ? <Spinner color={"text-green"} /> : children}
          </div>
        </div>
      </div>
    </>
  );
}
export default Page;
