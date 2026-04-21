export interface BibleBook {
  id: string; // The string tag representation e.g. "Genesis"
  numericId: number; // The 1-73 canonical mapping id
  name: string;
  nameLatin?: string;
  nameDutch?: string;
  testament: 'OT' | 'NT';
  chapters: number;
}

export const CATHOLIC_BIBLE_BOOKS: BibleBook[] = [
  // Old Testament (46 Books)
  { id: 'Genesis', numericId: 1, name: 'Genesis', nameLatin: 'Genesis', nameDutch: 'Genesis', testament: 'OT', chapters: 50 },
  { id: 'Exodus', numericId: 2, name: 'Exodus', nameLatin: 'Exodus', nameDutch: 'Exodus', testament: 'OT', chapters: 40 },
  { id: 'Leviticus', numericId: 3, name: 'Leviticus', nameLatin: 'Leviticus', nameDutch: 'Leviticus', testament: 'OT', chapters: 27 },
  { id: 'Numbers', numericId: 4, name: 'Numbers', nameLatin: 'Numeri', nameDutch: 'Numeri', testament: 'OT', chapters: 36 },
  { id: 'Deuteronomy', numericId: 5, name: 'Deuteronomy', nameLatin: 'Deuteronomium', nameDutch: 'Deuteronomium', testament: 'OT', chapters: 34 },
  { id: 'Josue', numericId: 6, name: 'Josue', nameLatin: 'Josue', nameDutch: 'Jozua', testament: 'OT', chapters: 24 },
  { id: 'Judges', numericId: 7, name: 'Judges', nameLatin: 'Judicum', nameDutch: 'Rechters', testament: 'OT', chapters: 21 },
  { id: 'Ruth', numericId: 8, name: 'Ruth', nameLatin: 'Ruth', nameDutch: 'Ruth', testament: 'OT', chapters: 4 },
  { id: '1 Kings', numericId: 9, name: '1 Kings (1 Samuel)', nameLatin: '1 Regum', nameDutch: '1 Samuël', testament: 'OT', chapters: 31 },
  { id: '2 Kings', numericId: 10, name: '2 Kings (2 Samuel)', nameLatin: '2 Regum', nameDutch: '2 Samuël', testament: 'OT', chapters: 24 },
  { id: '3 Kings', numericId: 11, name: '3 Kings (1 Kings)', nameLatin: '3 Regum', nameDutch: '1 Koningen', testament: 'OT', chapters: 22 },
  { id: '4 Kings', numericId: 12, name: '4 Kings (2 Kings)', nameLatin: '4 Regum', nameDutch: '2 Koningen', testament: 'OT', chapters: 25 },
  { id: '1 Paralipomenon', numericId: 13, name: '1 Paralipomenon (1 Chronicles)', nameLatin: '1 Paralipomenon', nameDutch: '1 Kronieken', testament: 'OT', chapters: 29 },
  { id: '2 Paralipomenon', numericId: 14, name: '2 Paralipomenon (2 Chronicles)', nameLatin: '2 Paralipomenon', nameDutch: '2 Kronieken', testament: 'OT', chapters: 36 },
  { id: '1 Esdras', numericId: 15, name: '1 Esdras (Ezra)', nameLatin: '1 Esdrae', nameDutch: 'Ezra', testament: 'OT', chapters: 10 },
  { id: '2 Esdras', numericId: 16, name: '2 Esdras (Nehemiah)', nameLatin: '2 Esdrae', nameDutch: 'Nehemia', testament: 'OT', chapters: 13 },
  { id: 'Tobias', numericId: 17, name: 'Tobias (Tobit)', nameLatin: 'Tobias', nameDutch: 'Tobit', testament: 'OT', chapters: 14 },
  { id: 'Judith', numericId: 18, name: 'Judith', nameLatin: 'Judith', nameDutch: 'Judit', testament: 'OT', chapters: 16 },
  { id: 'Esther', numericId: 19, name: 'Esther', nameLatin: 'Esther', nameDutch: 'Ester', testament: 'OT', chapters: 16 },
  { id: '1 Machabees', numericId: 20, name: '1 Machabees', nameLatin: '1 Machabaeorum', nameDutch: '1 Makkabeeën', testament: 'OT', chapters: 16 },
  { id: '2 Machabees', numericId: 21, name: '2 Machabees', nameLatin: '2 Machabaeorum', nameDutch: '2 Makkabeeën', testament: 'OT', chapters: 15 },
  { id: 'Job', numericId: 22, name: 'Job', nameLatin: 'Job', nameDutch: 'Job', testament: 'OT', chapters: 42 },
  { id: 'Psalms', numericId: 23, name: 'Psalms', nameLatin: 'Psalmi', nameDutch: 'Psalmen', testament: 'OT', chapters: 150 },
  { id: 'Proverbs', numericId: 24, name: 'Proverbs', nameLatin: 'Proverbia', nameDutch: 'Spreuken', testament: 'OT', chapters: 31 },
  { id: 'Ecclesiastes', numericId: 25, name: 'Ecclesiastes', nameLatin: 'Ecclesiastes', nameDutch: 'Prediker', testament: 'OT', chapters: 12 },
  { id: 'Canticles', numericId: 26, name: 'Canticles (Song of Solomon)', nameLatin: 'Canticum Canticorum', nameDutch: 'Hooglied', testament: 'OT', chapters: 8 },
  { id: 'Wisdom', numericId: 27, name: 'Wisdom', nameLatin: 'Sapientia', nameDutch: 'Wijsheid', testament: 'OT', chapters: 19 },
  { id: 'Ecclesiasticus', numericId: 28, name: 'Ecclesiasticus (Sirach)', nameLatin: 'Ecclesiasticus', nameDutch: 'Sirach', testament: 'OT', chapters: 51 },
  { id: 'Isaias', numericId: 29, name: 'Isaias (Isaiah)', nameLatin: 'Isaias', nameDutch: 'Jesaja', testament: 'OT', chapters: 66 },
  { id: 'Jeremias', numericId: 30, name: 'Jeremias (Jeremiah)', nameLatin: 'Jeremias', nameDutch: 'Jeremia', testament: 'OT', chapters: 52 },
  { id: 'Lamentations', numericId: 31, name: 'Lamentations', nameLatin: 'Lamentationes', nameDutch: 'Klaagliederen', testament: 'OT', chapters: 5 },
  { id: 'Baruch', numericId: 32, name: 'Baruch', nameLatin: 'Baruch', nameDutch: 'Baruch', testament: 'OT', chapters: 6 },
  { id: 'Ezechiel', numericId: 33, name: 'Ezechiel (Ezekiel)', nameLatin: 'Ezechiel', nameDutch: 'Ezechiël', testament: 'OT', chapters: 48 },
  { id: 'Daniel', numericId: 34, name: 'Daniel', nameLatin: 'Daniel', nameDutch: 'Daniël', testament: 'OT', chapters: 14 },
  { id: 'Osee', numericId: 35, name: 'Osee (Hosea)', nameLatin: 'Osee', nameDutch: 'Hosea', testament: 'OT', chapters: 14 },
  { id: 'Joel', numericId: 36, name: 'Joel', nameLatin: 'Joel', nameDutch: 'Joël', testament: 'OT', chapters: 3 },
  { id: 'Amos', numericId: 37, name: 'Amos', nameLatin: 'Amos', nameDutch: 'Amos', testament: 'OT', chapters: 9 },
  { id: 'Abdias', numericId: 38, name: 'Abdias (Obadiah)', nameLatin: 'Abdias', nameDutch: 'Obadja', testament: 'OT', chapters: 1 },
  { id: 'Jonas', numericId: 39, name: 'Jonas (Jonah)', nameLatin: 'Jonas', nameDutch: 'Jona', testament: 'OT', chapters: 4 },
  { id: 'Micheas', numericId: 40, name: 'Micheas (Micah)', nameLatin: 'Michaeas', nameDutch: 'Micha', testament: 'OT', chapters: 7 },
  { id: 'Nahum', numericId: 41, name: 'Nahum', nameLatin: 'Nahum', nameDutch: 'Nahum', testament: 'OT', chapters: 3 },
  { id: 'Habacuc', numericId: 42, name: 'Habacuc (Habakkuk)', nameLatin: 'Habacuc', nameDutch: 'Habakuk', testament: 'OT', chapters: 3 },
  { id: 'Sophonias', numericId: 43, name: 'Sophonias (Zephaniah)', nameLatin: 'Sophonias', nameDutch: 'Sefanja', testament: 'OT', chapters: 3 },
  { id: 'Aggeus', numericId: 44, name: 'Aggeus (Haggai)', nameLatin: 'Aggaeus', nameDutch: 'Haggai', testament: 'OT', chapters: 2 },
  { id: 'Zacharias', numericId: 45, name: 'Zacharias (Zechariah)', nameLatin: 'Zacharias', nameDutch: 'Zacharia', testament: 'OT', chapters: 14 },
  { id: 'Malachias', numericId: 46, name: 'Malachias (Malachi)', nameLatin: 'Malachias', nameDutch: 'Maleachi', testament: 'OT', chapters: 4 },
  
  // New Testament (27 Books)
  { id: 'Matthew', numericId: 47, name: 'Matthew', nameLatin: 'Matthaeus', nameDutch: 'Matteüs', testament: 'NT', chapters: 28 },
  { id: 'Mark', numericId: 48, name: 'Mark', nameLatin: 'Marcus', nameDutch: 'Marcus', testament: 'NT', chapters: 16 },
  { id: 'Luke', numericId: 49, name: 'Luke', nameLatin: 'Lucas', nameDutch: 'Lucas', testament: 'NT', chapters: 24 },
  { id: 'John', numericId: 50, name: 'John', nameLatin: 'Joannes', nameDutch: 'Johannes', testament: 'NT', chapters: 21 },
  { id: 'Acts', numericId: 51, name: 'Acts', nameLatin: 'Actus Apostolorum', nameDutch: 'Handelingen', testament: 'NT', chapters: 28 },
  { id: 'Romans', numericId: 52, name: 'Romans', nameLatin: 'Romani', nameDutch: 'Romeinen', testament: 'NT', chapters: 16 },
  { id: '1 Corinthians', numericId: 53, name: '1 Corinthians', nameLatin: '1 Corinthios', nameDutch: '1 Korintiërs', testament: 'NT', chapters: 16 },
  { id: '2 Corinthians', numericId: 54, name: '2 Corinthians', nameLatin: '2 Corinthios', nameDutch: '2 Korintiërs', testament: 'NT', chapters: 13 },
  { id: 'Galatians', numericId: 55, name: 'Galatians', nameLatin: 'Galatas', nameDutch: 'Galaten', testament: 'NT', chapters: 6 },
  { id: 'Ephesians', numericId: 56, name: 'Ephesians', nameLatin: 'Ephesios', nameDutch: 'Efeziërs', testament: 'NT', chapters: 6 },
  { id: 'Philippians', numericId: 57, name: 'Philippians', nameLatin: 'Philippenses', nameDutch: 'Filippenzen', testament: 'NT', chapters: 4 },
  { id: 'Colossians', numericId: 58, name: 'Colossians', nameLatin: 'Colossenses', nameDutch: 'Kolossenzen', testament: 'NT', chapters: 4 },
  { id: '1 Thessalonians', numericId: 59, name: '1 Thessalonians', nameLatin: '1 Thessalonicenses', nameDutch: '1 Tessalonicenzen', testament: 'NT', chapters: 5 },
  { id: '2 Thessalonians', numericId: 60, name: '2 Thessalonians', nameLatin: '2 Thessalonicenses', nameDutch: '2 Tessalonicenzen', testament: 'NT', chapters: 3 },
  { id: '1 Timothy', numericId: 61, name: '1 Timothy', nameLatin: '1 Timotheum', nameDutch: '1 Timoteüs', testament: 'NT', chapters: 6 },
  { id: '2 Timothy', numericId: 62, name: '2 Timothy', nameLatin: '2 Timotheum', nameDutch: '2 Timoteüs', testament: 'NT', chapters: 4 },
  { id: 'Titus', numericId: 63, name: 'Titus', nameLatin: 'Titum', nameDutch: 'Titus', testament: 'NT', chapters: 3 },
  { id: 'Philemon', numericId: 64, name: 'Philemon', nameLatin: 'Philemonem', nameDutch: 'Filemon', testament: 'NT', chapters: 1 },
  { id: 'Hebrews', numericId: 65, name: 'Hebrews', nameLatin: 'Hebraeos', nameDutch: 'Hebreeën', testament: 'NT', chapters: 13 },
  { id: 'James', numericId: 66, name: 'James', nameLatin: 'Jacobus', nameDutch: 'Jakobus', testament: 'NT', chapters: 5 },
  { id: '1 Peter', numericId: 67, name: '1 Peter', nameLatin: '1 Petrus', nameDutch: '1 Petrus', testament: 'NT', chapters: 5 },
  { id: '2 Peter', numericId: 68, name: '2 Peter', nameLatin: '2 Petrus', nameDutch: '2 Petrus', testament: 'NT', chapters: 3 },
  { id: '1 John', numericId: 69, name: '1 John', nameLatin: '1 Joannes', nameDutch: '1 Johannes', testament: 'NT', chapters: 5 },
  { id: '2 John', numericId: 70, name: '2 John', nameLatin: '2 Joannes', nameDutch: '2 Johannes', testament: 'NT', chapters: 1 },
  { id: '3 John', numericId: 71, name: '3 John', nameLatin: '3 Joannes', nameDutch: '3 Johannes', testament: 'NT', chapters: 1 },
  { id: 'Jude', numericId: 72, name: 'Jude', nameLatin: 'Judas', nameDutch: 'Judas', testament: 'NT', chapters: 1 },
  { id: 'Apocalypse', numericId: 73, name: 'Apocalypse (Revelation)', nameLatin: 'Apocalypsis', nameDutch: 'Openbaring', testament: 'NT', chapters: 22 },
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

export const getNextChapter = (currentBookId: string, currentChapter: number): { bookId: string, chapter: number } | null => {
  const bookIndex = CATHOLIC_BIBLE_BOOKS.findIndex(b => b.id === currentBookId);
  if (bookIndex === -1) return null;
  
  const book = CATHOLIC_BIBLE_BOOKS[bookIndex];
  if (currentChapter < book.chapters) {
    return { bookId: currentBookId, chapter: currentChapter + 1 };
  } else if (bookIndex < CATHOLIC_BIBLE_BOOKS.length - 1) {
    return { bookId: CATHOLIC_BIBLE_BOOKS[bookIndex + 1].id, chapter: 1 };
  }
  return null;
};

export const getPrevChapter = (currentBookId: string, currentChapter: number): { bookId: string, chapter: number } | null => {
  const bookIndex = CATHOLIC_BIBLE_BOOKS.findIndex(b => b.id === currentBookId);
  if (bookIndex === -1) return null;
  
  if (currentChapter > 1) {
    return { bookId: currentBookId, chapter: currentChapter - 1 };
  } else if (bookIndex > 0) {
    const prevBook = CATHOLIC_BIBLE_BOOKS[bookIndex - 1];
    return { bookId: prevBook.id, chapter: prevBook.chapters };
  }
  return null;
};
