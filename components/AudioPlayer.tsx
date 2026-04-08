'use client';

import { Play, Pause, SkipForward, SkipBack, Menu, Share, ChevronLeft, ChevronRight } from 'lucide-react';
import { Verse } from '@/lib/bible-data';
import { useEffect, useState, useRef } from 'react';
import { motion } from 'motion/react';

interface AudioPlayerProps {
  verses: Verse[];
  activeVerse: number | null;
  setActiveVerse: (verse: number | null) => void;
  onOpenLibrary: () => void;
  onNextChapter: () => void;
  onPrevChapter: () => void;
}

export default function AudioPlayer({ verses, activeVerse, setActiveVerse, onOpenLibrary, onNextChapter, onPrevChapter }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const synthRef = useRef<SpeechSynthesis | null>(null);
  const currentUtteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const verseIndexRef = useRef<number>(0);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      synthRef.current = window.speechSynthesis;
    }
    
    return () => {
      if (synthRef.current) {
        synthRef.current.cancel();
      }
    };
  }, []);

  // Sync ref with state for callbacks
  useEffect(() => {
    if (activeVerse !== null) {
      const index = verses.findIndex(v => v.verse === activeVerse);
      if (index !== -1) {
        verseIndexRef.current = index;
      }
    }
  }, [activeVerse, verses]);

  const speakVerse = (index: number) => {
    if (!synthRef.current || index >= verses.length || index < 0) {
      stop();
      return;
    }

    const verse = verses[index];
    setActiveVerse(verse.verse);
    verseIndexRef.current = index;

    const utterance = new SpeechSynthesisUtterance(verse.text);
    
    // Try to find a good English voice
    const voices = synthRef.current.getVoices();
    const preferredVoice = voices.find(v => v.name.includes('Google UK English Male') || v.name.includes('Google US English')) || voices.find(v => v.lang.startsWith('en'));
    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }
    
    utterance.rate = 0.9; // Slightly slower for reading
    utterance.pitch = 1;

    utterance.onend = () => {
      // Proceed to next verse automatically if still playing
      if (isPlaying && !isPaused) {
        speakVerse(index + 1);
      }
    };

    utterance.onerror = (event) => {
      console.error('SpeechSynthesisError', event);
      // Sometimes it errors if cancelled, ignore those
    };

    currentUtteranceRef.current = utterance;
    synthRef.current.speak(utterance);
  };

  const play = () => {
    if (!synthRef.current) return;

    if (isPaused) {
      synthRef.current.resume();
      setIsPaused(false);
      setIsPlaying(true);
    } else {
      // Start from active verse or beginning
      synthRef.current.cancel(); // Clear queue
      setIsPlaying(true);
      setIsPaused(false);
      speakVerse(verseIndexRef.current);
    }
  };

  const pause = () => {
    if (!synthRef.current) return;
    synthRef.current.pause();
    setIsPaused(true);
    setIsPlaying(false);
  };

  const stop = () => {
    if (!synthRef.current) return;
    synthRef.current.cancel();
    setIsPlaying(false);
    setIsPaused(false);
    setActiveVerse(null);
    verseIndexRef.current = 0;
  };

  const next = () => {
    if (!synthRef.current) return;
    synthRef.current.cancel();
    if (verseIndexRef.current < verses.length - 1) {
      speakVerse(verseIndexRef.current + 1);
      if (!isPlaying) {
        setIsPlaying(true);
        setIsPaused(false);
      }
    }
  };

  const prev = () => {
    if (!synthRef.current) return;
    synthRef.current.cancel();
    if (verseIndexRef.current > 0) {
      speakVerse(verseIndexRef.current - 1);
      if (!isPlaying) {
        setIsPlaying(true);
        setIsPaused(false);
      }
    }
  };

  const handleShare = async () => {
    if (activeVerse !== null) {
      const verse = verses.find(v => v.verse === activeVerse);
      if (verse) {
        try {
          await navigator.share({
            title: 'Luminate',
            text: `"${verse.text}" - ${verse.verse}`,
            url: window.location.href
          });
        } catch (e) {
          console.log('Error sharing', e);
        }
      }
    } else if (verses.length > 0) {
      try {
        await navigator.share({
          title: 'Luminate',
          text: `Read ${verses[0].bookId} ${verses[0].chapter} on Luminate.`,
          url: window.location.href
        });
      } catch (e) {
        console.log('Error sharing', e);
      }
    }
  };

  // Handle external verse clicks
  useEffect(() => {
    if (activeVerse !== null && isPlaying && !isPaused) {
      const index = verses.findIndex(v => v.verse === activeVerse);
      if (index !== -1 && index !== verseIndexRef.current) {
        synthRef.current?.cancel();
        speakVerse(index);
      }
    }
  }, [activeVerse]);

  // Stop when verses change (e.g., chapter change)
  useEffect(() => {
    stop();
  }, [verses]);

  if (verses.length === 0) return null;

  return (
    <div className="fixed bottom-8 left-0 right-0 z-[100] flex justify-center items-center gap-4 pointer-events-none px-4">
      <motion.button
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        onClick={onPrevChapter}
        className="flex h-[50px] w-[50px] items-center justify-center rounded-full bg-sanctuary-center/80 shadow-layered backdrop-blur-[12px] border border-gold text-charcoal/60 hover:text-charcoal transition-colors pointer-events-auto"
      >
        <ChevronLeft strokeWidth={1} className="h-6 w-6" />
      </motion.button>

      <motion.div 
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="flex h-[50px] items-center gap-4 rounded-full bg-sanctuary-center/80 px-5 shadow-layered backdrop-blur-[12px] border border-gold pointer-events-auto"
      >
        <button
          onClick={onOpenLibrary}
          className="text-charcoal/60 hover:text-charcoal transition-colors"
        >
          <Menu strokeWidth={1} className="h-5 w-5" />
        </button>

        <button
          onClick={prev}
          disabled={verseIndexRef.current === 0}
          className="text-charcoal/40 hover:text-charcoal disabled:opacity-30 transition-colors"
        >
          <SkipBack strokeWidth={1} className="h-5 w-5" />
        </button>

        {isPlaying && !isPaused ? (
          <motion.button
            animate={{ 
              scale: [1, 1.05, 1],
              opacity: [0.8, 1, 0.8]
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 3,
              ease: "easeInOut"
            }}
            onClick={pause}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-petrine text-gold shadow-glow hover:bg-petrine/90 transition-colors"
          >
            <Pause strokeWidth={1} className="h-4 w-4" />
          </motion.button>
        ) : (
          <motion.button
            whileHover={{ scale: 1.05, filter: "blur(0.5px)" }}
            whileTap={{ scale: 0.95, filter: "blur(1px)" }}
            onClick={play}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-petrine text-gold shadow-layered hover:bg-petrine/90 transition-all"
          >
            <Play strokeWidth={1} className="h-4 w-4 ml-0.5" />
          </motion.button>
        )}

        <button
          onClick={next}
          disabled={verseIndexRef.current === verses.length - 1}
          className="text-charcoal/40 hover:text-charcoal disabled:opacity-30 transition-colors"
        >
          <SkipForward strokeWidth={1} className="h-5 w-5" />
        </button>

        <button
          onClick={handleShare}
          className="text-charcoal/60 hover:text-charcoal transition-colors"
        >
          <Share strokeWidth={1} className="h-5 w-5" />
        </button>
      </motion.div>

      <motion.button
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        onClick={onNextChapter}
        className="flex h-[50px] w-[50px] items-center justify-center rounded-full bg-sanctuary-center/80 shadow-layered backdrop-blur-[12px] border border-gold text-charcoal/60 hover:text-charcoal transition-colors pointer-events-auto"
      >
        <ChevronRight strokeWidth={1} className="h-6 w-6" />
      </motion.button>
    </div>
  );
}
