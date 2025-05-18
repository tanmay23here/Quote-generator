import React, { createContext, useContext, useState, useEffect } from 'react';
import { Quote, Mood, TranslationLanguage } from '../types/types';
import { fetchQuoteByMood } from '../services/api';
import { defaultMoods } from '../data/moods';

interface AppContextType {
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  showMoodSelector: boolean;
  setShowMoodSelector: React.Dispatch<React.SetStateAction<boolean>>;
  showSettings: boolean;
  setShowSettings: React.Dispatch<React.SetStateAction<boolean>>;
  currentQuote: Quote | null;
  selectedMood: Mood | null;
  setSelectedMood: React.Dispatch<React.SetStateAction<Mood | null>>;
  moods: Mood[];
  setMoods: React.Dispatch<React.SetStateAction<Mood[]>>;
  selectedLanguage: TranslationLanguage | null;
  setSelectedLanguage: React.Dispatch<React.SetStateAction<TranslationLanguage | null>>;
  fetchNewQuote: (moodId?: string) => Promise<void>;
  error: string | null;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [showMoodSelector, setShowMoodSelector] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const [currentQuote, setCurrentQuote] = useState<Quote | null>(null);
  const [selectedMood, setSelectedMood] = useState<Mood | null>(null);
  const [moods, setMoods] = useState<Mood[]>(defaultMoods);
  const [selectedLanguage, setSelectedLanguage] = useState<TranslationLanguage | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchNewQuote = async (moodId?: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const moodToUse = moodId || selectedMood?.id;
      if (!moodToUse) return;
      
      const quote = await fetchQuoteByMood(moodToUse);
      setCurrentQuote(quote);
    } catch (error: any) {
      console.error('Error fetching quote:', error);
      setError(error.message);
      if (error.message === 'Gemini API key not found') {
        setShowMoodSelector(false);
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Initial application loading simulation
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AppContext.Provider
      value={{
        isLoading,
        setIsLoading,
        showMoodSelector,
        setShowMoodSelector,
        showSettings,
        setShowSettings,
        currentQuote,
        selectedMood,
        setSelectedMood,
        moods,
        setMoods,
        selectedLanguage,
        setSelectedLanguage,
        fetchNewQuote,
        error,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};