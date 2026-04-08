import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, User, Settings, ScrollText, LogOut, ChevronLeft, Bell, Moon, Sun, ChevronRight } from 'lucide-react';

interface SacristyMenuProps {
  isOpen: boolean;
  onClose: () => void;
  user: any;
  onLogout: () => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

export default function SacristyMenu({ isOpen, onClose, user, onLogout, isDarkMode, toggleDarkMode }: SacristyMenuProps) {
  const [activeView, setActiveView] = useState<'menu' | 'profile' | 'settings' | 'rule'>('menu');

  useEffect(() => {
    if (isOpen) {
      setActiveView('menu');
    }
  }, [isOpen]);

  if (!user) return null;

  const memberSince = new Date().getFullYear(); // Mocked for current year

  const MenuItem = ({ icon, title, subtitle, onClick }: { icon: React.ReactNode, title: string, subtitle: string, onClick: () => void }) => (
    <button 
      onClick={onClick}
      className="w-full flex items-center justify-between p-6 hover:bg-[#B59410]/10 transition-all duration-200 group text-left"
    >
      <div className="flex items-center gap-6">
        <div className="text-[#D4AF37] group-hover:scale-110 transition-transform duration-200">
          {icon}
        </div>
        <div>
          <h3 className="font-serif text-xl text-[#F8F5F0] tracking-wide">{title}</h3>
          <p className="font-sans text-xs text-[#F8F5F0]/50 mt-1 uppercase tracking-widest">{subtitle}</p>
        </div>
      </div>
      <ChevronRight strokeWidth={1} className="w-5 h-5 text-[#D4AF37]/50 group-hover:text-[#D4AF37] group-hover:translate-x-1 transition-all" />
    </button>
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-md z-[101] bg-[#05080F]/95 backdrop-blur-[20px] border-l border-[#D4AF37]/30 shadow-[-10px_0_40px_rgba(0,0,0,0.5)] flex flex-col"
          >
            {activeView === 'menu' && (
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex flex-col h-full text-[#F8F5F0]"
              >
                <div className="p-8 border-b border-[#D4AF37]/30 flex items-start justify-between">
                  <div>
                    <h2 className="font-serif text-3xl text-[#D4AF37]">{user.displayName || user.name || 'Seeker'}</h2>
                    <p className="font-sans text-xs text-[#F8F5F0]/50 tracking-widest uppercase mt-2">Member Since {memberSince}</p>
                  </div>
                  <button onClick={onClose} className="p-2 rounded-full hover:bg-[#B59410]/10 hover:scale-110 transition-all duration-100 text-[#D4AF37]/70 hover:text-[#D4AF37]">
                    <X strokeWidth={1} className="w-6 h-6" />
                  </button>
                </div>
                
                <div className="flex-1 overflow-y-auto py-4">
                  <MenuItem 
                    icon={<User strokeWidth={1} className="w-7 h-7" />} 
                    title="Personal Sanctuary" 
                    subtitle="Profile & Spiritual Goals" 
                    onClick={() => setActiveView('profile')} 
                  />
                  <div className="h-[1px] bg-[#D4AF37]/20 mx-8" />
                  <MenuItem 
                    icon={<Settings strokeWidth={1} className="w-7 h-7" />} 
                    title="Preferences" 
                    subtitle="Theme, Audio & Notifications" 
                    onClick={() => setActiveView('settings')} 
                  />
                  <div className="h-[1px] bg-[#D4AF37]/20 mx-8" />
                  <MenuItem 
                    icon={<ScrollText strokeWidth={1} className="w-7 h-7" />} 
                    title="The Rule" 
                    subtitle="Documentation & Guidance" 
                    onClick={() => setActiveView('rule')} 
                  />
                </div>

                <div className="p-6 border-t border-[#D4AF37]/30">
                  <button 
                    onClick={() => { onLogout(); onClose(); }} 
                    className="flex items-center justify-center gap-3 w-full p-4 rounded-xl hover:bg-[#B59410]/10 transition-all duration-200 text-[#D4AF37] group border border-transparent hover:border-[#D4AF37]/30"
                  >
                    <LogOut strokeWidth={1} className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    <span className="font-sans text-sm font-medium tracking-widest uppercase">Sign Out</span>
                  </button>
                </div>
              </motion.div>
            )}

            {activeView === 'rule' && (
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex flex-col h-full text-[#F8F5F0]"
              >
                <div className="p-6 border-b border-[#D4AF37]/30 flex items-center gap-4">
                  <button onClick={() => setActiveView('menu')} className="p-2 rounded-full hover:bg-[#B59410]/10 hover:scale-110 transition-all duration-100 text-[#D4AF37]/70 hover:text-[#D4AF37]">
                    <ChevronLeft strokeWidth={1} className="w-6 h-6" />
                  </button>
                  <h2 className="font-serif text-2xl text-[#D4AF37]">The Rule</h2>
                </div>
                <div className="flex-1 overflow-y-auto p-8 space-y-10 font-sans text-sm leading-relaxed text-[#F8F5F0]/80">
                  <section>
                    <h3 className="font-serif text-2xl text-[#D4AF37] mb-4">Community Guidelines</h3>
                    <p className="font-sans font-light text-[15px] leading-[1.8]">Luminate is a sanctuary for private study and contemplation. We ask all seekers to approach the Word with reverence and respect. Your reflections are your own, but the spirit in which you engage with the text shapes your journey.</p>
                  </section>
                  <section>
                    <h3 className="font-serif text-2xl text-[#D4AF37] mb-4">Privacy of Prayer</h3>
                    <p className="font-sans font-light text-[15px] leading-[1.8]">Your highlights, notes, and saved verses are stored locally in your personal sanctuary. We do not harvest your spiritual insights. Your prayer life remains between you and the Divine.</p>
                  </section>
                  <section>
                    <h3 className="font-serif text-2xl text-[#D4AF37] mb-4">Sacred Terms</h3>
                    <p className="font-sans font-light text-[15px] leading-[1.8]">By entering this space, you agree to use Luminate for personal spiritual growth. The tools provided (audio, highlighting, and reflection) are designed to deepen your understanding, not to replace communal worship or authoritative teaching.</p>
                  </section>
                </div>
              </motion.div>
            )}

            {activeView === 'profile' && (
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex flex-col h-full text-[#F8F5F0]"
              >
                <div className="p-6 border-b border-[#D4AF37]/30 flex items-center gap-4">
                  <button onClick={() => setActiveView('menu')} className="p-2 rounded-full hover:bg-[#B59410]/10 hover:scale-110 transition-all duration-100 text-[#D4AF37]/70 hover:text-[#D4AF37]">
                    <ChevronLeft strokeWidth={1} className="w-6 h-6" />
                  </button>
                  <h2 className="font-serif text-2xl text-[#D4AF37]">Personal Sanctuary</h2>
                </div>
                <div className="flex-1 overflow-y-auto p-8 space-y-8">
                  <div className="flex justify-center mb-10">
                    <div className="relative group cursor-pointer">
                      {user.photoURL || user.picture ? (
                        <img src={user.photoURL || user.picture} alt="Profile" className="w-28 h-28 rounded-full border border-[#D4AF37] object-cover group-hover:shadow-[0_0_20px_rgba(181,148,16,0.3)] transition-all duration-300" />
                      ) : (
                        <div className="w-28 h-28 rounded-full border border-[#D4AF37] flex items-center justify-center bg-[#B59410]/10 group-hover:shadow-[0_0_20px_rgba(181,148,16,0.3)] transition-all duration-300">
                          <span className="font-serif text-4xl text-[#D4AF37]">{(user.displayName || user.name || 'U').charAt(0).toUpperCase()}</span>
                        </div>
                      )}
                      <div className="absolute inset-0 rounded-full bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span className="font-sans text-xs text-[#F8F5F0] uppercase tracking-widest">Edit</span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <label className="font-sans text-[10px] tracking-[0.2em] uppercase text-[#D4AF37]/80">Given Name</label>
                    <input type="text" defaultValue={user.displayName || user.name} className="w-full bg-transparent border-b border-[#D4AF37]/30 py-2 font-serif text-xl focus:outline-none focus:border-[#D4AF37] text-[#F8F5F0] transition-colors" />
                  </div>
                  <div className="space-y-3">
                    <label className="font-sans text-[10px] tracking-[0.2em] uppercase text-[#D4AF37]/80">Spiritual Goals</label>
                    <textarea placeholder="What seek ye?" className="w-full bg-black/20 border border-[#D4AF37]/30 rounded-xl p-5 font-serif text-lg focus:outline-none focus:border-[#D4AF37] text-[#F8F5F0] h-40 resize-none transition-colors" style={{ fontFamily: '"EB Garamond", serif' }}></textarea>
                  </div>
                </div>
              </motion.div>
            )}

            {activeView === 'settings' && (
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex flex-col h-full text-[#F8F5F0]"
              >
                <div className="p-6 border-b border-[#D4AF37]/30 flex items-center gap-4">
                  <button onClick={() => setActiveView('menu')} className="p-2 rounded-full hover:bg-[#B59410]/10 hover:scale-110 transition-all duration-100 text-[#D4AF37]/70 hover:text-[#D4AF37]">
                    <ChevronLeft strokeWidth={1} className="w-6 h-6" />
                  </button>
                  <h2 className="font-serif text-2xl text-[#D4AF37]">Preferences</h2>
                </div>
                <div className="flex-1 overflow-y-auto p-8 space-y-8">
                  <div className="flex items-center justify-between group">
                    <div>
                      <h3 className="font-serif text-xl text-[#F8F5F0]">Theme</h3>
                      <p className="font-sans text-xs text-[#F8F5F0]/50 mt-1">Toggle day and night modes</p>
                    </div>
                    <button onClick={toggleDarkMode} className="p-4 rounded-full border border-[#D4AF37]/30 hover:bg-[#B59410]/10 hover:border-[#D4AF37] transition-all duration-200 text-[#D4AF37] group-hover:scale-105">
                      {isDarkMode ? <Sun strokeWidth={1} className="w-6 h-6" /> : <Moon strokeWidth={1} className="w-6 h-6" />}
                    </button>
                  </div>
                  <div className="h-[1px] bg-[#D4AF37]/20" />
                  <div className="flex items-center justify-between group">
                    <div>
                      <h3 className="font-serif text-xl text-[#F8F5F0]">Audio Speed</h3>
                      <p className="font-sans text-xs text-[#F8F5F0]/50 mt-1">Pacing of the spoken Word</p>
                    </div>
                    <select className="bg-[#05080F] border border-[#D4AF37]/30 rounded-xl px-4 py-3 font-sans text-sm text-[#D4AF37] focus:outline-none focus:border-[#D4AF37] transition-colors cursor-pointer outline-none hover:bg-[#B59410]/10">
                      <option value="0.75x">0.75x (Contemplative)</option>
                      <option value="1x" selected>1.00x (Normal)</option>
                      <option value="1.25x">1.25x (Brisk)</option>
                    </select>
                  </div>
                  <div className="h-[1px] bg-[#D4AF37]/20" />
                  <div className="flex items-center justify-between group">
                    <div>
                      <h3 className="font-serif text-xl text-[#F8F5F0]">Notification Bells</h3>
                      <p className="font-sans text-xs text-[#F8F5F0]/50 mt-1">Daily reading reminders</p>
                    </div>
                    <button className="p-4 rounded-full border border-[#D4AF37]/30 hover:bg-[#B59410]/10 hover:border-[#D4AF37] transition-all duration-200 text-[#D4AF37] group-hover:scale-105">
                      <Bell strokeWidth={1} className="w-6 h-6" />
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
