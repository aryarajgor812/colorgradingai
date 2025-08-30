import React from 'react';
import { SparklesIcon } from './icons/SparklesIcon';

export const Header: React.FC = () => {
  return (
    <header className="w-full p-4 flex justify-center items-center absolute top-0 left-0 z-10">
      <SparklesIcon className="w-6 h-6 text-cyan-400 mr-3" />
      <h1 className="text-2xl md:text-3xl font-bold font-playfair text-gray-100 tracking-wide">
        AI Color Grader
      </h1>
    </header>
  );
};