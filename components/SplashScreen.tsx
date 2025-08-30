
import React, { useState, useEffect } from 'react';

interface SplashScreenProps {
  onFinished: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onFinished }) => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setStep(1), 500),      // Fade in first text
      setTimeout(() => setStep(2), 2500),     // Fade out first text
      setTimeout(() => setStep(3), 3000),     // Fade in second text
      setTimeout(() => setStep(4), 5000),     // Fade out second text
      setTimeout(() => onFinished(), 5500),  // Finish splash
    ];

    return () => timers.forEach(clearTimeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getOpacity = (fadeInStep: number, fadeOutStep: number) => {
    return step === fadeInStep ? 'opacity-100' : (step === fadeOutStep ? 'opacity-0' : 'opacity-0');
  };

  return (
    <div className="fixed inset-0 bg-gray-900 flex flex-col items-center justify-center z-50 text-white font-orbitron">
      <div className={`transition-opacity duration-1000 text-center ${getOpacity(1, 2)}`}>
        <p className="text-2xl md:text-4xl tracking-widest text-cyan-300">Created by</p>
        <h1 className="text-4xl md:text-6xl font-bold mt-2">CosmicEternity Acceleration Labs</h1>
      </div>
      <div className={`transition-opacity duration-1000 text-center ${getOpacity(3, 4)}`}>
        <p className="text-xl md:text-3xl text-fuchsia-300">Founder</p>
        <h2 className="text-3xl md:text-5xl font-bold mt-2">ARYA RAJGOR</h2>
      </div>
    </div>
  );
};

export default SplashScreen;
