import { useContext, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";

import { createTicket } from "../Api/Ticket";

import Page from "../layout/Page";
import { BiImage } from "react-icons/bi";
import { IoMdAttach } from "react-icons/io";
import { useAuth } from "../context/AuthProvider";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Spinner from "../components/util/Spinner";
import Input2 from "../components/util/Input2";
import { AppContext } from "../context/AppProvider";

type Props = {
  projectName?: string;
};

const CreateTicket = ({ projectName }: Props) => {
  const { register, handleSubmit } = useForm({});
  const location = useLocation();
  const navigate = useNavigate();
  const { setLoading } = useContext(AppContext);
  const { session } = useAuth();
  const { ref, ...rest } = register("priority");
  const selectRef = useRef<HTMLSelectElement | null>(null);

  const handleColor = (priority: string) => {
    if (priority === "High") return "#F12B2C";
    if (priority === "Medium") return "#cca010";
    if (priority === "Low") return "#1DBF82";
    return "";
  };
  const onPriorityChange = (event: any): any => {
    if (selectRef.current) {
      selectRef.current.style.borderColor = handleColor(event.target.value);
    }
  };

  const onSubmit = async ({ priority, description, title }: any) => {
    setLoading(true);
    await createTicket({
      projectId: location.state.id,
      title,
      description,
      priority,
      session,
    });
    setLoading(false);
    navigate(location.state.prevPath, {
      state: {
        id: location.state.id,
      },
    });
  };

  return (
    <Page title="create">
      <h2 className=" capitalize text-textPrimary text-lg font-bold">
        Ticket details
      </h2>
      <hr className="mt-2 text-gray/20" />

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mt-10 space-y-4">
          <Input2
            labelTitle="Write the ticket details below"
            required={true}
            registerTitle="title"
            placeholder="Title"
            register={register}
          />
          <div className=" flex flex-col w-full min-h-[150px] rounded-md overflow-hidden border-2 border-white/20 group  focus-within:border-green transition-colors duration-300">
            <textarea
              placeholder="Description"
              className="w-full flex-1 px-4 py-2 bg-gray/20 placeholder:text-sm font-light text-white"
              {...register("description", { required: false })}
            ></textarea>
            <div className=" bg-gray/20 bottom-0 left-0 w-full h-fit px-4 py-2 text-left flex flex-row space-x-4">
              <BiImage className="w-fit h-6 text-gray/60 cursor-pointer" />
              <IoMdAttach className="w-fit h-6 text-gray/60 cursor-pointer" />
            </div>
          </div>

          <select
            className="px-2 py-1 bg-dark text-white border-b-2 transition-all text-center border-red"
            {...rest}
            name="priority"
            ref={(e) => {
              ref(e);
              selectRef.current = e; // you can still assign to ref
            }}
            onChange={onPriorityChange}
          >
            <option className="" value="High" color="red">
              High
            </option>
            <option value="Medium" color="yellow">
              Medium
            </option>
            <option value="Low" color="green">
              Low
            </option>
          </select>
        </div>

        <hr className="mt-8 text-gray/20" />
        <div className=" pt-4 space-x-2 text-right">
          <Link to={location.state.prevPath} state={{ id: location.state.id }}>
            <button className=" rounded-md text-white border-white border transition-all w-28 px-4 py-2 text-center hover:bg-white/10">
              Cancel
            </button>
          </Link>
          <button
            className=" rounded-md bg-green hover:bg-darkGreen transition-all w-28 px-4 py-2 text-center text-white"
            type="submit"
          >
            Confirm
          </button>
        </div>
      </form>
    </Page>
  );
};
export default CreateTicket;
