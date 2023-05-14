import Page from "../layout/Page";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { BiImage } from "react-icons/bi";
import { IoMdAttach } from "react-icons/io";

import { useAuth } from "../context/AuthProvider";
import { getTicket, pushComment, deleteComment } from "../Api/Ticket";
import Spinner from "../components/util/Spinner";
import { formatRelativeDate } from "../util/Functions";

import { useForm } from "react-hook-form";

import { BsTrash } from "react-icons/bs";
import DotOptions from "../components/util/DotOptions";

type Props = {};
const Ticket = (props: Props) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { ticketId } = location?.state ?? {};
  const { session } = useAuth();
  const [loading, setLoading] = useState(false);
  const [ticket, setTicket] = useState<any>();
  const { register, handleSubmit, setValue } = useForm({});

  const fetchTicket = async () => {
    setLoading(true);
    await getTicket({ session, ticketId }).then((response) => {
      setTicket(response.ticket);
    });
    setLoading(false);
  };

  useEffect(() => {
    if (!ticketId) navigate("/");
    fetchTicket();
  }, []);

  const PushComment = async ({ text }: any) => {
    const response = await pushComment({ session, ticketId, text });
    if (response?.status === 200) {
      fetchTicket();
      setValue("text", "");
    } else {
      console.log("Error creating comment");
    }
  };

  const handleDeleteComment = async (commentId: any) => {
    const response = await deleteComment({ session, commentId });
    fetchTicket();
  };

  const Priority = (
    priority: "High" | "Medium" | "Low"
  ): string | undefined => {
    if (priority === "High") return "bg-red";
    if (priority === "Medium") return "bg-yellow";
    if (priority === "Low") return "bg-green";
  };

  return (
    <Page title="Ticket">
      {ticket && (
        <div className="">
          <div className=" relative">
            <h2 className="text-orange font-bold text-xl">{`#${ticket.index}`}</h2>

            <div className="absolute right-0 top-0 space-x-4">
              <div className="flex flex-row justify-center items-center space-x-4 right-0 top-0">
                <div className="flex flex-row justify-center items-center space-x-2">
                  <img
                    src={ticket?.creatorId.profileImage}
                    className="w-8 h-8 rounded-full"
                    alt=""
                  />
                  <span className="text-left text-white/50 text-xs ">
                    {ticket?.creatorId.name}
                  </span>
                </div>
                <div className="space-x-2 flex-center ">
                  <span className="text-white/50 text-xs ">Opened</span>
                  <span className="text-orange/50 text-xs">
                    {formatRelativeDate(ticket?.createdAt)}
                  </span>
                </div>
                <div className="space-x-2 flex-center">
                  <span className="text-white/50 text-xs ">Modified</span>
                  <span className="text-orange/50 text-xs">
                    {formatRelativeDate(ticket?.updatedAt)}
                  </span>
                </div>
              </div>
              <div>
                <button
                  className={`w-[80px] p-2 cursor-default mt-2 text-white absolute right-0 uppercase text-xs rounded-2xl ${Priority(
                    ticket.priority
                  )}`}
                >
                  {ticket.priority}
                </button>
              </div>
            </div>

            <div className="space-y-2 pt-8">
              <h4 className="text-xs font-bold text-orange/50 uppercase ">
                Title
              </h4>
              <h2 className="text-textPrimary font-bold text-lg">
                {ticket?.title}
              </h2>
            </div>

            <div className="mt-6">
              <h4 className="text-xs font-bold text-orange/50 uppercase ">
                Description
              </h4>
              <div className=" mt-4 w-full bg-gray/5 p-6 rounded-md break-words text-textPrimary">
                {ticket?.description}
              </div>
            </div>
          </div>

          <hr className="text-white/10 mt-4 " />
          <h2 className="text-textPrimary font-bold text-lg mt-4">
            Discussion (20)
          </h2>
          <div className="mt-4 flex flex-col w-full mx-auto min-h-[100px] rounded-md overflow-hidden border-2 border-dark/5 group  focus-within:border-green transition-colors duration-300">
            <textarea
              placeholder="Write a comment"
              className="w-full flex-1 px-4 py-2 bg-white/20 placeholder:text-sm font-light"
              {...register("text", {
                required: true,
                disabled: ticket.closed,
              })}
            ></textarea>
            <div className=" bottom-0 bg-white/20 left-0 w-full h-fit px-4 py-2 text-left flex flex-row space-x-4">
              <BiImage className="w-fit h-6 text-dark/60 cursor-pointer" />
              <IoMdAttach className="w-fit h-6 text-dark/60 cursor-pointer" />
            </div>
          </div>
          <div className="w-full mt-4 text-left">
            <button
              disabled={ticket.closed}
              className=" rounded-md disabled:bg-textPrimary bg-green hover:bg-darkGreen transition-all px-6 py-2 text-center text-white disabled:bg-dark/20"
              type="submit"
              onClick={handleSubmit(PushComment)}
            >
              Confirm
            </button>
          </div>

          <div className="flex flex-col justify-center items-center space-y-10 my-10">
            {ticket?.comments?.map((comment: any) => (
              <div className="w-full h-fit">
                <div className="relative w-full flex flex-row justify-start items-center space-x-2">
                  <img
                    className="rounded-full w-12 h-12 object-cover"
                    src={comment.creatorId.profileImage}
                    alt=""
                  />
                  <h4 className="text-md font-semibold text-textPrimary">
                    {comment.creatorId.name}
                  </h4>
                  <h4 className="text-xs text-white/50">
                    {formatRelativeDate(comment.createdAt)}
                  </h4>
                  <div className="relative top-0">
                    <DotOptions
                      horizontal={true}
                      options={[
                        { name: "Edit" },
                        {
                          name: "delete",
                          function: () => handleDeleteComment(comment._id),
                          textStyle: "text-red",
                        },
                      ]}
                    />
                  </div>
                </div>
                <div className="text-base mt-4 rounded-md text-textPrimary bg-white/10 w-full h-fit p-4">
                  {comment.text}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {loading && <Spinner color={"text-green"} />}
    </Page>
  );
};
export default Ticket;
