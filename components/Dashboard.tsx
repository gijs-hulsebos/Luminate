'use client';

import { CATHOLIC_BIBLE_BOOKS } from '@/lib/bible-data';
import { motion } from 'motion/react';
import { BookOpen, Library, ChevronRight, PenLine, Bookmark, Flame, TreeDeciduous } from 'lucide-react';
import { useState, useEffect } from 'react';

interface DashboardProps {
  user: any;
  lastBookId: string;
  lastChapter: number;
  onResume: () => void;
  onOpenLibrary: () => void;
  onVerseOfDayClick: () => void;
  onMissionClick: () => void;
  onOpenVineyard: () => void;
  reflections?: any[];
  onReflectionClick: (bookId: string, chapter: number, verse: number) => void;
}

export default function Dashboard({ user, lastBookId, lastChapter, onResume, onOpenLibrary, onVerseOfDayClick, onMissionClick, onOpenVineyard, reflections = [], onReflectionClick }: DashboardProps) {
  const book = CATHOLIC_BIBLE_BOOKS.find(b => b.id === lastBookId);
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    setTimeout(() => {
      const hour = new Date().getHours();
      if (hour < 12) setGreeting('Good Morning');
      else if (hour < 18) setGreeting('Good Afternoon');
      else setGreeting('Good Evening');
    }, 0);
  }, []);

  const savedVerses = [...reflections].filter(r => r.isSaved).sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0)).slice(0, 5);
  const notedVerses = [...reflections].filter(r => r.note).sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0)).slice(0, 5);
  const highlightedVerses = [...reflections].filter(r => r.color).sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0)).slice(0, 5);

  const getVerseSnippet = (text?: string, fallback: string = 'Saved verse') => {
    if (!text) return fallback;
    const words = text.split(/\s+/);
    if (words.length > 15) {
      return `"${words.slice(0, 15).join(' ')}..."`;
    }
    return `"${text}"`;
  };

  return (
    <div className="flex-1 flex flex-col relative pb-24 overflow-y-auto">
      <div className="flex-1 flex flex-col items-center p-6 pt-9">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-md w-full"
        >
          <h1 className="text-[34px] md:text-[46px] font-serif font-light text-charcoal text-center tracking-wide min-h-[1.2em] mb-[12px]">
            {greeting}
            {user && (
              <>
                {greeting ? ', ' : ''}
                <span className="italic text-[#D4AF37]">{(user.displayName || user.name || '').split(' ')[0]}</span>
              </>
            )}
          </h1>
          
          <div className="flex flex-col">
            {/* Mission Button - Spread the Gospel */}
            {user && (
              <motion.button
                whileHover={{ scale: 1.01, filter: "blur(0.5px)" }}
                whileTap={{ scale: 0.98, filter: "blur(1px)" }}
                onClick={onMissionClick}
                className="w-full flex items-center justify-between px-4 h-12 bg-[#8C1C1C] rounded-lg border border-gold/30 border-t-gold/70 transition-all cursor-pointer shadow-md mb-[12px]"
              >
                <span className="text-[9px] font-sans font-medium text-gold uppercase tracking-[0.2em] ml-2">Spread the Gospel</span>
                <div className="flex items-center gap-2 mr-2">
                  {[0, 1, 2].map((i) => (
                    <div key={i} className="w-2.5 h-2.5 rounded-full border-[0.5px] border-gold" />
                  ))}
                </div>
              </motion.button>
            )}

            {/* Verse of the Day - Shrine Aesthetic */}
            <div 
              onClick={onVerseOfDayClick}
              className="bg-card p-6 rounded-xl border border-gold/30 shadow-[inset_0_2px_15px_rgba(0,0,0,0.04)] cursor-pointer hover:border-gold/60 transition-colors mb-4"
            >
              <h2 className="text-[9px] font-sans font-medium text-gold uppercase tracking-[0.3em] mb-4 text-center">Verse of the Day</h2>
              <p className="text-[1.2rem] leading-[1.8] font-serif text-charcoal italic text-center">
                &quot;For God so loved the world, as to give his only begotten Son; that whosoever believeth in him, may not perish, but may have life everlasting.&quot;
              </p>
              <p className="mt-4 text-[10px] font-sans text-gold font-medium text-center uppercase tracking-[0.3em]">John 3:16</p>
            </div>

            {/* Last Devotion - Action Bar */}
            <motion.button
              whileHover={{ scale: 1.01, filter: "blur(0.5px)" }}
              whileTap={{ scale: 0.98, filter: "blur(1px)" }}
              onClick={onResume}
              className="w-full flex items-center justify-between px-3 h-12 bg-petrine rounded-full shadow-layered border border-gold/30 transition-all group"
            >
              <div className="flex flex-col items-start ml-4 justify-center">
                <span className="text-[8px] font-sans font-medium text-[#F8F5F0]/80 uppercase tracking-[0.3em] leading-tight">Continue Reading</span>
                <span className="text-sm font-serif text-gold leading-tight">{book?.name} {lastChapter}</span>
              </div>
              <div className="h-9 w-9 rounded-full bg-gold/10 flex items-center justify-center text-gold group-hover:bg-gold/20 transition-colors mr-1">
                <ChevronRight strokeWidth={1} className="h-4 w-4" />
              </div>
            </motion.button>
          </div>

          {/* Saved for Later */}
          {user && savedVerses.length > 0 && (
            <div className="pt-6">
              <h2 className="text-[9px] font-sans font-medium text-gold uppercase tracking-[0.3em] mb-4 text-center">Saved for Later</h2>
              <div className={`flex overflow-x-auto pb-4 -mx-6 px-6 gap-4 snap-x snap-mandatory hide-scrollbar ${savedVerses.length === 1 ? 'justify-center' : ''}`}>
                {savedVerses.map((ref, idx) => (
                  <div 
                    key={idx} 
                    onClick={() => onReflectionClick(ref.book, ref.chapter, ref.verse)}
                    className="flex-none w-64 bg-white/50 backdrop-blur-sm p-5 rounded-xl border border-gold/20 shadow-sm snap-center cursor-pointer hover:bg-white/60 transition-colors"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <span className="text-xs font-sans font-medium text-gold tracking-wider uppercase">
                        {ref.book} {ref.chapter}:{ref.verse}
                      </span>
                      <Bookmark className="w-3 h-3 text-gold" fill="currentColor" />
                    </div>
                    <p className="text-sm font-serif text-charcoal/80 line-clamp-2 italic">{getVerseSnippet(ref.text, 'Saved verse')}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* My Reflections */}
          {user && notedVerses.length > 0 && (
            <div className="pt-6">
              <h2 className="text-[9px] font-sans font-medium text-gold uppercase tracking-[0.3em] mb-4 text-center">My Reflections</h2>
              <div className={`flex overflow-x-auto pb-4 -mx-6 px-6 gap-4 snap-x snap-mandatory hide-scrollbar ${notedVerses.length === 1 ? 'justify-center' : ''}`}>
                {notedVerses.map((ref, idx) => (
                  <div 
                    key={idx} 
                    onClick={() => onReflectionClick(ref.book, ref.chapter, ref.verse)}
                    className="flex-none w-64 bg-white/50 backdrop-blur-sm p-5 rounded-xl border border-gold/20 shadow-sm snap-center cursor-pointer hover:bg-white/60 transition-colors"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <span className="text-xs font-sans font-medium text-gold tracking-wider uppercase">
                        {ref.book} {ref.chapter}:{ref.verse}
                      </span>
                      <PenLine className="w-3 h-3 text-gold" />
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm font-serif text-charcoal/70 italic line-clamp-2">{getVerseSnippet(ref.text, 'Reflected verse')}</p>
                      <p className="text-sm font-serif text-charcoal font-medium line-clamp-2">&quot;{ref.note}&quot;</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* My Highlights */}
          {user && highlightedVerses.length > 0 && (
            <div className="pt-6">
              <h2 className="text-[9px] font-sans font-medium text-gold uppercase tracking-[0.3em] mb-4 text-center">My Highlights</h2>
              <div className={`flex overflow-x-auto pb-4 -mx-6 px-6 gap-4 snap-x snap-mandatory hide-scrollbar ${highlightedVerses.length === 1 ? 'justify-center' : ''}`}>
                {highlightedVerses.map((ref, idx) => (
                  <div 
                    key={idx} 
                    onClick={() => onReflectionClick(ref.book, ref.chapter, ref.verse)}
                    className="flex-none w-64 bg-white/50 backdrop-blur-sm p-5 rounded-xl border shadow-sm snap-center cursor-pointer hover:bg-white/60 transition-colors"
                    style={{ borderColor: ref.color || 'rgba(212,175,55,0.2)' }}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <span className="text-xs font-sans font-medium text-gold tracking-wider uppercase">
                        {ref.book} {ref.chapter}:{ref.verse}
                      </span>
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: ref.color }} />
                    </div>
                    <p className="text-sm font-serif text-charcoal/80 line-clamp-2 italic">{getVerseSnippet(ref.text, 'Highlighted verse')}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>

      {/* Floating Chapter Navigation */}
      <div className="fixed bottom-8 right-6 z-40">
        <button 
          onClick={onOpenLibrary}
          className="w-14 h-14 rounded-full bg-petrine border border-gold/30 shadow-layered flex items-center justify-center text-gold hover:bg-gold/10 transition-colors"
        >
          <Library strokeWidth={1} className="w-6 h-6" />
        </button>
      </div>

      {/* Floating Vineyard Navigation */}
      <div className="fixed bottom-8 left-6 z-40">
        <button 
          onClick={onOpenVineyard}
          className="w-14 h-14 rounded-full bg-[#1B4332] border border-gold/30 shadow-layered flex items-center justify-center text-gold hover:bg-[#1B4332]/80 transition-colors"
        >
          <TreeDeciduous strokeWidth={1} className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}
