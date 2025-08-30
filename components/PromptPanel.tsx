import React from 'react';
import { MOVIE_STYLE_PROMPTS } from '../constants';
import type { PresetPrompt } from '../types';
import { SparklesIcon } from './icons/SparklesIcon';

interface PromptPanelProps {
  prompt: string;
  setPrompt: (prompt: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

export const PromptPanel: React.FC<PromptPanelProps> = ({ prompt, setPrompt, onSubmit, isLoading }) => {
  const handlePresetClick = (presetPrompt: PresetPrompt) => {
    setPrompt(presetPrompt.prompt);
  };

  return (
    <div className="w-full h-full p-4 flex flex-col bg-gray-900/60 rounded-2xl border border-gray-700/80 backdrop-blur-md">
      <h2 className="text-xl font-bold font-playfair text-gray-100 mb-4">Describe Your Style</h2>
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="e.g., A moody, high-contrast black and white film noir look."
        className="w-full h-32 p-3 bg-gray-800/70 border border-gray-600 rounded-lg text-gray-200 placeholder-gray-500 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all duration-200 resize-none"
        disabled={isLoading}
      />
      
      <h3 className="text-lg font-semibold text-gray-200 mt-6 mb-3">Or try a preset...</h3>
      <div className="flex-grow overflow-y-auto pr-2 -mr-2">
          <div className="grid grid-cols-2 gap-2">
          {MOVIE_STYLE_PROMPTS.map((preset) => (
              <button
              key={preset.name}
              onClick={() => handlePresetClick(preset)}
              disabled={isLoading}
              className="p-2 text-sm text-left bg-gray-700/50 hover:bg-cyan-500/20 border border-transparent hover:border-cyan-500 rounded-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
              {preset.name}
              </button>
          ))}
          </div>
      </div>

      <button
        onClick={onSubmit}
        disabled={!prompt || isLoading}
        className="w-full mt-6 py-3 px-4 flex items-center justify-center bg-cyan-600 hover:bg-cyan-500 disabled:bg-gray-600 disabled:cursor-not-allowed rounded-lg text-white font-bold text-lg transition-all duration-300 transform hover:scale-105 disabled:scale-100"
      >
        <SparklesIcon className="w-6 h-6 mr-2" />
        {isLoading ? 'Generating...' : 'Apply Grade'}
      </button>
    </div>
  );
};