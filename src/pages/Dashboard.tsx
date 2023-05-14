import Page from "../layout/Page";
import { useAuth } from "../context/AuthProvider";
import LatestTickets from "../components/Dashboard/LatestTickets";
import PriorityReport from "../components/Dashboard/PriorityReport";
import TopSupervisors from "../components/Dashboard/TopSupervisors";
import TicketsDateChart from "../components/Dashboard/TicketsDateChart";

import { dataConverter } from "../util/Functions";
import { getDashboardData } from "../Api/Dashboard";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppProvider";
import { fetchProjects, fetchProjectsNames, getProject } from "../Api/Project";

import { Location, useLocation, useNavigate } from "react-router-dom";
import SelectProject from "../components/Dashboard/SelectProject";

import { TfiDashboard } from "react-icons/tfi";

import selectDashboard from "../assets/select-db.gif";

type Props = {};
const Dashboard = (props: Props) => {
  const { session } = useAuth();
  const { setLoading } = useContext(AppContext);
  const [data1, setData1] = useState<any>(null);
  const [data2, setData2] = useState<any>(null);
  const [data3, setData3] = useState<any>(null);
  const [data4, setData4] = useState<any>(null);
  const [project, setProject] = useState<any>(null);
  const [projects, setProjects] = useState<any>(null);
  const [option, setOption] = useState<boolean>(false);
  const [shouldRender, setShouldRender] = useState(false);
  const location = useLocation();
  const [projectId, setProjectId] = useState(location.state?.projectId);

  const getTicketsDateData = async () => {
    let data = await getDashboardData({
      session,
      projectId,
      name: "tickets-report",
    })
      .then((res) => {
        let data = dataConverter(res.data);
        data = [...data].reverse();
        return data;
      })
      .catch((error) => {
        console.error(error);
        return null;
      });

    return data;
  };

  const fetchPriorityReport = async () => {
    const data = await getDashboardData({
      session,
      projectId,
      name: "priority-report",
    })
      .then((res) => {
        return {
          priority: [
            {
              name: "High",
              value: res.data.highCount,
            },
            {
              name: "Medium",
              value: res.data.mediumCount,
            },
            {
              name: "Low",
              value: res.data.lowCount,
            },
          ],
          status: {
            open: res.data.open,
            closed: res.data.closed,
          },
        };
      })
      .catch(() => {
        return null;
      });
    return data;
  };

  const fetchTopSupervisors = async () => {
    const data = await getDashboardData({
      session,
      projectId,
      name: "top-supervisors",
    })
      .then((res) => {
        if (res.data.length > 0) {
          let data = res.data.sort(
            (a: any, b: any) => b.nbrOfTickets - a.nbrOfTickets
          );
          return data;
        } else {
          return [];
        }
      })
      .catch(() => {
        return null;
      });
    return data;
  };

  const fetchLatestTickets = async () => {
    const data = await getDashboardData({
      session,
      projectId,
      name: "latest-tickets",
    })
      .then((res) => {
        return res.data;
      })
      .catch(() => {
        return null;
      });
    return data;
  };
  const fetchProject = async () =>
    await getProject({
      id: projectId,
      session,
      select: "name description image",
    })
      .then((res) => {
        return res.data;
      })
      .catch((err) => console.error(err));

  const fethData = async () => {
    setLoading(true);
    const responses = await Promise.all([
      getTicketsDateData(),
      fetchPriorityReport(),
      fetchLatestTickets(),
      fetchTopSupervisors(),
      fetchProject(),
    ]);

    setData1(responses[0]);
    setData2(responses[1]);
    setData3(responses[2]);
    setData4(responses[3]);
    setProject(responses[4]);
    setTimeout(() => {
      setShouldRender(true);
      setLoading(false);
    }, 1000);
    console.log(responses);
  };

  useEffect(() => {
    if (projectId) {
      fethData();
    }
  }, [projectId]);

  useEffect(() => {
    const getProjects = async () =>
      await fetchProjectsNames({
        session,
        select: "name",
      }).then((res) => setProjects(res.data));

    getProjects();
  }, []);

  return (
    <Page title="Dashboard">
      {project && shouldRender && (
        <div className="w-full relative rounded-t-md p-6 flex flex-row space-x-4 capitalize items-center">
          <img
            src={project.image}
            className="h-12 w-auto rounded-full"
            alt=""
          />
          <h2 className="text-lg font-bold text-textPrimary">{project.name}</h2>

          <div className="absolute right-6 top-6">
            <SelectProject
              option={option}
              setOption={setOption}
              projects={projects}
              setProjectId={setProjectId}
            />
          </div>
        </div>
      )}
      {data1 && data2 && data3 && data4 && shouldRender && (
        <div className="grid grid-cols-2 grid-row-2 justify-center rounded-b-md overflow-hidden">
          <TicketsDateChart data={data1} />
          <PriorityReport data={data2} />
          <LatestTickets data={data3} />
          <TopSupervisors data={data4} />
        </div>
      )}
      {!projectId && selectDashboard && (
        <div className="w-full p-8 flex justify-center items-center flex-col rounded-md space-y-4">
          <img src={selectDashboard} className="w-[240px] h-auto" alt="" />
          <SelectProject
            option={option}
            setOption={setOption}
            projects={projects}
            setProjectId={setProjectId}
          />
        </div>
      )}
    </Page>
  );
};
export default Dashboard;
