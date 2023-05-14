import { useState, useEffect, useContext } from "react";
import { useAuth } from "../context/AuthProvider";
import { AppContext } from "../context/AppProvider";

import { AiOutlinePlus } from "react-icons/ai";
import { IoTicketSharp, IoPeopleOutline } from "react-icons/io5";

import { Link, useLoaderData, useNavigate } from "react-router-dom";

import { fetchProjects } from "../Api/Project";
import Page from "../layout/Page";
import { BsCalendar2DateFill } from "react-icons/bs";
import { formatDate } from "../util/Functions";
import DotOptions from "../components/util/DotOptions";

import noProject from "../assets/no-project.png";

type Props = {};

type projectsType = {
  name: string;
  description: string;
  image: string;
  createdAt: any;
  _id: number;
  ticketCount: number;
  supervisorCount: number;
};

const Projects = (props: Props) => {
  const { session } = useAuth();
  const [projects, setProjects] = useState<Array<projectsType>>([]);
  const { setLoading, loading } = useContext(AppContext);
  const [shouldRender, setshouldRender] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    fetchProjects({ session }).then((res) => {
      setProjects(res);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setshouldRender(true);
    }, 1000); //
  }, []);

  return (
    <Page title="projects">
      <div className="flex flex-row w-full relative">
        <h2 className="font-bold text-lg text-gray">My projects</h2>
        <Link to="/newproject">
          <button className="absolute text-sm box-border rounded-md bg-green hover:bg-darkGreen w-fit transition-all px-4 py-2 text-center text-white right-4 ">
            <AiOutlinePlus />
          </button>
        </Link>
      </div>
      <div className="flex flex-col mt-10 space-y-4 h-full w-full ">
        {projects.length > 0 &&
          !loading &&
          projects.map((element, index) => (
            <div className="relative overflow-hidden w-full rounded-lg bg-bgSecondary border-2 border-dark/20 hover:border-green h-[150px] flex flex-row space-x-6">
              <img
                src={element.image}
                className="w-[150px] aspect-square object-cover rounded-l-md"
                alt=""
              />
              <div className="space-y-4 py-2 w-full h-full flex flex-col">
                <Link to="/tickets" state={{ id: element._id }}>
                  <h2 className="font-bold text-sm text-textPrimary">
                    {element.name}
                  </h2>
                </Link>
                <div className="w-fit h-fit flex fex-row space-x-2 ">
                  <div className="flex flex-row text-left items-center space-x-2">
                    <BsCalendar2DateFill className="text-orange" />
                    <span className="text-xs font-medium text-textPrimary">
                      {formatDate(element.createdAt)}
                    </span>
                  </div>
                  <div className="flex flex-row text-left items-center space-x-2">
                    <IoTicketSharp className="text-orange" />
                    <span className="text-xs font-medium text-textPrimary">
                      {`${element.ticketCount}`}
                    </span>
                  </div>
                  <div className="flex flex-row text-left items-center space-x-2">
                    <IoPeopleOutline className="text-orange" />
                    <span className="text-xs font-medium text-textPrimary">
                      {`${element.supervisorCount}`}
                    </span>
                  </div>
                </div>
                <div className="overflow-hidden">
                  <p className="overflow-hidden text-xs text-gray">
                    {element.description}
                  </p>
                </div>
              </div>

              <div className="absolute flex justify-center items-center top-0 right-0 p-4 text-center">
                <DotOptions
                  horizontal={false}
                  mainStyle={""}
                  options={[
                    {
                      name: "View Tickets",
                      function: () =>
                        navigate("/tickets", {
                          state: { id: element._id },
                        }),
                      textStyle: "text-xs",
                    },
                    {
                      name: "Dashboard",
                      function: () =>
                        navigate("/dashboard", {
                          state: { projectId: element._id },
                        }),
                      textStyle: "text-xs",
                    },
                    {
                      name: "Settings",
                      function: () =>
                        navigate("/project-settings", {
                          state: { id: element._id },
                        }),
                      textStyle: "text-xs",
                    },
                  ]}
                />
              </div>
            </div>
          ))}

        {!(projects.length > 0) && !loading && shouldRender && (
          <div className="w-full h-[250px] text-center flex flex-col">
            <img className="h-40 w-auto m-auto" src={noProject} alt="" />
            <h2 className="text-xl font-semibold text-textPrimary ">
              You don't have any projects yet
            </h2>
            <h4 className="text-sm font-light mt-2 text-textPrimary">
              Start by creating a new one
            </h4>
            <Link to="/newproject">
              <button className="w-[140px] p-2 bg-green hover:bg-green/80 transition-colors rounded-md mt-4">
                New Project
              </button>
            </Link>
          </div>
        )}
      </div>
    </Page>
  );
};

export default Projects;
