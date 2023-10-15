import clsx from 'clsx';

type ButtonTypes = {
  children: string;
  fullWidth?: boolean;
  secondary?: boolean;
};

const Button: React.FC<ButtonTypes> = ({ children, fullWidth, secondary }) => {
  return (
    <button
      className={clsx(
        `
        py-2
        px-2
        rounded-md
        font-semibold`,
        fullWidth && 'w-full',
        secondary
          ? 'bg-gray-50 text-gray-800'
          : 'bg-sky-500 text-gray-50 hover:bg-sky-600'
      )}>
      {children}
    </button>
  );
};

export default Button;
