import { Link } from "react-router-dom";

type Props = {};

const TopSupervisors = ({ session, data }: any) => {
  return (
    <div className="gridElem">
      <h2 className="font-bold text-lg text-textPrimary">Top Supervisors</h2>

      <div className="flex flex-col mt-4 space-y-2 ">
        {data &&
          data.map((element: any, index: any) => {
            if (index < 6) {
              return (
                <div className="w-full flex flex-row justify-between border-b border-dark/10 last:border-b-0 py-2">
                  <Link to={`/user/${element.supervisor._id}`}>
                    <div className="flex flex-row space-x-4 group">
                      <img
                        src={element.supervisor.profileImage}
                        className="w-8 h-8 rounded-full"
                        alt=""
                      />
                      <div className="flex flex-col ">
                        <h3 className="text-white font-bold text-sm cursor-pointer  group-hover:text-green transition-colors ">
                          {element.supervisor.name}
                        </h3>

                        <h5 className="text-textPrimary text-xs">
                          {element.supervisor.email}
                        </h5>
                      </div>
                    </div>
                  </Link>
                  <div className="font-bold text-white">
                    {element.nbrOfTickets}
                  </div>
                </div>
              );
            }
          })}
      </div>
    </div>
  );
};
export default TopSupervisors;
