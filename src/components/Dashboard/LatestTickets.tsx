import { Link } from "react-router-dom";

type Props = {};
const LatestTickets = ({ data }: any) => {
  return (
    <div className="gridElem">
      <div className="border border-white/20 rounded-md w-full">
        <div className="p-6 flex flex-row items-center justify-between">
          <h2 className="text-lg font-bold text-textPrimary capitalize ">
            Latest Tickets
          </h2>
          <Link to="/tickets" state={{ id: "" }}>
            <h4 className="text-sm text-orange font-bold cursor-pointer hover:text-orange/70">
              View Details
            </h4>
          </Link>
        </div>
        {data &&
          data.map((ticket: any) => (
            <>
              <hr className="text-white/10" />
              <div className="w-full py-4 px-8">
                <Link to="/ticket" state={{ ticketId: ticket._id }}>
                  <div className="flex flex-row items-center relative">
                    <div className="text-white text-xs font-semibold text-ellipsis whitespace-nowrap overflow-hidden hover:text-green transition-colors">
                      {ticket.title}
                    </div>
                    <div className="absolute right-0 text-xs text-white/80">{`#${ticket.index}`}</div>
                  </div>
                </Link>
              </div>
            </>
          ))}
      </div>
    </div>
  );
};
export default LatestTickets;
