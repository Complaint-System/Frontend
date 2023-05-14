type Props = {};
const Footer = ({
  update,
  setUpdate,
  handleSubmit,
  onSubmit,
  resetValues,
}: any) => {
  return (
    <div className="mt-10 w-full flex justify-center items-center">
      {!update ? (
        <>
          <button
            type="button"
            onClick={() => {
              setUpdate(true);
            }}
            className="w-[100px] p-2  bg-green border-2 text-xs text-dark font-bold rounded-md transition-all hover:bg-green/70"
          >
            Update
          </button>
        </>
      ) : (
        <div className="flex flex-row space-x-2">
          <button
            onClick={handleSubmit(onSubmit)}
            type="submit"
            className="w-[100px] p-2 bg-green text-xs text-white rounded-md transition-all hover:bg-darkGreen"
          >
            Confirm
          </button>
          <button
            onClick={() => {
              setUpdate(false);
              resetValues();
            }}
            type="button"
            className="w-[100px] p-2 bg-white/10 border-2 border-white/50 text-white hover:bg-white/20 text-xs rounded-md transition-all"
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};
export default Footer;
