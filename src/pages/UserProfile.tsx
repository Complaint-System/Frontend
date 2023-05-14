import Header from "../components/Profile/Header";
import Page from "../layout/Page";
import { useContext, useEffect, useState } from "react";
import { getUser } from "../Api/User";
import defaultAvatar from "../assets/defaultAvatar.png";
import { useAuth } from "../context/AuthProvider";
import { useParams } from "react-router-dom";
import { AppContext } from "../context/AppProvider";

type User = {
  name: string;
  profileImage: string;
  phone: string;
  email: string;
};

const UserProfile = () => {
  const [user, setUser] = useState<User | null>(null);
  const { session } = useAuth();
  const { userId } = useParams();
  const { setLoading } = useContext(AppContext);

  useEffect(() => {
    const fetchUser = async () => await getUser({ session, userId });
    fetchUser().then((res) => setUser(res.data));
  }, []);

  return (
    <Page title={"USER"}>
      <div className=" relative min-h-[150px] h-fit rounded-md p-6 drop-shadow-xl mt-14">
        <div className="group w-[150px] h-[150px] overflow-hidden absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 drop-shadow-md cursor-pointer">
          <img
            src={user?.profileImage ? user?.profileImage : defaultAvatar}
            className="rounded-full w-full aspect-square object-cover border-8 border-green/20 group-hover:border-green/50 transition-colors "
          />
        </div>
        <div className="flex flex-row space-x-5 mx-auto w-fit mt-20">
          <div className="flex flex-col justify-center items-center">
            <h2 className="text-lg font-bold text-textPrimary">3</h2>
            <h5 className="text-sm text-textPrimary/50 font-light">Projects</h5>
          </div>
          <div className="flex flex-col justify-center items-center">
            <h2 className="text-lg font-bold text-textPrimary">24</h2>
            <h5 className="text-sm text-textPrimary/50 font-light">Tickets</h5>
          </div>
        </div>

        <div className="text-center space-y-4">
          <h2 className=" mt-4 text-xl font-bold capitalize text-textPrimary">
            {user?.name}
          </h2>
          <h4 className="text-sm lowercase text-textPrimary">{user?.phone}</h4>
          <h4 className="text-sm font-light lowercase text-textPrimary">
            {user?.email}
          </h4>
        </div>
      </div>
    </Page>
  );
};
export default UserProfile;
