import React, { useState } from 'react';
import SplashScreen from './components/SplashScreen';
import { Header } from './components/Header';
import { PromptPanel } from './components/PromptPanel';
import { gradeImage } from './services/geminiService';
import { ImageUploader } from './components/ImageUploader';
import Loader from './components/Loader';
import { DownloadIcon } from './components/icons/DownloadIcon';
import { ResetIcon } from './components/icons/ResetIcon';

interface ImageData {
  base64: string;
  mimeType: string;
}

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [originalImage, setOriginalImage] = useState<ImageData | null>(null);
  const [gradedImage, setGradedImage] = useState<string | null>(null);
  const [prompt, setPrompt] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = (reader.result as string).split(',')[1];
      setOriginalImage({
        base64: base64String,
        mimeType: file.type,
      });
      setGradedImage(null);
      setError(null);
    };
    reader.readAsDataURL(file);
  };
  
  const handleReset = () => {
      setOriginalImage(null);
      setGradedImage(null);
      setPrompt('');
      setError(null);
  };

  const handleDownload = () => {
    if (!gradedImage) return;
    const link = document.createElement('a');
    link.href = gradedImage;
    link.download = 'graded_image.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSubmit = async () => {
    if (!originalImage || !prompt) return;

    setIsLoading(true);
    setError(null);
    setGradedImage(null);

    try {
      const newGradedImage = await gradeImage(originalImage.base64, originalImage.mimeType, prompt);
      setGradedImage(`data:image/png;base64,${newGradedImage}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  if (showSplash) {
    return <SplashScreen onFinished={() => setShowSplash(false)} />;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 flex flex-col selection:bg-cyan-500/30">
      <div 
        className="fixed inset-0 w-full h-full bg-cover bg-center -z-10 opacity-20"
        style={{backgroundImage: 'url(https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=3200)'}}
      ></div>
      <div className="fixed inset-0 w-full h-full bg-gradient-to-b from-gray-900/50 to-gray-800/20 -z-10"></div>
      
      <Header />

      <main className="flex-grow flex flex-col items-center justify-center p-4 pt-20">
        {!originalImage ? (
          <ImageUploader onImageUpload={handleImageUpload} />
        ) : (
          <div className="w-full h-full max-w-7xl grid grid-cols-1 lg:grid-cols-5 gap-6">
            {/* Left Panel: Original Image */}
            <div className="lg:col-span-3 flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold font-playfair text-gray-100">Original</h2>
                <button onClick={handleReset} className="flex items-center gap-2 px-3 py-1.5 text-sm bg-gray-700/50 hover:bg-red-500/20 border border-gray-600 hover:border-red-500 rounded-md transition-all duration-200">
                  <ResetIcon className="w-4 h-4" />
                  Change Image
                </button>
              </div>
              <div className="w-full flex-grow bg-black/30 rounded-2xl overflow-hidden flex items-center justify-center p-2 border border-gray-700/80 backdrop-blur-sm">
                <img src={`data:${originalImage.mimeType};base64,${originalImage.base64}`} alt="Original" className="max-w-full max-h-[70vh] object-contain rounded-lg" />
              </div>
            </div>

            {/* Right Panel: Controls & Graded Image */}
            <div className="lg:col-span-2 flex flex-col gap-6">
              <PromptPanel prompt={prompt} setPrompt={setPrompt} onSubmit={handleSubmit} isLoading={isLoading} />
              
              <div className="flex flex-col gap-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-bold font-playfair text-gray-100">Color Graded</h2>
                  {gradedImage && (
                    <button onClick={handleDownload} className="flex items-center gap-2 px-3 py-1.5 text-sm bg-cyan-600/30 hover:bg-cyan-600/50 border border-cyan-500 rounded-md transition-all duration-200">
                      <DownloadIcon className="w-4 h-4" />
                      Download
                    </button>
                  )}
                </div>
                <div className="w-full h-64 bg-black/30 rounded-2xl overflow-hidden flex items-center justify-center p-2 border border-gray-700/80 backdrop-blur-sm relative">
                    {isLoading && <Loader />}
                    {gradedImage ? (
                        <img src={gradedImage} alt="Color Graded" className="max-w-full max-h-full object-contain rounded-lg" />
                    ) : (
                        <div className="text-gray-500 text-center">
                            <p>Your graded image will appear here</p>
                            {error && <p className="text-red-400 mt-2 text-sm"><strong>Error:</strong> {error}</p>}
                        </div>
                    )}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;