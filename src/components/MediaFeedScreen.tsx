import React, { useState } from "react";
import { motion } from "motion/react";
import { Play, Tv, Sparkles, BookOpen, Clock, Radio, Volume2, Search, ArrowLeft } from "lucide-react";
import { MediaItem } from "../types";
import { initialMediaItems } from "../data";

interface MediaFeedScreenProps {
  onNavigate: (screen: string) => void;
}

export default function MediaFeedScreen({ onNavigate }: MediaFeedScreenProps) {
  const [mediaItems, setMediaItems] = useState<MediaItem[]>(initialMediaItems);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [activeVideo, setActiveVideo] = useState<MediaItem | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const categories = ["All", "LIVE & ON-DEMAND", "BIBLE MASTERCLASS", "WORSHIP & HYMNS"];

  const filteredItems = mediaItems.filter((item) => {
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
    const matchesQuery = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  return (
    <div id="media_screen_root" className="h-full flex flex-col bg-[#FAF9F6] text-stone-800 overflow-y-auto">
      {/* Header */}
      <header id="media_header" className="flex items-center justify-between px-5 pt-4 pb-2 bg-[#FAF9F6]">
        <button 
          id="media_back_btn" 
          onClick={() => onNavigate("home")}
          className="text-stone-600 hover:text-stone-900 flex items-center gap-1 text-xs font-semibold focus:outline-none"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Home</span>
        </button>
        <h1 id="media_title" className="text-xl font-serif text-[#0f2c1c] tracking-normal font-medium">Devotion</h1>
        <button id="media_profile_btn" onClick={() => onNavigate("reminders")} className="relative">
          <img 
            id="media_user_avatar" 
            src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80" 
            alt="Profile Avatar" 
            className="w-8 h-8 rounded-full object-cover border border-amber-800/20"
          />
        </button>
      </header>

      {/* Main Flow */}
      <main id="media_main_content" className="flex-1 px-5 pb-8 space-y-6">
        <div id="spiritual_media_header" className="text-center pt-2">
          <h2 id="media_main_title" className="text-xl font-serif text-[#0e2a1b] font-semibold">Spiritual Media</h2>
          <p id="media_sub_title" className="text-[10px] font-mono tracking-widest text-[#725e2e] font-bold uppercase mt-1">
            LIVE & ON-DEMAND
          </p>
        </div>

        {/* Video Player Modal or Inline Container */}
        {activeVideo && (
          <motion.div 
            id="video_player_bracket"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-4 bg-stone-900 rounded-2xl border border-stone-800 text-stone-100 space-y-3 shadow-lg"
          >
            <div className="flex items-center justify-between">
              <span className="text-[9px] font-mono tracking-widest text-red-500 font-extrabold flex items-center gap-1 uppercase">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                PLAYING VIDEO
              </span>
              <button 
                id="close_video_btn" 
                onClick={() => setActiveVideo(null)}
                className="text-[10px] font-mono font-bold text-stone-400 hover:text-stone-200 border border-stone-700 px-2 py-0.5 rounded-full"
              >
                Close Stream
              </button>
            </div>
            
            {activeVideo.videoUrl ? (
              activeVideo.videoUrl.includes("youtube.com") || activeVideo.videoUrl.includes("youtu.be") ? (
                <div id="yt_player_and_btn" className="space-y-2">
                  <iframe 
                    id="active_youtube_iframe"
                    src={(() => {
                      const url = activeVideo.videoUrl || "";
                      if (url.includes("youtube.com/live/")) {
                        const parts = url.split("youtube.com/live/");
                        const id = parts[1]?.split("?")[0]?.split("&")[0];
                        return `https://www.youtube.com/embed/${id}`;
                      }
                      if (url.includes("youtube.com/watch")) {
                        try {
                          const urlParams = new URLSearchParams(new URL(url).search);
                          const id = urlParams.get("v");
                          return `https://www.youtube.com/embed/${id}`;
                        } catch (e) {
                          return url.replace("watch?v=", "embed/");
                        }
                      }
                      if (url.includes("youtu.be/")) {
                        const parts = url.split("youtu.be/");
                        const id = parts[1]?.split("?")[0]?.split("&")[0];
                        return `https://www.youtube.com/embed/${id}`;
                      }
                      return url;
                    })()}
                    title={activeVideo.title}
                    className="w-full h-44 rounded-xl bg-black border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    referrerPolicy="no-referrer"
                  />
                  <a 
                    href={activeVideo.videoUrl}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 w-full py-2 bg-red-600 hover:bg-red-750 text-white rounded-lg text-xs font-semibold transition-colors font-sans focus:outline-none"
                  >
                    <Tv className="w-4 h-4 text-white" />
                    <span>Watch Stream on YouTube</span>
                  </a>
                </div>
              ) : (
                <video 
                  id="active_video_tag"
                  src={activeVideo.videoUrl} 
                  controls 
                  autoPlay
                  className="w-full h-44 rounded-xl object-cover bg-black"
                />
              )
            ) : (
              <div id="video_audio_wave" className="w-full h-44 rounded-xl bg-gradient-to-tr from-stone-950 to-stone-900 border border-stone-800 flex flex-col items-center justify-center space-y-3">
                <div className="flex items-center gap-1">
                  <div className="w-1 h-6 bg-amber-500 rounded-full animate-bounce [animation-delay:-0.4s]" />
                  <div className="w-1 h-12 bg-amber-500 rounded-full animate-bounce [animation-delay:-0.2s]" />
                  <div className="w-1 h-16 bg-amber-500 rounded-full animate-bounce" />
                  <div className="w-1 h-8 bg-amber-500 rounded-full animate-bounce [animation-delay:-0.1s]" />
                  <div className="w-1 h-4 bg-amber-500 rounded-full animate-bounce [animation-delay:-0.3s]" />
                </div>
                <span className="text-[10px] font-mono text-amber-200 uppercase tracking-widest">Worship Audio Stream Playing</span>
              </div>
            )}

            <div className="space-y-1">
              <h3 className="text-xs font-semibold text-stone-100">{activeVideo.title}</h3>
              <p className="text-[10px] text-stone-400 font-sans leading-relaxed">{activeVideo.description}</p>
            </div>
          </motion.div>
        )}

        {/* Live Video Banner - First Screenshot Match */}
        {!activeVideo && (() => {
          const liveItem = mediaItems.find(m => m.isLive) || mediaItems[0];
          return (
            <motion.div 
              id="live_mass_banner"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl border border-[#eae9e0] overflow-hidden shadow-md flex flex-col"
            >
              {/* Live Badge and Picture */}
              <div className="relative h-48 bg-stone-900">
                <img 
                  id="live_mass_thumbnail"
                  src={liveItem?.imageUrl || "/src/assets/images/pope_vatican_portrait_1782138051197.jpg"} 
                  alt={liveItem?.title || "Vatican Live Stream"} 
                  className="w-full h-full object-cover opacity-95"
                  referrerPolicy="no-referrer"
                />
                <span id="live_red_badge" className="absolute top-4 left-4 bg-[#cc3333] text-white px-3 py-1 text-[9px] uppercase tracking-widest font-mono font-bold rounded-md animate-pulse">
                  PRIORITY LIVE
                </span>
              </div>

              {/* Bottom Controls */}
              <div id="live_mass_controls" className="p-5 space-y-3">
                <h3 id="live_mass_heading" className="text-lg font-serif font-semibold text-stone-850">
                  {liveItem?.title || "Live Vatican Holy Mass & Benediction"}
                </h3>
                <p id="live_mass_desc" className="text-xs text-stone-550 leading-relaxed font-sans">
                  {liveItem?.description || "Live Eucharistic celebration and special broadcasts from His Holiness the Pope at Vatican City. Join in holy prayer."}
                </p>
                
                <button 
                  id="open_video_trigger"
                  onClick={() => {
                    setActiveVideo(liveItem || null);
                  }}
                  className="w-full bg-[#0d0c0c] text-stone-100 text-xs font-medium font-sans py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-stone-800 transition-colors focus:outline-none"
                >
                  <Play className="w-4 h-4 fill-current text-stone-100" />
                  <span>Open Video</span>
                </button>
              </div>
            </motion.div>
          );
        })()}

        {/* Recommended YouTube Channels & Live Streams */}
        <div id="youtube_broadcasts_section" className="space-y-4 pt-2">
          <div id="youtube_section_header" className="flex items-center justify-between border-b border-stone-200 pb-2">
            <div>
              <h3 id="youtube_broadcast_title" className="text-sm font-semibold text-stone-850 font-serif">
                Christian Broadcast Channels
              </h3>
              <p id="youtube_broadcast_sub" className="text-[10px] text-stone-500 font-sans">
                Official live updates and meditative devotion viewings on YouTube
              </p>
            </div>
            <span className="text-[9px] font-mono tracking-widest text-[#725e2e] font-extrabold bg-[#faf0dd] px-2 py-0.5 rounded-md uppercase">
              RESOURCES
            </span>
          </div>

          <div id="youtube_broadcast_grid" className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {/* item 1: Perpetual Adoration Live */}
            <div 
              id="yt_link_adoration"
              className="bg-white p-4 rounded-xl border border-[#eae9e0] hover:border-amber-850/20 transition-all shadow-3xs flex flex-col justify-between space-y-3"
            >
              <div className="space-y-1.5">
                <div className="flex items-center gap-1.5">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-450 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-red-650"></span>
                  </span>
                  <span className="text-[8px] font-bold tracking-widest font-mono text-red-650 uppercase">
                    LIVE STREAM
                  </span>
                </div>
                <h4 className="text-xs font-semibold text-stone-900 leading-tight">
                  Perpetual Eucharistic Adoration
                </h4>
                <p className="text-[10px] text-stone-500 leading-relaxed font-sans">
                  Deep silent prayer and calming adoration stream. Tune in for beautiful quietude and continuous praise.
                </p>
              </div>
              <a 
                href="https://www.youtube.com/live/ofzjS1Z-8os?si=ouHiLC8ANhfdHOsV" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 w-full py-2 bg-amber-50/70 hover:bg-amber-100/70 border border-amber-900/10 text-amber-950 rounded-lg text-[10px] font-semibold transition-colors focus:outline-none"
              >
                <Radio className="w-3.5 h-3.5 text-amber-800" />
                <span>Watch Live Broadcast</span>
              </a>
            </div>

            {/* item 2: Global Devotional & Holy Mass Live */}
            <div 
              id="yt_link_rosary_live"
              className="bg-white p-4 rounded-xl border border-[#eae9e0] hover:border-amber-850/20 transition-all shadow-3xs flex flex-col justify-between space-y-3"
            >
              <div className="space-y-1.5">
                <div className="flex items-center gap-1.5">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-450 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-red-650"></span>
                  </span>
                  <span className="text-[8px] font-bold tracking-widest font-mono text-red-650 uppercase">
                    LIVE STREAM
                  </span>
                </div>
                <h4 className="text-xs font-semibold text-stone-900 leading-tight">
                  Global Rosary & Mass Broadcast
                </h4>
                <p className="text-[10px] text-stone-500 leading-relaxed font-sans">
                  Watch live daily Holy Mass updates, shared scriptures, and interactive global rosary chains.
                </p>
              </div>
              <a 
                href="https://www.youtube.com/live/GlGkFWPKomU?si=6vI_AH6P6g390PLA" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 w-full py-2 bg-amber-50/70 hover:bg-amber-100/70 border border-amber-900/10 text-amber-950 rounded-lg text-[10px] font-semibold transition-colors focus:outline-none"
              >
                <Radio className="w-3.5 h-3.5 text-amber-800" />
                <span>Watch Live Broadcast</span>
              </a>
            </div>

            {/* item 3: Amen Hallelujah Channel */}
            <div 
              id="yt_link_amen"
              className="bg-white p-4 rounded-xl border border-[#eae9e0] hover:border-amber-850/20 transition-all shadow-3xs flex flex-col justify-between space-y-3"
            >
              <div className="space-y-1.5">
                <div className="flex items-center gap-1.5">
                  <span className="text-[8px] font-bold tracking-widest font-mono text-[#725e2e] uppercase">
                    RECOMMENDED CHANNEL
                  </span>
                </div>
                <h4 className="text-xs font-semibold text-stone-900 leading-tight">
                  Amen Hallelujah YouTube
                </h4>
                <p className="text-[10px] text-stone-500 leading-relaxed font-sans">
                  Stellar hymns of praise, gospel reflections, and uplifting scriptural media updates to secure daily hope.
                </p>
              </div>
              <a 
                href="http://www.youtube.com/@AmenHallelujah" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 w-full py-2 bg-stone-50 hover:bg-stone-100 border border-stone-200 text-stone-850 rounded-lg text-[10px] font-semibold transition-colors focus:outline-none"
              >
                <Tv className="w-3.5 h-3.5 text-stone-600" />
                <span>Visit Devotional Channel</span>
              </a>
            </div>

            {/* item 4: The Catholic Crusade Channel */}
            <div 
              id="yt_link_crusade"
              className="bg-white p-4 rounded-xl border border-[#eae9e0] hover:border-amber-850/20 transition-all shadow-3xs flex flex-col justify-between space-y-3"
            >
              <div className="space-y-1.5">
                <div className="flex items-center gap-1.5">
                  <span className="text-[8px] font-bold tracking-widest font-mono text-[#725e2e] uppercase">
                    RECOMMENDED CHANNEL
                  </span>
                </div>
                <h4 className="text-xs font-semibold text-stone-900 leading-tight">
                  The Catholic Crusade YouTube
                </h4>
                <p className="text-[10px] text-stone-500 leading-relaxed font-sans">
                  A sanctuary of meditative prayers, companion Rosaries, Chaplet of Divine Mercy, and novenas study.
                </p>
              </div>
              <a 
                href="http://www.youtube.com/@TheCatholicCrusade" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 w-full py-2 bg-stone-50 hover:bg-stone-100 border border-stone-200 text-stone-850 rounded-lg text-[10px] font-semibold transition-colors focus:outline-none"
              >
                <Tv className="w-3.5 h-3.5 text-stone-600" />
                <span>Visit Devotional Channel</span>
              </a>
            </div>
          </div>
        </div>

        {/* Search & Theme Filter Header */}
        <div id="media_filters_box" className="space-y-3">
          {/* Subtle Search Bar */}
          <div id="search_field_wrapper" className="relative">
            <Search className="absolute left-3.5 top-1/2 transform -translate-y-1/2 w-4 h-4 text-stone-400" />
            <input 
              id="search_video_input"
              type="text" 
              placeholder="Search services, studies, or hymns..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-xs font-sans text-stone-800 pl-10 pr-4 py-2.5 bg-white border border-stone-200 rounded-xl focus:ring-1 focus:ring-amber-800/35 focus:outline-none shadow-3xs"
            />
          </div>

          {/* Horizontal Filters Scroll container */}
          <div id="horizontal_pill_filters" className="flex gap-2 overflow-x-auto pb-1 scrollbar-none" style={{ scrollbarWidth: 'none' }}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`text-[10px] whitespace-nowrap px-3.5 py-1.5 rounded-full font-sans font-semibold border transition-all shrink-0 focus:outline-none ${
                  selectedCategory === cat 
                    ? 'bg-[#182a1a] text-stone-100 border-[#182a1a]' 
                    : 'bg-white text-stone-600 border-stone-200 hover:bg-stone-55/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic List Feed */}
        <div id="media_list_items" className="space-y-4">
          {filteredItems.map((item) => (
            <div 
              key={item.id} 
              id={`media_card_${item.id}`}
              className="bg-white rounded-xl border border-stone-100 overflow-hidden shadow-xs hover:border-amber-900/10 transition-colors flex flex-col md:flex-row gap-4 p-3"
            >
              <div className="relative w-full md:w-32 aspect-video bg-stone-900 rounded-lg overflow-hidden shrink-0">
                <img 
                  id={`image_${item.id}`}
                  src={item.imageUrl} 
                  alt={item.title} 
                  className="w-full h-full object-cover"
                />
                
                {item.isLive && (
                  <span className="absolute top-1.5 left-1.5 bg-[#cc3333] text-white text-[8px] font-mono px-1.5 py-0.5 rounded-sm uppercase tracking-wider font-extrabold">
                    Live
                  </span>
                )}
                
                <span className="absolute bottom-1.5 right-1.5 bg-black/60 text-white font-mono text-[9px] px-1.5 py-0.5 rounded">
                  {item.duration}
                </span>

                <button 
                  id={`play_overlay_${item.id}`}
                  onClick={() => setActiveVideo(item)}
                  className="absolute inset-0 m-auto w-10 h-10 rounded-full bg-white/90 shadow flex items-center justify-center text-amber-900 hover:scale-105 transition-all text-xs focus:outline-none"
                >
                  <Play className="w-5 h-5 fill-current ml-0.5 text-stone-900" />
                </button>
              </div>

              <div className="flex-1 space-y-1.5 flex flex-col justify-center">
                <span className="text-[8px] tracking-widest font-mono uppercase text-amber-800 font-extrabold">
                  {item.category}
                </span>
                
                <h4 className="text-xs font-semibold text-stone-800 leading-tight">
                  {item.title}
                </h4>
                
                <p className="text-[10px] text-stone-500 font-sans leading-relaxed line-clamp-2">
                  {item.description}
                </p>
              </div>
            </div>
          ))}

          {filteredItems.length === 0 && (
            <div className="text-center py-8 bg-[#FAF9F6] border border-dashed border-stone-200 rounded-xl">
              <BookOpen className="w-6 h-6 text-stone-400 mx-auto mb-2 opacity-50" />
              <p className="text-xs text-stone-500">No media found matching current indicators.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
