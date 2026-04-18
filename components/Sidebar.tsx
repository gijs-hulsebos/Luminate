'use client';

import React, { useState, useMemo } from 'react';
import { CATHOLIC_BIBLE_BOOKS, BibleBook } from '@/lib/bible-data';
import { ChevronDown, ChevronRight, Book, Search } from 'lucide-react';

interface SidebarProps {
  selectedBook: string;
  selectedChapter: number;
  onSelectChapter: (bookId: string, chapter: number) => void;
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar = React.memo(({ selectedBook, selectedChapter, onSelectChapter, isOpen, onClose }: SidebarProps) => {
  const [expandedTestament, setExpandedTestament] = useState<'OT' | 'NT' | null>('NT');
  const [expandedBook, setExpandedBook] = useState<string | null>(selectedBook);
  const [searchQuery, setSearchQuery] = useState('');

  const otBooks = useMemo(() => 
    CATHOLIC_BIBLE_BOOKS.filter(b => b.testament === 'OT' && b.name.toLowerCase().includes(searchQuery.toLowerCase())),
  [searchQuery]);
  
  const ntBooks = useMemo(() => 
    CATHOLIC_BIBLE_BOOKS.filter(b => b.testament === 'NT' && b.name.toLowerCase().includes(searchQuery.toLowerCase())),
  [searchQuery]);

  const handleBookClick = (bookId: string) => {
    setExpandedBook(expandedBook === bookId ? null : bookId);
  };

  const renderTestamentSection = (title: string, testament: 'OT' | 'NT', books: BibleBook[]) => {
    if (books.length === 0) return null;
    
    return (
      <div className="mb-4">
        <button
          onClick={() => setExpandedTestament(expandedTestament === testament ? null : testament)}
          className="flex w-full items-center justify-between rounded-md px-3 py-2 text-[11px] font-sans font-medium uppercase tracking-[0.2em] text-petrine hover:bg-petrine/5 transition-colors"
        >
          <span>{title}</span>
          {expandedTestament === testament ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
        </button>
        
        {(expandedTestament === testament || searchQuery) && (
          <div className="mt-1 space-y-1 pl-2">
            {books.map((book) => (
              <div key={book.id}>
                <button
                  onClick={() => handleBookClick(book.id)}
                  className={`flex w-full items-center justify-between rounded-md px-3 py-2 text-sm font-serif transition-colors ${
                    expandedBook === book.id || selectedBook === book.id
                      ? 'bg-petrine/5 font-medium text-petrine'
                      : 'text-charcoal/70 hover:bg-petrine/5 hover:text-petrine'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Book className="h-3.5 w-3.5 opacity-70 text-gold" />
                    <span>{book.name}</span>
                  </div>
                  {expandedBook === book.id ? <ChevronDown className="h-3.5 w-3.5 text-gold" /> : <ChevronRight className="h-3.5 w-3.5 text-gold" />}
                </button>
                
                {expandedBook === book.id && (
                  <div className="mt-2 grid grid-cols-5 gap-1.5 pl-6 pr-2 pb-3">
                    {Array.from({ length: book.chapters }, (_, i) => i + 1).map((chapter) => (
                      <button
                        key={chapter}
                        onClick={() => {
                          onSelectChapter(book.id, chapter);
                          if (window.innerWidth < 768) onClose();
                        }}
                        className={`flex h-8 items-center justify-center rounded-md text-xs font-sans transition-colors ${
                          selectedBook === book.id && selectedChapter === chapter
                            ? 'bg-petrine text-gold font-medium shadow-layered'
                            : 'bg-card border border-border text-charcoal hover:border-gold hover:text-petrine'
                        }`}
                      >
                        {chapter}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm md:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-72 transform border-r border-border bg-sanctuary-center pt-14 transition-transform duration-300 ease-in-out md:static md:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="h-full flex flex-col">
          <div className="p-4 pb-2">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gold" />
              <input
                type="text"
                placeholder="Search books..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-md border border-border bg-card py-2 pl-9 pr-3 text-sm font-sans text-charcoal placeholder:text-charcoal/40 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold transition-colors"
              />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-4 pb-24 scrollbar-thin scrollbar-thumb-gold/20 scrollbar-track-transparent">
            {renderTestamentSection("Old Testament", "OT", otBooks)}
            {renderTestamentSection("New Testament", "NT", ntBooks)}
          </div>
        </div>
      </aside>
    </>
  );
});

Sidebar.displayName = 'Sidebar';

export default Sidebar;
