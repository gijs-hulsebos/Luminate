export interface BibleBook {
  id: string;
  name: string;
  testament: 'OT' | 'NT';
  chapters: number;
}

export const CATHOLIC_BIBLE_BOOKS: BibleBook[] = [
  // Old Testament (46 Books)
  { id: 'Genesis', name: 'Genesis', testament: 'OT', chapters: 50 },
  { id: 'Exodus', name: 'Exodus', testament: 'OT', chapters: 40 },
  { id: 'Leviticus', name: 'Leviticus', testament: 'OT', chapters: 27 },
  { id: 'Numbers', name: 'Numbers', testament: 'OT', chapters: 36 },
  { id: 'Deuteronomy', name: 'Deuteronomy', testament: 'OT', chapters: 34 },
  { id: 'Josue', name: 'Josue', testament: 'OT', chapters: 24 },
  { id: 'Judges', name: 'Judges', testament: 'OT', chapters: 21 },
  { id: 'Ruth', name: 'Ruth', testament: 'OT', chapters: 4 },
  { id: '1 Kings', name: '1 Kings (1 Samuel)', testament: 'OT', chapters: 31 },
  { id: '2 Kings', name: '2 Kings (2 Samuel)', testament: 'OT', chapters: 24 },
  { id: '3 Kings', name: '3 Kings (1 Kings)', testament: 'OT', chapters: 22 },
  { id: '4 Kings', name: '4 Kings (2 Kings)', testament: 'OT', chapters: 25 },
  { id: '1 Paralipomenon', name: '1 Paralipomenon (1 Chronicles)', testament: 'OT', chapters: 29 },
  { id: '2 Paralipomenon', name: '2 Paralipomenon (2 Chronicles)', testament: 'OT', chapters: 36 },
  { id: '1 Esdras', name: '1 Esdras (Ezra)', testament: 'OT', chapters: 10 },
  { id: '2 Esdras', name: '2 Esdras (Nehemiah)', testament: 'OT', chapters: 13 },
  { id: 'Tobias', name: 'Tobias (Tobit)', testament: 'OT', chapters: 14 },
  { id: 'Judith', name: 'Judith', testament: 'OT', chapters: 16 },
  { id: 'Esther', name: 'Esther', testament: 'OT', chapters: 16 },
  { id: '1 Machabees', name: '1 Machabees', testament: 'OT', chapters: 16 },
  { id: '2 Machabees', name: '2 Machabees', testament: 'OT', chapters: 15 },
  { id: 'Job', name: 'Job', testament: 'OT', chapters: 42 },
  { id: 'Psalms', name: 'Psalms', testament: 'OT', chapters: 150 },
  { id: 'Proverbs', name: 'Proverbs', testament: 'OT', chapters: 31 },
  { id: 'Ecclesiastes', name: 'Ecclesiastes', testament: 'OT', chapters: 12 },
  { id: 'Canticles', name: 'Canticles (Song of Solomon)', testament: 'OT', chapters: 8 },
  { id: 'Wisdom', name: 'Wisdom', testament: 'OT', chapters: 19 },
  { id: 'Ecclesiasticus', name: 'Ecclesiasticus (Sirach)', testament: 'OT', chapters: 51 },
  { id: 'Isaias', name: 'Isaias (Isaiah)', testament: 'OT', chapters: 66 },
  { id: 'Jeremias', name: 'Jeremias (Jeremiah)', testament: 'OT', chapters: 52 },
  { id: 'Lamentations', name: 'Lamentations', testament: 'OT', chapters: 5 },
  { id: 'Baruch', name: 'Baruch', testament: 'OT', chapters: 6 },
  { id: 'Ezechiel', name: 'Ezechiel (Ezekiel)', testament: 'OT', chapters: 48 },
  { id: 'Daniel', name: 'Daniel', testament: 'OT', chapters: 14 },
  { id: 'Osee', name: 'Osee (Hosea)', testament: 'OT', chapters: 14 },
  { id: 'Joel', name: 'Joel', testament: 'OT', chapters: 3 },
  { id: 'Amos', name: 'Amos', testament: 'OT', chapters: 9 },
  { id: 'Abdias', name: 'Abdias (Obadiah)', testament: 'OT', chapters: 1 },
  { id: 'Jonas', name: 'Jonas (Jonah)', testament: 'OT', chapters: 4 },
  { id: 'Micheas', name: 'Micheas (Micah)', testament: 'OT', chapters: 7 },
  { id: 'Nahum', name: 'Nahum', testament: 'OT', chapters: 3 },
  { id: 'Habacuc', name: 'Habacuc (Habakkuk)', testament: 'OT', chapters: 3 },
  { id: 'Sophonias', name: 'Sophonias (Zephaniah)', testament: 'OT', chapters: 3 },
  { id: 'Aggeus', name: 'Aggeus (Haggai)', testament: 'OT', chapters: 2 },
  { id: 'Zacharias', name: 'Zacharias (Zechariah)', testament: 'OT', chapters: 14 },
  { id: 'Malachias', name: 'Malachias (Malachi)', testament: 'OT', chapters: 4 },
  
  // New Testament (27 Books)
  { id: 'Matthew', name: 'Matthew', testament: 'NT', chapters: 28 },
  { id: 'Mark', name: 'Mark', testament: 'NT', chapters: 16 },
  { id: 'Luke', name: 'Luke', testament: 'NT', chapters: 24 },
  { id: 'John', name: 'John', testament: 'NT', chapters: 21 },
  { id: 'Acts', name: 'Acts', testament: 'NT', chapters: 28 },
  { id: 'Romans', name: 'Romans', testament: 'NT', chapters: 16 },
  { id: '1 Corinthians', name: '1 Corinthians', testament: 'NT', chapters: 16 },
  { id: '2 Corinthians', name: '2 Corinthians', testament: 'NT', chapters: 13 },
  { id: 'Galatians', name: 'Galatians', testament: 'NT', chapters: 6 },
  { id: 'Ephesians', name: 'Ephesians', testament: 'NT', chapters: 6 },
  { id: 'Philippians', name: 'Philippians', testament: 'NT', chapters: 4 },
  { id: 'Colossians', name: 'Colossians', testament: 'NT', chapters: 4 },
  { id: '1 Thessalonians', name: '1 Thessalonians', testament: 'NT', chapters: 5 },
  { id: '2 Thessalonians', name: '2 Thessalonians', testament: 'NT', chapters: 3 },
  { id: '1 Timothy', name: '1 Timothy', testament: 'NT', chapters: 6 },
  { id: '2 Timothy', name: '2 Timothy', testament: 'NT', chapters: 4 },
  { id: 'Titus', name: 'Titus', testament: 'NT', chapters: 3 },
  { id: 'Philemon', name: 'Philemon', testament: 'NT', chapters: 1 },
  { id: 'Hebrews', name: 'Hebrews', testament: 'NT', chapters: 13 },
  { id: 'James', name: 'James', testament: 'NT', chapters: 5 },
  { id: '1 Peter', name: '1 Peter', testament: 'NT', chapters: 5 },
  { id: '2 Peter', name: '2 Peter', testament: 'NT', chapters: 3 },
  { id: '1 John', name: '1 John', testament: 'NT', chapters: 5 },
  { id: '2 John', name: '2 John', testament: 'NT', chapters: 1 },
  { id: '3 John', name: '3 John', testament: 'NT', chapters: 1 },
  { id: 'Jude', name: 'Jude', testament: 'NT', chapters: 1 },
  { id: 'Apocalypse', name: 'Apocalypse (Revelation)', testament: 'NT', chapters: 22 },
];

