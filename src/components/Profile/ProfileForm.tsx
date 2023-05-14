type Props = {};

const ProfileForm = ({ register, update, error }: any) => {
  return (
    <>
      <div className="mt-4 px-4 space-y-6">
        <div className="space-y-1">
          <label className="text-textPrimary uppercase text-xs font-bold ">
            Full Name
          </label>
          <input
            type="text"
            className="text-sm border-dark/5 w-full px-4 py-2 bg-gray3 text-white disabled:text-white/40 rounded-md border-lig border-2 disabled:text-sm font-light"
            {...register("name", { disabled: !update })}
          />
        </div>
        <div className="space-y-1">
          <label className="text-textPrimary uppercase text-xs font-bold ">
            Email
          </label>
          <input
            type="email"
            className="text-sm border-dark/5 w-full px-4 py-2 bg-gray3 text-white disabled:text-white/40 rounded-md border-lig border-2 disabled:text-sm font-light"
            {...register("email", { disabled: !update })}
          />
        </div>
        <div className="space-y-1">
          <label className="text-textPrimary uppercase text-xs font-bold ">
            Phone Number
          </label>
          <input
            type="text"
            className="text-sm border-dark/5 w-full px-4 py-2 bg-gray3 text-white disabled:text-white/40 rounded-md border-lig border-2 disabled:text-sm font-light"
            {...register("phone", { disabled: !update })}
          />
        </div>
        <div className="space-y-1">
          <label className="text-textPrimary uppercase text-xs font-bold ">
            Current Password
          </label>
          <input
            autoComplete="off"
            type="password"
            className="text-sm border-dark/5 w-full px-4 py-2 bg-gray3 text-white disabled:text-white/40 rounded-md border-lig border-2 disabled:text-sm font-light"
            {...register("currentPassword", { disabled: !update })}
          />
        </div>
        {error === "Wrong current" && (
          <span className="text-xs text-red mt-4">Wrong current password</span>
        )}
        <div className="space-y-1">
          <label className="text-textPrimary uppercase text-xs font-bold ">
            New Password
          </label>
          <input
            type="password"
            className="text-sm border-dark/5 autofill:bg-gray3 w-full px-4 py-2 bg-gray3 text-white disabled:text-white/40 rounded-md border-lig border-2 disabled:text-sm font-light"
            {...register("newPassword", { disabled: !update })}
          />
        </div>
        {error === "Short new" && (
          <span className="text-xs text-red mt-4">Short password</span>
        )}
      </div>
    </>
  );
};
export default ProfileForm;
