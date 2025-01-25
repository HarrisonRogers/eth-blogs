import React from 'react';

const Loader: React.FC = () => {
  return (
    <div className="flex justify-center h-[70vh]">
      <div className="relative">
        <div className="h-24 w-24 rounded-full border-t-8 border-b-8 border-primary" />
        <div className="absolute top-0 left-0 h-24 w-24 rounded-full border-t-8 border-b-8 border-primary animate-spin" />
      </div>
    </div>
  );
};

export default Loader;
