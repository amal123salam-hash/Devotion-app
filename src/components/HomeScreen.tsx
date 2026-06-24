import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Menu, User, BookOpen, Quote, Shield, Compass, Heart } from "lucide-react";
import { bibleQuotes } from "../data";

import christDevotionalPortrait from "../assets/images/christ_devotional_portrait_1782136426209.jpg";

interface HomeScreenProps {
  onNavigate: (screen: string) => void;
  userAvatar: string;
  onOpenSidebar: () => void;
}

export default function HomeScreen({ onNavigate, userAvatar, onOpenSidebar }: HomeScreenProps) {
  const [quoteIndex, setQuoteIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % bibleQuotes.length);
    }, 60000); // changes every minute
    return () => clearInterval(interval);
  }, []);

  return (
    <div id="home_screen_root" className="h-full flex flex-col bg-[#FAF9F6] text-stone-800 overflow-y-auto">
      {/* Header Bar */}
      <header id="home_header" className="flex items-center justify-between px-5 pt-4 pb-2 bg-[#FAF9F6]">
        <button 
          id="home_sidebar_trigger" 
          onClick={onOpenSidebar} 
          className="text-stone-700 hover:text-stone-900 transition-colors p-1 rounded-full hover:bg-stone-100"
        >
          <Menu className="w-6 h-6" />
        </button>
        <h1 id="home_title" className="text-2xl font-serif text-[#0f2c1c] tracking-normal font-medium">Devotion</h1>
        <button id="home_profile_btn" onClick={() => onNavigate("reminders")} className="relative focus:outline-none">
          <img 
            id="home_user_avatar" 
            src={userAvatar} 
            alt="Profile Avatar" 
            className="w-8 h-8 rounded-full object-cover border border-amber-800/20"
          />
        </button>
      </header>

      {/* Main Stream */}
      <main id="home_main_content" className="flex-1 px-5 pb-8 space-y-6">
        {/* Divine Cover Art - High-Fidelity Representation */}
        <motion.div 
          id="church_scenic_card"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative rounded-2xl overflow-hidden shadow-md aspect-[4/5] bg-stone-900 group"
        >
          {/* Cover Image of Jesus Christ - Warm Pastoral Light */}
          <img 
            id="cover_art_image" 
            src={christDevotionalPortrait} 
            alt="Spiritual Devotion Guidance" 
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-[6s] ease-out"
          />
          
          {/* Premium Gradient Overlays */}
          <div id="cover_overlay_top" className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/70" />
          
          {/* Headline Text */}
          <div id="cover_brand" className="absolute top-8 left-1/2 transform -translate-x-1/2 text-center pointer-events-none">
            <h2 id="brand_main_label" className="text-xs uppercase tracking-[0.25em] text-amber-130 /80 font-mono text-stone-200">ChristCounsel AI</h2>
            <h3 id="brand_category" className="text-4xl font-serif font-light text-white tracking-widest mt-1">DEVOTION</h3>
          </div>

          <div id="cover_footer_text" className="absolute bottom-8 left-0 right-0 px-6 text-center">
            <span id="cover_badge" className="inline-block text-[10px] uppercase font-mono tracking-widest text-amber-200 bg-amber-950/40 px-3 py-1 rounded-full border border-amber-200/20 backdrop-blur-xs mb-3">
              Daily Anchor
            </span>
            <p id="cover_motto" className="text-[11px] uppercase tracking-widest text-[#eae6dd] font-sans">Spiritual Guidance</p>
          </div>
        </motion.div>

        {/* Welcome Section */}
        <motion.section 
          id="welcome_greeting"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center space-y-3"
        >
          <p id="jesus_welcome_tagline" className="text-[17px] font-serif italic text-[#3f5a43] mt-2">Peace be with you</p>
          <div className="flex flex-col items-center">
            <h2 id="jesus_main_heading" className="text-3xl font-serif font-semibold text-[#0f2c1c] tracking-tight">Devotion</h2>
            <div id="title_underline" className="w-16 h-[2px] bg-amber-800/40 mt-2" />
          </div>
          
          <p id="jesus_description" className="text-xs leading-relaxed text-stone-600 px-2 font-sans">
            Take a moment to center your heart and reconnect with the divine. We are here to guide your spiritual journey through scripture, pastoral counsel, and daily alarms.
          </p>
        </motion.section>

        {/* Dynamic scripture ticker */}
        <motion.div 
          id="bible_ticker_box"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          onClick={() => setQuoteIndex((prev) => (prev + 1) % bibleQuotes.length)}
          className="bg-amber-50/50 p-4 rounded-xl border border-amber-700/10 shadow-xs cursor-pointer hover:bg-amber-50 transition-colors"
        >
          <div className="flex items-start gap-2">
            <Quote className="w-4 h-4 text-amber-800 shrink-0 mt-0.5 opacity-60" />
            <div className="space-y-1">
              <span className="text-[10px] font-mono tracking-widest text-amber-800/80 font-bold uppercase block">
                Verse of the Hour (Tap to cycle)
              </span>
              <p id="quote_text" className="text-xs text-stone-700 italic leading-relaxed font-serif">
                "{bibleQuotes[quoteIndex].split(" — ")[0]}"
              </p>
              <p id="quote_ref" className="text-[10px] font-mono text-stone-500 font-bold">
                {bibleQuotes[quoteIndex].split(" — ")[1] || "Psalm 46:10"}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Action Grid/Quick Navigation Buttons */}
        <div id="quick_navigation_grid" className="grid grid-cols-3 gap-3 pt-2">
          <button 
            id="nav_counsel_btn"
            onClick={() => onNavigate("counsel")}
            className="flex flex-col items-center p-3 bg-white hover:bg-amber-50/30 rounded-xl border border-stone-100 transition-all text-center focus:outline-none focus:ring-1 focus:ring-amber-500"
          >
            <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-800 mb-2">
              <Heart className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-semibold text-stone-800 font-sans">Get Counsel</span>
            <span className="text-[9px] text-stone-400 mt-0.5">AI Pastoral Guidance</span>
          </button>

          <button 
            id="nav_study_btn"
            onClick={() => onNavigate("devotionals")}
            className="flex flex-col items-center p-3 bg-white hover:bg-amber-50/30 rounded-xl border border-stone-100 transition-all text-center focus:outline-none focus:ring-1 focus:ring-amber-500"
          >
            <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center text-amber-800 mb-2">
              <BookOpen className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-semibold text-stone-800 font-sans">Devotionals</span>
            <span className="text-[9px] text-stone-400 mt-0.5">Daily Morning & Night</span>
          </button>

          <button 
            id="nav_reminders_btn"
            onClick={() => onNavigate("reminders")}
            className="flex flex-col items-center p-3 bg-white hover:bg-amber-50/30 rounded-xl border border-stone-100 transition-all text-center focus:outline-none focus:ring-1 focus:ring-amber-500"
          >
            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-800 mb-2">
              <Compass className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-semibold text-stone-800 font-sans">Reminders</span>
            <span className="text-[9px] text-stone-400 mt-0.5">Daily Prayer Rhythm</span>
          </button>
        </div>

        {/* Spiritual Trust Accent Line */}
        <div id="trust_decor" className="flex items-center justify-center gap-2 py-2 opacity-50">
          <Shield className="w-3.5 h-3.5 text-stone-400" />
          <span className="text-[9px] font-mono tracking-widest text-stone-400 font-semibold uppercase">Faithful. secure. comforting.</span>
        </div>
      </main>
    </div>
  );
}
