import axios from "axios";
const url = process.env.REACT_APP_BACKEND_URL;

const getDashboardData = async ({ projectId, session, name }: any) => {
  try {
    const response = await axios.get(
      `${url}/api/dashboard/${projectId}/${name}`,
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

export { getDashboardData };
