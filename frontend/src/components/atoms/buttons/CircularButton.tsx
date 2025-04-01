import React from 'react';

type CircularButtonProps = {
  onClick?: (any: any) => void;
  icon?: React.ReactNode;
  ariaLabel?: string;
};

const CircularButton: React.FC<CircularButtonProps> = ({ 
  onClick, 
  icon, 
  ariaLabel 
}) => {
  return (
    <button
      onClick={onClick}
      aria-label={ariaLabel}
      className="
        flex items-center justify-center 
        w-12 h-12 rounded-full 
        bg-blue-500 text-white 
        hover:bg-blue-600 
        focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2
        transition-all duration-200
      "
    >
      {icon ? icon : '+'}
    </button>
  );
};

export default CircularButton;
