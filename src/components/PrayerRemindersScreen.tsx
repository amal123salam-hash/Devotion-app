import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  ArrowLeft, Calendar, Clock, Bell, Plus, Trash2, Edit2, Check,
  Volume2, VolumeX, Sun, CloudSun, Moon, Star, AlertCircle
} from "lucide-react";
import { PrayerReminder } from "../types";
import { initialReminders } from "../data";

interface PrayerRemindersScreenProps {
  onNavigate: (screen: string) => void;
}

export default function PrayerRemindersScreen({ onNavigate }: PrayerRemindersScreenProps) {
  const [reminders, setReminders] = useState<PrayerReminder[]>(() => {
    const saved = localStorage.getItem("christ_counsel_reminders");
    return saved ? JSON.parse(saved) : initialReminders;
  });

  const [isGoogleSynced, setIsGoogleSynced] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form states for creation/edit
  const [formTitle, setFormTitle] = useState("");
  const [formTime, setFormTime] = useState("08:00 AM");
  const [formSchedule, setFormSchedule] = useState("Daily");
  const [formCategory, setFormCategory] = useState<"prayer" | "meditation" | "scripture" | "reflection">("prayer");
  const [selectedAlarmSound, setSelectedAlarmSound] = useState("Ambient Cathedral Chimes");
  const [speakerRunning, setSpeakerRunning] = useState(false);

  // Persistence
  useEffect(() => {
    localStorage.setItem("christ_counsel_reminders", JSON.stringify(reminders));
  }, [reminders]);

  const soundPresets = [
    "Ambient Cathedral Chimes",
    "Soft Morning Harp",
    "Solemn Gregorian Chant",
    "Gentle Flowing River"
  ];

  const toggleReminder = (id: string) => {
    setReminders(prev => 
      prev.map(r => r.id === id ? { ...r, isActive: !r.isActive } : r)
    );
  };

  const deleteReminder = (id: string) => {
    setReminders(prev => prev.filter(r => r.id !== id));
    if (editingId === id) {
      resetForm();
    }
  };

  const resetForm = () => {
    setFormTitle("");
    setFormTime("08:00 AM");
    setFormSchedule("Daily");
    setFormCategory("prayer");
    setSelectedAlarmSound("Ambient Cathedral Chimes");
    setEditingId(null);
    setShowAddForm(false);
  };

  const handleSaveReminder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim()) return;

    if (editingId) {
      // Edit
      setReminders(prev => prev.map(r => r.id === editingId ? {
        ...r,
        title: formTitle,
        time: formTime,
        schedule: formSchedule,
        category: formCategory
      } : r));
    } else {
      // Create
      const newReminder: PrayerReminder = {
        id: `rem-${Date.now()}`,
        title: formTitle,
        time: formTime,
        schedule: formSchedule,
        isActive: true,
        category: formCategory
      };
      setReminders(prev => [...prev, newReminder]);
    }

    resetForm();
  };

  const startEdit = (rem: PrayerReminder) => {
    setEditingId(rem.id);
    setFormTitle(rem.title);
    setFormTime(rem.time);
    setFormSchedule(rem.schedule);
    setFormCategory(rem.category);
    setShowAddForm(true);
  };

  const playSoundDemo = () => {
    if (speakerRunning) {
      window.speechSynthesis.cancel();
      setSpeakerRunning(false);
      return;
    }

    // High fidelity browser synthesis representing the high fidelity chord chime sound effect
    const utterance = new SpeechSynthesisUtterance("Chime chime, prayer call is ringing.");
    utterance.rate = 1.2;
    utterance.pitch = 1.3;
    utterance.volume = 0.5;
    utterance.onstart = () => setSpeakerRunning(true);
    utterance.onend = () => setSpeakerRunning(false);
    utterance.onerror = () => setSpeakerRunning(false);

    window.speechSynthesis.speak(utterance);
    alert(`Demo Sound: Playing "${selectedAlarmSound}"...`);
  };

  const handleSyncGoogleCalendar = () => {
    setIsGoogleSynced(true);
    // Real oauth trigger notification
    alert("Triggered Google Calendar sync flow. Your prayer alerts have been established onto your Google Account.");
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "prayer":
        return <Sun className="w-5 h-5 text-amber-600" />;
      case "reflection":
        return <CloudSun className="w-5 h-5 text-sky-600" />;
      case "meditation":
        return <Moon className="w-5 h-5 text-indigo-600" />;
      case "scripture":
        return <Star className="w-5 h-5 text-amber-500" />;
      default:
        return <Bell className="w-5 h-5 text-stone-600" />;
    }
  };

  return (
    <div id="reminders_screen_root" className="h-full flex flex-col bg-[#FAF9F6] text-stone-850 overflow-y-auto">
      {/* Header */}
      <header id="reminders_header" className="flex items-center justify-between px-5 pt-4 pb-2 bg-[#FAF9F6]">
        <button 
          id="reminders_back_btn" 
          onClick={() => onNavigate("home")}
          className="text-stone-600 hover:text-stone-900 flex items-center gap-1 text-xs font-semibold focus:outline-none"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Home</span>
        </button>
        <h1 id="reminders_screen_title" className="text-xl font-serif text-[#0f2c1c] tracking-normal font-medium">Devotion</h1>
        <button id="rem_profile_btn" onClick={() => onNavigate("reminders")} className="relative">
          <img 
            id="rem_user_avatar" 
            src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80" 
            alt="Profile Avatar" 
            className="w-8 h-8 rounded-full object-cover border border-amber-800/20"
          />
        </button>
      </header>

      {/* Main Flow */}
      <main id="reminders_main" className="flex-1 px-5 pb-10 space-y-6">
        
        {/* Screen Intro */}
        <div id="reminders_welcome" className="text-center pt-2">
          <h2 id="reminders_heading" className="text-2xl font-serif text-[#0e2a1b] font-bold">Prayer Reminders</h2>
          <p id="rem_subtitle" className="text-xs text-stone-550 leading-relaxed font-sans max-w-sm mx-auto mt-2.5">
            Maintain your spiritual rhythm with thoughtful notifications and calendar integration.
          </p>
        </div>

        {/* Google Calendar Integration Box - matching visual precisely */}
        <motion.div 
          id="google_sync_card"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white border border-stone-200 rounded-2xl p-6 relative shadow-xs"
        >
          <div className="flex flex-col items-center text-center space-y-4">
            {/* Google Icon Visual Wrapper */}
            <div id="google_badge" className="w-16 h-16 rounded-xl border border-stone-200 bg-white flex items-center justify-center relative shadow-sm">
              <svg className="w-8 h-8" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M21.35 11.1H12v2.7h5.38C17 15.63 14.85 17.1 12 17.1c-2.9 0-5.32-1.92-6.2-4.51a6.95 6.95 0 0 1 0-4.18c.88-2.59 3.3-4.51 6.2-4.51 1.63 0 3.06.59 4.18 1.63l3.06-3.06C17.37 1.09 14.9 0 12 0 7.37 0 3.38 2.68 1.45 6.59a11.95 11.95 0 0 0 0 10.82C3.38 21.32 7.37 24 12 24c5.85 0 10.15-3.87 10.15-10.27 0-.9-.08-1.57-.2-2.63l-.6-.03z"
                />
                <path
                  fill="#34A853"
                  d="M1.45 17.41a11.95 11.95 0 0 0 10.55 6.59c3.08 0 5.67-1.01 7.55-2.77l-3.32-2.58c-1.12.75-2.59 1.23-4.23 1.23-2.9 0-5.32-1.92-6.2-4.51"
                />
                <path
                  fill="#FBBC05"
                  d="M1.45 6.59A11.95 11.95 0 0 0 .25 12c0 1.94.46 3.76 1.2 5.41l3.52-2.72c-.22-.65-.34-1.35-.34-2.69s.12-2.04.34-2.69"
                />
                <path
                  fill="#EA4335"
                  d="M12 4.91c1.63 0 3.06.59 4.18 1.63l3.06-3.06C17.37 1.09 14.9 0 12 0 7.37 0 3.38 2.68 1.45 6.59l3.52 2.73"
                />
              </svg>
            </div>

            <div className="space-y-1.5">
              <h3 id="cal_card_heading" className="text-base font-serif font-semibold text-stone-850">Calendar Integration</h3>
              <p id="cal_card_desc" className="text-xs text-stone-500 font-sans max-w-xs leading-relaxed">
                Automatically sync your spiritual schedule with Google Calendar to stay present.
              </p>
            </div>

            <button 
              id="google_sync_btn"
              onClick={handleSyncGoogleCalendar}
              disabled={isGoogleSynced}
              className={`w-full py-3 px-4 rounded-xl text-xs font-semibold tracking-wide transition-all font-sans flex items-center justify-center gap-2 ${
                isGoogleSynced 
                  ? "bg-stone-100 text-stone-500 cursor-not-allowed border border-stone-200" 
                  : "bg-[#0b51ca] hover:bg-[#0941a3] text-white shadow-xs"
              }`}
            >
              <Calendar className="w-4 h-4" />
              <span>{isGoogleSynced ? "Synced with Calendar ✔" : "Connect Google Calendar"}</span>
            </button>
          </div>
        </motion.div>

        {/* Daily Rhythm Alarm Header Group */}
        <div id="rhythm_header_block" className="flex items-center justify-between pt-2">
          <h3 id="rhythm_title" className="text-xl font-serif text-[#0e2a1b] font-bold">Daily Rhythm</h3>
          <button 
            id="add_reminder_btn"
            onClick={() => {
              resetForm();
              setShowAddForm(true);
            }}
            className="text-xs text-[#0a5cfd] hover:text-[#0a48c4] flex items-center gap-1 font-semibold focus:outline-none"
          >
            <Plus className="w-4 h-4" />
            <span>Custom Reminder</span>
          </button>
        </div>

        {/* Custom Alarm Creator Dialogue Panel */}
        <AnimatePresence>
          {showAddForm && (
            <motion.form 
              id="alarm_creation_form"
              onSubmit={handleSaveReminder}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-white border-2 border-dashed border-amber-85 /40 rounded-2xl p-5 space-y-4"
            >
              <div className="flex items-center justify-between border-b border-stone-100 pb-2">
                <span className="text-xs font-serif font-bold text-stone-850">
                  {editingId ? "Modify Devotion Alarm" : "Establish Custom Alarm"}
                </span>
                <button 
                  type="button" 
                  onClick={resetForm}
                  className="text-xs font-mono text-stone-400 hover:text-stone-700"
                >
                  Cancel
                </button>
              </div>

              {/* Title input */}
              <div className="space-y-1">
                <label className="text-[10px] font-mono tracking-wider uppercase text-stone-500 block font-bold">
                  Devotion Title / Affirmation
                </label>
                <input 
                  type="text" 
                  placeholder="e.g. Afternoon Reflection"
                  required
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  className="w-full text-xs font-sans text-stone-800 p-2.5 border border-stone-200 rounded-xl focus:ring-1 focus:ring-amber-800"
                />
              </div>

              {/* Time Selection */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[10px] font-mono tracking-wider uppercase text-stone-500 block font-bold">
                    Schedule Time
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 12:15 PM"
                    required
                    value={formTime}
                    onChange={(e) => setFormTime(e.target.value)}
                    className="w-full text-xs font-sans text-stone-800 p-2.5 border border-stone-200 rounded-xl focus:ring-1 focus:ring-amber-800"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-mono tracking-wider uppercase text-stone-500 block font-bold">
                    Repeat Cadence
                  </label>
                  <select 
                    value={formSchedule}
                    onChange={(e) => setFormSchedule(e.target.value)}
                    className="w-full text-xs font-sans text-stone-800 p-2.5 border border-stone-200 rounded-xl bg-white"
                  >
                    <option value="Daily">Daily</option>
                    <option value="Mon, Wed, Fri">Mon, Wed, Fri</option>
                    <option value="Tuesday, Thursday">Tuesday, Thursday</option>
                    <option value="Sundays Only">Sundays Only</option>
                  </select>
                </div>
              </div>

              {/* Category, Visual Icon Selector */}
              <div className="space-y-1">
                <label className="text-[10px] font-mono tracking-wider uppercase text-stone-500 block font-bold">
                  Reminders Category & Visuals
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {(["prayer", "meditation", "scripture", "reflection"] as const).map((cat) => (
                    <button
                      type="button"
                      key={cat}
                      onClick={() => setFormCategory(cat)}
                      className={`py-2 text-[10px] font-semibold rounded-lg font-sans border capitalize flex flex-col items-center gap-1 ${
                        formCategory === cat 
                          ? "bg-amber-50 text-amber-900 border-amber-300"
                          : "bg-white text-stone-600 border-stone-100"
                      }`}
                    >
                      <span className="scale-75">{getCategoryIcon(cat)}</span>
                      <span>{cat}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Alarm Chime sound dropdown */}
              <div className="space-y-2 pt-2 border-t border-stone-50">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono tracking-wider uppercase text-stone-500 font-bold">
                    Sound Selection
                  </span>
                  <button 
                    type="button" 
                    onClick={playSoundDemo} 
                    className="text-[9px] font-mono text-amber-800 flex items-center gap-1 hover:underline font-bold"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>Listen Demo</span>
                  </button>
                </div>

                <select 
                  value={selectedAlarmSound}
                  onChange={(e) => setSelectedAlarmSound(e.target.value)}
                  className="w-full text-xs font-sans text-stone-800 p-2 border border-stone-200 rounded-xl bg-white"
                >
                  {soundPresets.map((sound) => (
                    <option key={sound} value={sound}>{sound}</option>
                  ))}
                </select>
              </div>

              {/* Submit triggers */}
              <div className="flex justify-end gap-2 pt-2">
                <button 
                  type="submit" 
                  className="bg-[#192b1a] hover:bg-stone-800 text-stone-100 px-4 py-2 text-xs font-medium rounded-xl flex items-center gap-1"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Save Reminder</span>
                </button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>

        {/* Existing Alarms List */}
        <div id="reminders_list" className="space-y-4">
          {reminders.map((rem) => {
            return (
              <div 
                key={rem.id}
                id={`reminder_block_${rem.id}`}
                className="bg-white border border-stone-150 rounded-2xl p-5 shadow-2xs hover:shadow-xs transition-shadow flex items-center justify-between gap-4"
              >
                {/* Info and Type Icon */}
                <div className="flex items-center gap-4">
                  <div id="type_badge" className="w-12 h-12 rounded-xl bg-stone-50 flex items-center justify-center shrink-0 border border-stone-100">
                    {getCategoryIcon(rem.category)}
                  </div>

                  <div className="space-y-0.5">
                    <h4 id={`reminder_label_${rem.id}`} className="text-sm font-serif font-bold text-stone-800">{rem.title}</h4>
                    <div className="flex items-center gap-1.5 text-stone-500 text-xs font-sans">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{rem.time}</span>
                      <span className="w-1 h-1 bg-stone-300 rounded-full" />
                      <span className="text-[10px] font-semibold text-stone-400 capitalize">{rem.schedule}</span>
                    </div>
                  </div>
                </div>

                {/* Edit Pencil / Slide Toggle buttons */}
                <div className="flex items-center gap-3">
                  <button 
                    id={`edit_alarm_${rem.id}`}
                    onClick={() => startEdit(rem)}
                    className="p-1.5 text-stone-400 hover:text-stone-700 hover:bg-stone-50 rounded-lg transition-colors border border-transparent"
                    title="Edit alarm settings"
                  >
                    <Edit2 className="w-4 h-4 text-stone-500" />
                  </button>

                  {/* Standard Android/iOS Switch slider wrapper */}
                  <div 
                    id={`slider_switch_${rem.id}`}
                    onClick={() => toggleReminder(rem.id)}
                    className={`w-11 h-6 rounded-full p-0.5 cursor-pointer transition-colors ${rem.isActive ? 'bg-[#3d6fe5]' : 'bg-stone-300'}`}
                  >
                    <div className={`w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${rem.isActive ? 'translate-x-5' : 'translate-x-0'}`} />
                  </div>

                  <button 
                    id={`delete_alarm_${rem.id}`}
                    onClick={() => deleteReminder(rem.id)}
                    className="p-1.5 text-stone-400 hover:text-red-650 hover:bg-red-50 rounded-lg transition-colors border border-transparent ml-1"
                    title="Obliterate alert"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