export interface Verse {
  bookId: string;
  chapter: number;
  verse: number;
  text: string;
}

// Global cache for the bible data
let bibleDataCache: any = null;

export const fetchChapterData = async (bookId: string, chapter: number): Promise<Verse[]> => {
  const book = CATHOLIC_BIBLE_BOOKS.find(b => b.id === bookId);
  if (!book) throw new Error('Book not found');

  if (!bibleDataCache) {
    const response = await fetch('/data/bible.json');
    if (!response.ok) {
      throw new Error('Failed to fetch bible data');
    }
    bibleDataCache = await response.json();
  }

  const bookData = bibleDataCache[bookId];
  if (!bookData) {
    throw new Error(`Data for book ${bookId} not found`);
  }

  const chapterData = bookData[chapter.toString()];
  if (!chapterData) {
    throw new Error(`Data for chapter ${chapter} not found`);
  }

  const verses: Verse[] = [];
  
  // The verses are stored as an object with verse numbers as keys
  for (const [verseNumStr, text] of Object.entries(chapterData)) {
    // Sanitize text: strip out markdown artifacts like *, **, ***
    const sanitizedText = (text as string).replace(/\*/g, '');
    
    verses.push({
      bookId,
      chapter,
      verse: parseInt(verseNumStr, 10),
      text: sanitizedText,
    });
  }
  
  // Sort by verse number
  verses.sort((a, b) => a.verse - b.verse);
  
  return verses;
};
