import React, { ReactNode } from "react";

interface PageTitleProps {
  children: ReactNode;
}

const PageTitle: React.FC<PageTitleProps> = ({ children }) => {
  return (
    <h1 className="text-2xl font-bold text-gray-900 mb-2">{children}</h1>
  );
};

export default PageTitle;