import { useState, useEffect, useRef } from "react";
import { useAuth } from "../../context/AuthProvider";
import { searchUser } from "../../Api/User";
import {
  addSupervisor,
  removeSupervisor,
  getSupervisors,
} from "../../Api/Project";
import { AxiosResponse } from "axios";
import { RxCross2 } from "react-icons/rx";
import { AiOutlinePlus } from "react-icons/ai";
import { BiSearch } from "react-icons/bi";

import defaultAvatar from "../../assets/defaultAvatar.png";
import { Link } from "react-router-dom";
import Spinner from "../util/Spinner";

type Props = {};

type data = {
  name: string;
  phone: string;
  email: string;
  _id: string;
  profileImage: string;
};
const Supervisors = ({ id }: any) => {
  const { session } = useAuth();
  const [supervisors, setSupervisors] = useState<data[]>([]);
  const [addedSupervisors, setAddedSupervisors] = useState<data[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [restartSearch, setRestartSearch] = useState<boolean>(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSupervisors = async () =>
      await getSupervisors({ projectId: id, session });

    setLoading(true);
    fetchSupervisors().then((result) => {
      if (result.data) {
        setSupervisors(result.data.supervisors);
        setAddedSupervisors(result.data.supervisors);
      }
      setLoading(false);
    });
  }, []);

  const updateAddedSupervisors = async () => {
    setLoading(true);
    await getSupervisors({ projectId: id, session }).then((result) => {
      if (result.data) {
        setAddedSupervisors(result.data.supervisors);
      }
      setLoading(false);
    });
  };

  useEffect(() => {
    const handleSearch = async () => {
      if (searchQuery) {
        const result = await searchUser({ session, searchQuery });
        if (!result.error && result.data.length > 0) {
          setSupervisors(
            result.data.filter(
              (el1: any) => !addedSupervisors.some((el2) => el1._id === el2._id)
            )
          );
        } else {
          setSupervisors([]);
        }
      } else {
        setSupervisors(addedSupervisors);
      }
    };
    handleSearch();
  }, [restartSearch, searchQuery]);

  const handleAddSupervisor = async (supervisorId: string) => {
    const response = await addSupervisor({
      supervisorId,
      projectId: id,
      session,
    });
    await updateAddedSupervisors();
    setRestartSearch((prev) => !prev);
    console.log(response);
  };

  const handleRemoveSupervisor = async (supervisorId: string) => {
    const response = await removeSupervisor({
      supervisorId,
      projectId: id,
      session,
    });
    await updateAddedSupervisors();
    setRestartSearch((prev) => !prev);
    console.log(response);
  };

  const handleButton = (element: any) => {
    if (addedSupervisors.find((supervisor) => supervisor._id === element._id))
      return (
        <RxCross2
          className="text-red scale-150  hover:scale-[1.7] transition-all"
          onClick={() => handleRemoveSupervisor(element._id)}
        />
      );
    else
      return (
        <AiOutlinePlus
          className="text-green scale-150 hover:scale-[1.7] transition-all"
          onClick={() => handleAddSupervisor(element._id)}
        />
      );
  };

  const handleChange = async (e: any) => {
    e.preventDefault();
    setSearchQuery(e.target.value);
  };

  return (
    <>
      <div className="px-4 py-2 group border-2 border-white/20 focus-within:border-green rounded-md flex flex-row justify-center items-center space-x-2 mx-auto transition-colors ">
        <BiSearch className="text-white/20 transition-colors group-focus-within:text-green" />
        <input
          type="text"
          className=" unset inline-block text-white/80 placeholder:text-white/20 placeholder:text-sm w-full"
          placeholder="Search..."
          ref={searchInputRef}
          onChange={handleChange}
        />
      </div>
      {!(addedSupervisors.length == 0 && searchQuery.length == 0) ? (
        <div className="w-full space-y-4 h-full overflow-y-auto pt-4 pb-2 relative">
          {supervisors.length > 0 ? (
            supervisors.map((element, index) => (
              <div className="w-full relative p-4 flex flex-row items-center">
                <Link to={`/user/${element._id}`}>
                  <div className="flex flex-row items-center space-x-4">
                    <img
                      src={element.profileImage || defaultAvatar}
                      className="w-12 h-12 object-cover rounded-full"
                    />
                    <div className="flex flex-col">
                      <h2 className="text-sm text-textPrimary font-bold flex-1 hover:text-green transition-all">
                        {element.name}
                      </h2>
                      <h2 className="text-xs text-textPrimary font-light">
                        {element.email}
                      </h2>
                    </div>
                  </div>
                </Link>
                <button className={`absolute right-0 p-2`}>
                  {handleButton(element)}
                </button>
              </div>
            ))
          ) : (
            <div className="w-full flex justify-center items-center text-textPrimary">
              <span className="text-sm">Supervisor can not be found</span>
            </div>
          )}
          {loading && (
            <div className="absolute left-0 top-0 w-full h-[80%] flex justify-center items-center bg-dark/80">
              <Spinner color="text-green" />
            </div>
          )}
        </div>
      ) : (
        <div className="h-24 flex justify-center items-center text-textPrimary">
          <span className="">
            No supervisors yet, start by{" "}
            <span
              className="text-green cursor-pointer"
              onClick={() => searchInputRef.current?.focus()}
            >
              adding
            </span>{" "}
            some
          </span>
        </div>
      )}
    </>
  );
};
export default Supervisors;
