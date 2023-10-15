import { useForm } from 'react-hook-form';

type InputType = {
  name: 'name' | 'email' | 'password';
};

const Input: React.FC<InputType> = ({ name }) => {
  const { register } = useForm();

  return (
    <input
      {...register(name, { required: 'This field is required.' })}
      className='
              form-input
              rounded-md
              w-full
              '
      placeholder={name.charAt(0).toUpperCase() + name.slice(1)}
    />
  );
};

export default Input;
