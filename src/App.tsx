import React from 'react';
import LoadingPage from './components/LoadingPage';
import MoodSelector from './components/MoodSelector';
import QuoteDisplay from './components/QuoteDisplay';
import Settings from './components/Settings';
import { AppProvider, useAppContext } from './context/AppContext';
import { Settings as SettingsIcon } from 'lucide-react';
import bgImage from '../src/assets/bg.png'


const AppContent: React.FC = () => {
  const { setShowSettings } = useAppContext();

  return (
    <div className="min-h-screen flex flex-col"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      <LoadingPage />
      
      <div className="flex-1 flex flex-col bg-amber-900 bg-opacity-80">
        <header className="py-6 px-4 sm:px-6 bg-gradient-to-b from-amber-950 to-transparent">
          <div className="max-w-5xl mx-auto flex justify-between items-center">
            <h1 className="text-2xl sm:text-3xl font-cinzel font-bold text-amber-100">
              Bhagavad Gita Wisdom
            </h1>
            <button
              onClick={() => setShowSettings(true)}
              className="text-amber-200 hover:text-amber-100 transition-colors"
              title="Settings"
            >
              <SettingsIcon size={24} />
            </button>
          </div>
        </header>
        
        <main className="flex-1 py-8 px-4 sm:px-6 max-w-5xl mx-auto">
          <MoodSelector />
          <QuoteDisplay />
          <Settings />
        </main>
        
        <footer className="py-6 px-4 sm:px-6 bg-gradient-to-t from-amber-950 to-transparent">
          <div className="max-w-5xl mx-auto text-center text-amber-200 text-sm">
            <p>© 2025 Bhagavad Gita Wisdom | Discover ancient wisdom for modern life</p>
          </div>
        </footer>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
};

export default App;
