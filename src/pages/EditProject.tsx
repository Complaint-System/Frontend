import { useState, useEffect, useContext } from "react";
import { useAuth } from "../context/AuthProvider";
import { useLocation, useNavigate } from "react-router-dom";
import Page from "../layout/Page";

import Spinner from "../components/util/Spinner";
import { fetchProjects, getProject } from "../Api/Project";

import { useForm } from "react-hook-form";
import General from "../components/ProjectSettings/General";
import Options from "../components/ProjectSettings/Options";
import Supervisors from "../components/ProjectSettings/Supervisors";
import { AppContext } from "../context/AppProvider";

type Project = {
  name: string;
  image: string;
  description: string;
  ownerName: string;
  supervisors: string[];
};

const EditProjext = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const id = location.state?.id || null;
  const { session } = useAuth();
  const [project, setProject] = useState<any>({});
  const [error, setError] = useState(false);
  const { setLoading } = useContext(AppContext);
  const [tab, setTab] = useState(0);

  const fetchProject = async () => {
    if (!id) navigate("/");
    setLoading(true);
    getProject({ id, session })
      .then((res) => {
        if (res.error) {
          setError(true);
          return;
        }
        console.log(res.data);
        setProject(res.data);
      })
      .then(() => setLoading(false));
  };

  useEffect(() => {
    fetchProject();
  }, []);

  return (
    <Page title="settings">
      <div className="mx-auto flex flex-row h-[500px] w-full">
        <Options id={id} setLoading={setLoading} setTab={setTab} />
        <div className="w-full px-4">
          {tab === 0 && (
            <General
              id={id}
              project={project}
              setLoading={setLoading}
              fetchProject={fetchProject}
            />
          )}
          {tab === 1 && <Supervisors id={id} setLoading={setLoading} />}
        </div>
      </div>
    </Page>
  );
};
export default EditProjext;
