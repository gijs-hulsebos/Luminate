import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bookmark, Pen, X } from 'lucide-react';

interface ActionSheetProps {
  isOpen: boolean;
  onClose: () => void;
  verseNum: number | null;
  book: string;
  chapter: number;
  userId: string;
  onSaveReflection: (data: any) => void;
  existingReflection?: any;
}

const COLORS = [
  { id: 'gold', hex: '#B59410' },
  { id: 'crimson', hex: '#8C1C1C' },
  { id: 'marian', hex: '#0A4D80' },
  { id: 'moss', hex: '#4B5E3C' },
];

export default function ActionSheet({
  isOpen,
  onClose,
  verseNum,
  book,
  chapter,
  userId,
  onSaveReflection,
  existingReflection
}: ActionSheetProps) {
  const [isNoteOpen, setIsNoteOpen] = useState(false);
  const [noteText, setNoteText] = useState('');
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        setIsNoteOpen(false);
        if (existingReflection) {
          setNoteText(existingReflection.note || '');
          setSelectedColor(existingReflection.color || null);
          setIsSaved(true);
        } else {
          setNoteText('');
          setSelectedColor(null);
          setIsSaved(false);
        }
      }, 0);
    }
  }, [isOpen, existingReflection]);

  const handleSave = () => {
    const newSavedState = !isSaved;
    setIsSaved(newSavedState);
    if (newSavedState) {
      onSaveReflection({ book, chapter, verse: verseNum, color: selectedColor, note: noteText, isSaved: true });
    } else {
      onSaveReflection({ book, chapter, verse: verseNum, color: selectedColor, note: noteText, isSaved: false });
    }
  };

  const handleColorSelect = (colorHex: string) => {
    const newColor = selectedColor === colorHex ? null : colorHex;
    setSelectedColor(newColor);
    onSaveReflection({ book, chapter, verse: verseNum, color: newColor, note: noteText, isSaved });
  };

  const handleNoteSave = () => {
    setIsNoteOpen(false);
    onSaveReflection({ book, chapter, verse: verseNum, color: selectedColor, note: noteText, isSaved });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="fixed bottom-0 left-0 right-0 z-50 rounded-t-3xl bg-[#05080F]/90 backdrop-blur-[20px] border-t border-[#D4AF37]/30 p-6 shadow-[0_-10px_40px_rgba(0,0,0,0.5)]"
        >
          <div className="mx-auto max-w-md">
            <div className="flex items-center justify-between mb-6">
              <div className="text-[#F8F5F0] font-serif">
                <span className="text-[#D4AF37] font-medium mr-2">{book} {chapter}:{verseNum}</span>
              </div>
              <button onClick={onClose} className="p-2 rounded-full text-[#F8F5F0]/50 hover:text-[#F8F5F0] hover:bg-[#B59410]/10 hover:scale-110 transition-all duration-100">
                <X className="w-5 h-5" />
              </button>
            </div>

            {isNoteOpen ? (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="space-y-4"
              >
                <textarea
                  value={noteText}
                  onChange={(e) => setNoteText(e.target.value)}
                  placeholder="Write your reflection here..."
                  className="w-full h-32 bg-transparent border border-[#D4AF37]/30 rounded-xl p-4 text-[#F8F5F0] font-serif text-lg focus:outline-none focus:border-[#D4AF37] resize-none"
                  style={{ fontFamily: '"EB Garamond", serif' }}
                />
                <div className="flex justify-end gap-3">
                  <button 
                    onClick={() => setIsNoteOpen(false)}
                    className="px-4 py-2 text-sm font-sans text-[#F8F5F0]/70 hover:text-[#F8F5F0]"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={handleNoteSave}
                    className="px-4 py-2 text-sm font-sans bg-[#D4AF37] text-charcoal rounded-lg font-medium"
                  >
                    Save Note
                  </button>
                </div>
              </motion.div>
            ) : (
              <div className="flex items-center justify-between">
                <div className="flex gap-4">
                  <button 
                    onClick={handleSave}
                    className={`flex flex-col items-center gap-2 p-2 rounded-lg transition-all duration-100 hover:bg-[#B59410]/10 hover:scale-105 ${isSaved ? 'text-[#D4AF37]' : 'text-[#F8F5F0]/70 hover:text-[#F8F5F0]'}`}
                  >
                    <Bookmark className="w-6 h-6" fill={isSaved ? 'currentColor' : 'none'} />
                    <span className="text-xs font-sans">Save</span>
                  </button>
                  <button 
                    onClick={() => setIsNoteOpen(true)}
                    className={`flex flex-col items-center gap-2 p-2 rounded-lg transition-all duration-100 hover:bg-[#B59410]/10 hover:scale-105 ${noteText ? 'text-[#D4AF37]' : 'text-[#F8F5F0]/70 hover:text-[#F8F5F0]'}`}
                  >
                    <Pen className="w-6 h-6" fill={noteText ? 'currentColor' : 'none'} />
                    <span className="text-xs font-sans">Note</span>
                  </button>
                </div>

                <div className="flex items-center gap-3 bg-white/5 p-2 rounded-full border border-white/10">
                  {COLORS.map((color) => (
                    <button
                      key={color.id}
                      onClick={() => handleColorSelect(color.hex)}
                      className={`w-8 h-8 rounded-full transition-transform ${selectedColor === color.hex ? 'scale-110 ring-2 ring-white/50' : 'hover:scale-110'}`}
                      style={{ backgroundColor: color.hex, border: color.hex === '#05080F' ? '1px solid rgba(255,255,255,0.2)' : 'none' }}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
