type Props = {};
const PasswordForm = ({ register }: any) => {
  return (
    <form>
      <div className="space-y-1">
        <label className="uppercase text-xs font-bold ">Current Password</label>
        <input
          type="text"
          className="text-sm border-dark/5 w-full px-4 py-2 bg-lightGrey/50 rounded-md border-lig border-2 disabled:text-dark/40 disabled:text-sm font-light"
          {...register("phone", { required: true })}
        />
      </div>
      <div className="space-y-1">
        <label className="uppercase text-xs font-bold ">New Password</label>
        <input
          type="text"
          className="text-sm border-dark/5 w-full px-4 py-2 bg-lightGrey/50 rounded-md border-lig border-2 disabled:text-dark/40 disabled:text-sm font-light"
          {...register("phone", { required: true })}
        />
      </div>
    </form>
  );
};
export default PasswordForm;
