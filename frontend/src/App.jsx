import React, { useState } from 'react';
import axios from 'axios';
import InputForm from './components/InputForm';
import CalendarView from './components/CalendarView';
import { LayoutGrid } from 'lucide-react';

function App() {
  const [calendar, setCalendar] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async (settings) => {
    setLoading(true);
    try {
      // Use relative path for Vercel Monorepo
      const response = await axios.post('/api/generate', settings);
      setCalendar(response.data);
    } catch (error) {
      console.error("Error generating calendar:", error);
      alert("Failed to generate calendar. Is the backend running?");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-100 via-slate-50 to-slate-50">
      <header className="p-6 border-b border-white/50 bg-white/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
            <LayoutGrid size={24} />
          </div>
          <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-800 to-slate-600">
            Reddit Mastermind
          </h1>
        </div>
      </header>

      <main className="p-6 md:p-12">
        {!calendar ? (
          <InputForm onSubmit={handleGenerate} isLoading={loading} />
        ) : (
          <CalendarView calendar={calendar} onReset={() => setCalendar(null)} />
        )}
      </main>
    </div>
  );
}

export default App;
