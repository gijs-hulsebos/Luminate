import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, Leaf, TreeDeciduous, Heart, Sprout, Lock } from 'lucide-react';
import Image from 'next/image';

interface VineyardProps {
  onBack: () => void;
}

export default function Vineyard({ onBack }: VineyardProps) {
  const [activeTab, setActiveTab] = useState<'tree' | 'soil' | 'sanctuary'>('tree');
  const [soilView, setSoilView] = useState<'main' | 'seedlings'>('main');
  const [hoveredLabel, setHoveredLabel] = useState<string | null>(null);
  const [showTrellisModal, setShowTrellisModal] = useState(false);
  const [showBloomModal, setShowBloomModal] = useState(false);

  const handleTabChange = (tab: 'tree' | 'soil' | 'sanctuary') => {
    setActiveTab(tab);
    if (tab === 'soil') setSoilView('main');
  };

  return (
    <div className="flex-1 flex flex-col relative bg-sanctuary-center overflow-y-auto">
      {/* Header */}
      <div className="sticky top-0 z-50 flex items-center justify-between p-6 bg-sanctuary-center/80 backdrop-blur-md border-b border-gold/10">
        <button 
          onClick={onBack}
          className="p-2 rounded-full text-charcoal/60 hover:text-charcoal hover:bg-gold/10 transition-colors"
        >
          <ChevronLeft strokeWidth={1} className="w-6 h-6" />
        </button>
        <div className="flex flex-col items-center">
          <h1 className="font-serif text-2xl text-[#D4AF37] tracking-wide">The Vineyard</h1>
          <p className="font-serif text-sm text-charcoal/60 italic mt-1">Where Community meets Unity</p>
        </div>
        <div className="w-10" /> {/* Spacer for centering */}
      </div>

      {/* Tabs */}
      <div className="flex justify-center gap-8 p-6 border-b border-gold/10">
        <button 
          onClick={() => handleTabChange('tree')}
          className={`font-sans text-xs uppercase tracking-[0.2em] pb-2 border-b-2 transition-colors ${
            activeTab === 'tree' ? 'border-gold text-gold' : 'border-transparent text-charcoal/50 hover:text-charcoal'
          }`}
        >
          The Tree
        </button>
        <button 
          onClick={() => handleTabChange('soil')}
          className={`font-sans text-xs uppercase tracking-[0.2em] pb-2 border-b-2 transition-colors ${
            activeTab === 'soil' ? 'border-gold text-gold' : 'border-transparent text-charcoal/50 hover:text-charcoal'
          }`}
        >
          The Soil
        </button>
        <button 
          onClick={() => handleTabChange('sanctuary')}
          className={`font-sans text-xs uppercase tracking-[0.2em] pb-2 border-b-2 transition-colors ${
            activeTab === 'sanctuary' ? 'border-gold text-gold' : 'border-transparent text-charcoal/50 hover:text-charcoal'
          }`}
        >
          Sanctuary
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center w-full">
        {activeTab === 'tree' && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="w-full max-w-md flex flex-col items-center relative"
          >
            <div className="px-8 pt-0 text-center">
              <p className="font-serif text-charcoal/80 leading-relaxed text-sm">
                As part of our mission, Luminate pledges 5% of all net proceeds (after applicable platform fees) to the following pillars of our faith:
              </p>
            </div>

            {/* Line Art Tree Container */}
            <div className="relative w-full h-[550px] -mt-4 mb-4">
              
              {/* SVG Tree */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className={`w-[120%] h-[120%] -mt-12 relative transition-all duration-500 ${hoveredLabel ? 'blur-sm opacity-60' : ''}`}>
                  <Image 
                    src="/Assets/Community Tree.png" 
                    alt="Community Tree" 
                    fill 
                    className="object-contain" 
                  />
                </div>
              </div>

              {/* Labels */}
              {/* Leaves */}
              <div 
                className="absolute top-[12%] left-[62%] flex flex-col z-20 group cursor-pointer"
                onMouseEnter={() => setHoveredLabel('leaves')}
                onMouseLeave={() => setHoveredLabel(null)}
              >
                <span className="font-serif text-lg text-charcoal leading-tight transition-colors group-hover:text-gold">The Leaves</span>
                <span className="font-sans text-[8px] text-charcoal font-bold uppercase tracking-widest whitespace-nowrap absolute top-full left-0 mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">Developing regions 1%</span>
              </div>

              {/* Branches */}
              <div 
                className="absolute top-[52%] left-[62%] flex flex-col z-20 group cursor-pointer"
                onMouseEnter={() => setHoveredLabel('branches')}
                onMouseLeave={() => setHoveredLabel(null)}
              >
                <span className="font-serif text-lg text-charcoal leading-tight transition-colors group-hover:text-gold">The Branches</span>
                <span className="font-sans text-[8px] text-charcoal font-bold uppercase tracking-widest whitespace-nowrap absolute top-full left-0 mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">User set country 1.5%</span>
              </div>

              {/* Heart */}
              <div 
                className="absolute top-[52%] right-[62%] flex flex-col items-end text-right z-20 group cursor-pointer"
                onMouseEnter={() => setHoveredLabel('heart')}
                onMouseLeave={() => setHoveredLabel(null)}
              >
                <span className="font-serif text-lg text-charcoal leading-tight transition-colors group-hover:text-gold">The Heart</span>
                <span className="font-sans text-[8px] text-charcoal font-bold uppercase tracking-widest whitespace-nowrap absolute top-full right-0 mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">The Vatican 1%</span>
              </div>

              {/* Roots */}
              <div 
                className="absolute top-[80%] right-[62%] flex flex-col items-end text-right z-20 group cursor-pointer"
                onMouseEnter={() => setHoveredLabel('roots')}
                onMouseLeave={() => setHoveredLabel(null)}
              >
                <span className="font-serif text-lg text-charcoal leading-tight transition-colors group-hover:text-gold">The Roots</span>
                <span className="font-sans text-[8px] text-charcoal font-bold uppercase tracking-widest whitespace-nowrap absolute top-full left-0 mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">Catholic European Restoration 1.5%</span>
              </div>
            </div>
            
            {/* Pledge Ledger */}
            <div className="w-full px-8 mt-2 mb-10 relative z-20">
              <h3 className="font-sans text-[10px] text-gold font-bold uppercase tracking-[0.2em] mb-4 text-center">
                Pledge Ledger - Q1 2026
              </h3>
              <div className="w-full flex flex-col">
                {/* Row 1 */}
                <div className="flex items-center justify-between py-3 border-b-[0.5px] border-gold/40">
                  <div className="flex items-center gap-3">
                    <Leaf className="w-3 h-3 text-gold" />
                    <span className="font-serif text-xs text-charcoal">Global South Missions</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-sans text-[8px] uppercase tracking-widest text-charcoal/60">Distributed</span>
                    <span className="font-serif text-xs text-charcoal font-medium">€1,250</span>
                  </div>
                </div>
                {/* Row 2 */}
                <div className="flex items-center justify-between py-3 border-b-[0.5px] border-gold/40">
                  <div className="flex items-center gap-3">
                    <TreeDeciduous className="w-3 h-3 text-gold" />
                    <span className="font-serif text-xs text-charcoal">Local Parish Support</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-sans text-[8px] uppercase tracking-widest text-gold font-medium">Pledged</span>
                    <span className="font-serif text-xs text-charcoal font-medium">€1,875</span>
                  </div>
                </div>
                {/* Row 3 */}
                <div className="flex items-center justify-between py-3 border-b-[0.5px] border-gold/40">
                  <div className="flex items-center gap-3">
                    <Heart className="w-3 h-3 text-gold" />
                    <span className="font-serif text-xs text-charcoal">Peter&apos;s Pence</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-sans text-[8px] uppercase tracking-widest text-charcoal/60">Distributed</span>
                    <span className="font-serif text-xs text-charcoal font-medium">€1,250</span>
                  </div>
                </div>
                {/* Row 4 */}
                <div className="flex items-center justify-between py-3 border-b-[0.5px] border-gold/40">
                  <div className="flex items-center gap-3">
                    <Sprout className="w-3 h-3 text-gold" />
                    <span className="font-serif text-xs text-charcoal">European Heritage</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-sans text-[8px] uppercase tracking-widest text-gold font-medium">Pledged</span>
                    <span className="font-serif text-xs text-charcoal font-medium">€1,875</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="px-8 pb-12 w-full relative z-20">
              <p className="text-center font-serif text-charcoal/70 leading-relaxed italic">
                &quot;I am the vine: you the branches: he that abideth in me, and I in him, the same beareth much fruit: for without me you can do nothing.&quot;
              </p>
              <p className="mt-4 text-[10px] font-sans text-gold font-medium text-center uppercase tracking-[0.3em]">John 15:5</p>
            </div>
          </motion.div>
        )}

        {activeTab === 'soil' && soilView === 'main' && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-md flex flex-col items-center pt-2 px-6 pb-12"
          >
            <p className="text-center font-serif text-charcoal/80 leading-relaxed italic mb-8">
              &quot;As Gardeners of the Faith, we tend to the ground from which the future grows. By nourishing the local soil, we plant the seeds of community today, so that the Church may reap a bountiful harvest tomorrow.&quot;
            </p>

            <div className="w-full flex flex-col gap-4">
              {/* Card 1 */}
              <div 
                onClick={() => setSoilView('seedlings')}
                className="relative group p-4 rounded-xl flex flex-col items-center text-center overflow-hidden cursor-pointer shadow-lg h-28 transform transition-transform hover:scale-[1.02]"
              >
                <Image 
                  src="/Assets/Seedlings.png" 
                  alt="Seedlings Background" 
                  fill 
                  className="object-cover object-center absolute inset-0 z-0" 
                />
                
                <div className="transition-opacity duration-300 group-hover:opacity-0 flex flex-col items-center justify-center w-full relative z-10 h-full">
                  <h3 className="font-sans text-[11px] text-[#D4AF37] font-bold uppercase tracking-[0.25em] mb-1">SEEDLINGS</h3>
                  <p className="font-serif text-[#FFFDD0] text-lg mb-1">Nurturing Future Growth</p>
                  <p className="font-sans text-[9px] font-bold text-[#D4AF37] uppercase tracking-[0.15em]">0/15 FOUNDING PATRONS</p>
                </div>
                <div className="absolute inset-0 flex items-center justify-center p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[#093F25]/90 backdrop-blur-sm z-20">
                  <p className="font-serif text-sm text-[#D4AF37] italic text-center">Focus on youth-activities</p>
                </div>
              </div>

              {/* Card 2 */}
              <div 
                onClick={() => setShowTrellisModal(true)}
                className="relative group p-4 rounded-xl flex flex-col items-center text-center overflow-hidden cursor-pointer shadow-lg h-28 transform transition-transform hover:scale-[1.02]"
              >
                <Image 
                  src="/Assets/Trellis.png" 
                  alt="Trellis Background" 
                  fill 
                  className="object-cover object-center absolute inset-0 z-0" 
                />

                <div className="absolute top-3 right-3 text-[#D4AF37]/80 z-10 transition-opacity duration-300 group-hover:opacity-0">
                  <Lock className="w-4 h-4" />
                </div>

                <div className="transition-opacity duration-300 group-hover:opacity-0 flex flex-col items-center justify-center w-full relative z-10 h-full">
                  <h3 className="font-sans text-[11px] text-[#D4AF37] font-bold uppercase tracking-[0.25em] mb-1">TRELLIS</h3>
                  <p className="font-serif text-[#FFFDD0] text-lg mb-1">Sustaining the Sacred Space</p>
                  <p className="font-sans text-[9px] font-bold text-[#D4AF37] uppercase tracking-[0.15em]">0/100 FOUNDING PATRONS</p>
                </div>
                <div className="absolute inset-0 flex items-center justify-center p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[#1D2B53]/90 backdrop-blur-sm z-20">
                  <p className="font-serif text-sm text-[#D4AF37] italic text-center">Focus on Structure/Restoration</p>
                </div>
              </div>

              {/* Card 3 */}
              <div 
                onClick={() => setShowBloomModal(true)}
                className="relative group p-4 rounded-xl flex flex-col items-center text-center overflow-hidden cursor-pointer shadow-lg h-28 transform transition-transform hover:scale-[1.02]"
              >
                <Image 
                  src="/Assets/Bloom.png" 
                  alt="Bloom Background" 
                  fill 
                  className="object-cover object-center absolute inset-0 z-0" 
                />

                <div className="absolute top-3 right-3 text-[#D4AF37]/80 z-10 transition-opacity duration-300 group-hover:opacity-0">
                  <Lock className="w-4 h-4" />
                </div>

                <div className="transition-opacity duration-300 group-hover:opacity-0 flex flex-col items-center justify-center w-full relative z-10 h-full">
                  <h3 className="font-sans text-[11px] text-[#D4AF37] font-bold uppercase tracking-[0.25em] mb-1">BLOOM</h3>
                  <p className="font-serif text-[#FFFDD0] text-lg mb-1">Revealing Divine Splendor</p>
                  <p className="font-sans text-[9px] font-bold text-[#D4AF37] uppercase tracking-[0.15em] opacity-90">0/333 FOUNDING PATRONS</p>
                </div>
                <div className="absolute inset-0 flex items-center justify-center p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[#946F21]/90 backdrop-blur-sm z-20">
                  <p className="font-serif text-sm text-[#D4AF37] italic text-center">Focus on Beauty/Liturgy</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'soil' && soilView === 'seedlings' && (
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4 }}
            className="w-full max-w-md flex flex-col items-center pt-6 px-6 pb-12"
          >
            <h2 className="font-serif text-2xl text-[#2F854B] mb-2 text-center text-shadow-sm mt-4">Seedlings</h2>
            <p className="text-center font-serif text-charcoal/70 leading-relaxed italic mb-10 px-4">
              &quot;Choose which seed to plant for the next generation.&quot;
            </p>

            <div className="w-full flex flex-col gap-4">
              {/* Fig Card */}
              <div className="relative group bg-gradient-to-br from-[#4A5D23] to-[#2E3C1B] border border-[#5E723D] p-6 rounded-xl flex flex-col justify-center items-center text-center overflow-hidden cursor-pointer shadow-lg h-32 transform transition-transform hover:scale-[1.02]">
                <svg className="absolute inset-0 w-full h-full opacity-30 mix-blend-overlay pointer-events-none" xmlns="http://www.w3.org/2000/svg">
                  <filter id="noise-fig">
                    <feTurbulence type="fractalNoise" baseFrequency="0.6" numOctaves="3" stitchTiles="stitch" />
                  </filter>
                  <rect width="100%" height="100%" filter="url(#noise-fig)" />
                </svg>
                
                <div className="relative z-10 flex flex-col items-center">
                  <Leaf className="w-6 h-6 text-[#D4AF37] mb-2 opacity-80" />
                  <h3 className="font-sans text-[12px] text-[#D4AF37] font-bold uppercase tracking-[0.25em] mb-1">FIG</h3>
                  <p className="font-serif text-[#F8F5F0] text-sm opacity-90">Seed Card</p>
                </div>
              </div>

              {/* Mustard Card */}
              <div className="relative group bg-gradient-to-br from-[#D4AF37] to-[#B38D36] border border-[#C6A24D] p-6 rounded-xl flex flex-col justify-center items-center text-center overflow-hidden cursor-pointer shadow-lg h-32 transform transition-transform hover:scale-[1.02]">
                <svg className="absolute inset-0 w-full h-full opacity-40 mix-blend-overlay pointer-events-none" xmlns="http://www.w3.org/2000/svg">
                  <filter id="noise-mustard">
                    <feTurbulence type="fractalNoise" baseFrequency="0.6" numOctaves="3" stitchTiles="stitch" />
                  </filter>
                  <rect width="100%" height="100%" filter="url(#noise-mustard)" />
                </svg>

                <div className="relative z-10 flex flex-col items-center">
                  <Sprout className="w-6 h-6 text-[#F8F5F0] mb-2 opacity-80" />
                  <h3 className="font-sans text-[12px] text-[#F8F5F0] font-bold uppercase tracking-[0.25em] mb-1">MUSTARD</h3>
                  <p className="font-serif text-[#F8F5F0] text-sm opacity-90">Seed Card</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'sanctuary' && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-md flex flex-col items-center pt-12 px-6"
          >
            <h2 className="font-serif text-2xl text-charcoal mb-6">Sanctuary</h2>
            <p className="text-center font-serif text-charcoal/70 leading-relaxed">
              A place of peace and reflection.
            </p>
          </motion.div>
        )}
      </div>

      {/* Trellis Modal */}
      {showTrellisModal && (
        <div className="absolute inset-0 z-50 flex items-center justify-center p-6 bg-sanctuary-center/60 backdrop-blur-sm">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="w-full max-w-sm bg-gradient-to-br from-[#1D2B53] to-[#0B1229] border border-[#233566] p-8 rounded-2xl flex flex-col items-center text-center shadow-2xl relative overflow-hidden"
          >
            {/* Noise texture */}
            <svg className="absolute inset-0 w-full h-full opacity-30 mix-blend-overlay pointer-events-none" xmlns="http://www.w3.org/2000/svg">
              <filter id="noise-modal-trellis">
                <feTurbulence type="fractalNoise" baseFrequency="0.7" numOctaves="3" stitchTiles="stitch" />
              </filter>
              <rect width="100%" height="100%" filter="url(#noise-modal-trellis)" />
            </svg>
            
            <div className="relative z-10 flex flex-col items-center w-full">
              <h2 className="font-serif text-xl text-[#D4AF37] mb-6">Restoring the Foundation</h2>
              
              <p className="font-serif text-[#FFFDD0]/90 text-sm leading-relaxed mb-4">
                We need 100 Founding Patrons to begin structural restoration in local parishes.
              </p>
              
              <p className="font-serif text-[#FFFDD0]/80 text-xs leading-relaxed italic mb-8">
                Once we reach 15 Patrons, this card will be revealed to show exactly which churches we are supporting. Become one of the first to unlock the next phase of the Vineyard.
              </p>

              <button className="w-full bg-[#D4AF37] hover:bg-[#C5A030] text-[#1D2B53] font-sans font-bold text-[10px] uppercase tracking-widest py-4 px-6 rounded-lg transition-colors mb-3">
                Become a Founding Patron
              </button>
              
              <button 
                onClick={() => setShowTrellisModal(false)}
                className="w-full border border-[#D4AF37]/30 hover:border-[#D4AF37]/60 text-[#D4AF37] font-sans font-bold text-[10px] uppercase tracking-widest py-4 px-6 rounded-lg transition-colors"
              >
                Back to The Soil
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Bloom Modal */}
      {showBloomModal && (
        <div className="absolute inset-0 z-50 flex items-center justify-center p-6 bg-sanctuary-center/60 backdrop-blur-sm">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="w-full max-w-sm bg-gradient-to-br from-[#CFB53B] to-[#B8860B] border border-[#C6A24D] p-8 rounded-2xl flex flex-col items-center text-center shadow-2xl relative overflow-hidden"
          >
            {/* Noise texture */}
            <svg className="absolute inset-0 w-full h-full opacity-30 mix-blend-overlay pointer-events-none" xmlns="http://www.w3.org/2000/svg">
              <filter id="noise-modal-bloom">
                <feTurbulence type="fractalNoise" baseFrequency="0.6" numOctaves="3" stitchTiles="stitch" />
              </filter>
              <rect width="100%" height="100%" filter="url(#noise-modal-bloom)" />
            </svg>
            
            <div className="relative z-10 flex flex-col items-center w-full">
              <h2 className="font-serif text-xl text-[#990000] mb-6 whitespace-pre-wrap">Revealing Divine Splendor</h2>
              
              <p className="font-serif text-[#FFFDD0]/90 text-sm leading-relaxed mb-4">
                We need 333 Founding Patrons to begin funding Sacred Art and high-end beautification projects in local parishes.
              </p>
              
              <p className="font-serif text-[#FFFDD0]/80 text-xs leading-relaxed italic mb-8">
                Once we reach 100 Patrons, this card will be revealed to show the specific altars and sacred spaces we will restore. Become the final pillar to bring this vision to life.
              </p>

              <button className="w-full bg-[#990000] hover:bg-[#7a0000] text-[#FFFDD0] font-sans font-bold text-[10px] uppercase tracking-widest py-4 px-6 rounded-lg transition-colors mb-3">
                BECOME A FOUNDING PATRON
              </button>
              
              <button 
                onClick={() => setShowBloomModal(false)}
                className="w-full border-2 border-[#990000]/60 hover:border-[#990000] text-[#990000] hover:bg-[#990000]/5 font-sans font-bold text-[10px] uppercase tracking-widest py-4 px-6 rounded-lg transition-colors"
              >
                BACK TO THE SOIL
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
