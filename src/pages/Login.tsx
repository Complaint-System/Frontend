import { useEffect, useState } from "react";
import { useNavigate, useLocation, Navigate } from "react-router-dom";

import { useForm } from "react-hook-form";

import { useAuth } from "../context/AuthProvider";
import { LoginHandle } from "../Api/Login";

import LoginSpinner from "../components/util/LoginSpinner";
import Input1 from "../components/util/Input1";

import logo from "../assets/logo.png";

type Props = {};

const Login = (props: Props) => {
  const { setAuth, session } = useAuth();
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const location = useLocation();
  const [err, setErr] = useState({ error: false, message: "", status: 200 });
  const [loading, setLoading] = useState(false);
  const [shouldRender, setshouldRender] = useState(false);
  const [shakeAnim, setShakeAnim] = useState(false);

  const redirectedPath = location.state?.path || "/";

  const onSubmit = async ({ username, password }: any) => {
    // setLoading(true);
    const login = await LoginHandle({
      username,
      password,
      setAuth,
    });
    console.log("login: ", login);
    setErr(login);
    setTimeout(() => setLoading(false), 500);
    if (!login.error) {
      navigate("/", { replace: true });
    }
  };

  const handleError = () => {
    if (err.status == 400) {
      return err.message;
    }
    if (err.status == 401) {
      return err.message;
    } else return "Uknown error";
  };

  useEffect(() => {
    if (session) {
      navigate(redirectedPath, { replace: true });
    }
  }, []);

  useEffect(() => {
    setTimeout(() => setshouldRender(true), 500);
  }, []);

  useEffect(() => {
    if (err.error) {
      setShakeAnim(true);
      setTimeout(() => setShakeAnim(false), 500);
    }
  }, [err]);
  return (
    <>
      {shouldRender && (
        <div className="min-h-screen w-screen flex justify-center items-center pt-14 loginBg">
          <div
            className={`bg-bgPrimary drop-shadow-xl rounded-lg min-h-[50vh] max-w-[500px] w-[80vw] p-6 flex flex-col ${
              shakeAnim && "shake-horizontal"
            }`}
          >
            <img src={logo} className="w-48 m-auto" />
            <h1 className="text-black text-center font-bold text-xl mt-4 text-textPrimary">
              Log In
            </h1>
            <h5 className="text-gray text-xs text-center mt-2">
              Enter your email and password below
            </h5>

            <span
              className={`text-red my-3 self-center opacity-0 transition-all duration-400 font-bold ${
                err.error && "opacity-100"
              }`}
            >
              {handleError()}
            </span>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col justify-center items-center mt-10 space-y-8"
            >
              <Input1
                labelTitle="Username"
                required={true}
                registerTitle="username"
                placeholder="Username"
                register={register}
              />

              <Input1
                labelTitle="Password"
                required={true}
                registerTitle="password"
                placeholder="Password"
                register={register}
                type="Password"
              />

              <button
                className="rounded-md bg-green hover:bg-green/70 transition-colors w-full px-4 py-3 text-center text-white flex flex-row justify-center items-center"
                type="submit"
              >
                <span className="mr-4">Log In</span>

                {loading && <LoginSpinner color="text-white" />}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
export default Login;
