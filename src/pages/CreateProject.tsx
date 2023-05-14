import { RxCross2 } from "react-icons/rx";
import { useForm } from "react-hook-form";

import { useAuth } from "../context/AuthProvider";

import { createProject } from "../Api/Project";

import { useState } from "react";
import Page from "../layout/Page";
import { Link, useNavigate } from "react-router-dom";
import Input1 from "../components/util/Input1";
import TextArea from "../components/util/TextArea";

type Props = {};

const CreateProject = ({}: Props) => {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm({});
  const { session } = useAuth();
  const [err, setErr] = useState(false);

  const onSubmit = async ({ name, image, description }: any) => {
    const response = await createProject({ name, description, image, session });
    if (response.error) {
      setErr(true);
      return;
    }
    navigate("/");
  };

  return (
    <Page title="create">
      <div className="w-full h-20 border-b-2 border-dark/10 p-6 flex items-center ">
        <h3 className="text-md  font-bold text-green">Fill Project details</h3>

        <RxCross2
          className=" absolute right-10 scale-150 text-dark/70 cursor-pointer hover:text-dark transition-all"
          onClick={() => navigate("/")}
        />
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col p-6 space-y-6">
          <Input1
            labelTitle="Project Name"
            required={true}
            registerTitle="name"
            register={register}
          />
          <TextArea
            labelTitle="Project Description"
            required={true}
            registerTitle="description"
            register={register}
          />

          <Input1
            labelTitle="IMAGE URL"
            required={true}
            registerTitle="image"
            register={register}
          />
          <input type="file" className="text-textPrimary" />
        </div>
        <div className="w-full p-6 flex flex-row space-x-2 justify-end">
          <button
            className="rounded-md bg-green hover:bg-darkGreen transition-all w-28 px-4 py-2 text-center text-white"
            type="submit"
          >
            Confirm
          </button>
          <Link to="/">
            <button className="box-border rounded-md border-[1px] bg-lightGrey border-gray hover:bg-gray   transition-all w-28 px-4 py-2 text-center text-dark">
              Cancel
            </button>
          </Link>
        </div>
      </form>
    </Page>
  );
};
export default CreateProject;
