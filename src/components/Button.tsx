import React from 'react';

interface ButtonProps {
  className?: string;
  onClick: () => void;
  btnText: string;
}

const Button: React.FC<ButtonProps> = ({ className, onClick, btnText }) => {
  return (
    <button
      className={`px-3 py-1 md:px-4 md:py-2 rounded-full border font-semibold border-primary text-primary transition-all duration-200 ease-in-out
      hover:bg-primary hover:text-white hover:font-semibold
      focus:bg-primary-dark focus:outline-none ${className}`}
      onClick={onClick}
    >
      {btnText}
    </button>
  );
};

export default Button;
