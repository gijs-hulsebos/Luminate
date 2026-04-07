'use client';

import { CATHOLIC_BIBLE_BOOKS } from '@/lib/bible-data';
import { motion } from 'motion/react';
import { BookOpen, Library, ChevronRight } from 'lucide-react';

interface DashboardProps {
  user: any;
  lastBookId: string;
  lastChapter: number;
  onResume: () => void;
  onOpenLibrary: () => void;
  onVerseOfDayClick: () => void;
}

export default function Dashboard({ user, lastBookId, lastChapter, onResume, onOpenLibrary, onVerseOfDayClick }: DashboardProps) {
  const book = CATHOLIC_BIBLE_BOOKS.find(b => b.id === lastBookId);

  const hour = new Date().getHours();
  let greeting = 'Good Evening';
  if (hour < 12) greeting = 'Good Morning';
  else if (hour < 18) greeting = 'Good Afternoon';

  return (
    <div className="flex-1 flex flex-col relative pb-24">
      <div className="flex-1 flex flex-col items-center p-6 pt-4">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-md w-full space-y-6"
        >
          <h1 className="text-4xl md:text-5xl font-serif font-light text-charcoal text-center tracking-wide">
            {greeting}{user ? `, ${user.name.split(' ')[0]}` : ''}
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
              className="w-full flex items-center justify-between p-3 bg-petrine rounded-full shadow-layered border border-border transition-all group"
            >
              <div className="flex flex-col items-start ml-4">
                <span className="text-[9px] font-sans font-medium text-gold/80 uppercase tracking-[0.3em]">Continue Reading</span>
                <span className="text-base font-serif text-gold">{book?.name} {lastChapter}</span>
              </div>
              <div className="h-10 w-10 rounded-full bg-gold/10 flex items-center justify-center text-gold group-hover:bg-gold/20 transition-colors mr-1">
                <ChevronRight strokeWidth={1} className="h-5 w-5" />
              </div>
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 h-16 bg-sanctuary-center/60 backdrop-blur-[12px] border-t border-gold flex items-center justify-center px-6 z-40">
        <div className="flex items-center gap-24">
          <button className="flex flex-col items-center gap-2 text-petrine">
            <BookOpen strokeWidth={1} className="h-6 w-6" />
            <span className="text-[8px] font-sans font-medium tracking-[0.3em] uppercase">Reading</span>
          </button>
          <button onClick={onOpenLibrary} className="flex flex-col items-center gap-2 text-gold hover:text-petrine transition-colors">
            <Library strokeWidth={1} className="h-6 w-6" />
            <span className="text-[8px] font-sans font-medium tracking-[0.3em] uppercase">Library</span>
          </button>
        </div>
      </div>
    </div>
  );
}
