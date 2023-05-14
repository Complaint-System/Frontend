import axios from "axios";

const url = process.env.REACT_APP_BACKEND_URL;

const createTicket = async ({
  projectId,
  title,
  description,
  priority,
  session,
}: any) => {
  try {
    const response = await axios({
      method: "post",
      url: `${url}/api/ticket/${projectId}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.token}`,
      },
      params: {
        projectId,
      },
      data: {
        title,
        description,
        priority,
      },
    });
  } catch (error) {
    console.log("error creating project", error);
  }
};

const fetchTickets = async ({ session, projectId, setTickets }: any) => {
  try {
    const response = await axios({
      method: "get",
      url: `${url}/api/ticket/all/${projectId}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.token}`,
      },
    });
    return { data: response.data };
  } catch (error) {
    console.log(error);
    return {};
  }
};

const getTicket = async ({ ticketId, session }: any) => {
  try {
    const response = await axios.get(`${url}/api/ticket/${ticketId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

const deleteTicket = async ({ ticketId, session }: any) => {
  try {
    const response = await axios.delete(`${url}/api/ticket/${ticketId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

const updateTicket = async ({ ticketId, session, closed }: any) => {
  try {
    const response = await axios.put(
      `${url}/api/ticket/${ticketId}`,
      {
        closed,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

const pushComment = async ({ ticketId, session, text }: any) => {
  try {
    const response = await axios.post(
      `${url}/api/ticket/${ticketId}/comment`,
      { text },
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
  }
};

const deleteComment = async ({ commentId, session }: any) => {
  try {
    const response = await axios.delete(
      `${url}/api/ticket/comment/${commentId}`,
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
  }
};

export {
  createTicket,
  fetchTickets,
  getTicket,
  pushComment,
  deleteComment,
  deleteTicket,
  updateTicket,
};
