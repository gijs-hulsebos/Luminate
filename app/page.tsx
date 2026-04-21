'use client';

import { useState, useEffect, useRef } from 'react';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import ReadingPane from '@/components/ReadingPane';
import AudioPlayer from '@/components/AudioPlayer';
import Dashboard from '@/components/Dashboard';
import SignInModal from '@/components/SignInModal';
import ActionSheet from '@/components/ActionSheet';
import SacristyMenu from '@/components/SacristyMenu';
import ReferralModal from '@/components/ReferralModal';
import Vineyard from '@/components/Vineyard';
import { fetchChapterData, Verse, getNextChapter, getPrevChapter } from '@/lib/bible-data';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft } from 'lucide-react';

export default function Home() {
  const [user, setUser] = useState<any>(null);
  const [view, setView] = useState<'dashboard' | 'reading' | 'vineyard'>('dashboard');
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
  
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isActionSheetOpen, setIsActionSheetOpen] = useState(false);
  const [isSacristyOpen, setIsSacristyOpen] = useState(false);
  const [isReferralModalOpen, setIsReferralModalOpen] = useState(false);
  const [selectedVerseForAction, setSelectedVerseForAction] = useState<number | null>(null);
  const [userReflections, setUserReflections] = useState<any[]>([]);
  const pendingVerseRef = useRef<number | null>(null);

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

  // Load reflections when user changes
  useEffect(() => {
    if (user) {
      const savedReflections = localStorage.getItem(`luminate_reflections_${user.displayName}`);
      if (savedReflections) {
        try {
          const parsed = JSON.parse(savedReflections);
          setUserReflections(parsed);
          
          // Backfill missing text for older reflections
          const fetchMissingTexts = async () => {
            let updated = false;
            const updatedReflections = [...parsed];
            
            for (let i = 0; i < updatedReflections.length; i++) {
              if (!updatedReflections[i].text) {
                try {
                  const data = await fetchChapterData(updatedReflections[i].book, updatedReflections[i].chapter);
                  const verseObj = data.find((v: any) => v.verse === updatedReflections[i].verse);
                  if (verseObj) {
                    updatedReflections[i].text = verseObj.text;
                    updated = true;
                  }
                } catch (e) {
                  console.error('Failed to fetch missing text', e);
                }
              }
            }
            
            if (updated) {
              setUserReflections(updatedReflections);
              localStorage.setItem(`luminate_reflections_${user.displayName}`, JSON.stringify(updatedReflections));
            }
          };
          
          fetchMissingTexts();
        } catch (e) {
          console.error('Failed to parse reflections', e);
        }
      } else {
        setUserReflections([]);
      }
    } else {
      setUserReflections([]);
    }
  }, [user]);

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
          
          if (pendingVerseRef.current !== null) {
            setActiveVerse(pendingVerseRef.current);
            pendingVerseRef.current = null;
          } else {
            setActiveVerse(null); // Reset active verse on chapter change
          }
          
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

  const handleReflectionClick = (bookId: string, chapter: number, verse: number) => {
    pendingVerseRef.current = verse;
    setSelectedBook(bookId);
    setSelectedChapter(chapter);
    setView('reading');
  };

  const handleNextChapter = () => {
    const next = getNextChapter(selectedBook, selectedChapter);
    if (next) {
      setSelectedBook(next.bookId);
      setSelectedChapter(next.chapter);
    }
  };

  const handlePrevChapter = () => {
    const prev = getPrevChapter(selectedBook, selectedChapter);
    if (prev) {
      setSelectedBook(prev.bookId);
      setSelectedChapter(prev.chapter);
    }
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
    if (verseNum !== null) {
      if (!user) {
        setToastMessage('Sign in to personalize your study');
        setTimeout(() => setToastMessage(null), 3000);
      } else {
        setSelectedVerseForAction(verseNum);
        setIsActionSheetOpen(true);
      }
    } else {
      setIsActionSheetOpen(false);
    }
  };

  const handleSaveReflection = (data: any) => {
    if (!user) return;
    
    const verseObj = verses.find(v => v.verse === data.verse);
    const verseText = verseObj ? verseObj.text : '';
    
    const newReflections = [...userReflections];
    const existingIndex = newReflections.findIndex(r => r.book === data.book && r.chapter === data.chapter && r.verse === data.verse);
    
    if (existingIndex >= 0) {
      if (!data.isSaved && !data.note && !data.color) {
        newReflections.splice(existingIndex, 1);
      } else {
        newReflections[existingIndex] = { ...newReflections[existingIndex], ...data, text: verseText || newReflections[existingIndex].text };
      }
    } else {
      newReflections.push({ ...data, text: verseText, timestamp: Date.now() });
    }
    
    setUserReflections(newReflections);
    localStorage.setItem(`luminate_reflections_${user.displayName}`, JSON.stringify(newReflections));
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

      <ActionSheet
        isOpen={isActionSheetOpen}
        onClose={() => setIsActionSheetOpen(false)}
        verseNum={selectedVerseForAction}
        book={selectedBook}
        chapter={selectedChapter}
        userId={user?.displayName || ''}
        onSaveReflection={handleSaveReflection}
        existingReflection={userReflections.find(r => r.book === selectedBook && r.chapter === selectedChapter && r.verse === selectedVerseForAction)}
      />

      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-24 left-1/2 -translate-x-1/2 z-[110] bg-[#05080F]/90 backdrop-blur-md border border-[#D4AF37]/30 text-[#F8F5F0] px-6 py-3 rounded-full shadow-lg font-sans text-sm"
          >
            {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>

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
        onProfileClick={() => setIsSacristyOpen(true)}
      />

      <SacristyMenu
        isOpen={isSacristyOpen}
        onClose={() => setIsSacristyOpen(false)}
        user={user}
        onLogout={handleLogout}
        isDarkMode={isDarkMode}
        toggleDarkMode={() => setIsDarkMode(!isDarkMode)}
      />

      <ReferralModal
        isOpen={isReferralModalOpen}
        onClose={() => setIsReferralModalOpen(false)}
        user={user}
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
              onMissionClick={() => setIsReferralModalOpen(true)}
              onOpenVineyard={() => setView('vineyard')}
              reflections={userReflections}
              onReflectionClick={handleReflectionClick}
            />
            <Sidebar 
              selectedBook={selectedBook}
              selectedChapter={selectedChapter}
              onSelectChapter={handleSelectChapter}
              isOpen={isSidebarOpen}
              onClose={() => setIsSidebarOpen(false)}
            />
          </motion.div>
        ) : view === 'reading' ? (
          <motion.div
            key="reading"
            initial={{ opacity: 0, clipPath: 'inset(50% 0 50% 0)' }}
            animate={{ opacity: 1, clipPath: 'inset(0% 0 0% 0)' }}
            exit={{ opacity: 0, clipPath: 'inset(50% 0 50% 0)' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-1 overflow-hidden relative z-10"
          >
            {/* Sticky Floating Back Button */}
            <motion.button
              onClick={() => setView('dashboard')}
              initial={false}
              animate={{ 
                y: scrollProgress > 0.02 ? -14 : 0,
                x: scrollProgress > 0.02 ? -8 : 0,
                scale: scrollProgress > 0.02 ? 0.85 : 1,
                opacity: scrollProgress > 0.02 ? 0.6 : 1
              }}
              whileHover={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-[80px] left-6 md:left-10 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-sanctuary-center/80 shadow-layered backdrop-blur-[12px] border border-gold text-charcoal/60 hover:text-charcoal transition-colors"
            >
              <ChevronLeft strokeWidth={1} className="h-6 w-6" />
            </motion.button>

            <main 
              className="flex-1 overflow-y-auto scroll-smooth pb-40 pt-4" 
              onScroll={handleScroll}
              onClick={() => {
                setActiveVerse(null);
                setIsActionSheetOpen(false);
              }}
            >
              <ReadingPane 
                bookId={selectedBook}
                chapter={selectedChapter}
                verses={verses}
                isLoading={isLoading}
                activeVerse={activeVerse}
                onVerseClick={handleVerseClick}
                reflections={userReflections.filter(r => r.book === selectedBook && r.chapter === selectedChapter)}
              />
            </main>

            <AudioPlayer 
              verses={verses}
              activeVerse={activeVerse}
              setActiveVerse={setActiveVerse}
              onOpenLibrary={() => setIsSidebarOpen(true)}
              onNextChapter={handleNextChapter}
              onPrevChapter={handlePrevChapter}
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
        ) : view === 'vineyard' ? (
          <motion.div
            key="vineyard"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.4 }}
            className="flex-1 flex flex-col z-10 bg-sanctuary-center"
          >
            <Vineyard 
              user={user} 
              onBack={() => setView('dashboard')} 
              onUpdateUser={(updatedUser) => {
                setUser(updatedUser);
                localStorage.setItem('luminate_user', JSON.stringify(updatedUser));
              }}
            />
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
