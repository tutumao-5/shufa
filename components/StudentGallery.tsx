
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface GalleryItem {
  id: number | string;
  title: string;
  imageUrl: string;
}

export const StudentGallery: React.FC = () => {
  const [awards, setAwards] = useState<GalleryItem[]>([]);
  const [works, setWorks] = useState<GalleryItem[]>([]);
  
  const removeItem = (id: number | string, type: 'award' | 'work') => {
    if (type === 'award') {
      setAwards(prev => prev.filter(item => item.id !== id));
    } else {
      setWorks(prev => prev.filter(item => item.id !== id));
    }
  };

  // Infinite scroll effect for awards
  const duplicatedAwards = [...awards, ...awards];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20">
      
      {/* Left Column: Awards (获奖成绩) */}
      <div className="space-y-6 md:space-y-8">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h3 className="text-xl md:text-3xl font-black serif-font text-ink-black">获奖成绩</h3>
            <p className="text-stone-400 text-[9px] md:text-xs tracking-[0.2em] uppercase font-bold">Student Awards</p>
          </div>
        </div>

        <div className="relative h-[320px] md:h-[500px] bg-stone-50 rounded-[1.5rem] md:rounded-[3rem] overflow-hidden border border-stone-100 shadow-inner group">
          {awards.length > 0 ? (
            <div className="absolute inset-0 py-6 md:py-10">
              <motion.div 
                animate={{ 
                  y: ["0%", "-50%"] 
                }}
                transition={{ 
                  duration: awards.length * 4, 
                  repeat: Infinity, 
                  ease: "linear" 
                }}
                className="flex flex-col gap-4 md:gap-6 px-4 md:px-12"
              >
                {duplicatedAwards.map((award, idx) => (
                  <div key={`${award.id}-${idx}`} className="relative aspect-[4/3] w-full shrink-0 rounded-xl overflow-hidden shadow-md border-4 border-white group/award">
                    <img src={award.imageUrl} alt="Award" className="w-full h-full object-cover" />
                    <button 
                      onClick={() => removeItem(award.id, 'award')}
                      className="absolute top-2 right-2 bg-vermilion text-white p-1 rounded-full opacity-0 group-hover/award:opacity-100 transition-opacity"
                    >
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12"></path></svg>
                    </button>
                  </div>
                ))}
              </motion.div>
            </div>
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-stone-300 gap-4">
              <div className="w-16 h-16 rounded-full border-2 border-stone-100 flex items-center justify-center">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              </div>
              <p className="text-xs font-bold tracking-widest uppercase">暂无获奖展示</p>
            </div>
          )}
          {/* Gradient Overlays */}
          <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-stone-50 to-transparent z-10"></div>
          <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-stone-50 to-transparent z-10"></div>
        </div>
      </div>

      {/* Right Column: Calligraphy Works (书法成果作品) */}
      <div className="space-y-6 md:space-y-8">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h3 className="text-xl md:text-3xl font-black serif-font text-ink-black">书法成果作品</h3>
            <p className="text-stone-400 text-[9px] md:text-xs tracking-[0.2em] uppercase font-bold">Calligraphy Works</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 md:gap-6">
          {/* Static Placeholders + Uploaded Works */}
          <AnimatePresence mode="popLayout">
            {works.map((work) => (
              <motion.div 
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                key={work.id} 
                className="relative aspect-[3/4] rounded-xl md:rounded-[2rem] overflow-hidden shadow-lg border-2 md:border-4 border-white group/work"
              >
                <img src={work.imageUrl} alt="Work" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" />
                <button 
                  onClick={() => removeItem(work.id, 'work')}
                  className="absolute top-3 right-3 bg-vermilion text-white p-1.5 rounded-full opacity-0 group-hover/work:opacity-100 transition-opacity shadow-md"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Placeholders */}
          {Array.from({ length: Math.max(0, 4 - works.length) }).map((_, i) => (
            <div key={`placeholder-${i}`} className="aspect-[3/4] rounded-2xl md:rounded-[2rem] border-2 border-stone-100 bg-stone-50/50 flex flex-col items-center justify-center text-stone-300 gap-2">
              <svg className="w-6 h-6 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
              <span className="text-[8px] font-bold uppercase tracking-widest">暂无作品</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
