import React, { useState, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import { RefreshCw, Book } from 'lucide-react';
import QuoteSkeleton from './QuoteSkeleton';
import bgImage from '../assets/bg.png'

const QuoteDisplay: React.FC = () => {
  const { 
    currentQuote, 
    selectedMood, 
    fetchNewQuote, 
    setShowMoodSelector,
    selectedLanguage,
    setSelectedLanguage,
    error,
    isLoading
  } = useAppContext();
  
  const [fadeIn, setFadeIn] = useState(false);
  const [showTranslation, setShowTranslation] = useState(false);
  
  const languages = [
    { id: 'hindi', name: 'Hindi' },
    { id: 'spanish', name: 'Spanish' },
    { id: 'german', name: 'German' },
    { id: 'french', name: 'French' }
  ];

  useEffect(() => {
    if (currentQuote) {
      setFadeIn(true);
      setShowTranslation(false);
      
      if (selectedLanguage) {
        const timer = setTimeout(() => {
          setShowTranslation(true);
        }, 700);
        return () => clearTimeout(timer);
      }
    }
  }, [currentQuote, selectedLanguage]);

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as any;
    setSelectedLanguage(value === '' ? null : value);
  };

  const handleNewQuote = () => {
    setFadeIn(false);
    setTimeout(() => {
      fetchNewQuote();
    }, 300);
  };

  const handleChangeMood = () => {
    setFadeIn(false);
    setTimeout(() => {
      setShowMoodSelector(true);
    }, 300);
  };

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4 max-w-lg">
          <div className="flex">
            <div className="ml-3">
              <p className="text-red-700">
                {error === 'Gemini API key not found'
                  ? 'Please set up your Gemini API key to generate unique quotes.'
                  : 'An error occurred while fetching the quote. Please try again.'}
              </p>
            </div>
          </div>
        </div>
        <button
          onClick={() => setShowMoodSelector(true)}
          className="bg-amber-700 text-white px-6 py-3 rounded-md hover:bg-amber-800 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!currentQuote || !selectedMood) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <button
          onClick={() => setShowMoodSelector(true)}
          className="bg-amber-700 text-white px-6 py-3 rounded-md hover:bg-amber-800 transition-colors"
        >
          Choose Your Mood
        </button>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div>
        <div className="mb-4 flex flex-col sm:flex-row items-start justify-between">
          <div className="mb-4 sm:mb-0">
            <div className="text-amber-100 mb-1 font-cinzel font-semibold">Your Current Mood</div>
            <div className="inline-block bg-amber-100 text-amber-800 px-3 py-1 rounded-md">
              {selectedMood.name}
            </div>
          </div>
          
          <div className="flex space-x-2">
            <button
              onClick={handleChangeMood}
              className="flex items-center rounded-md bg-amber-700 hover:bg-amber-800 text-white px-3 py-1.5 transition-colors"
            >
              <Book size={16} className="mr-1.5" />
              Change Mood
            </button>
            
            <button
              onClick={handleNewQuote}
              className="flex items-center rounded-md bg-amber-700 hover:bg-amber-800 text-white px-3 py-1.5 transition-colors"
            >
              <RefreshCw size={16} className="mr-1.5" />
              New Quote
            </button>
          </div>
        </div>
        <QuoteSkeleton />
      </div>
    );
  }

  return (
    <div className={`transition-opacity duration-500 ${fadeIn ? 'opacity-100' : 'opacity-0'}`}>
      <div className="mb-4 flex flex-col sm:flex-row items-start justify-between">
        <div className="mb-4 sm:mb-0">
          <div className="text-amber-100 mb-1 font-cinzel font-semibold">Your Current Mood</div>
          <div className="inline-block bg-amber-100 text-amber-800 px-3 py-1 rounded-md">
            {selectedMood.name}
          </div>
        </div>
        
        <div className="flex space-x-2">
          <button
            onClick={handleChangeMood}
            className="flex items-center rounded-md bg-amber-700 hover:bg-amber-800 text-white px-3 py-1.5 transition-colors"
          >
            <Book size={16} className="mr-1.5" />
            Change Mood
          </button>
          
          <button
            onClick={handleNewQuote}
            className="flex items-center rounded-md bg-amber-700 hover:bg-amber-800 text-white px-3 py-1.5 transition-colors"
          >
            <RefreshCw size={16} className="mr-1.5" />
            New Quote
          </button>
        </div>
      </div>
      
      <div className="relative rounded-lg overflow-hidden shadow-xl" 
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-amber-900 bg-opacity-60"></div>
        
        <div className="relative p-4 md:p-6">
          {/* Sanskrit Text */}
          <div className="text-center mb-4">
            <h3 className="font-cinzel text-amber-200 text-sm sm:text-base mb-2">Sanskrit</h3>
            <blockquote 
              className="font-gentium text-sm sm:text-base md:text-lg lg:text-xl text-amber-50 leading-relaxed"
              dir="ltr"
            >
              {currentQuote.sanskrit.split('\n').map((line, i) => (
                <React.Fragment key={i}>
                  {line}
                  {i < currentQuote.sanskrit.split('\n').length - 1 && <br />}
                </React.Fragment>
              ))}
            </blockquote>
            
            <div className="mt-2 text-amber-200 text-xs">
              Chapter {currentQuote.chapter}, Verse {currentQuote.verse}
            </div>
          </div>
          
          {/* English Translation (Default) */}
          <div className="text-center mb-4">
            <h3 className="font-cinzel text-amber-200 text-sm sm:text-base mb-2">English</h3>
            <blockquote className="font-gentium text-sm sm:text-base md:text-lg text-amber-50 leading-relaxed">
              {currentQuote.translations.english}
            </blockquote>
          </div>
          
          {/* Additional Translations */}
          <div className="flex justify-center mb-3">
            <select
              value={selectedLanguage || ''}
              onChange={handleLanguageChange}
              className="bg-amber-700 bg-opacity-80 text-amber-100 py-1.5 px-3 rounded-md border-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm"
            >
              <option value="">Select Translation Language</option>
              {languages.map(lang => (
                <option key={lang.id} value={lang.id}>{lang.name}</option>
              ))}
            </select>
          </div>
          
          {selectedLanguage && (
            <div className={`text-center transition-opacity duration-500 ${showTranslation ? 'opacity-100' : 'opacity-0'}`}>
              <h3 className="font-cinzel text-amber-200 text-sm sm:text-base mb-2">{languages.find(l => l.id === selectedLanguage)?.name}</h3>
              <blockquote className="font-gentium text-sm sm:text-base md:text-lg text-amber-50 leading-relaxed">
                {currentQuote.translations[selectedLanguage]}
              </blockquote>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuoteDisplay;