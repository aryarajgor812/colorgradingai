
import React from 'react';
import { ImageUploader } from './ImageUploader';
import Loader from './Loader';

interface ImageViewerProps {
  originalImage: string | null;
  gradedImage: string | null;
  isLoading: boolean;
  onImageUpload: (file: File) => void;
}

export const ImageViewer: React.FC<ImageViewerProps> = ({
  originalImage,
  gradedImage,
  isLoading,
  onImageUpload,
}) => {
  if (!originalImage) {
    return <ImageUploader onImageUpload={onImageUpload} />;
  }

  return (
    <div className="w-full h-full flex-grow p-4 md:p-6 relative">
      {isLoading && <Loader />}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 h-full">
        <div className="flex flex-col items-center">
          <h3 className="text-lg font-semibold text-gray-300 mb-3">Original</h3>
          <div className="w-full h-full bg-gray-900/50 rounded-xl overflow-hidden flex items-center justify-center p-2 border border-gray-700/60">
            <img src={originalImage} alt="Original" className="max-w-full max-h-full object-contain" />
          </div>
        </div>
        <div className="flex flex-col items-center">
          <h3 className="text-lg font-semibold text-gray-300 mb-3">Color Graded</h3>
          <div className="w-full h-full bg-gray-900/50 rounded-xl overflow-hidden flex items-center justify-center p-2 border border-gray-700/60">
            {gradedImage ? (
              <img src={gradedImage} alt="Color Graded" className="max-w-full max-h-full object-contain" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-500">
                Your graded image will appear here
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
