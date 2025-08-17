import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-dashed rounded-full animate-spin border-blue-500">
        <div className='w-10 h-10 rounded-full animate-ping bg-teal-400'></div>
      </div>
    </div>
  );
};

export default LoadingSpinner;