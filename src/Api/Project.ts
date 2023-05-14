import axios from "axios";
const url = process.env.REACT_APP_BACKEND_URL;

const fetchProjects = async ({ session, select }: any) => {
  const response = await axios({
    method: "get",
    url: `${url}/api/project`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session.token}`,
    },
    params: {
      select,
    },
  });
  return response.data;
};

const fetchProjectsNames = async ({ session, select }: any) => {
  const response = await axios({
    method: "get",
    url: `${url}/api/project`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session.token}`,
    },
    params: {
      select,
    },
  });
  return response;
};

const editProject = async ({ id, name, description, image, session }: any) => {
  try {
    const response = await axios({
      method: "put",
      url: `${url}/api/project/${id}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.token}`,
      },
      data: {
        name,
        description,
        image,
      },
    });
    return {
      error: false,
    };
  } catch (error) {
    console.log("error creating project", error);
    return {
      error: true,
    };
  }
};

const createProject = async ({ name, description, image, session }: any) => {
  try {
    const response = await axios({
      method: "post",
      url: `${url}/api/project`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.token}`,
      },
      data: {
        name,
        description,
        image: `https://picsum.photos/id/${Math.floor(
          Math.random() * 50
        )}/200/200`,
      },
    });
    console.log("Successfuly created new project: ", response);
    return {
      error: false,
    };
  } catch (error) {
    console.log("error creating project", error);
    return {
      error: true,
    };
  }
};

const getProject = async ({ id, session, select, populate }: any) => {
  try {
    const response = await axios.get(`${url}/api/project/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.token}`,
      },
      params: {
        select: select ? select : "-tickets",
        populate,
      },
    });
    return {
      data: response.data,
      error: false,
    };
  } catch (error) {
    return {
      error: true,
      message: error,
    };
  }
};

const deleteProject = async ({ id, session }: any) => {
  try {
    const response = await axios.delete(`${url}/api/project/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.token}`,
      },
    });
    return {
      error: false,
    };
  } catch (error) {
    return {
      error: true,
      message: error,
    };
  }
};

const getSupervisors = async ({ projectId, session }: any) => {
  try {
    const response = await axios.get(
      `${url}/api/project/${projectId}/supervisors`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.token}`,
        },
      }
    );
    return { error: false, data: response.data };
  } catch (error) {
    console.error(error);
    return { error: true, data: [] };
  }
};

const addSupervisor = async ({ supervisorId, projectId, session }: any) => {
  try {
    const response = await axios.post(
      `${url}/api/project/${projectId}/supervisors`,
      {
        supervisorId,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.token}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.error(error);
    return error;
  }
};

const removeSupervisor = async ({ supervisorId, projectId, session }: any) => {
  try {
    const response = await axios.delete(
      `${url}/api/project/${projectId}/supervisors`,
      {
        data: {
          supervisorId: supervisorId,
        },
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.token}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.error(error);
    return error;
  }
};

export {
  createProject,
  fetchProjects,
  editProject,
  getProject,
  deleteProject,
  addSupervisor,
  removeSupervisor,
  getSupervisors,
  fetchProjectsNames,
};
