import { deleteProject } from "../../Api/Project";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";

type Props = {};

const Options = ({ id, setLoading, setTab }: any) => {
  const navigate = useNavigate();
  const { session } = useAuth();
  const handleDelete = async () => {
    setLoading(true);
    await deleteProject({ id, session });
    setLoading(false);
    navigate("/");
  };
  return (
    <div className="relative w-[300px] border-r-2 border-white/5 ">
      <div
        onClick={() => setTab(0)}
        className=" mr-8 text-md text-textPrimary font-bold border-b-2 border-white/5 hover:bg-white/20 transition-colors p-4 cursor-pointer rounded-sm"
      >
        General
      </div>
      <div
        onClick={() => setTab(1)}
        className="mr-8 text-md text-textPrimary font-bold border-b-2 border-white/5 hover:bg-white/20 transition-colors p-4 cursor-pointer rounded-sm"
      >
        Supervisors
      </div>

      <div
        onClick={() => handleDelete()}
        className="mr-8 absolute bottom-0 w-full left-0 text-md text-red font-bold  hover:bg-white/20 transition-colors p-4 cursor-pointer rounded-sm"
      >
        Delete
      </div>
    </div>
  );
};
export default Options;
