import React from 'react';

interface LoadingButtonProps {
  isLoading: boolean;
  onClick: (e: React.FormEvent) => void;
  loadingText: string;
  text: string;
  type?: 'button' | 'submit' | 'reset';
}

const LoadingButton: React.FC<LoadingButtonProps> = ({
  isLoading,
  onClick,
  loadingText,
  text,
  type = 'submit'
}) => {
  return (
    <button
      type={type}
      disabled={isLoading}
      onClick={onClick}
      className={`w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white ${
        isLoading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
      }`}
    >
      {isLoading ? (
        <>
          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          {loadingText}
        </>
      ) : (
        text
      )}
    </button>
  );
};

export default LoadingButton;