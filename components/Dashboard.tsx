'use client';

import { CATHOLIC_BIBLE_BOOKS } from '@/lib/bible-data';
import { motion } from 'motion/react';
import { BookOpen, Library, ChevronRight, PenLine, Bookmark } from 'lucide-react';
import { useState, useEffect } from 'react';

interface DashboardProps {
  user: any;
  lastBookId: string;
  lastChapter: number;
  onResume: () => void;
  onOpenLibrary: () => void;
  onVerseOfDayClick: () => void;
  reflections?: any[];
  onReflectionClick: (bookId: string, chapter: number, verse: number) => void;
}

export default function Dashboard({ user, lastBookId, lastChapter, onResume, onOpenLibrary, onVerseOfDayClick, reflections = [], onReflectionClick }: DashboardProps) {
  const book = CATHOLIC_BIBLE_BOOKS.find(b => b.id === lastBookId);
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good Morning');
    else if (hour < 18) setGreeting('Good Afternoon');
    else setGreeting('Good Evening');
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
      <div className="flex-1 flex flex-col items-center p-6 pt-4">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-md w-full space-y-6"
        >
          <h1 className="text-4xl md:text-5xl font-serif font-light text-charcoal text-center tracking-wide min-h-[1.2em]">
            {greeting}{greeting && user ? `, ${(user.displayName || user.name || '').split(' ')[0]}` : (user ? (user.displayName || user.name || '').split(' ')[0] : '')}
          </h1>
          
          <div className="space-y-4">
            {/* Verse of the Day - Shrine Aesthetic */}
            <div 
              onClick={onVerseOfDayClick}
              className="bg-card p-6 rounded-xl border border-gold/30 shadow-[inset_0_2px_15px_rgba(0,0,0,0.04)] cursor-pointer hover:border-gold/60 transition-colors"
            >
              <h2 className="text-[9px] font-sans font-medium text-gold uppercase tracking-[0.3em] mb-4 text-center">Verse of the Day</h2>
              <p className="text-[1.2rem] leading-[1.8] font-serif text-charcoal italic text-center">
                "For God so loved the world, as to give his only begotten Son; that whosoever believeth in him, may not perish, but may have life everlasting."
              </p>
              <p className="mt-4 text-[10px] font-sans text-gold font-medium text-center uppercase tracking-[0.3em]">John 3:16</p>
            </div>

            {/* Last Devotion - Action Bar */}
            <motion.button
              whileHover={{ scale: 1.01, filter: "blur(0.5px)" }}
              whileTap={{ scale: 0.98, filter: "blur(1px)" }}
              onClick={onResume}
              className="w-full flex items-center justify-between p-3 bg-petrine rounded-full shadow-layered border border-gold/30 transition-all group"
            >
              <div className="flex flex-col items-start ml-4">
                <span className="text-[9px] font-sans font-medium text-[#F8F5F0]/80 uppercase tracking-[0.3em]">Continue Reading</span>
                <span className="text-base font-serif text-gold">{book?.name} {lastChapter}</span>
              </div>
              <div className="h-10 w-10 rounded-full bg-gold/10 flex items-center justify-center text-gold group-hover:bg-gold/20 transition-colors mr-1">
                <ChevronRight strokeWidth={1} className="h-5 w-5" />
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
                      <p className="text-sm font-serif text-charcoal font-medium line-clamp-2">"{ref.note}"</p>
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

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 h-16 bg-sanctuary-center/60 backdrop-blur-[12px] border-t border-gold flex items-center justify-center px-6 z-40">
        <div className="flex items-center gap-24">
          <button className="flex flex-col items-center gap-2 text-charcoal">
            <BookOpen strokeWidth={1} className="h-6 w-6" />
            <span className="text-[8px] font-sans font-medium tracking-[0.3em] uppercase">Reading</span>
          </button>
          <button onClick={onOpenLibrary} className="flex flex-col items-center gap-2 text-charcoal/50 hover:text-charcoal transition-colors">
            <Library strokeWidth={1} className="h-6 w-6" />
            <span className="text-[8px] font-sans font-medium tracking-[0.3em] uppercase">Library</span>
          </button>
        </div>
      </div>
    </div>
  );
}
