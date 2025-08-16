import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-blue-500">
        <div className='w-15 h-15 rounded-full animate-ping bg-teal-400'></div>
      </div>
    </div>
  );
};

export default LoadingSpinner;