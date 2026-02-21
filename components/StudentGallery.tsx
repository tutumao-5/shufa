import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface GalleryItem {
  id: number | string;
  title: string;
  imageUrl: string;
}

export const StudentGallery: React.FC = () => {
  // 自动生成 18 张获奖照片的路径
  const initialAwards: GalleryItem[] = Array.from({ length: 18 }, (_, i) => ({
    id: `award-${i + 1}`,
    title: `获奖荣誉 ${i + 1}`,
    imageUrl: `${import.meta.env.BASE_URL}images/students/awards/${i + 1}.png`
  }));

  const [awards] = useState<GalleryItem[]>(initialAwards);
  
  // 右侧的书法成果作品，暂时保留空数组作为占位
  const [works, setWorks] = useState<GalleryItem[]>([]);
  
  // 控制放大弹窗的状态
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  
  // 用于水平滑动的状态和引用
  const [scrollProgress, setScrollProgress] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const removeItem = (id: number | string) => {
    setWorks(prev => prev.filter(item => item.id !== id));
  };

  // 监听容器本身的滚动，更新进度条
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    const scrollWidth = container.scrollWidth - container.clientWidth;
    if (scrollWidth > 0) {
      const progress = (container.scrollLeft / scrollWidth) * 100;
      setScrollProgress(progress);
    }
  };

  // 监听滑块的拖动，并反向控制容器的滚动
  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const progress = Number(e.target.value);
    setScrollProgress(progress);
    
    if (scrollContainerRef.current) {
      const scrollWidth = scrollContainerRef.current.scrollWidth - scrollContainerRef.current.clientWidth;
      scrollContainerRef.current.scrollLeft = (progress / 100) * scrollWidth;
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 relative">
      
      {/* ================= 左侧：获奖成绩 (Awards) - 改为水平滑动 ================= */}
      <div className="space-y-6 md:space-y-8">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h3 className="text-xl md:text-3xl font-black serif-font text-ink-black">获奖成绩</h3>
            <p className="text-stone-400 text-[9px] md:text-xs tracking-[0.2em] uppercase font-bold">Student Awards</p>
          </div>
          <span className="text-[10px] font-bold text-stone-300 tracking-widest uppercase">左右滑动 / 点击放大</span>
        </div>

        <div className="relative group/scroll">
          {/* 水平滚动容器 */}
          <div 
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className="flex gap-4 overflow-x-auto pb-8 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {awards.length > 0 ? (
              awards.map((award) => (
                <div 
                  key={award.id} 
                  onClick={() => setSelectedImage(award.imageUrl)}
                  className="w-48 md:w-64 shrink-0 aspect-[4/3] rounded-xl overflow-hidden shadow-md border-4 border-white group/award cursor-pointer snap-start relative"
                >
                  <img src={award.imageUrl} alt={award.title} className="w-full h-full object-cover group-hover/award:scale-105 transition-transform duration-700" />
                  {/* 悬停提示 */}
                  <div className="absolute inset-0 bg-black/0 group-hover/award:bg-black/10 transition-colors flex items-center justify-center pointer-events-none">
                     <span className="bg-white/90 px-3 py-1.5 rounded-full text-[10px] font-bold opacity-0 group-hover/award:opacity-100 transition-opacity shadow-sm">
                       点击放大
                     </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="w-full aspect-[4/3] rounded-xl border-2 border-stone-100 flex flex-col items-center justify-center text-stone-300 gap-4">
                <div className="w-16 h-16 rounded-full border-2 border-stone-100 flex items-center justify-center">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                </div>
                <p className="text-xs font-bold tracking-widest uppercase">暂无获奖展示</p>
              </div>
            )}
          </div>

          {/* 红色可拖拽进度条 */}
          {awards.length > 0 && (
            <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-stone-200 rounded-full mt-4">
              <motion.div 
                className="absolute top-0 left-0 h-full bg-vermilion rounded-full pointer-events-none"
                animate={{ width: `${Math.max(scrollProgress, 15)}%` }}
                transition={{ type: "spring", bounce: 0, duration: 0.1 }}
              />
              <input 
                type="range" 
                min="0" 
                max="100" 
                value={scrollProgress}
                onChange={handleSliderChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
            </div>
          )}
        </div>
      </div>

      {/* ================= 右侧：书法成果作品 (Works) - 暂时保持原样 ================= */}
      <div className="space-y-6 md:space-y-8">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h3 className="text-xl md:text-3xl font-black serif-font text-ink-black">书法成果作品</h3>
            <p className="text-stone-400 text-[9px] md:text-xs tracking-[0.2em] uppercase font-bold">Calligraphy Works</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 md:gap-6">
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
                  onClick={() => removeItem(work.id)}
                  className="absolute top-3 right-3 bg-vermilion text-white p-1.5 rounded-full opacity-0 group-hover/work:opacity-100 transition-opacity shadow-md"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>
              </motion.div>
            ))}
          </AnimatePresence>

          {Array.from({ length: Math.max(0, 4 - works.length) }).map((_, i) => (
            <div key={`placeholder-${i}`} className="aspect-[3/4] rounded-2xl md:rounded-[2rem] border-2 border-stone-100 bg-stone-50/50 flex flex-col items-center justify-center text-stone-300 gap-2">
              <svg className="w-6 h-6 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
              <span className="text-[8px] font-bold uppercase tracking-widest">暂无作品</span>
            </div>
          ))}
        </div>
      </div>

      {/* ================= 图片放大全屏弹窗 (全局共用) ================= */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 backdrop-blur-sm p-4 md:p-8"
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
              className="max-w-full max-h-full object-contain shadow-2xl rounded-sm"
              onClick={(e) => e.stopPropagation()} 
            />
          </motion.div>
        )}
      </AnimatePresence>
      
    </div>
  );
};
