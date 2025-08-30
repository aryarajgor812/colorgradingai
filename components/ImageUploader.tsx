import React, { useCallback, useRef } from 'react';
import { UploadIcon } from './icons/UploadIcon';

interface ImageUploaderProps {
  onImageUpload: (file: File) => void;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onImageUpload(file);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    const file = event.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      onImageUpload(file);
    }
  }, [onImageUpload]);

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  return (
    <div
      className="w-full h-full flex items-center justify-center p-4"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      <div
        onClick={handleClick}
        className="w-full max-w-2xl h-80 flex flex-col items-center justify-center bg-white/5 border-2 border-dashed border-gray-600 rounded-2xl cursor-pointer hover:bg-white/10 hover:border-cyan-400 transition-all duration-300 backdrop-blur-sm"
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          accept="image/png, image/jpeg, image/webp"
        />
        <UploadIcon className="w-16 h-16 text-gray-400 mb-4" />
        <p className="text-gray-200 text-xl font-semibold">Drag & drop your image here</p>
        <p className="text-gray-400 text-lg mt-2">or <span className="text-cyan-400 font-medium">click to browse</span></p>
        <p className="text-gray-500 text-sm mt-4">Supports PNG, JPG, and WEBP files</p>
      </div>
    </div>
  );
};