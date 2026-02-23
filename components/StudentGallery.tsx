import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface GalleryItem {
  id: number | string;
  title: string;
  imageUrl: string;
}

export const StudentGallery: React.FC = () => {
  // 1. 获奖成绩 (5张)
  const initialAwards: GalleryItem[] = Array.from({ length: 5 }, (_, i) => ({
    id: `award-${i + 1}`,
    title: `获奖荣誉 ${i + 1}`,
    imageUrl: `${import.meta.env.BASE_URL}images/students/awards/${i + 1}.png`
  }));

  // 2. 书法应用 (新增：5张，匹配您的 1.1.jpg ~ 1.5.jpg)
  const initialApplications: GalleryItem[] = Array.from({ length: 5 }, (_, i) => ({
    id: `app-${i + 1}`,
    title: `书法应用 ${i + 1}`,
    imageUrl: `${import.meta.env.BASE_URL}images/students/applications/1.${i + 1}.jpg`
  }));

  // 3. 书法成果作品 (6张)
  const initialWorks: GalleryItem[] = Array.from({ length: 6 }, (_, i) => {
    const index = i + 1;
    const ext = index === 4 ? 'png' : 'jpg';
    return {
      id: `work-${index}`,
      title: `书法作品 ${index}`,
      imageUrl: `${import.meta.env.BASE_URL}images/students/works/${index}.${ext}`
    };
  });

  const [awards] = useState<GalleryItem[]>(initialAwards);
  const [applications] = useState<GalleryItem[]>(initialApplications);
  const [works] = useState<GalleryItem[]>(initialWorks);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 relative">
      
      {/* ================= 左侧栏：包含获奖成绩 & 书法应用 ================= */}
      <div className="flex flex-col gap-12 md:gap-20">
        
        {/* --- 1. 获奖成绩 --- */}
        <div className="space-y-6 md:space-y-8">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h3 className="text-xl md:text-3xl font-black serif-font text-ink-black">获奖成绩</h3>
              <p className="text-stone-400 text-[9px] md:text-xs tracking-[0.2em] uppercase font-bold">Student Awards</p>
            </div>
            <span className="text-[10px] font-bold text-stone-300 tracking-widest uppercase">滑动浏览 / 点击放大</span>
          </div>

          <div className="relative group/scroll">
            <div 
              className="grid grid-rows-2 grid-flow-col gap-3 md:gap-4 overflow-x-auto pb-6 snap-x snap-mandatory transform-gpu [&::-webkit-scrollbar]:hidden"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {awards.map((award, index) => (
                <div 
                  key={award.id} 
                  onClick={() => setSelectedImage(award.imageUrl)}
                  className="w-36 md:w-48 shrink-0 aspect-[4/3] rounded-xl overflow-hidden shadow-sm border-2 md:border-4 border-white group/award cursor-pointer snap-start relative bg-stone-200 animate-pulse"
                >
                  <img 
                    src={award.imageUrl} 
                    alt={award.title} 
                    loading={index < 4 ? "eager" : "lazy"} 
                    fetchPriority={index < 4 ? "high" : "auto"}
                    decoding="async" 
                    onLoad={(e) => {
                      e.currentTarget.classList.remove('opacity-0');
                      e.currentTarget.parentElement?.classList.remove('animate-pulse');
                    }}
                    className="w-full h-full object-cover group-hover/award:scale-105 transition-all duration-700 opacity-0 relative z-10" 
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover/award:bg-black/10 transition-colors flex items-center justify-center pointer-events-none z-20">
                     <span className="bg-white/90 px-3 py-1.5 rounded-full text-[10px] font-bold opacity-0 group-hover/award:opacity-100 transition-opacity shadow-sm">
                       点击放大
                     </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* --- 2. 书法应用 --- */}
        <div className="space-y-6 md:space-y-8">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h3 className="text-xl md:text-3xl font-black serif-font text-ink-black">书法应用</h3>
              <p className="text-stone-400 text-[9px] md:text-xs tracking-[0.2em] uppercase font-bold">Practical Applications</p>
            </div>
            <span className="text-[10px] font-bold text-stone-300 tracking-widest uppercase">滑动浏览 / 点击放大</span>
          </div>

          <div className="relative group/scroll">
            <div 
              className="grid grid-rows-1 grid-flow-col gap-3 md:gap-4 overflow-x-auto pb-6 snap-x snap-mandatory transform-gpu [&::-webkit-scrollbar]:hidden"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {applications.map((app, index) => (
                <div 
                  key={app.id} 
                  onClick={() => setSelectedImage(app.imageUrl)}
                  className="w-40 md:w-56 shrink-0 aspect-[4/3] rounded-xl overflow-hidden shadow-sm border-2 md:border-4 border-white group/award cursor-pointer snap-start relative bg-stone-200 animate-pulse"
                >
                  <img 
                    src={app.imageUrl} 
                    alt={app.title} 
                    loading={index < 2 ? "eager" : "lazy"} 
                    fetchPriority={index < 2 ? "high" : "auto"}
                    decoding="async" 
                    onLoad={(e) => {
                      e.currentTarget.classList.remove('opacity-0');
                      e.currentTarget.parentElement?.classList.remove('animate-pulse');
                    }}
                    className="w-full h-full object-cover group-hover/award:scale-105 transition-all duration-700 opacity-0 relative z-10" 
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover/award:bg-black/10 transition-colors flex items-center justify-center pointer-events-none z-20">
                     <span className="bg-white/90 px-3 py-1.5 rounded-full text-[10px] font-bold opacity-0 group-hover/award:opacity-100 transition-opacity shadow-sm">
                       点击放大
                     </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* ================= 右侧栏：书法成果作品 ================= */}
      <div className="space-y-6 md:space-y-8">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h3 className="text-xl md:text-3xl font-black serif-font text-ink-black">书法成果作品</h3>
            <p className="text-stone-400 text-[9px] md:text-xs tracking-[0.2em] uppercase font-bold">Calligraphy Works</p>
          </div>
          <span className="text-[10px] font-bold text-stone-300 tracking-widest uppercase">滑动浏览 / 点击放大</span>
        </div>

        <div className="relative group/scroll">
          <div 
            className="grid grid-rows-2 grid-flow-col gap-3 md:gap-4 overflow-x-auto pb-6 snap-x snap-mandatory transform-gpu [&::-webkit-scrollbar]:hidden"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {works.map((work, index) => (
              <div 
                key={work.id} 
                onClick={() => setSelectedImage(work.imageUrl)}
                className="w-32 md:w-40 shrink-0 aspect-[3/4] rounded-xl overflow-hidden shadow-sm border-2 md:border-4 border-white group/work cursor-pointer snap-start relative bg-stone-200 animate-pulse"
              >
                <img 
                  src={work.imageUrl} 
                  alt={work.title} 
                  loading={index < 4 ? "eager" : "lazy"} 
                  fetchPriority={index < 4 ? "high" : "auto"}
                  decoding="async" 
                  onLoad={(e) => {
                    e.currentTarget.classList.remove('opacity-0');
                    e.currentTarget.parentElement?.classList.remove('animate-pulse');
                  }}
                  className="w-full h-full object-cover group-hover/work:scale-105 transition-all duration-700 opacity-0 relative z-10" 
                />
                <div className="absolute inset-0 bg-black/0 group-hover/work:bg-black/10 transition-colors flex items-center justify-center pointer-events-none z-20">
                   <span className="bg-white/90 px-3 py-1.5 rounded-full text-[10px] font-bold opacity-0 group-hover/work:opacity-100 transition-opacity shadow-sm">
                     点击放大
                   </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ================= 放大弹窗 ================= */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 md:p-8"
            onClick={() => setSelectedImage(null)} 
          >
            <button 
              className="absolute top-6 right-6 text-white/70 hover:text-white w-12 h-12 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-full transition-colors z-[110]"
              onClick={(e) => { 
                e.stopPropagation(); 
                setSelectedImage(null); 
              }}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
            <motion.img 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              src={selectedImage} 
              alt="Enlarged view" 
              loading="lazy" 
              decoding="async" 
              className="max-w-full max-h-full object-contain shadow-2xl rounded-sm"
              onClick={(e) => e.stopPropagation()} 
            />
          </motion.div>
        )}
      </AnimatePresence>
      
    </div>
  );
};
