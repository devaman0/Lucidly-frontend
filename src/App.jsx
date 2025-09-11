import React, { useState } from 'react';

const App = () => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const isDarkMode = theme === 'dark';
  const cardBg = isDarkMode ? 'bg-gray-800' : 'bg-gray-200';
  const textPrimary = isDarkMode ? 'text-white' : 'text-gray-900';
  const textSecondary = isDarkMode ? 'text-gray-400' : 'text-gray-600';
  const containerBg = isDarkMode ? 'bg-gray-900' : 'bg-white';
  const buttonBg = 'bg-indigo-600 hover:bg-indigo-700 active:scale-95 shadow-md';
  const toggleBtnBg = isDarkMode ? 'bg-gray-700' : 'bg-gray-300';
  const scoreHighColor = isDarkMode ? 'text-red-400' : 'text-red-600';
  const scoreMediumColor = isDarkMode ? 'text-yellow-400' : 'text-yellow-600';
  const scoreLowColor = isDarkMode ? 'text-green-400' : 'text-green-600';
  const keywordBg = isDarkMode ? 'bg-indigo-700 text-indigo-200' : 'bg-indigo-200 text-indigo-800';

  return (
    <>
      <script src="https://cdn.tailwindcss.com"></script>
      <div className={`min-h-screen flex items-center justify-center p-4 sm:p-6 font-sans transition-colors duration-500 ${containerBg}`}>
        <div className={`w-full max-w-2xl rounded-2xl shadow-2xl p-6 sm:p-8 border transition-colors duration-500 ${cardBg} ${isDarkMode ? 'border-gray-700' : 'border-gray-300'}`}>
          <header className="flex justify-between items-center mb-6">
            <h1 className={`text-3xl sm:text-4xl font-extrabold tracking-wide transition-colors duration-500 ${textPrimary}`}>Lucidly</h1>
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-full transition-colors duration-500 ${toggleBtnBg}`}
              aria-label="Toggle theme"
            >
              {isDarkMode ? '☀️' : '🌙'}
            </button>
          </header>
          <main>
            <Questionnaire
              isDarkMode={isDarkMode}
              textPrimary={textPrimary}
              textSecondary={textSecondary}
              buttonBg={buttonBg}
              keywordBg={keywordBg}
              scoreHighColor={scoreHighColor}
              scoreMediumColor={scoreMediumColor}
              scoreLowColor={scoreLowColor}
            />
          </main>
          <footer className={`mt-8 text-center text-xs transition-colors duration-500 ${textSecondary}`}>
            <p className={`border-t pt-4 mt-4 ${isDarkMode ? 'border-gray-700' : 'border-gray-300'}`}>
              Disclaimer: This tool is not a substitute for professional medical advice. If you are in danger or crisis, contact local emergency services or a mental health professional.
            </p>
          </footer>
        </div>
      </div>
    </>
  );
};

const Questionnaire = ({ isDarkMode, textPrimary, textSecondary, buttonBg, keywordBg, scoreHighColor, scoreMediumColor, scoreLowColor }) => {
  const [answers, setAnswers] = useState({ q1: '', q2: '', q3: '' });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [generating, setGenerating] = useState(false);
  const [recs, setRecs] = useState([]);
  const [recError, setRecError] = useState(null);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const handle = e => {
    setAnswers({ ...answers, [e.target.name]: e.target.value });
  };

  const getRecommendations = async () => {
    setGenerating(true);
    setRecError(null);
    try {
      const allText = Object.values(answers).join(' ');
      const res = await fetch('http://127.0.0.1:5000/api/recommendations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: allText }),
      });
      
      if (!res.ok) {
        throw new Error('Failed to get recommendations from the server.');
      }
      const data = await res.json();
      setRecs(data.recommendations || []);
    } catch (err) {
      setRecError(err.message);
    } finally {
      setGenerating(false);
    }
  };

  const speakRecommendations = async () => {
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    const recsToSpeak = recs.join('. ');
    if (!recsToSpeak) {
      return;
    }
    const utterance = new SpeechSynthesisUtterance(recsToSpeak);
    utterance.onend = () => setIsSpeaking(false);
    window.speechSynthesis.speak(utterance);
    setIsSpeaking(true);
  };
  
  const submit = async () => {
    setLoading(true);
    setError(null);
    setResult(null);
    setRecs([]);

    const hasAnswers = Object.values(answers).some(a => a.trim() !== '');
    if (!hasAnswers) {
      setError('Please provide at least one answer to check in.');
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('http://127.0.0.1:5000/api/check', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ answers: Object.values(answers) }),
      });

      if (!res.ok) {
        throw new Error('Failed to connect to the server. Please ensure the Flask backend is running.');
      }

      const data = await res.json();
      setResult(data);
      if (data.stress_score > 40) {
        getRecommendations();
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className={`text-2xl font-semibold transition-colors duration-500 ${textPrimary}`}>Quick Check-in</h2>
      
      <div className="space-y-3">
        <label className={`block font-medium transition-colors duration-500 ${textSecondary}`}>How have you been feeling?</label>
        <textarea
          name="q1"
          value={answers.q1}
          onChange={handle}
          rows="3"
          className={`w-full p-4 rounded-xl shadow-md transition-colors duration-300 ${isDarkMode ? 'bg-gray-700 text-white border border-gray-600 focus:ring-indigo-500' : 'bg-gray-100 text-gray-900 border border-gray-300 focus:ring-indigo-500'} focus:outline-none focus:ring-2`}
        />
      </div>

      <div className="space-y-3">
        <label className={`block font-medium transition-colors duration-500 ${textSecondary}`}>Sleep / Energy</label>
        <textarea
          name="q2"
          value={answers.q2}
          onChange={handle}
          rows="3"
          className={`w-full p-4 rounded-xl shadow-md transition-colors duration-300 ${isDarkMode ? 'bg-gray-700 text-white border border-gray-600 focus:ring-indigo-500' : 'bg-gray-100 text-gray-900 border border-gray-300 focus:ring-indigo-500'} focus:outline-none focus:ring-2`}
        />
      </div>
      
      <div className="space-y-3">
        <label className={`block font-medium transition-colors duration-500 ${textSecondary}`}>Any stressors?</label>
        <textarea
          name="q3"
          value={answers.q3}
          onChange={handle}
          rows="3"
          className={`w-full p-4 rounded-xl shadow-md transition-colors duration-300 ${isDarkMode ? 'bg-gray-700 text-white border border-gray-600 focus:ring-indigo-500' : 'bg-gray-100 text-gray-900 border border-gray-300 focus:ring-indigo-500'} focus:outline-none focus:ring-2`}
        />
      </div>

      <button
        onClick={submit}
        disabled={loading}
        className={`w-full py-3 rounded-xl font-bold text-white transition-all duration-300 transform ${
          loading ? 'bg-gray-500 cursor-not-allowed' : buttonBg
        }`}
      >
        {loading ? 'Checking...' : 'Check'}
      </button>

      {error && (
        <div className="mt-4 p-4 text-sm bg-red-800 text-red-300 rounded-xl border border-red-700">
          {error}
        </div>
      )}

      {result && (
        <Results
          data={result}
          isDarkMode={isDarkMode}
          textPrimary={textPrimary}
          textSecondary={textSecondary}
          keywordBg={keywordBg}
          scoreHighColor={scoreHighColor}
          scoreMediumColor={scoreMediumColor}
          scoreLowColor={scoreLowColor}
          generating={generating}
          recs={recs}
          recError={recError}
          speakRecommendations={speakRecommendations}
          isSpeaking={isSpeaking}
        />
      )}
    </div>
  );
};

const Results = ({ data, isDarkMode, textPrimary, textSecondary, keywordBg, scoreHighColor, scoreMediumColor, scoreLowColor, generating, recs, recError, speakRecommendations, isSpeaking }) => {
  const getScoreColor = (score) => {
    if (score > 70) return scoreHighColor;
    if (score > 40) return scoreMediumColor;
    return scoreLowColor;
  };
  
  const scoreCardBg = isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-300 border-gray-400';
  const recCardBg = isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-300 border-gray-400';
  const recErrorBg = isDarkMode ? 'bg-red-900 text-red-300' : 'bg-red-100 text-red-700';

  return (
    <div className={`mt-8 p-6 rounded-xl shadow-inner border transition-colors duration-500 ${recCardBg} space-y-6`}>
      <h3 className={`text-xl font-semibold transition-colors duration-500 ${textPrimary}`}>Results</h3>
      
      <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
        <div className={`p-4 rounded-xl shadow-md border transition-colors duration-500 ${scoreCardBg} col-span-1 sm:col-span-2 lg:col-span-4`}>
          <p className={`font-medium mb-2 ${textSecondary}`}>Stress Score</p>
          <p className={`text-4xl font-bold ${getScoreColor(data.stress_score)}`}>{data.stress_score}</p>
        </div>
        
        <div className={`p-4 rounded-xl shadow-md transition-colors duration-500 ${recCardBg} col-span-1 sm:col-span-1 lg:col-span-2`}>
          <p className={`font-medium mb-2 ${textSecondary}`}>Explanation</p>
          <p className={`text-sm ${textSecondary}`}>{data.explanation}</p>
        </div>

        <div className={`p-4 rounded-xl shadow-md transition-colors duration-500 ${recCardBg} col-span-1 sm:col-span-1 lg:col-span-2`}>
          <p className={`font-medium mb-2 ${textSecondary}`}>Contributing Keywords</p>
          <div className="flex flex-wrap gap-2 text-sm">
            {data.keywords.length > 0 ? (
              data.keywords.map((keyword, index) => (
                <span key={index} className={`px-3 py-1 rounded-full font-medium transition-colors duration-500 ${keywordBg}`}>
                  {keyword}
                </span>
              ))
            ) : (
              <span className={`italic ${textSecondary}`}>None detected</span>
            )}
          </div>
        </div>

        <div className={`p-4 rounded-xl shadow-md transition-colors duration-500 ${recCardBg} col-span-1 sm:col-span-2 lg:col-span-4`}>
          <div className="flex justify-between items-center mb-2">
            <h4 className={`font-medium ${textSecondary}`}>Recommendations</h4>
            <button
              onClick={speakRecommendations}
              disabled={recs.length === 0 || generating}
              className={`py-1 px-3 rounded-full text-sm font-medium transition-all duration-300 ${isSpeaking ? 'bg-rose-500 text-white' : (isDarkMode ? 'bg-indigo-600 text-white' : 'bg-blue-500 text-white')} hover:bg-opacity-80 disabled:opacity-50`}
              aria-label="Listen to recommendations"
            >
              {isSpeaking ? '⏸️ Stop' : '▶️ Listen'}
            </button>
          </div>
          
          {generating && (
            <div className={`text-sm italic animate-pulse ${textSecondary}`}>Generating personalized recommendations...</div>
          )}
          
          {recs.length > 0 && (
            <ul className={`list-disc list-inside space-y-1 text-sm ${textSecondary}`}>
              {recs.map((r, i) => (
                <li key={i}>{r}</li>
              ))}
            </ul>
          )}
          
          {recError && (
            <div className={`mt-2 p-2 text-sm rounded-xl border ${recErrorBg} ${isDarkMode ? 'border-red-700' : 'border-red-300'}`}>
              {recError}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;