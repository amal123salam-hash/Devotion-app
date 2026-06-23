import { Devotional, MediaItem, PrayerReminder } from "./types";

export const initialDevotionals: Devotional[] = [
  {
    id: "day1",
    title: "Morning Light",
    type: "SUNRISE DEVOTION",
    verse: "Psalm 5:3",
    verseText: "In the morning, Lord, you hear my voice; in the morning I lay my requests before you and wait expectantly.",
    time: "6:30 AM",
    guidance: "Lord, let Your peace fill my morning. Guide my steps today toward kindness and stillness in Your presence.",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
    content: "Morning light represents the renewal of God's grace in our lives. As you wake up today, remember that you do not have to carry yesterday's burdens. Hand them to the Father, realign your breath with His Spirit, and walk forward in complete victory."
  },
  {
    id: "day2",
    title: "Evening Rest",
    type: "STARFALL MEDITATION",
    verse: "Psalm 4:8",
    verseText: "In peace I will lie down and sleep, for you alone, Lord, make me dwell in safety.",
    time: "9:30 PM",
    guidance: "As the stars emerge, I release the burdens of the day. May Your shadow cover me in restful sleep.",
    image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=600&q=80",
    content: "When dark falls, it marks the completion of your labor. The universe is sustained by His infinite power, not by your worry. Take a deep breath, let your eyelids grow heavy, and rest secure, knowing that He neither slumbers nor sleeps."
  },
  {
    id: "day3",
    title: "Daily Strength",
    type: "MIDDAY REALIGNMENT",
    verse: "Isaiah 40:31",
    verseText: "But those who hope in the Lord will renew their strength. They will soar on wings like eagles; they will run and not grow weary, they will walk and not be faint.",
    time: "12:15 PM",
    guidance: "In the middle of the busyness, I stop, pause, and breathe in His pure strength.",
    image: "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&w=600&q=80",
    content: "Sometimes our midday tasks overwhelm us. In these moments, taking a 2-minute stillness break to recite Isaiah 40:31 serves as a spiritual water fountain. Reconnect with Him now."
  }
];

export const initialMediaItems: MediaItem[] = [
  {
    id: "media1",
    title: "Live Vatican Holy Mass & Benediction",
    category: "LIVE & ON-DEMAND",
    description: "Live Eucharistic celebration and special broadcasts from His Holiness the Pope at Vatican City. Join in holy prayer and receive pastoral grace.",
    imageUrl: "/src/assets/images/pope_vatican_portrait_1782138051197.jpg",
    duration: "LIVE",
    isLive: true,
    videoUrl: "https://www.youtube.com/live/A2JBODj1vio?si=pH4n1yGL06A7O5yT"
  },
  {
    id: "media2",
    title: "The Sermon on the Mount Study",
    category: "BIBLE MASTERCLASS",
    description: "A deep dive study on the Beatitudes, understanding Jesus' manifesto for the Kingdom of Heaven.",
    imageUrl: "https://images.unsplash.com/photo-1455018512395-653995874f65?auto=format&fit=crop&w=600&q=80",
    duration: "45:30",
    videoUrl: "https://www.w3schools.com/html/movie.mp4"
  },
  {
    id: "media3",
    title: "Sacred Psalms for Restful Sleep",
    category: "WORSHIP & HYMNS",
    description: "Ambient liturgical music layered with whispered recitations of Psalms to comfort and soothe your mind to sleep.",
    imageUrl: "https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&w=600&q=80",
    duration: "2:00:00"
  },
  {
    id: "media4",
    title: "Sunday Worship Celebrations",
    category: "SUNDAY ARCHIVE",
    description: "Watch the full celebratory praise and pastoral message from the previous Lord's Day.",
    imageUrl: "https://images.unsplash.com/photo-1422464804701-7d002213b413?auto=format&fit=crop&w=600&q=80",
    duration: "1:30:00"
  }
];

export const initialReminders: PrayerReminder[] = [
  {
    id: "rem1",
    title: "Morning Prayer",
    time: "06:30 AM",
    schedule: "Daily",
    isActive: true,
    category: "prayer"
  },
  {
    id: "rem2",
    title: "Afternoon Reflection",
    time: "12:15 PM",
    schedule: "Mon, Wed, Fri",
    isActive: false,
    category: "reflection"
  },
  {
    id: "rem3",
    title: "Evening Meditation",
    time: "09:30 PM",
    schedule: "Daily",
    isActive: true,
    category: "meditation"
  }
];

export const bibleQuotes = [
  "Be still, and know that I am God. — Psalm 46:10",
  "The Lord is my shepherd; I shall not want. — Psalm 23:1",
  "For where two or three are gathered in my name, there am I among them. — Matthew 18:20",
  "Trust in the Lord with all your heart, and do not lean on your own understanding. — Proverbs 3:5"
];
