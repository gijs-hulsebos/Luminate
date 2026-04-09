import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Share2, MessageCircle, Send } from 'lucide-react';
import Image from 'next/image';

interface ReferralModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: any;
}

export default function ReferralModal({ isOpen, onClose, user }: ReferralModalProps) {
  if (!user) return null;

  const referralCode = `${(user.displayName || user.name || 'SEEKER').split(' ')[0].toUpperCase()}-VATICAN-777`;
  
  const shareMessage = `"For God so loved the world..."\n\nI’ve started using Luminate, a private sanctuary for the soul, and I’d love for you to join me in experiencing the Word in a new light.`;
  const shareUrl = `https://luminate.app/invite/${referralCode}`;
  const fullText = `${shareMessage}\n\n${shareUrl}`;

  const handleWhatsAppShare = () => {
    window.open(`https://wa.me/?text=${encodeURIComponent(fullText)}`, '_blank');
  };

  const handleTelegramShare = () => {
    window.open(`https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareMessage)}`, '_blank');
  };

  const handleSystemShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'A Share in the Word',
          text: shareMessage,
          url: shareUrl,
        });
      } catch (err) {
        console.error('Error sharing:', err);
      }
    } else {
      navigator.clipboard.writeText(fullText);
      alert('Invitation copied to clipboard!');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-[120] bg-black/30 backdrop-blur-[10px]"
            onClick={onClose}
          />
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed bottom-0 left-0 right-0 z-[121] rounded-t-3xl bg-[#05080F]/90 backdrop-blur-[20px] border-t border-[#D4AF37]/30 p-6 shadow-[0_-10px_40px_rgba(0,0,0,0.5)] flex flex-col"
          >
            <div className="mx-auto max-w-md w-full">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-serif text-2xl text-[#B59410]">A Share in the Word</h2>
                <button 
                  onClick={onClose} 
                  className="p-2 rounded-full text-[#F8F5F0]/50 hover:text-[#D4AF37] hover:bg-[#B59410]/10 transition-all duration-200"
                >
                  <X strokeWidth={1} className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-6">
                <p className="font-serif text-[15px] text-[#F8F5F0] leading-relaxed opacity-90">
                  Luminate is a private study for the soul. Invite those you love to experience the Word in a newly illuminated light.
                </p>

                {/* Invite Preview Card */}
                <div className="relative w-full h-48 rounded-xl overflow-hidden border border-[#D4AF37]/30 shadow-lg">
                  <Image 
                    src="https://images.unsplash.com/photo-1499856871958-5b9627545d1a?q=80&w=1000&auto=format&fit=crop" 
                    alt="Monastery Silhouette" 
                    fill 
                    className="object-cover opacity-60"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#05080F]/80 to-transparent" />
                  <div className="absolute inset-0 p-6 flex flex-col justify-end">
                    <p className="font-serif italic text-xl text-[#F8F5F0] leading-snug">
                      "For God so loved the world..."
                    </p>
                  </div>
                </div>

                <div className="text-center space-y-2 pt-2">
                  <p className="font-sans text-[10px] text-[#F8F5F0]/70 uppercase tracking-[0.2em]">Your Unique Invitation</p>
                  <div className="bg-transparent border border-[#D4AF37]/50 rounded-xl py-4 px-8">
                    <span className="font-serif text-2xl tracking-widest text-[#F8F5F0]">{referralCode}</span>
                  </div>
                  <p className="font-sans text-[9px] text-[#D4AF37] uppercase tracking-[0.1em] pt-2">
                    By sharing, you and your friends earn 1 month of Luminate Premium.
                  </p>
                </div>

                <div className="flex items-center justify-center gap-8 pt-4 pb-4">
                  {/* Share Actions */}
                  <button onClick={handleWhatsAppShare} className="flex flex-col items-center gap-3 group">
                    <div className="w-14 h-14 rounded-full border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] group-hover:bg-[#B59410]/10 group-hover:border-[#D4AF37] group-hover:scale-110 transition-all duration-200">
                      <MessageCircle strokeWidth={1} className="w-6 h-6" />
                    </div>
                    <span className="font-sans text-[10px] uppercase tracking-widest text-[#F8F5F0]/50 group-hover:text-[#D4AF37] transition-colors">WhatsApp</span>
                  </button>
                  <button onClick={handleTelegramShare} className="flex flex-col items-center gap-3 group">
                    <div className="w-14 h-14 rounded-full border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] group-hover:bg-[#B59410]/10 group-hover:border-[#D4AF37] group-hover:scale-110 transition-all duration-200">
                      <Send strokeWidth={1} className="w-6 h-6" />
                    </div>
                    <span className="font-sans text-[10px] uppercase tracking-widest text-[#F8F5F0]/50 group-hover:text-[#D4AF37] transition-colors">Telegram</span>
                  </button>
                  <button onClick={handleSystemShare} className="flex flex-col items-center gap-3 group">
                    <div className="w-14 h-14 rounded-full border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] group-hover:bg-[#B59410]/10 group-hover:border-[#D4AF37] group-hover:scale-110 transition-all duration-200">
                      <Share2 strokeWidth={1} className="w-6 h-6" />
                    </div>
                    <span className="font-sans text-[10px] uppercase tracking-widest text-[#F8F5F0]/50 group-hover:text-[#D4AF37] transition-colors">Share</span>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
