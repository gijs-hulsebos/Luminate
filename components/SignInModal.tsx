'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useGoogleLogin } from '@react-oauth/google';
import { X, Loader2 } from 'lucide-react';
import { config } from '@/lib/config';

interface SignInModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (userData: any) => void;
}

export default function SignInModal({ isOpen, onClose, onLogin }: SignInModalProps) {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => setErrorMessage(null), 0);
      console.log('clientId on mount:', config.googleClientId);
    }
  }, [isOpen]);

  const login = useGoogleLogin({
    redirect_uri: typeof window !== 'undefined' ? window.location.origin : '',
    onSuccess: async (tokenResponse: any) => {
      try {
        const res = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
        });
        const data = await res.json();
        onLogin({
          displayName: data.name,
          photoURL: data.picture,
        });
        setIsAuthenticating(false);
        onClose();
      } catch (e) {
        console.error('Failed to fetch user info', e);
        setErrorMessage('Failed to fetch user info from Google.');
        setIsAuthenticating(false);
      }
    },
    onError: () => {
      console.log('Login Failed');
      setErrorMessage('Google login failed or was cancelled.');
      setIsAuthenticating(false);
    },
  } as any);

  const handleOAuthClick = (provider: string) => {
    setErrorMessage(null);
    if (provider === 'google') {
      if (config.googleClientId === 'dummy-client-id' || !config.googleClientId) {
        setErrorMessage("Missing Google Client ID. Please add NEXT_PUBLIC_GOOGLE_CLIENT_ID to your AI Studio secrets.");
        return;
      }
      setIsAuthenticating(true);
      login();
    } else {
      setIsAuthenticating(true);
      // Mock for Apple and Email
      setTimeout(() => {
        onLogin({
          displayName: `User (${provider})`,
          photoURL: '',
        });
        setIsAuthenticating(false);
        onClose();
      }, 1500);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-md overflow-hidden rounded-2xl bg-[#05080F]/80 backdrop-blur-[20px] p-10 shadow-ethereal border border-[#D4AF37]"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={onClose}
              disabled={isAuthenticating}
              className="absolute top-4 right-4 p-2 text-[#D4AF37]/70 hover:text-[#D4AF37] transition-colors disabled:opacity-50"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex flex-col items-center text-center space-y-8">
              <div className="space-y-2">
                <h2 className="font-serif text-3xl font-bold text-[#F8F5F0]">Luminate</h2>
                <p className="font-serif text-lg text-[#F8F5F0]/80 italic">Enter into the Word</p>
              </div>

              {errorMessage && (
                <div className="w-full p-3 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm font-sans text-left">
                  {errorMessage}
                </div>
              )}

              {isAuthenticating ? (
                <div className="flex flex-col items-center justify-center py-8 space-y-4">
                  <Loader2 className="h-10 w-10 animate-spin text-gold" />
                  <p className="font-serif text-sm text-gold tracking-widest uppercase">Sanctifying...</p>
                </div>
              ) : (
                <div className="w-[90%] mx-auto space-y-3">
                  <motion.button
                    whileHover={{ scale: 1.05, transition: { duration: 0.1 } }}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => handleOAuthClick('google')}
                    className="flex w-full items-center justify-center gap-3 rounded-lg border border-gold/30 bg-white px-6 py-3 text-sm font-sans font-medium text-charcoal shadow-sm transition-all duration-100 hover:shadow-[0_0_20px_rgba(181,148,16,0.15)]"
                  >
                    <svg className="h-5 w-5" viewBox="0 0 24 24">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                    </svg>
                    Continue with Google
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05, transition: { duration: 0.1 } }}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => handleOAuthClick('apple')}
                    className="flex w-full items-center justify-center gap-3 rounded-lg border border-black bg-black px-6 py-3 text-sm font-sans font-medium text-white shadow-sm transition-all duration-100 hover:shadow-[0_0_20px_rgba(181,148,16,0.15)]"
                  >
                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.126 3.805 3.068 1.52-.058 2.102-.98 3.935-.98 1.83 0 2.373.98 3.96.945 1.644-.035 2.658-1.52 3.64-2.96 1.13-1.65 1.595-3.25 1.625-3.333-.035-.015-3.126-1.198-3.156-4.78-.027-3.003 2.45-4.44 2.56-4.5-1.425-2.083-3.64-2.33-4.45-2.38-1.78-.17-3.605 1.18-4.515 1.18-.91 0-2.415-1.14-3.96-1.14zM15.06 4.38c.83-1.006 1.39-2.405 1.24-3.805-1.198.048-2.658.795-3.518 1.82-.77.88-1.425 2.31-1.25 3.69 1.34.104 2.698-.696 3.528-1.705z" />
                    </svg>
                    Continue with Apple
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05, transition: { duration: 0.1 } }}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => handleOAuthClick('email')}
                    className="flex w-full items-center justify-center gap-3 rounded-lg border border-[#D4AF37] bg-transparent px-6 py-3 text-sm font-sans font-medium text-[#F8F5F0] shadow-sm transition-all duration-100 hover:bg-[#B59410]/10"
                  >
                    <svg className="h-5 w-5 text-[#D4AF37]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect width="20" height="16" x="2" y="4" rx="2" />
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                    </svg>
                    Continue with Email
                  </motion.button>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
