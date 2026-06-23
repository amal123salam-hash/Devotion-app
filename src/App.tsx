import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Home, Heart, Bell, BookOpen, Play, CheckCircle2, Menu, X, User, 
  Settings, HelpCircle, Save, Check, RefreshCw, Star, Share2
} from "lucide-react";

// Component imports
import HomeScreen from "./components/HomeScreen";
import CounselScreen from "./components/CounselScreen";
import MediaFeedScreen from "./components/MediaFeedScreen";
import DailyDevotionalsScreen from "./components/DailyDevotionalsScreen";
import PrayerRemindersScreen from "./components/PrayerRemindersScreen";

export default function App() {
  const [activeScreen, setActiveScreen] = useState<string>("home");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  // Profile configurations
  const [userName, setUserName] = useState(() => {
    return localStorage.getItem("christ_counsel_username") || "Emily";
  });
  const [userAvatar, setUserAvatar] = useState(() => {
    return localStorage.getItem("christ_counsel_avatar") || "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80";
  });
  const [avatarIndex, setAvatarIndex] = useState(0);

  const avatarsList = [
    "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80", // Emily (female avatar)
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80", // Alternate women avatar
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80", // Thomas (pastor / counselor)
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80", // Alternate men avatar
  ];

  useEffect(() => {
    localStorage.setItem("christ_counsel_username", userName);
  }, [userName]);

  useEffect(() => {
    localStorage.setItem("christ_counsel_avatar", userAvatar);
  }, [userAvatar]);

  const switchAvatar = () => {
    const nextIdx = (avatarIndex + 1) % avatarsList.length;
    setAvatarIndex(nextIdx);
    setUserAvatar(avatarsList[nextIdx]);
  };

  const currentScreenRender = () => {
    switch (activeScreen) {
      case "home":
        return <HomeScreen onNavigate={setActiveScreen} userAvatar={userAvatar} onOpenSidebar={() => setIsSidebarOpen(true)} />;
      case "counsel":
        return <CounselScreen userAvatar={userAvatar} />;
      case "media":
        return <MediaFeedScreen onNavigate={setActiveScreen} />;
      case "devotionals":
        return <DailyDevotionalsScreen onNavigate={setActiveScreen} />;
      case "reminders":
        return <PrayerRemindersScreen onNavigate={setActiveScreen} />;
      default:
        return <HomeScreen onNavigate={setActiveScreen} userAvatar={userAvatar} onOpenSidebar={() => setIsSidebarOpen(true)} />;
    }
  };

  return (
    <div id="full_stack_viewport" className="min-h-screen bg-stone-900 flex items-center justify-center p-0 md:p-6 select-none font-sans antialiased text-stone-800">
      
      {/* Interactive Desktop mock Frame container */}
      <div id="phone_wrapper_frame" className="w-full max-w-md h-screen md:h-[840px] bg-white rounded-none md:rounded-[40px] md:shadow-2xl overflow-hidden flex flex-col relative border-0 md:border-[12px] md:border-stone-800">
        
        {/* Dynamic Screen Viewport Area */}
        <div id="rendered_screen_area" className="flex-1 overflow-hidden relative">
          {currentScreenRender()}

          {/* Navigation Drawer (Sidebar) Overlay */}
          <AnimatePresence>
            {isSidebarOpen && (
              <div id="drawer_backdrop" className="absolute inset-0 bg-black/60 z-50 flex">
                <motion.div 
                  id="drawer_body"
                  initial={{ x: "-100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "-100%" }}
                  transition={{ type: "spring", damping: 25, stiffness: 220 }}
                  className="w-[280px] h-full bg-[#FAF9F6] text-stone-800 p-6 flex flex-col justify-between shadow-xl"
                >
                  <div className="space-y-6">
                    {/* Drawer Header */}
                    <div className="flex items-center justify-between border-b border-stone-200 pb-4">
                      <div className="flex items-center gap-1.5">
                        <Star className="w-5 h-5 text-amber-800 fill-current" />
                        <span className="font-serif font-bold text-stone-900 text-sm">ChristCounsel AI</span>
                      </div>
                      <button 
                        id="close_drawer_btn"
                        onClick={() => setIsSidebarOpen(false)}
                        className="p-1 text-stone-500 hover:text-stone-950 transition-colors"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>

                    {/* Member Profile Configuration block */}
                    <div className="p-4 bg-white border border-stone-200 rounded-xl space-y-4">
                      <span className="text-[9px] font-mono tracking-widest text-[#725e22] uppercase font-bold block">
                        Guardian Profile
                      </span>
                      
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <img 
                            src={userAvatar} 
                            alt="Emily" 
                            className="w-12 h-12 rounded-full object-cover border-2 border-amber-800/10"
                          />
                          <button 
                            id="change_portrait_btn"
                            onClick={switchAvatar}
                            className="absolute -bottom-1 -right-1 bg-amber-800 hover:bg-amber-900 border border-white text-white p-1 rounded-full text-[9px] font-mono font-bold"
                            title="Cycle layout avatar"
                          >
                            <RefreshCw className="w-2.5 h-2.5" />
                          </button>
                        </div>

                        <div className="flex-1 space-y-1">
                          <input 
                            type="text" 
                            value={userName} 
                            onChange={(e) => setUserName(e.target.value)}
                            placeholder="Enter Name"
                            className="text-xs font-semibold text-stone-800 w-full bg-transparent border-b border-stone-300 focus:border-[#725e22] focus:outline-none"
                          />
                          <span className="text-[9px] text-stone-400 font-medium block">Active Disciple</span>
                        </div>
                      </div>
                    </div>

                    {/* Quick navigation index shortcuts within drawer */}
                    <nav className="space-y-1">
                      <span className="text-[9px] font-mono tracking-widest text-stone-400 uppercase font-bold block px-2 pb-2">
                        Shortcut Index
                      </span>
                      
                      {[
                        { id: "home", label: "Devotional Sanctuary", icon: <Home className="w-4 h-4" /> },
                        { id: "counsel", label: "AI Pastoral Chat", icon: <Heart className="w-4 h-4" /> },
                        { id: "media", label: "Spiritual Media Streams", icon: <Play className="w-4 h-4" /> },
                        { id: "devotionals", label: "Sunrise & Starfall Read", icon: <BookOpen className="w-4 h-4" /> },
                        { id: "reminders", label: "Prayer Rhythm Timers", icon: <Bell className="w-4 h-4" /> }
                      ].map((link) => (
                        <button
                          key={link.id}
                          onClick={() => {
                            setActiveScreen(link.id);
                            setIsSidebarOpen(false);
                          }}
                          className={`w-full text-left px-3 py-2.5 rounded-lg text-xs font-sans transition-colors flex items-center gap-3 ${
                            activeScreen === link.id 
                              ? "bg-[#142315] text-[#FAF9F6] font-medium" 
                              : "text-stone-600 hover:bg-stone-100"
                          }`}
                        >
                          {link.icon}
                          <span>{link.label}</span>
                        </button>
                      ))}
                    </nav>
                  </div>

                  {/* Drawer Footer info */}
                  <div className="space-y-3 pt-6 border-t border-stone-200">
                    <div className="flex items-center justify-between text-[10px] text-stone-450 font-mono">
                      <span>Server Counsel</span>
                      <span className="text-emerald-700 font-bold">ONLINE</span>
                    </div>
                    <p className="text-[9px] text-stone-400 text-center font-sans">
                      May the Almighty shine light upon Emily & your beloved family today.
                    </p>
                  </div>
                </motion.div>

                {/* Silent outside click trigger */}
                <div className="flex-1" onClick={() => setIsSidebarOpen(false)} />
              </div>
            )}
          </AnimatePresence>
        </div>

        {/* Global Bottom Navigation Tab Bar - Exactly designed following screenshots */}
        <footer id="global_nav_footer" className="bg-[#FAF9F6] border-t border-stone-250/60 p-2.5 flex items-center justify-around">
          
          {/* Home Sanctuary Tab */}
          <button 
            id="tab_home_btn"
            onClick={() => setActiveScreen("home")}
            className={`flex flex-col items-center justify-center p-2 rounded-xl transition-all font-sans relative ${
              activeScreen === "home" 
                ? "bg-amber-100/60 text-[#715d2b] font-semibold flex-1 max-w-[20%]" 
                : "text-stone-400 hover:text-stone-650"
            }`}
          >
            <Home className="w-4.5 h-4.5" />
            <span className="text-[10px] mt-1 font-medium tracking-tight">Home</span>
          </button>

          {/* AI Counsel Tab */}
          <button 
            id="tab_counsel_btn"
            onClick={() => setActiveScreen("counsel")}
            className={`flex flex-col items-center justify-center p-2 rounded-xl transition-all font-sans relative ${
              activeScreen === "counsel" 
                ? "bg-amber-100/60 text-[#715d2b] font-semibold flex-1 max-w-[20%]" 
                : "text-stone-400 hover:text-stone-650"
            }`}
          >
            <Heart className="w-4.5 h-4.5" />
            <span className="text-[10px] mt-1 font-medium tracking-tight">Counsel</span>
          </button>

          {/* Devotionals Tab */}
          <button 
            id="tab_devotionals_btn"
            onClick={() => setActiveScreen("devotionals")}
            className={`flex flex-col items-center justify-center p-2 rounded-xl transition-all font-sans relative ${
              activeScreen === "devotionals" 
                ? "bg-amber-100/60 text-[#715d2b] font-semibold flex-1 max-w-[20%]" 
                : "text-stone-400 hover:text-stone-650"
            }`}
          >
            <BookOpen className="w-4.5 h-4.5" />
            <span className="text-[10px] mt-1 font-medium tracking-tight">Devotionals</span>
          </button>

          {/* Media Tab */}
          <button 
            id="tab_media_btn"
            onClick={() => setActiveScreen("media")}
            className={`flex flex-col items-center justify-center p-2 rounded-xl transition-all font-sans relative ${
              activeScreen === "media" 
                ? "bg-amber-100/60 text-[#715d2b] font-semibold flex-1 max-w-[20%]" 
                : "text-stone-400 hover:text-stone-650"
            }`}
          >
            <Play className="w-4.5 h-4.5" />
            <span className="text-[10px] mt-1 font-medium tracking-tight">Media</span>
          </button>

          {/* Prayer Reminders Tab */}
          <button 
            id="tab_reminders_btn"
            onClick={() => setActiveScreen("reminders")}
            className={`flex flex-col items-center justify-center p-2 rounded-xl transition-all font-sans relative ${
              activeScreen === "reminders" 
                ? "bg-amber-100/60 text-[#715d2b] font-semibold flex-1 max-w-[20%]" 
                : "text-stone-400 hover:text-stone-650"
            }`}
          >
            <Bell className="w-4.5 h-4.5" />
            <span className="text-[10px] mt-1 font-medium tracking-tight">Reminders</span>
          </button>
        </footer>

      </div>
    </div>
  );
}

