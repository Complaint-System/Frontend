type Props = {};
const SelectProject = ({ setOption, setProjectId, option, projects }: any) => {
  return (
    <div
      onClick={() => setOption((prev: any) => !prev)}
      className={`select-none  w-[300px] bg-orange relative ${
        option ? "rounded-t-md" : "rounded-md"
      } z-40`}
    >
      <div className=" w-full h-fit  cursor-pointer border-2 hover:bg-blue/10 transition-colors border-white/10 text-dark rounded-md p-2 font-bold text-sm text-center ">
        Select Project
      </div>
      <div className="overflow-auto max-h-[250px] w-full  drop-shadow-lg absolute top-[39px] left-0 bg-bgSecondary">
        {option &&
          projects.length > 0 &&
          projects.map((element: any) => (
            <div
              className="w-full border-b text-textPrimary border-dark/10 py-3 px-2 truncate cursor-pointer text-center capitalize hover:bg-blue/10 transition-colors"
              onClick={() => setProjectId(element._id)}
            >
              {element.name}
            </div>
          ))}
        {option && !(projects.length > 0) && (
          <div className="w-full border-b border-dark/10 py-3 px-2 truncate cursor-pointer text-center capitalize hover:bg-blue/10 transition-colors">
            No projects
          </div>
        )}
      </div>
    </div>
  );
};
export default SelectProject;
