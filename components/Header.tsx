'use client';

import { googleLogout } from '@react-oauth/google';
import { LogOut, User, Sun, Moon } from 'lucide-react';

interface HeaderProps {
  user: any;
  onLoginClick: () => void;
  onLogout: () => void;
  onLogoClick: () => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  onProfileClick?: () => void;
}

export default function Header({ user, onLoginClick, onLogout, onLogoClick, isDarkMode, toggleDarkMode, onProfileClick }: HeaderProps) {
  const handleLogout = () => {
    googleLogout();
    onLogout();
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-[#05080F]">
      <div className="flex h-14 items-center justify-between px-6 md:px-8 max-w-5xl mx-auto">
        <div className="flex items-center justify-start w-12">
          <button onClick={toggleDarkMode} className="p-2 rounded-full text-gold hover:text-[#F8F5F0] hover:bg-[#B59410]/10 hover:scale-110 transition-all duration-100">
            {isDarkMode ? <Sun strokeWidth={1} className="h-5 w-5" /> : <Moon strokeWidth={1} className="h-5 w-5" />}
          </button>
        </div>
        
        <button onClick={onLogoClick} className="flex items-center justify-center hover:opacity-70 transition-opacity absolute left-1/2 -translate-x-1/2">
          <span className="font-sans text-xs font-medium tracking-[0.3em] uppercase text-[#F8F5F0]">Luminate</span>
        </button>
        
        <div className="flex items-center justify-end w-12">
          {user ? (
            <div className="group relative flex items-center">
              {user.photoURL || user.picture ? (
                <img 
                  src={user.photoURL || user.picture} 
                  alt={user.displayName || user.name} 
                  className="h-8 w-8 rounded-full border border-gold/30 cursor-pointer hover:scale-110 hover:shadow-[0_0_15px_rgba(181,148,16,0.3)] transition-all duration-100" 
                  referrerPolicy="no-referrer" 
                  onClick={onProfileClick} 
                  title="Profile Menu" 
                />
              ) : (
                <div 
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-gold/30 bg-transparent cursor-pointer hover:scale-110 hover:shadow-[0_0_15px_rgba(181,148,16,0.3)] hover:bg-[#B59410]/10 transition-all duration-100" 
                  onClick={onProfileClick} 
                  title="Profile Menu"
                >
                  <span className="font-serif text-xs text-gold">{(user.displayName || user.name || 'U').charAt(0).toUpperCase()}</span>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={onLoginClick}
              className="p-2 rounded-full text-gold hover:text-[#F8F5F0] hover:bg-[#B59410]/10 hover:scale-110 transition-all duration-100"
              title="Sign In"
            >
              <User strokeWidth={1} className="h-5 w-5" />
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
