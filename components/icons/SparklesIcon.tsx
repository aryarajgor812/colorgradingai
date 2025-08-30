
import React from 'react';

export const SparklesIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path
      fillRule="evenodd"
      d="M9.315 7.584C12.195 3.883 16.695 1.5 21.75 1.5a.75.75 0 01.75.75c0 5.056-2.383 9.555-6.084 12.436A6.75 6.75 0 019.75 22.5a.75.75 0 01-.75-.75v-7.19c0-1.767-.933-3.351-2.343-4.145-1.409-.794-3.09.283-3.09 1.91V21a.75.75 0 01-1.5 0V14.249c0-2.43.986-4.717 2.723-6.388a.75.75 0 011.06 1.06A6.723 6.723 0 019.315 7.584z"
      clipRule="evenodd"
    />
  </svg>
);
