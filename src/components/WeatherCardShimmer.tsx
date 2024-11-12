import React from 'react';
import ShimmerLine from './ShimmerLine';

const WeatherCardShimmer: React.FC = () => {
  return (
    <div className="flex bg-gray-50 border rounded-md shadow-lg p-4 gap-4 animate-pulse">
      <div className="w-1/4 flex justify-center items-center">
        <div className="w-full h-auto bg-gray-200 rounded-md"></div>
      </div>

      <div className="w-full flex flex-col justify-start">
        <ShimmerLine className="w-3/5 h-6 mb-2" /> 
        <ShimmerLine className="w-2/5 h-4 mb-2" /> 
      </div>

      <div className="w-1/3 flex justify-end items-center">
        <ShimmerLine className="w-24 h-8 rounded-full" /> 
      </div>
    </div>
  );
};

export default WeatherCardShimmer;
