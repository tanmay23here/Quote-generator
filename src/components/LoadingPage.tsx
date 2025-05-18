import React, { useEffect, useState } from 'react';
import { useAppContext } from '../context/AppContext';
import '../styles/animations.css';

const LoadingPage: React.FC = () => {
  const { isLoading } = useAppContext();
  const [visible, setVisible] = useState(true);
  const [titleClass, setTitleClass] = useState('loading-title opacity-0');
  const [subtitleClass, setSubtitleClass] = useState('loading-subtitle opacity-0');

  useEffect(() => {
    // Start animations
    const titleTimer = setTimeout(() => {
      setTitleClass('loading-title animate-scroll-up');
    }, 300);

    const subtitleTimer = setTimeout(() => {
      setSubtitleClass('loading-subtitle animate-scroll-up');
    }, 800);

    // Handle exit animation
    if (!isLoading) {
      const exitTimer = setTimeout(() => {
        setVisible(false);
      }, 1000);
      return () => clearTimeout(exitTimer);
    }

    return () => {
      clearTimeout(titleTimer);
      clearTimeout(subtitleTimer);
    };
  }, [isLoading]);

  if (!visible) return null;

  return (
    <div 
      className={`fixed inset-0 flex flex-col items-center justify-center bg-amber-900 bg-opacity-90 z-50 transition-opacity duration-1000 ${
        isLoading ? 'opacity-100' : 'opacity-0'
      }`}
      style={{
        backgroundImage: 'url("/src/assets/bg.png")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundBlendMode: 'multiply',
      }}
    >
      <div className="text-center px-4">
        <h1 className={titleClass}>
          <span className="block text-4xl md:text-6xl font-cinzel text-amber-100 mb-4 font-bold">
            Random Quote Generator
          </span>
        </h1>
        <h2 className={subtitleClass}>
          <span className="block text-3xl md:text-5xl font-cinzel text-amber-200 font-semibold">
            Bhagavad Gita
          </span>
        </h2>
        <div className="mt-12 text-amber-200">
          <div className="loader"></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingPage;