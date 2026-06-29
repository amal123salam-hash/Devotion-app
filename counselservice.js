// src/services/counselService.js
import { bibleQuotes } from '../data/quotesData';

const intros = [
  "My child, hear my words: ",
  "Peace be with you. Open your heart to what is written: ",
  "Do not trouble your heart, but lean into this truth: ",
  "I am always with you. Listen to these words: ",
  "Be still, and know that I am here. Look to this promise: "
];

const outros = [
  "Always remember, I am with you always, even to the very end of the age.",
  "Let my peace fill your heart today.",
  "Walk in faith, for I have overcome the world.",
  "Do not be afraid, for I am holding your hand."
];

export const generateCounsel = (userInput) => {
  const lowerCaseInput = userInput.toLowerCase().trim();
  let selectedQuote = null;

  if (lowerCaseInput) {
    // 1. Keyword matching logic
    const matchedQuotes = bibleQuotes.filter(quote => 
      quote.keywords.some(keyword => lowerCaseInput.includes(keyword))
    );

    if (matchedQuotes.length > 0) {
      // Pick a random quote from the matches
      selectedQuote = matchedQuotes[Math.floor(Math.random() * matchedQuotes.length)];
    }
  }

  // 2. Fallback: If no keyword is found or input is empty, pick completely at random from all 100
  if (!selectedQuote) {
    selectedQuote = bibleQuotes[Math.floor(Math.random() * bibleQuotes.length)];
  }

  // 3. Frame the response in the voice of Jesus
  const randomIntro = intros[Math.floor(Math.random() * intros.length)];
  const randomOutro = outros[Math.floor(Math.random() * outros.length)];

  return {
    fullText: `${randomIntro} "${selectedQuote.text}" (${selectedQuote.reference}). ${randomOutro}`,
    quote: selectedQuote.text,
    reference: selectedQuote.reference
  };
};

// 4. Text-to-Speech Engine
export const speakCounsel = (text) => {
  if ('speechSynthesis' in window) {
    // Cancel any ongoing speech before talking
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    const voices = window.speechSynthesis.getVoices();

    // Attempt to find a warm, natural male voice (device dependent)
    const voiceOption = voices.find(voice => 
      voice.name.includes("Google US English") || 
      voice.name.includes("Natural") || 
      (voice.lang.startsWith("en") && voice.gender === "male")
    );

    if (voiceOption) utterance.voice = voiceOption;
    
    // Tweak parameters for a calm, serene delivery
    utterance.pitch = 0.85; // Warmer, slightly lower pitch
    utterance.rate = 0.82;  // Deliberate, peaceful pacing

    window.speechSynthesis.speak(utterance);
  } else {
    console.warn("Speech Synthesis is not supported in this browser.");
  }
};