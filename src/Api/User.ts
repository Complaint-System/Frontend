import axios from "axios";

const url = process.env.REACT_APP_BACKEND_URL;

const searchUser = async ({ searchQuery, session }: any) => {
  try {
    const result = await axios.get(`${url}/api/user/`, {
      params: { searchQuery: searchQuery },
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.token}`,
      },
    });
    return { error: false, data: result.data };
  } catch (error) {
    return { error: true, data: [] };
  }
};

const getMe = async ({ session }: any) => {
  try {
    const response = await axios.get(`${url}/api/user/me`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.token}`,
      },
    });
    return { error: false, data: response.data };
  } catch (err) {
    return { error: true, err, data: null };
  }
};

const updateMe = async ({ session, data }: any) => {
  try {
    const response = await axios.put(
      `${url}/api/user/me`,
      {
        data,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.token}`,
        },
      }
    );
    return { error: false, data: response.data };
  } catch (err) {
    return { error: true, message: err };
  }
};

const resetPassword = async ({
  session,
  currentPassword,
  newPassword,
}: any) => {
  try {
    if (
      (currentPassword.length == 0 && newPassword.length == 0) ||
      (!currentPassword && !newPassword)
    )
      return { error: false, message: "Empty password entries" };
    const response = await axios.put(
      `${url}/api/user/me/password`,
      {
        currentPassword,
        newPassword,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.token}`,
        },
      }
    );
    return {
      error: false,
      message: response.data.message,
    };
  } catch (error: any) {
    return {
      error: true,
      message: error.response.data.message,
    };
  }
};

const getUser = async ({ session, userId }: any) => {
  try {
    const response = await axios.get(`${url}/api/user/${userId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.token}`,
      },
    });
    return { error: false, data: response.data };
  } catch (err) {
    return { error: true, err, data: null };
  }
};
export { searchUser, getMe, updateMe, resetPassword, getUser };
