import axios from "axios";
import { Navigate } from "react-router-dom";

const verifyToken = async (token: any, logout: any) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/verifyToken`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    logout();
  }
};

const LoginHandle = async ({
  username,
  password,
  redirectedPath,
  navigate,
  setAuth,
}: any) => {
  try {
    const response = await axios({
      method: "post",
      url: `${process.env.REACT_APP_BACKEND_URL}/auth/login`,
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        username: username,
        password: password,
      },
    });

    const data = {
      token: response.data.token,
      user: response.data.user,
    };
    console.log(response.data);
    setAuth(data);
    return {
      message: "Successfuly Connected",
      error: false,
      status: response.status,
    };
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error("Error status:", error.response.data);
      return {
        message: error.response.data.message,
        status: error.response.status,
        error: true,
      };
    } else {
      console.error("Unknown error:", error);
      return { message: "Unknown error", status: 500, error: true };
    }
  }
};

export { LoginHandle, verifyToken };
