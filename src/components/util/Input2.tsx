type Props = {
  placeholder: string;
  required: boolean;
  labelTitle: string;
  registerTitle: string;
  register: any;
  type?: string;
};
const Input1 = ({
  placeholder,
  required,
  labelTitle,
  registerTitle,
  register,
  type,
}: Props) => {
  return (
    <div className="space-y-1 w-full">
      <label className="text-gray text-xs uppercase font-bold pl-2">
        {labelTitle}
      </label>
      <input
        type={type}
        required={required}
        className="border-white/20 focus:border-green transition-colors duration-300 w-full px-4 py-2 bg-gray/20 rounded-md border-lig border-2 placeholder:text-sm font-light text-white"
        placeholder={placeholder}
        {...register(registerTitle, { required: required })}
      />
    </div>
  );
};
export default Input1;
