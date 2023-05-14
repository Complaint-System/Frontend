type Props = {
  placeholder?: string;
  required: boolean;
  labelTitle: string;
  registerTitle: string;
  register: any;
};
const TextArea = ({
  placeholder,
  required,
  labelTitle,
  registerTitle,
  register,
}: Props) => {
  return (
    <div className="space-y-1 w-full">
      <label className="text-gray text-xs uppercase font-bold pl-2">
        {labelTitle}
      </label>
      <textarea
        required={required}
        className="border-2 border-dark/5 focus:border-green transition-colors duration-300 w-full px-4 py-2 bg-lightGrey/80 rounded-md    placeholder:text-sm font-light "
        placeholder={placeholder}
        {...register(registerTitle, { required: required })}
      />
    </div>
  );
};
export default TextArea;
