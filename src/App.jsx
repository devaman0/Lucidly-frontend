import React, { useState, useEffect } from 'react';

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');

  const navigateTo = (pageName) => {
    setCurrentPage(pageName);
  };

  // Helper component for the Back button
  const BackButton = () => (
    <button 
      onClick={() => navigateTo('home')} 
      className="mb-4 text-gray-600 hover:text-gray-900 transition-colors duration-200 flex items-center"
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
      </svg>
      Back
    </button>
  );

  // --- Pages ---
  const HomePage = () => (
    <div className="flex flex-col min-h-screen text-gray-800 bg-gray-50">
      {/* Navbar section */}
      <nav className="sticky top-0 z-50 flex items-center justify-between p-6 md:px-12 bg-white card-shadow rounded-xl m-4">
        <span className="font-bold text-xl text-gray-900">Lucidly</span>
        <div className="hidden md:flex space-x-6 items-center">
          <a onClick={() => navigateTo('home')} className="text-gray-600 hover:text-gray-900 cursor-pointer transition-colors duration-200">Home</a>
          <a onClick={() => navigateTo('journaling')} className="text-gray-600 hover:text-gray-900 cursor-pointer transition-colors duration-200">Journaling</a>
          <a onClick={() => navigateTo('tracker')} className="text-gray-600 hover:text-gray-900 cursor-pointer transition-colors duration-200">Daily Tracker</a>
          <a onClick={() => navigateTo('analytics')} className="text-gray-600 hover:text-gray-900 cursor-pointer transition-colors duration-200">Analytics</a>
          <a onClick={() => navigateTo('ai-checkin')} className="text-gray-600 hover:text-gray-900 cursor-pointer transition-colors duration-200">AI Check-In</a>
          <a onClick={() => navigateTo('about')} className="text-gray-600 hover:text-gray-900 cursor-pointer transition-colors duration-200">About</a>
        </div>
        <div className="flex space-x-4 items-center">
          <a href="#" className="py-2 px-4 bg-gray-800 text-white font-semibold rounded-full hover:bg-gray-900 transition-colors duration-200 hidden md:block">Login</a>
          <a href="#" className="py-2 px-4 border border-gray-800 text-gray-800 font-semibold rounded-full hover:bg-gray-800 hover:text-white transition-colors duration-200 hidden md:block">Sign Up</a>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="hero-bg flex items-center justify-center p-8 md:p-12 relative overflow-hidden">
        
        <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between">
          <div className="lg:w-1/2 text-center lg:text-left p-4">
            <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight">
              Your Journey <br/> to Mental Wellness
            </h1>
            <p className="mt-4 text-gray-600 max-w-md mx-auto lg:mx-0">
              Lucidly helps you track your mood, journal your thoughts, and find clarity in your day-to-day life.
            </p>
            <div className="mt-8 flex justify-center lg:justify-start space-x-4">
              <a onClick={() => navigateTo('journaling')} className="py-3 px-6 bg-gray-900 text-white font-semibold rounded-full hover:bg-gray-800 transition-colors cursor-pointer">
                Get Started
              </a>
              <a onClick={() => navigateTo('about')} className="py-3 px-6 bg-transparent text-gray-900 border border-gray-900 font-semibold rounded-full hover:bg-gray-100 transition-colors cursor-pointer">
                Learn More
              </a>
            </div>
          </div>
          <div className="lg:w-1/2 mt-8 lg:mt-0 relative flex justify-center">
            {/* A simple div to contain the canvas in a responsive way */}
            <div className="w-80 h-80 md:w-96 md:h-96 rounded-full flex items-center justify-center relative bg-gray-200">
              <span className="text-sm text-gray-500 z-10">Hero Graphic Placeholder</span>
            </div>
          </div>
        </div>
      </header>

      {/* Features Grid ("Lucidly Features") */}
      <section className="p-8 md:p-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900">Lucidly Features</h2>
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature Card 1: Journaling */}
            <div onClick={() => navigateTo('journaling')} className="bg-white rounded-2xl p-6 card-shadow text-center cursor-pointer hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-blue-100 flex items-center justify-center">
                <span className="text-blue-500 font-bold">📝</span>
              </div>
              <h3 className="font-bold text-xl">Journaling</h3>
              <p className="mt-2 text-gray-600 text-sm">Express your thoughts, feelings, and experiences freely and privately.</p>
            </div>
            {/* Feature Card 2: Daily Tracker */}
            <div onClick={() => navigateTo('tracker')} className="bg-white rounded-2xl p-6 card-shadow text-center cursor-pointer hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
                <span className="text-green-500 font-bold">🙂</span>
              </div>
              <h3 className="font-bold text-xl">Daily Tracker</h3>
              <p className="mt-2 text-gray-600 text-sm">Quickly log your mood and daily activities to spot patterns over time.</p>
            </div>
            {/* Feature Card 3: Analytics */}
            <div onClick={() => navigateTo('analytics')} className="bg-white rounded-2xl p-6 card-shadow text-center cursor-pointer hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-yellow-100 flex items-center justify-center">
                <span className="text-yellow-500 font-bold">📊</span>
              </div>
              <h3 className="font-bold text-xl">Analytics</h3>
              <p className="mt-2 text-gray-600 text-sm">See a visual summary of your wellness journey with insightful charts.</p>
            </div>
            {/* Feature Card 4: AI Check-In */}
            <div onClick={() => navigateTo('ai-checkin')} className="bg-white rounded-2xl p-6 card-shadow text-center cursor-pointer hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-purple-100 flex items-center justify-center">
                <span className="text-purple-500 font-bold">🧠</span>
              </div>
              <h3 className="font-bold text-xl">AI Check-In</h3>
              <p className="mt-2 text-gray-600 text-sm">A compassionate AI assistant to help you de-stress and reflect.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section ("Your Wellness Journey") */}
      <section className="p-8 md:p-12 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900">Your Wellness Journey</h2>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Process Card 1 */}
            <div className="bg-gray-100 rounded-2xl p-6 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-pink-100 to-purple-100 opacity-50"></div>
              <div className="relative">
                <h3 className="font-bold text-2xl">1. Log Daily Moods</h3>
                <p className="mt-2 text-gray-600 text-sm">Start by simply logging how you feel each day.</p>
              </div>
            </div>
            {/* Process Card 2 */}
            <div className="bg-gray-100 rounded-2xl p-6 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-green-100 opacity-50"></div>
              <div className="relative">
                <h3 className="font-bold text-2xl">2. Journal Your Thoughts</h3>
                <p className="mt-2 text-gray-600 text-sm">Write about your experiences to gain clarity.</p>
              </div>
            </div>
            {/* Process Card 3 */}
            <div className="bg-gray-100 rounded-2xl p-6 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-100 to-orange-100 opacity-50"></div>
              <div className="relative">
                <h3 className="font-bold text-2xl">3. See Your Progress</h3>
                <p className="mt-2 text-gray-600 text-sm">Visualize your journey with insightful analytics.</p>
              </div>
            </div>
            {/* Process Card 4 */}
            <div className="bg-gray-100 rounded-2xl p-6 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-red-100 to-yellow-100 opacity-50"></div>
              <div className="relative">
                <h3 className="font-bold text-2xl">4. Check-in with AI</h3>
                <p className="mt-2 text-gray-600 text-sm">A compassionate AI assistant will guide you to de-stress.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section className="p-8 md:p-12 bg-white">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between">
          <div className="lg:w-1/2 relative flex justify-center lg:justify-start p-4">
            {/* Placeholder for mockups */}
            <div className="relative w-48 h-96 lg:w-64 lg:h-[32rem] bg-gray-200 rounded-3xl shadow-xl flex items-center justify-center transform -rotate-6">
              <span className="text-xs text-gray-500">Journaling Mockup</span>
            </div>
            <div className="relative w-48 h-96 lg:w-64 lg:h-[32rem] bg-gray-300 rounded-3xl shadow-xl flex items-center justify-center transform rotate-6 ml-12">
              <span className="text-xs text-gray-500">Analytics Mockup</span>
            </div>
          </div>
          <div className="lg:w-1/2 text-center lg:text-left p-4">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Your Personal Dashboard</h2>
            <p className="mt-4 text-gray-600 max-w-md mx-auto lg:mx-0">
              Lucidly provides a simple, intuitive dashboard to view your progress and gain valuable insights.
            </p>
            <div className="mt-8">
              <a onClick={() => navigateTo('analytics')} className="py-3 px-6 bg-gray-900 text-white font-semibold rounded-full hover:bg-gray-800 transition-colors cursor-pointer">
                View Dashboard
              </a>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="p-8 md:p-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900">What People Say</h2>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {/* Testimonial Card 1 */}
            <div className="bg-gray-50 rounded-2xl p-6 card-shadow">
              <p className="text-gray-700 italic">"Lucidly has completely changed the way I approach my mental health. The journaling feature is incredibly helpful."</p>
              <p className="mt-4 font-bold text-gray-900">Kuroneko</p>
              <p className="text-sm text-gray-500">College Student</p>
            </div>
            {/* Testimonial Card 2 */}
            <div className="bg-gray-50 rounded-2xl p-6 card-shadow">
              <p className="text-gray-700 italic">"I love the daily tracker. It's so simple to use and helps me see my mood patterns over time. Highly recommended!"</p>
              <p className="mt-4 font-bold text-gray-900">Jane Doe</p>
              <p className="text-sm text-gray-500">UX Designer</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 p-8 md:p-12 mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <span className="font-bold text-lg">Lucidly</span>
            <p className="text-sm mt-2">&copy; 2023 Lucidly. All rights reserved.</p>
          </div>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );

  const JournalingPage = () => {
    const [journalEntry, setJournalEntry] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
      const savedEntry = localStorage.getItem('lucidly_journal_entry');
      if (savedEntry) {
        setJournalEntry(savedEntry);
      }
    }, []);

    const handleSave = () => {
      localStorage.setItem('lucidly_journal_entry', journalEntry);
      setMessage('Journal entry saved!');
      setTimeout(() => setMessage(''), 3000);
    };

    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-xl bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <BackButton />
          <h2 className="text-3xl font-bold text-gray-800">Journaling</h2>
          <p className="mt-2 text-gray-600">Write your thoughts and feelings. This is a safe space just for you.</p>
          
          <textarea
            className="mt-6 w-full h-64 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 transition-shadow duration-200"
            placeholder="What's on your mind today?"
            value={journalEntry}
            onChange={(e) => setJournalEntry(e.target.value)}
          ></textarea>
          <button onClick={handleSave} className="mt-4 w-full py-3 bg-gray-800 text-white font-semibold rounded-lg hover:bg-gray-900 transition-colors duration-200">
            Save Journal Entry
          </button>
          {message && (
            <div className="mt-4 p-3 bg-green-100 text-green-700 rounded-lg text-center transition-opacity duration-300">
              {message}
            </div>
          )}
        </div>
      </div>
    );
  };

  const DailyTrackerPage = () => (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-xl bg-white rounded-xl shadow-lg p-6 border border-gray-200">
        <BackButton />
        <h2 className="text-3xl font-bold text-gray-800">Daily Tracker</h2>
        <p className="mt-2 text-gray-600">Select your mood for today and save it.</p>
        <select className="mt-6 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 transition-shadow duration-200">
          <option>How are you feeling?</option>
          <option>Happy</option>
          <option>Neutral</option>
          <option>Sad</option>
        </select>
        <button className="mt-4 w-full py-3 bg-gray-800 text-white font-semibold rounded-lg hover:bg-gray-900 transition-colors duration-200">
          Save Mood
        </button>
      </div>
    </div>
  );

  const AnalyticsPage = () => (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-xl bg-white rounded-xl shadow-lg p-6 border border-gray-200">
        <BackButton />
        <h2 className="text-3xl font-bold text-gray-800">Analytics</h2>
        <p className="mt-2 text-gray-600">Your mood over time will be displayed here.</p>
        <div className="mt-6 w-full bg-gray-100 rounded-xl p-4 flex items-center justify-center h-64 border border-gray-200">
          <svg width="100%" height="100%" viewBox="0 0 0 0" preserveAspectRatio="none" className="text-gray-400">
          </svg>
        </div>
      </div>
    </div>
  );

  const AICheckInPage = () => {
    const [showResults, setShowResults] = useState(false);
    const [feeling, setFeeling] = useState('');
    const [energy, setEnergy] = useState('');
    const [stressors, setStressors] = useState('');

    const handleCheck = () => {
      // This is where your backend API call will go
      console.log("Submitting:", { feeling, energy, stressors });
      setShowResults(true);
    };

    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-xl bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <BackButton />
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">AI Check-In</h2>

          <div className="bg-gray-100 p-6 rounded-xl shadow-inner mb-6">
            <h3 className="font-semibold text-xl text-gray-800 mb-4">Quick Check-in</h3>
            
            {/* How have you been feeling? */}
            <div className="mb-4">
              <p className="mb-2 text-sm text-gray-700">How have you been feeling?</p>
              <input
                type="text"
                value={feeling}
                onChange={(e) => setFeeling(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 transition-shadow"
                placeholder="e.g., bad"
              />
            </div>

            {/* Sleep / Energy */}
            <div className="mb-4">
              <p className="mb-2 text-sm text-gray-700">Sleep / Energy</p>
              <input
                type="text"
                value={energy}
                onChange={(e) => setEnergy(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 transition-shadow"
                placeholder="e.g., low"
              />
            </div>

            {/* Any stressors? */}
            <div className="mb-4">
              <p className="mb-2 text-sm text-gray-700">Any stressors?</p>
              <input
                type="text"
                value={stressors}
                onChange={(e) => setStressors(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 transition-shadow"
                placeholder="e.g., no"
              />
            </div>
            
            <button onClick={handleCheck} className="mt-4 w-full py-3 bg-gray-800 text-white font-semibold rounded-lg hover:bg-gray-900 transition-colors duration-200">
              Check
            </button>
          </div>

          {/* AI Check-In Results (conditionally rendered) */}
          {showResults && (
            <div className="space-y-6">
              <div className="bg-gray-100 p-4 rounded-xl shadow-inner">
                <h3 className="font-semibold text-xl text-gray-800">Results</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  {/* Stress Score Card */}
                  <div className="bg-white p-4 rounded-xl shadow card-shadow">
                    <p className="text-sm text-gray-500">Stress Score</p>
                    <p className="text-4xl font-bold mt-1 text-red-500">88.9</p>
                  </div>
                  
                  {/* Explanation Card */}
                  <div className="bg-white p-4 rounded-xl shadow card-shadow">
                    <p className="text-sm text-gray-500">Explanation</p>
                    <p className="mt-1 text-gray-800">bad, low, no</p>
                  </div>

                  {/* Contributing Keywords Card */}
                  <div className="bg-white p-4 rounded-xl shadow card-shadow md:col-span-2">
                    <p className="text-sm text-gray-500">Contributing Keywords</p>
                    <div className="flex flex-wrap gap-2 mt-1">
                      <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">bad</span>
                      <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">low</span>
                      <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">no</span>
                    </div>
                  </div>
                </div>

                {/* Recommendations Section */}
                <div className="bg-white p-4 rounded-xl shadow mt-4 card-shadow">
                  <div className="flex justify-between items-center">
                    <p className="font-semibold text-gray-800">Recommendations</p>
                    <button className="flex items-center space-x-1 text-blue-600 hover:text-blue-800">
                      <span>Listen</span>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.666a3.565 3.565 0 0 0-2.083-.711c-1.258-.231-2.54-.15-3.79.256c-1.25.405-2.45.922-3.593 1.583a4.01 4.01 0 0 0-1.896 1.155c-.538.536-1.11 1.05-1.745 1.564C4.162 10.15 3.868 11.233 4 12c.132.767.666 1.637 1.436 2.408l.764.764c.594.593 1.254.992 1.942 1.253a4.114 4.114 0 0 0 1.942.502c.745 0 1.48-.152 2.222-.455.741-.303 1.488-.707 2.228-1.127a4.675 4.675 0 0 0 1.643-.918c.51-.456.985-.92 1.432-1.391.447-.472.9-1.006 1.34-1.554.44-.548.88-1.102 1.32-1.666a4.898 4.898 0 0 0 .524-1.17c.071-.34-.055-.668-.216-.949a.672.672 0 0 0-.41-.321Z" />
                      </svg>
                    </button>
                  </div>
                  <p className="mt-2 text-sm text-red-500">
                    NetworkError when attempting to fetch resource.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };
  
  const AboutPage = () => (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-xl bg-white rounded-xl shadow-lg p-6 border border-gray-200">
        <BackButton />
        <h2 className="text-3xl font-bold text-gray-800">About Lucidly</h2>
        <p className="mt-2 text-gray-600">Lucidly is an app designed to help you track your mental wellness journey. The app is a solo project built to help with journaling and stress management. Future plans include integrating a backend to store data, and connecting to an AI model for advanced insights.</p>
      </div>
    </div>
  );

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'journaling':
        return <JournalingPage />;
      case 'tracker':
        return <DailyTrackerPage />;
      case 'analytics':
        return <AnalyticsPage />;
      case 'ai-checkin':
        return <AICheckInPage />;
      case 'about':
        return <AboutPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div>
      {renderPage()}
    </div>
  );
};

export default App;
