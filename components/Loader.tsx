
import React from 'react';
import { SparklesIcon } from './icons/SparklesIcon';

const Loader: React.FC = () => {
  return (
    <div className="absolute inset-0 bg-black/70 backdrop-blur-sm flex flex-col items-center justify-center text-white z-20">
      <SparklesIcon className="w-16 h-16 text-cyan-400 animate-pulse" />
      <p className="mt-4 text-lg font-medium tracking-wider">Applying AI color grade...</p>
      <p className="text-sm text-gray-400">This may take a moment.</p>
    </div>
  );
};

export default Loader;
