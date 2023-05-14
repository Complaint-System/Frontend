import Sidebar from "../layout/Sidebar";
import { useAuth } from "../context/AuthProvider";
import { useState, useEffect, useContext } from "react";

import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { fetchTickets, deleteTicket, updateTicket } from "../Api/Ticket";
import Spinner from "../components/util/Spinner";

import Page from "../layout/Page";
import { AiOutlinePlus } from "react-icons/ai";
import { TbMoodEmpty } from "react-icons/tb";

import defaultAvatar from "../assets/defaultAvatar.png";
import { formatRelativeDate } from "../util/Functions";
import DotOptions from "../components/util/DotOptions";
import { AppContext } from "../context/AppProvider";
import OptionsSelect from "../components/util/OptionsSelect";

type Props = {};

type ticketType = {
  _id: string;
  title: String;
  creatorId: { _id: number; name: string; profileImage: string };
  createdAt: any;
  updatedAt: any;
  priority: "High" | "Medium" | "Low";
  closed: boolean;
};
const Tickets = (props: Props) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { session } = useAuth();
  const [staticTickets, setStaticTickets] = useState<ticketType[]>([]);
  const [tickets, setTickets] = useState<ticketType[]>([]);
  const [project, setProject] = useState<any>({});
  const { setLoading, loading } = useContext(AppContext);
  const [ascending, setAscending] = useState<(1 | -1)[]>([1, 1, 1, 1]);
  const [shouldRender, setshouldRender] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setshouldRender(true);
    }, 1000); //
  }, []);

  useEffect(() => {
    if (location.state?.id) {
      getAllTickets();
    } else {
      navigate("/");
    }
  }, []);

  const getAllTickets = async () => {
    setLoading(true);
    const response = await fetchTickets({
      session,
      projectId: location.state?.id,
    });
    setTickets(response.data.tickets || []);
    setStaticTickets(response.data.tickets || []);
    setProject(response.data.project);
    setTimeout(() => setLoading(false), 500);
  };

  const Priority = (
    priority: "High" | "Medium" | "Low"
  ): string | undefined => {
    if (priority === "High") return "bg-red";
    if (priority === "Medium") return "bg-yellow";
    if (priority === "Low") return "bg-green";
  };

  const handleDeleteTicket = async (ticketId: string) => {
    setLoading(true);
    const response = await deleteTicket({ session, ticketId });
    getAllTickets();
    setLoading(false);
  };

  const handleOpenCloseTicket = async ({
    ticketId,
    closed,
  }: {
    ticketId: string;
    closed: boolean;
  }) => {
    setLoading(true);
    const response = await updateTicket({ session, ticketId, closed });
    getAllTickets();
    setLoading(false);
  };

  const filterOpenClosed = (option: "all" | "opened" | "closed") => {
    if (option === "opened") {
      setTickets(() => staticTickets.filter((element) => !element.closed));
    } else if (option === "closed") {
      setTickets(() => staticTickets.filter((element) => element.closed));
    } else {
      setTickets(staticTickets);
    }
  };

  const sortTicketsByTitle = (index: number) => {
    const ticketsCopy = staticTickets;
    ticketsCopy.sort((a, b) => {
      if (a.title < b.title) {
        return ascending[index] * -1; // a comes before b
      } else if (a.title > b.title) {
        return ascending[index] * 1; // b comes before a
      } else {
        return 0; // a and b are equal
      }
    });
    setTickets(ticketsCopy);
  };
  const sortTicketsByCreated = (index: number) => {
    const ticketsCopy = staticTickets;
    ticketsCopy.sort((a, b) => {
      if (a.createdAt < b.createdAt) {
        return ascending[index] * -1; // a comes before b
      } else if (a.createdAt > b.createdAt) {
        return ascending[index] * 1; // b comes before a
      } else {
        return 0; // a and b are equal
      }
    });
    setTickets(ticketsCopy);
  };

  const sortTicketsByPriority = (index: number) => {
    const ticketsCopy = staticTickets;
    const sortOrder =
      ascending[index] === 1
        ? ["High", "Medium", "Low"]
        : ["Low", "Medium", "High"];
    ticketsCopy.sort(
      (a, b) => sortOrder.indexOf(a.priority) - sortOrder.indexOf(b.priority)
    );
    setTickets(ticketsCopy);
  };

  const sortTicketsBySupervisor = (index: number) => {
    const ticketsCopy = staticTickets;
    ticketsCopy.sort((a, b) => {
      if (a.creatorId.name < b.creatorId.name) {
        return ascending[index] * -1; // a comes before b
      } else if (a.creatorId.name > b.creatorId.name) {
        return ascending[index] * 1; // b comes before a
      } else {
        return 0; // a and b are equal
      }
    });
    setTickets(ticketsCopy);
  };

  const invertAscending = (index: number) => {
    setAscending((prevState) => {
      const newState = [...prevState];
      newState[index] = prevState[index] === 1 ? -1 : 1;
      return newState;
    });
  };

  return (
    <Page title="tickets">
      {tickets.length > 0 && (
        <>
          <h2 className="font-bold text-lg pl-4 text-gray">All tickets</h2>
          <div className="flex flex-row justify-between items-center">
            <div className=" relative rounded-t-md p-6 flex flex-row space-x-4 capitalize items-center">
              <img
                src={project.image}
                className="h-12 w-auto rounded-full"
                alt=""
              />
              <h2 className="text-lg font-bold text-textPrimary">
                {project.name}
              </h2>
            </div>

            <div className="flex flex-row justify-center items-center space-x-4">
              <OptionsSelect
                name={"filter"}
                options={[
                  { name: "All", fn: () => filterOpenClosed("all") },
                  { name: "Opened", fn: () => filterOpenClosed("opened") },
                  { name: "Closed", fn: () => filterOpenClosed("closed") },
                ]}
              />
              <OptionsSelect
                name={"sort"}
                options={[
                  {
                    name: "Title",
                    fn: () => {
                      invertAscending(0);
                      sortTicketsByTitle(0);
                    },
                  },
                  {
                    name: "Created",
                    fn: () => {
                      invertAscending(1);
                      sortTicketsByCreated(1);
                    },
                  },
                  {
                    name: "Priority",
                    fn: () => {
                      invertAscending(2);
                      sortTicketsByPriority(2);
                    },
                  },
                  {
                    name: "Creator Name",
                    fn: () => {
                      invertAscending(3);
                      sortTicketsBySupervisor(3);
                    },
                  },
                ]}
              />

              <Link
                to="/newticket"
                state={{ id: location.state?.id, prevPath: location.pathname }}
              >
                <button className=" text-sm box-border rounded-md bg-green hover:bg-darkGreen w-fit transition-all p-3 text-center text-white ">
                  <AiOutlinePlus />
                </button>
              </Link>
            </div>
          </div>

          <table className="w-full border-collapse tickets-table">
            <thead>
              <tr className="">
                <th className=""></th>
                <th className="text-green text-base w-[40%]">Ticket Title</th>
                <th className="text-green text-base w-[20%]">Supervisor</th>
                <th className="text-green text-base w-[20%]">Created</th>
                <th className="text-green text-base w-[15%]">Priority</th>
                <th className="text-green text-base w-[5%]"></th>
              </tr>
            </thead>
            <tbody>
              {tickets.map((element, index) => (
                <tr key={index} className={`bg-bgSecondary`}>
                  <td>
                    <div
                      className={`relative w-2 h-2 bg-green rounded-full ${
                        element.closed ? "bg-red" : "bg-green"
                      }`}
                    ></div>
                  </td>
                  <td className="max-w-0">
                    <h2
                      className="text-sm cursor-pointer text-white  font-medium capitalize"
                      onClick={() =>
                        navigate(`/ticket`, {
                          state: { ticketId: element._id },
                        })
                      }
                    >
                      {element.title}
                    </h2>
                    <h4 className="font-medium text-xs mt-2 text-textPrimary">
                      {`Updated ${formatRelativeDate(element.updatedAt)}`}
                    </h4>
                  </td>
                  <td>
                    <div
                      className="w-full gap-2 flex flex-row flex-wrap items-center cursor-pointer"
                      onClick={() => navigate(`/user/${element.creatorId._id}`)}
                    >
                      <img
                        className="w-8 h-8  object-cover rounded-full "
                        src={element.creatorId?.profileImage || defaultAvatar}
                      />
                      <h2 className="text-sm font-medium capitalize limit-text text-textPrimary">
                        {element.creatorId?.name}
                      </h2>
                    </div>
                  </td>
                  <td>
                    <h2 className="text-sm font-medium capitalize text-textPrimary">
                      {formatRelativeDate(element.createdAt)}
                    </h2>
                  </td>
                  <td>
                    <button
                      className={`w-[80px] p-2 text-white uppercase text-xs rounded-2xl ${Priority(
                        element.priority
                      )}`}
                    >
                      {element.priority}
                    </button>
                  </td>
                  <td className="overflow-show">
                    <div className="relative top-0">
                      <DotOptions
                        horizontal={false}
                        options={[
                          {
                            name: element.closed ? "Open" : "Close",
                            function: () =>
                              handleOpenCloseTicket({
                                ticketId: element._id,
                                closed: !element.closed,
                              }),
                          },
                          {
                            name: "delete",
                            textStyle: "text-red",
                            function: () => handleDeleteTicket(element._id),
                          },
                        ]}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}

      {!(tickets.length > 0) && shouldRender && (
        <div className="w-full min-h-[250px] text-center flex flex-col">
          <div className="w-48 rounded-full aspect-square bg-dark/5 mx-auto flex justify-center items-center">
            <TbMoodEmpty className="h-40 w-40 text-orange" />
          </div>
          <h2 className="text-xl font-semibold mt-4 text-textPrimary">
            You don't have any tickets yet
          </h2>
          <h4 className="text-sm font-light mt-2 text-textPrimary">
            Start by creating a new one
          </h4>

          <Link
            to="/newticket"
            state={{ id: location.state?.id, prevPath: location.pathname }}
          >
            <button className="w-[140px] p-2 bg-green hover:bg-green/70 transition-colors rounded-md mt-4">
              New Ticket
            </button>
          </Link>
        </div>
      )}
    </Page>
  );
};
export default Tickets;
