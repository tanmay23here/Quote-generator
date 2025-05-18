import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { X, Plus, Save } from 'lucide-react';
import { Mood } from '../types/types';

const Settings: React.FC = () => {
  const { moods, setMoods, showSettings, setShowSettings } = useAppContext();
  const [localMoods, setLocalMoods] = useState<Mood[]>([...moods]);
  const [newMood, setNewMood] = useState({ name: '', description: '' });
  const [showAddForm, setShowAddForm] = useState(false);

  const handleClose = () => {
    setShowSettings(false);
  };

  const handleSave = () => {
    setMoods(localMoods);
    setShowSettings(false);
  };

  const handleToggleActive = (id: string) => {
    setLocalMoods(
      localMoods.map(mood => 
        mood.id === id ? { ...mood, isActive: !mood.isActive } : mood
      )
    );
  };

  const handleAddNewMood = () => {
    if (newMood.name.trim() && newMood.description.trim()) {
      const id = newMood.name.toLowerCase().replace(/\s+/g, '-');
      setLocalMoods([
        ...localMoods,
        {
          id,
          name: newMood.name.trim(),
          description: newMood.description.trim(),
          isActive: true
        }
      ]);
      setNewMood({ name: '', description: '' });
      setShowAddForm(false);
    }
  };

  if (!showSettings) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div 
        className="bg-amber-50 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto mx-4 shadow-xl"
        style={{
          backgroundImage: 'linear-gradient(to bottom, rgba(254, 243, 199, 0.9), rgba(251, 191, 36, 0.2))',
          borderTop: '8px solid #92400e',
        }}
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl sm:text-2xl font-cinzel text-amber-900 font-semibold">Settings</h2>
            <button 
              onClick={handleClose}
              className="text-amber-700 hover:text-amber-900 transition-colors"
            >
              <X size={24} />
            </button>
          </div>
          
          <div className="mb-8">
            <h3 className="text-lg sm:text-xl font-cinzel text-amber-800 mb-4">Manage Mood Types</h3>
            <p className="text-sm sm:text-base text-amber-800 mb-6">Enable or disable mood types to personalize your experience.</p>
            
            <div className="space-y-4 mb-6">
              {localMoods.map((mood) => (
                <div 
                  key={mood.id} 
                  className={`p-4 rounded-md border ${
                    mood.isActive 
                      ? 'border-amber-300 bg-amber-100' 
                      : 'border-gray-300 bg-gray-100 opacity-70'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-amber-900 text-sm sm:text-base">{mood.name}</h4>
                      <p className="text-amber-700 text-xs sm:text-sm">{mood.description}</p>
                    </div>
                    <label className="inline-flex items-center cursor-pointer">
                      <span className="mr-3 text-xs sm:text-sm font-medium text-amber-700">
                        {mood.isActive ? 'Active' : 'Inactive'}
                      </span>
                      <div className="relative">
                        <input 
                          type="checkbox" 
                          checked={mood.isActive}
                          onChange={() => handleToggleActive(mood.id)}
                          className="sr-only" 
                        />
                        <div className={`w-11 h-6 rounded-full transition ${mood.isActive ? 'bg-amber-600' : 'bg-gray-400'}`}></div>
                        <div 
                          className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${
                            mood.isActive ? 'transform translate-x-5' : ''
                          }`}
                        ></div>
                      </div>
                    </label>
                  </div>
                </div>
              ))}
            </div>
            
            {showAddForm ? (
              <div className="p-4 rounded-md border border-amber-300 bg-amber-100">
                <h4 className="font-semibold text-amber-900 text-sm sm:text-base mb-3">Add New Mood</h4>
                <div className="mb-3">
                  <label className="block text-amber-800 text-xs sm:text-sm mb-1">Name</label>
                  <input
                    type="text"
                    value={newMood.name}
                    onChange={(e) => setNewMood({ ...newMood, name: e.target.value })}
                    className="w-full p-2 border border-amber-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                    placeholder="E.g., Inspired"
                  />
                </div>
                <div className="mb-3">
                  <label className="block text-amber-800 text-xs sm:text-sm mb-1">Description</label>
                  <input
                    type="text"
                    value={newMood.description}
                    onChange={(e) => setNewMood({ ...newMood, description: e.target.value })}
                    className="w-full p-2 border border-amber-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                    placeholder="E.g., Feeling creative and energized"
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <button
                    onClick={() => setShowAddForm(false)}
                    className="px-3 py-1 text-amber-700 hover:text-amber-900"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddNewMood}
                    disabled={!newMood.name.trim() || !newMood.description.trim()}
                    className={`px-3 py-1 rounded ${
                      newMood.name.trim() && newMood.description.trim()
                        ? 'bg-amber-600 text-white hover:bg-amber-700'
                        : 'bg-amber-300 text-amber-600 cursor-not-allowed'
                    }`}
                  >
                    Add
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => setShowAddForm(true)}
                className="flex items-center text-amber-700 hover:text-amber-900"
              >
                <Plus size={20} className="mr-1" />
                Add New Mood
              </button>
            )}
          </div>
          
          <div className="flex justify-end">
            <button
              onClick={handleSave}
              className="flex items-center bg-amber-700 text-white px-4 py-2 rounded-md hover:bg-amber-800 transition-colors"
            >
              <Save size={18} className="mr-2" />
              Save Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;