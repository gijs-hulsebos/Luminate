'use client';

import React, { useEffect, useRef } from 'react';
import { Verse, CATHOLIC_BIBLE_BOOKS } from '@/lib/bible-data';
import { Loader2, PenLine } from 'lucide-react';
import { motion } from 'motion/react';

interface ReadingPaneProps {
  bookId: string;
  chapter: number;
  verses: Verse[];
  isLoading: boolean;
  activeVerse: number | null;
  onVerseClick: (verseNum: number | null) => void;
  reflections?: any[];
}

const VerseItem = React.memo(({ 
  verse, 
  isActive, 
  hasActiveVerse,
  distance,
  onClick, 
  activeRef,
  reflection
}: { 
  verse: Verse; 
  isActive: boolean; 
  hasActiveVerse: boolean;
  distance: number;
  onClick: (v: number | null) => void; 
  activeRef: React.RefObject<HTMLParagraphElement | null>;
  reflection?: any;
}) => {
  let containerClasses = "mb-6 leading-[1.8] text-lg md:text-xl cursor-pointer transition-all duration-[800ms] ease-in-out rounded-xl px-4 py-2 -mx-4 relative ";
  
  if (hasActiveVerse) {
    if (isActive) {
      containerClasses += "text-[#D4AF37] font-medium bg-[#D4AF37]/10 shadow-[0_0_15px_rgba(212,175,55,0.15)] opacity-100 blur-none";
    } else if (distance === 1) {
      containerClasses += "text-charcoal opacity-80 blur-none hover:blur-none hover:opacity-100";
    } else if (distance <= 3) {
      containerClasses += "text-charcoal opacity-60 blur-[1.5px] hover:blur-none hover:opacity-100";
    } else {
      containerClasses += "text-charcoal opacity-40 blur-[3px] hover:blur-none hover:opacity-100";
    }
  } else {
    containerClasses += "text-charcoal hover:text-petrine/80 dark:hover:text-gold/80 hover:blur-[0.5px]";
  }

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (hasActiveVerse && !isActive) {
      onClick(null);
    } else if (hasActiveVerse && isActive) {
      onClick(null);
    } else {
      onClick(verse.verse);
    }
  };

  return (
    <p
      ref={isActive ? activeRef : null}
      onClick={handleClick}
      className={containerClasses}
    >
      <sup className="mr-2 text-xs font-sans font-medium text-gold select-none">
        {verse.verse}
      </sup>
      {reflection?.color && !isActive && (
        <span 
          className="absolute inset-0 rounded-xl opacity-10 pointer-events-none" 
          style={{ backgroundColor: reflection.color }}
        />
      )}
      <span style={reflection?.color && !isActive ? { color: reflection.color, fontWeight: 500 } : {}}>
        {verse.text}
      </span>
      {reflection?.note && (
        <span className="inline-flex items-center justify-center ml-2 text-gold opacity-70">
          <PenLine className="w-4 h-4" />
        </span>
      )}
    </p>
  );
});

VerseItem.displayName = 'VerseItem';

const ReadingPane = React.memo(({ bookId, chapter, verses, isLoading, activeVerse, onVerseClick, reflections = [] }: ReadingPaneProps) => {
  const book = CATHOLIC_BIBLE_BOOKS.find(b => b.id === bookId);
  const activeVerseRef = useRef<HTMLParagraphElement>(null);
  const hasActiveVerse = activeVerse !== null;

  // Scroll to active verse when it changes via TTS
  useEffect(() => {
    if (activeVerse && activeVerseRef.current) {
      activeVerseRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [activeVerse]);

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-gold" />
      </div>
    );
  }

  if (!book || verses.length === 0) {
    return (
      <div className="flex h-full items-center justify-center text-charcoal/50 font-serif">
        Select a book and chapter to begin reading.
      </div>
    );
  }

  const activeIndex = activeVerse !== null ? verses.findIndex(v => v.verse === activeVerse) : -1;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="mx-auto max-w-[70ch] px-4 py-4 md:px-8 md:py-8"
      style={{ paddingBottom: '30vh' }}
    >
      <div className="mb-12 text-center">
        <h1 className="font-serif text-4xl font-medium text-charcoal md:text-5xl tracking-wide">
          {book.name}
        </h1>
        <h2 className="mt-4 font-serif text-xl text-gold">
          Chapter {chapter}
        </h2>
      </div>

      <div className="font-serif text-charcoal">
        {verses.map((verse, index) => {
          const distance = activeIndex !== -1 ? Math.abs(index - activeIndex) : 0;
          const reflection = reflections.find(r => r.verse === verse.verse);
          return (
            <VerseItem
              key={verse.verse}
              verse={verse}
              isActive={activeVerse === verse.verse}
              hasActiveVerse={hasActiveVerse}
              distance={distance}
              onClick={onVerseClick}
              activeRef={activeVerseRef}
              reflection={reflection}
            />
          );
        })}
      </div>
    </motion.div>
  );
});

ReadingPane.displayName = 'ReadingPane';

export default ReadingPane;
