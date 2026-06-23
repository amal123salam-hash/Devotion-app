import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, Clock, CheckCircle2, Bookmark, Share2, Compass, Eye, Heart } from "lucide-react";
import { Devotional } from "../types";
import { initialDevotionals } from "../data";

interface DailyDevotionalsScreenProps {
  onNavigate: (screen: string) => void;
}

export default function DailyDevotionalsScreen({ onNavigate }: DailyDevotionalsScreenProps) {
  const [devotionals, setDevotionals] = useState<Devotional[]>(initialDevotionals);
  const [activeDevotional, setActiveDevotional] = useState<Devotional | null>(null);
  const [bookmarks, setBookmarks] = useState<string[]>([]);
  const [completedList, setCompletedList] = useState<string[]>(["day1"]); // Sunrise devotion completed by default as screenshot shows check in circle or list

  const toggleComplete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setCompletedList(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const toggleBookmark = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setBookmarks(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleShare = (title: string, vRef: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (navigator.share) {
      navigator.share({
        title: `Daily Devotion: ${title}`,
        text: `Check out today's devotion on ${vRef}`,
        url: window.location.href,
      }).catch(console.error);
    } else {
      alert(`Copied "${title} (${vRef})" devotional to clipboard!`);
    }
  };

  return (
    <div id="devotionals_screen_root" className="h-full flex flex-col bg-[#F9F8F3] text-stone-850 overflow-y-auto">
      {/* Header */}
      <header id="devotionals_header" className="flex items-center justify-between px-5 pt-4 pb-2 bg-[#F9F8F3]">
        <button 
          id="devotional_back_btn" 
          onClick={() => onNavigate("home")}
          className="text-stone-600 hover:text-stone-900 flex items-center gap-1 text-xs font-semibold focus:outline-none"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Home</span>
        </button>
        <h1 id="devotional_screen_title" className="text-xl font-serif text-[#0f2c1c] tracking-normal font-medium">Devotion</h1>
        <button id="dev_profile_btn" onClick={() => onNavigate("reminders")} className="relative">
          <img 
            id="dev_user_avatar" 
            src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80" 
            alt="Profile Avatar" 
            className="w-8 h-8 rounded-full object-cover border border-amber-800/20"
          />
        </button>
      </header>

      {/* Main Flow */}
      <main id="devotionals_main" className="flex-1 px-5 pb-10 space-y-6">
        
        {/* Screen Intro */}
        <div id="dev_rhythm_heading" className="text-center pt-2">
          <h2 id="dev_welcome" className="text-xl font-serif text-[#0e2a1b] font-semibold">Daily Devotionals</h2>
          <p id="dev_tagline" className="text-[10px] font-mono tracking-widest text-[#725e2e] font-bold uppercase mt-1">
            Nurture Your Spirit 
          </p>
        </div>

        {/* Selected Reading Overlay / Expanded Detail view */}
        <AnimatePresence>
          {activeDevotional && (
            <motion.div 
              id="expanded_devotional_panel"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="bg-white border-2 border-amber-85 /20 rounded-2xl p-5 shadow-md space-y-4 overflow-hidden"
            >
              <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                <div className="flex items-center gap-2">
                  <span className="text-[9px] font-mono tracking-widest text-amber-800 font-extrabold uppercase">
                    {activeDevotional.type}
                  </span>
                  <span className="w-1 h-1 rounded-full bg-[#1b2f1e]" />
                  <span className="text-[10px] font-sans font-semibold text-stone-550 flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {activeDevotional.time}
                  </span>
                </div>
                <button 
                  id="close_devotional_panel"
                  onClick={() => setActiveDevotional(null)}
                  className="text-xs font-mono font-bold text-stone-400 hover:text-stone-850"
                >
                  Minimize
                </button>
              </div>

              {/* Title & guidance */}
              <h3 className="text-xl font-serif font-semibold text-[#0d281a]">{activeDevotional.title}</h3>
              <p className="text-xs text-stone-600 leading-relaxed italic border-l-2 border-stone-300 pl-3">
                "{activeDevotional.verseText}" <br />
                <span className="text-[10px] font-mono text-stone-400 block mt-1">— {activeDevotional.verse}</span>
              </p>

              {/* Landscape image */}
              <img 
                src={activeDevotional.image} 
                alt={activeDevotional.title} 
                className="w-full h-40 object-cover rounded-xl shadow-xs"
              />

              {/* Reading text */}
              <div className="space-y-3">
                <span className="text-[10px] font-mono tracking-wider text-emerald-800 uppercase font-extrabold">Pastoral Word:</span>
                <p className="text-xs text-stone-700 leading-relaxed font-sans">
                  {activeDevotional.content}
                </p>
                <p className="text-xs text-stone-600 leading-relaxed italic">
                  "{activeDevotional.guidance}"
                </p>
              </div>

              {/* Control Action Buttons */}
              <div className="flex items-center justify-between pt-3 border-t border-stone-50">
                <button
                  onClick={(e) => toggleComplete(activeDevotional.id, e)}
                  className={`px-4 py-2 rounded-xl text-xs font-sans font-medium flex items-center gap-1.5 transition-colors ${
                    completedList.includes(activeDevotional.id)
                      ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                      : "bg-[#182319] text-stone-100 hover:bg-stone-800"
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{completedList.includes(activeDevotional.id) ? "Mark Incomplete" : "Confirm Completed"}</span>
                </button>

                <div className="flex gap-2">
                  <button 
                    onClick={(e) => toggleBookmark(activeDevotional.id, e)}
                    className={`p-2 rounded-xl transition-colors border ${bookmarks.includes(activeDevotional.id) ? 'bg-amber-50 text-amber-900 border-amber-200' : 'bg-white text-stone-400 border-stone-200'}`}
                  >
                    <Bookmark className="w-4 h-4 text-amber-800" />
                  </button>
                  <button 
                    onClick={(e) => handleShare(activeDevotional.title, activeDevotional.verse, e)}
                    className="p-2 rounded-xl border border-stone-200 text-stone-500 hover:text-stone-850"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* List devotions from screenshots */}
        <div id="devotionals_timeline" className="space-y-6">
          {devotionals.map((dev) => {
            const isCompleted = completedList.includes(dev.id);
            const isBookmarked = bookmarks.includes(dev.id);

            return (
              <motion.div
                key={dev.id}
                id={`devotional_card_${dev.id}`}
                onClick={() => setActiveDevotional(dev)}
                className="bg-white border border-[#ecebe1] rounded-2xl p-5 shadow-sm space-y-4 hover:shadow cursor-pointer transition-shadow"
              >
                {/* Meta details */}
                <div className="flex items-center justify-between">
                  <div>
                    <h3 id="dev_item_title" className="text-sm font-serif font-bold text-stone-800">{dev.title}</h3>
                    <span id="dev_item_type" className="text-[9px] font-mono text-[#725e2e] uppercase block font-semibold tracking-wider">
                      {dev.type}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
                    {/* Tick checkbox corresponding to screenshot */}
                    <button 
                      id={`complete_toggle_${dev.id}`}
                      onClick={(e) => toggleComplete(dev.id, e)} 
                      className={`p-1 rounded-full transition-colors ${isCompleted ? 'text-emerald-600 bg-emerald-50' : 'text-stone-300 hover:text-stone-500'}`}
                      title="Toggle complete"
                    >
                      <CheckCircle2 className="w-5 h-5 fill-current bg-white" />
                    </button>
                  </div>
                </div>

                {/* Main instruction quotes formatted just like the second design screenshot */}
                <div id="dev_quote_view" className="relative p-1">
                  <p id="dev_guidance_text" className="italic font-serif leading-relaxed text-[#1e1e1a] text-xs">
                    "{dev.guidance}"
                  </p>
                  
                  <div id="time_stamp" className="flex items-center gap-1 text-stone-400 font-mono text-[10px] mt-2.5">
                    <Clock className="w-3 h-3" />
                    <span>{dev.time}</span>
                  </div>
                </div>

                {/* Landscape photograph visual card */}
                <div id="photography_card" className="aspect-[16/9] rounded-xl overflow-hidden bg-stone-100 relative">
                  <img 
                    id="landscape_image" 
                    src={dev.image} 
                    alt={dev.title} 
                    className="w-full h-full object-cover"
                  />
                  
                  <div className="absolute inset-0 bg-black/10 hover:bg-black/20 transition-colors flex items-center justify-center">
                    <span className="bg-black/60 backdrop-blur-xs text-white text-[9px] uppercase tracking-widest font-mono font-bold px-3 py-1.5 rounded-full flex items-center gap-1">
                      <Eye className="w-3.5 h-3.5" /> Read Reflection
                    </span>
                  </div>
                </div>

                {/* Active reading indicators */}
                <div className="flex items-center justify-between text-[11px] text-stone-500 pt-1" onClick={(e) => e.stopPropagation()}>
                  <span className="font-mono text-[9px] uppercase tracking-wider text-stone-400">
                    Anchor: {dev.verse}
                  </span>
                  
                  <div className="flex gap-2.5">
                    <button 
                      onClick={(e) => toggleBookmark(dev.id, e)}
                      className={`flex items-center gap-1 ${isBookmarked ? 'text-amber-800 font-bold' : 'text-stone-400'}`}
                    >
                      <Bookmark className="w-3.5 h-3.5" />
                      <span>{isBookmarked ? "Pinned" : "Save"}</span>
                    </button>
                    <button 
                      onClick={(e) => handleShare(dev.title, dev.verse, e)}
                      className="text-stone-400 flex items-center gap-1 hover:text-stone-600"
                    >
                      <Share2 className="w-3.5 h-3.5" />
                      <span>Share</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
