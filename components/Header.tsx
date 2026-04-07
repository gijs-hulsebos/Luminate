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
}

export default function Header({ user, onLoginClick, onLogout, onLogoClick, isDarkMode, toggleDarkMode }: HeaderProps) {
  const handleLogout = () => {
    googleLogout();
    onLogout();
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-transparent">
      <div className="flex h-14 items-center justify-between px-6 md:px-8 max-w-5xl mx-auto">
        <div className="flex items-center justify-start w-12">
          <button onClick={toggleDarkMode} className="text-gold hover:text-petrine transition-colors">
            {isDarkMode ? <Sun strokeWidth={1} className="h-5 w-5" /> : <Moon strokeWidth={1} className="h-5 w-5" />}
          </button>
        </div>
        
        <button onClick={onLogoClick} className="flex items-center justify-center hover:opacity-70 transition-opacity absolute left-1/2 -translate-x-1/2">
          <span className="font-serif text-xs font-medium tracking-[0.3em] uppercase text-petrine dark:text-gold">Luminate</span>
        </button>
        
        <div className="flex items-center justify-end w-12">
          {user ? (
            <div className="group relative flex items-center">
              {user.picture ? (
                <img 
                  src={user.picture} 
                  alt={user.name} 
                  className="h-6 w-6 rounded-full border border-gold/30 cursor-pointer hover:opacity-80 transition-opacity" 
                  referrerPolicy="no-referrer" 
                  onClick={handleLogout} 
                  title="Logout" 
                />
              ) : (
                <div 
                  className="flex h-6 w-6 items-center justify-center rounded-full border border-gold/30 bg-transparent cursor-pointer hover:opacity-80 transition-opacity" 
                  onClick={handleLogout} 
                  title="Logout"
                >
                  <span className="font-serif text-xs text-gold">{user.name.charAt(0).toUpperCase()}</span>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={onLoginClick}
              className="text-gold hover:text-petrine transition-colors"
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
