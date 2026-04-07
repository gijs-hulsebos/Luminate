'use client';

import React, { useEffect, useRef } from 'react';
import { Verse, CATHOLIC_BIBLE_BOOKS } from '@/lib/bible-data';
import { Loader2 } from 'lucide-react';
import { motion } from 'motion/react';

interface ReadingPaneProps {
  bookId: string;
  chapter: number;
  verses: Verse[];
  isLoading: boolean;
  activeVerse: number | null;
  onVerseClick: (verseNum: number | null) => void;
}

const VerseItem = React.memo(({ 
  verse, 
  isActive, 
  hasActiveVerse,
  onClick, 
  activeRef 
}: { 
  verse: Verse; 
  isActive: boolean; 
  hasActiveVerse: boolean;
  onClick: (v: number | null) => void; 
  activeRef: React.RefObject<HTMLParagraphElement | null>;
}) => {
  let containerClasses = "mb-6 leading-[1.8] text-lg md:text-xl cursor-pointer transition-all duration-500 rounded-xl px-4 py-2 -mx-4 ";
  
  if (hasActiveVerse) {
    if (isActive) {
      containerClasses += "text-gold font-medium bg-gold/10 shadow-[0_0_15px_rgba(212,175,55,0.15)]";
    } else {
      containerClasses += "text-charcoal opacity-20 blur-[8px] hover:blur-none hover:opacity-60";
    }
  } else {
    containerClasses += "text-charcoal hover:text-petrine/80 hover:blur-[0.5px]";
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
      {verse.text}
    </p>
  );
});

VerseItem.displayName = 'VerseItem';

const ReadingPane = React.memo(({ bookId, chapter, verses, isLoading, activeVerse, onVerseClick }: ReadingPaneProps) => {
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

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="mx-auto max-w-[70ch] px-4 py-8 md:px-8 md:py-12"
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
        {verses.map((verse) => (
          <VerseItem
            key={verse.verse}
            verse={verse}
            isActive={activeVerse === verse.verse}
            hasActiveVerse={hasActiveVerse}
            onClick={onVerseClick}
            activeRef={activeVerseRef}
          />
        ))}
      </div>
    </motion.div>
  );
});

ReadingPane.displayName = 'ReadingPane';

export default ReadingPane;
