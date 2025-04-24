import React, { Suspense, useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import LoadingScreen from './components/LoadingScreen';
import { ThemeProvider } from './context/ThemeContext';
import Home from './sections/Home';
import Footer from './components/Footer';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading assets
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-light dark:bg-dark text-dark dark:text-light transition-colors duration-300 relative">
        <AnimatePresence mode="wait">
          {isLoading ? (
            <LoadingScreen key="loading" />
          ) : (
            <Suspense fallback={<LoadingScreen />}>
              <Navbar />
              <main className="overflow-hidden">
                <Home />
              </main>
              <Footer />
            </Suspense>
          )}
        </AnimatePresence>
      </div>
    </ThemeProvider>
  );
}

export default App;