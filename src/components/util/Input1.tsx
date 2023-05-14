type Props = {
  placeholder?: string;
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
        className="border-dark/5 focus:border-green transition-colors duration-300 w-full px-4 py-2 bg-lightGrey/80 rounded-md border-lig border-2 placeholder:text-sm placeholder:text-dark placeholder:font-light"
        placeholder={placeholder}
        {...register(registerTitle, { required: required })}
      />
    </div>
  );
};
export default Input1;
