import React from 'react';

interface MilesPurchaseHeaderProps {
  title: string;
  subtitle: string;
}

const MilesPurchaseHeader: React.FC<MilesPurchaseHeaderProps> = ({ title, subtitle }) => {
  return (
    <div className="text-center mb-10">
      <h1 className="text-3xl font-extrabold text-gray-900">{title}</h1>
      <p className="mt-4 text-lg text-gray-600">{subtitle}</p>
    </div>
  );
};

export default MilesPurchaseHeader;