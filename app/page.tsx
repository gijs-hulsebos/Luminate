'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import ReadingPane from '@/components/ReadingPane';
import AudioPlayer from '@/components/AudioPlayer';
import Dashboard from '@/components/Dashboard';
import SignInModal from '@/components/SignInModal';
import { fetchChapterData, Verse } from '@/lib/bible-data';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft } from 'lucide-react';

export default function Home() {
  const [user, setUser] = useState<any>(null);
  const [view, setView] = useState<'dashboard' | 'reading'>('dashboard');
  const [isSignInOpen, setIsSignInOpen] = useState(false);

  const [selectedBook, setSelectedBook] = useState<string>('Genesis');
  const [selectedChapter, setSelectedChapter] = useState<number>(1);
  const [verses, setVerses] = useState<Verse[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [activeVerse, setActiveVerse] = useState<number | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [showBloom, setShowBloom] = useState(false);
  const [showShimmer, setShowShimmer] = useState(false);
  const [isAtBottom, setIsAtBottom] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Load user and last read position from local storage
  useEffect(() => {
    const savedUser = localStorage.getItem('luminate_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        console.error('Failed to parse saved user', e);
      }
    }

    const saved = localStorage.getItem('luminate_last_read');
    if (saved) {
      try {
        const { bookId, chapter } = JSON.parse(saved);
        setSelectedBook(bookId);
        setSelectedChapter(chapter);
      } catch (e) {
        console.error('Failed to parse last read position', e);
      }
    }
    
    const savedTheme = localStorage.getItem('luminate_theme');
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
    }
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('luminate_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('luminate_theme', 'light');
    }
  }, [isDarkMode]);

  const handleLogin = (userData: any) => {
    setUser(userData);
    localStorage.setItem('luminate_user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('luminate_user');
  };

  // Fetch verses when book or chapter changes
  useEffect(() => {
    let isMounted = true;
    
    const loadVerses = async () => {
      setIsLoading(true);
      try {
        const data = await fetchChapterData(selectedBook, selectedChapter);
        if (isMounted) {
          setVerses(data);
          setActiveVerse(null); // Reset active verse on chapter change
          
          // Save to local storage
          localStorage.setItem('luminate_last_read', JSON.stringify({
            bookId: selectedBook,
            chapter: selectedChapter
          }));
        }
      } catch (error) {
        console.error('Failed to load verses', error);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadVerses();

    return () => {
      isMounted = false;
    };
  }, [selectedBook, selectedChapter]);

  // Check for chapter completion for Bloom animation
  useEffect(() => {
    if (verses.length > 0 && activeVerse === verses[verses.length - 1].verse) {
      // If we've reached the last verse, trigger bloom
      setShowBloom(true);
      const timer = setTimeout(() => setShowBloom(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [activeVerse, verses]);

  const handleSelectChapter = (bookId: string, chapter: number) => {
    setSelectedBook(bookId);
    setSelectedChapter(chapter);
    setView('reading');
    setIsSidebarOpen(false);
  };

  const handleResume = () => {
    setShowShimmer(true);
    setTimeout(() => {
      setShowShimmer(false);
      setView('reading');
    }, 1000);
  };

  const handleVerseOfDayClick = () => {
    setSelectedBook('John');
    setSelectedChapter(3);
    setActiveVerse(16);
    setShowShimmer(true);
    setTimeout(() => {
      setShowShimmer(false);
      setView('reading');
    }, 1000);
  };

  const handleVerseClick = (verseNum: number | null) => {
    setActiveVerse(verseNum);
  };

  const handleScroll = (e: React.UIEvent<HTMLElement>) => {
    const target = e.currentTarget;
    const scroll = target.scrollTop / (target.scrollHeight - target.clientHeight);
    setScrollProgress(scroll * 100);
    setIsAtBottom(scroll >= 0.99);
  };

  return (
    <div className="flex min-h-screen flex-col bg-transparent overflow-hidden relative">
      {/* Shimmer Animation on Resume */}
      <AnimatePresence>
        {showShimmer && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="pointer-events-none fixed inset-0 z-[100] bg-white/20 backdrop-blur-[2px]"
          />
        )}
      </AnimatePresence>

      {/* Light Bloom Animation */}
      <AnimatePresence>
        {showBloom && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.15, scale: 1.5 }}
            exit={{ opacity: 0, scale: 2 }}
            transition={{ duration: 2, ease: "easeOut" }}
            className="pointer-events-none fixed inset-0 z-0 flex items-center justify-center"
          >
            <div className="h-[80vh] w-[80vh] rounded-full bg-gold blur-[100px]" />
          </motion.div>
        )}
      </AnimatePresence>

      <SignInModal 
        isOpen={isSignInOpen} 
        onClose={() => setIsSignInOpen(false)} 
        onLogin={handleLogin} 
      />

      {/* Reading Progress Bar */}
      {view === 'reading' && (
        <div 
          className="fixed top-0 left-0 h-1 bg-petrine z-[60] transition-all duration-150 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      )}
      
      <Header 
        user={user} 
        onLoginClick={() => setIsSignInOpen(true)} 
        onLogout={handleLogout} 
        onLogoClick={() => setView('dashboard')} 
        isDarkMode={isDarkMode}
        toggleDarkMode={() => setIsDarkMode(!isDarkMode)}
      />
      
      <AnimatePresence mode="wait">
        {view === 'dashboard' ? (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="flex-1 flex flex-col"
          >
            <Dashboard 
              user={user} 
              lastBookId={selectedBook} 
              lastChapter={selectedChapter} 
              onResume={handleResume} 
              onOpenLibrary={() => setIsSidebarOpen(true)}
              onVerseOfDayClick={handleVerseOfDayClick}
            />
            <Sidebar 
              selectedBook={selectedBook}
              selectedChapter={selectedChapter}
              onSelectChapter={handleSelectChapter}
              isOpen={isSidebarOpen}
              onClose={() => setIsSidebarOpen(false)}
            />
          </motion.div>
        ) : (
          <motion.div
            key="reading"
            initial={{ opacity: 0, clipPath: 'inset(50% 0 50% 0)' }}
            animate={{ opacity: 1, clipPath: 'inset(0% 0 0% 0)' }}
            exit={{ opacity: 0, clipPath: 'inset(50% 0 50% 0)' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-1 overflow-hidden relative z-10"
          >
            {/* Sticky Floating Back Button */}
            <button
              onClick={() => setView('dashboard')}
              className="fixed top-[72px] left-4 md:left-8 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-sanctuary-center/80 shadow-layered backdrop-blur-[12px] border border-gold text-charcoal/60 hover:text-charcoal transition-colors"
            >
              <ChevronLeft strokeWidth={1} className="h-6 w-6" />
            </button>

            <main 
              className="flex-1 overflow-y-auto scroll-smooth pb-32 pt-28" 
              onScroll={handleScroll}
              onClick={() => setActiveVerse(null)}
            >
              <ReadingPane 
                bookId={selectedBook}
                chapter={selectedChapter}
                verses={verses}
                isLoading={isLoading}
                activeVerse={activeVerse}
                onVerseClick={handleVerseClick}
              />
            </main>

            <AudioPlayer 
              verses={verses}
              activeVerse={activeVerse}
              setActiveVerse={setActiveVerse}
              onOpenLibrary={() => setIsSidebarOpen(true)}
            />

            {/* Bottom Glow on Scroll End */}
            <div 
              className={`fixed bottom-0 left-0 right-0 h-1 bg-gold z-[60] transition-all duration-1000 ease-out pointer-events-none ${
                isAtBottom ? 'shadow-[0_0_30px_10px_rgba(212,175,55,0.5)] opacity-100' : 'opacity-0'
              }`}
            />
            
            <Sidebar 
              selectedBook={selectedBook}
              selectedChapter={selectedChapter}
              onSelectChapter={handleSelectChapter}
              isOpen={isSidebarOpen}
              onClose={() => setIsSidebarOpen(false)}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
