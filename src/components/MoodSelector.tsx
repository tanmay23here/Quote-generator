import React, { useState } from 'react';
import { Mood } from '../types/types';
import { useAppContext } from '../context/AppContext';
import { Settings } from 'lucide-react';

const MoodSelector: React.FC = () => {
  const { moods, setSelectedMood, showMoodSelector, setShowMoodSelector, fetchNewQuote, setShowSettings } = useAppContext();
  const [selectedMoodId, setSelectedMoodId] = useState<string | null>(null);
  
  const handleMoodSelect = (mood: Mood) => {
    setSelectedMoodId(mood.id);
  };

  const handleSubmit = () => {
    if (selectedMoodId) {
      const selectedMood = moods.find(mood => mood.id === selectedMoodId);
      if (selectedMood) {
        setSelectedMood(selectedMood);
        fetchNewQuote(selectedMoodId);
        setShowMoodSelector(false);
      }
    }
  };

  const handleSettingsClick = () => {
    setShowSettings(true);
    setShowMoodSelector(false);
  };

  if (!showMoodSelector) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-40">
      <div 
        className="bg-amber-50 rounded-lg p-6 max-w-md w-full mx-4 shadow-xl"
        style={{
          backgroundImage: 'linear-gradient(to bottom, rgba(254, 243, 199, 0.9), rgba(251, 191, 36, 0.2))',
          borderTop: '8px solid #92400e',
          boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.3)'
        }}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl sm:text-2xl font-cinzel text-amber-900 font-semibold">How are you feeling today?</h2>
          <button 
            onClick={handleSettingsClick}
            className="text-amber-700 hover:text-amber-900 transition-colors"
            title="Settings"
          >
            <Settings size={20} />
          </button>
        </div>
        
        <p className="text-sm sm:text-base text-amber-800 mb-6 font-gentium">Select your current mood to receive wisdom from the Bhagavad Gita that resonates with your state of mind.</p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
          {moods.filter(mood => mood.isActive).map((mood) => (
            <button
              key={mood.id}
              onClick={() => handleMoodSelect(mood)}
              className={`p-3 rounded-md text-left transition-all ${
                selectedMoodId === mood.id 
                  ? 'bg-amber-700 text-amber-50 shadow-md transform scale-105' 
                  : 'bg-amber-100 text-amber-800 hover:bg-amber-200'
              }`}
            >
              <div className="font-semibold mb-1 text-sm sm:text-base">{mood.name}</div>
              <div className="text-xs sm:text-sm opacity-90">{mood.description}</div>
            </button>
          ))}
        </div>
        
        <div className="flex justify-end">
          <button
            onClick={handleSubmit}
            disabled={!selectedMoodId}
            className={`px-5 py-2 rounded-md font-semibold transition-colors ${
              selectedMoodId 
                ? 'bg-amber-700 text-white hover:bg-amber-800' 
                : 'bg-amber-300 text-amber-700 cursor-not-allowed'
            }`}
          >
            Seek Wisdom
          </button>
        </div>
      </div>
    </div>
  );
};

export default MoodSelector;