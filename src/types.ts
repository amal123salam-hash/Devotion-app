export interface BibleVerse {
  reference: string;
  text: string;
}

export interface Devotional {
  id: string;
  title: string;
  type: string;
  verse: string;
  verseText: string;
  time: string;
  guidance: string;
  image: string;
  content: string;
  completed?: boolean;
}

export interface MediaItem {
  id: string;
  title: string;
  category: string;
  description: string;
  imageUrl: string;
  duration: string;
  isLive?: boolean;
  videoUrl?: string; // Standard public visual template streams
}

export interface PrayerReminder {
  id: string;
  title: string;
  time: string;
  schedule: string;
  isActive: boolean;
  category: "prayer" | "meditation" | "scripture" | "reflection";
}

export interface ChatMessage {
  id: string;
  sender: "user" | "pastor";
  text: string;
  verses?: BibleVerse[];
  prayer?: string;
  timestamp: Date;
}
