import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthProvider";
import { useLocation } from "react-router-dom";
import { editProject } from "../../Api/Project";

import { useForm } from "react-hook-form";

type Props = {};
const General = ({ id, project, setLoading, fetchProject }: any) => {
  const { session } = useAuth();
  const { register, handleSubmit } = useForm({
    values: project,
  });

  const onSubmit = async ({ name, description, image }: any) => {
    setLoading(true);
    await editProject({ id, name, description, image, session });
    await fetchProject();
    setLoading(false);
  };

  return (
    <>
      <div className="w-32 h-32 mx-auto rounded-md overflow-hidden">
        <img src={project.image} alt="" />
      </div>
      <hr className="mt-10 opacity-10" />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col space-y-8 justify-center items-center mt-4"
      >
        <div className="flex-col space-y-1 w-full">
          <label className="text-sm font-bold text-textPrimary">Name</label>
          <input
            {...register("name", { required: true })}
            placeholder="Title"
            type="text"
            className=" w-full px-4 py-2 rounded-md bg-gray3 text-white/80 border-2 border-dark/20 placeholder:text-sm focus:border-green transition-colors duration-300 placeholder:text-gray/80 "
          />
        </div>
        <div className="flex-col space-y-1 w-full">
          <label className="text-sm font-bold text-textPrimary">
            Description
          </label>
          <textarea
            {...register("description", { required: true })}
            placeholder="description"
            className=" w-full min-h-[100px] bg-gray3 text-white/80 px-4 py-2 rounded-md border-2 border-dark/20 placeholder:text-sm focus:border-green transition-colors duration-300 placeholder:text-gray/80 resize-y "
          />
        </div>
        <button
          className="mt-4 rounded-md bg-green hover:bg-darkGreen transition-all w-28 px-4 py-2 text-center text-white"
          type="submit"
        >
          Save
        </button>
      </form>
    </>
  );
};
export default General;
