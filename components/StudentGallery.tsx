import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface GalleryItem {
  id: number | string;
  title: string;
  imageUrl: string;
}

// 提取腾讯云 COS 全局加速域名
const COS_BASE_URL = 'https://shufa-images-1405677616.cos.ap-guangzhou.myqcloud.com/';

export const StudentGallery: React.FC = () => {
  // 1. 获奖成绩 (数量 6 张)
  const initialAwards: GalleryItem[] = Array.from({ length: 6 }, (_, i) => ({
    id: `award-${i + 1}`,
    title: `荣誉表彰 ${i + 1}`,
    imageUrl: `${COS_BASE_URL}images/students/awards/${i + 1}.png`
  }));

  // 2. 书法应用 (数量 6 张)
  const initialApplications: GalleryItem[] = Array.from({ length: 6 }, (_, i) => ({
    id: `app-${i + 1}`,
    title: `书写掠影 ${i + 1}`,
    imageUrl: `${COS_BASE_URL}images/students/applications/1.${i + 1}.jpg`
  }));

  // 3. 书法成果作品 (数量 6 张，第4张为.png，其余为.jpg)
  const initialWorks: GalleryItem[] = Array.from({ length: 6 }, (_, i) => {
    const index = i + 1;
    const ext = index === 4 ? 'png' : 'jpg';
    return {
      id: `work-${index}`,
      title: `习作成果 ${index}`,
      imageUrl: `${COS_BASE_URL}images/students/works/${index}.${ext}`
    };
  });

  const [activeTab, setActiveTab] = useState<'works' | 'awards' | 'apps'>('works');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const tabs = [
    { id: 'works', label: '书法成果', subtitle: 'Calligraphy Works' },
    { id: 'awards', label: '荣誉墙', subtitle: 'Student Awards' },
    { id: 'apps', label: '实用书写', subtitle: 'Practical Apps' }
  ];

  const getActiveItems = () => {
    if (activeTab === 'works') return initialWorks;
    if (activeTab === 'awards') return initialAwards;
    return initialApplications;
  };

  return (
    <div className="relative max-w-7xl mx-auto">
      
      {/* ================= 艺术化分类选项卡 ================= */}
      <div className="flex flex-wrap justify-center gap-4 md:gap-12 mb-12 md:mb-16 border-b border-stone-200/60 pb-2">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`pb-4 flex flex-col items-center relative transition-colors duration-500 ${
              activeTab === tab.id ? 'text-ink-black' : 'text-stone-400 hover:text-stone-600'
            }`}
          >
            <span className="text-xl md:text-3xl font-black serif-font tracking-widest">{tab.label}</span>
            <span className="text-[9px] md:text-[10px] tracking-[0.3em] uppercase mt-2 font-bold">{tab.subtitle}</span>
            {activeTab === tab.id && (
              <motion.div 
                layoutId="activeTabBorder" 
                className="absolute -bottom-[1px] left-0 right-0 h-0.5 bg-vermilion" 
              />
            )}
          </button>
        ))}
      </div>

      {/* ================= 展馆风格画框网格 ================= */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10"
      >
        {getActiveItems().map((item, index) => (
          <div
            key={item.id}
            onClick={() => setSelectedImage(item.imageUrl)}
            // 外层：模拟古典画框和米黄色卡纸
            className="group/work cursor-pointer transition-all duration-700 hover:-translate-y-2 hover:shadow-2xl bg-[#F9F8F3] p-4 md:p-5 border border-[#E0DACE] shadow-md flex flex-col"
          >
            {/* 内层：留白与作品区 */}
            <div className="relative overflow-hidden border border-stone-200/50 bg-white grow flex items-center justify-center min-h-[240px] md:min-h-[300px] animate-pulse group-hover/work:border-stone-300 transition-colors">
              <img
                src={item.imageUrl}
                alt={item.title}
                loading={index < 4 ? "eager" : "lazy"}
                fetchPriority={index < 4 ? "high" : "auto"}
                decoding="async"
                onLoad={(e) => {
                  e.currentTarget.classList.remove('opacity-0');
                  e.currentTarget.parentElement?.classList.remove('animate-pulse');
                }}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover/work:scale-[1.03] opacity-0 relative z-10"
              />
              {/* 悬浮遮罩：雅致的水墨色块与文字 */}
              <div className="absolute inset-0 bg-stone-900/0 group-hover/work:bg-[#5C4A3D]/5 transition-colors duration-500 flex items-center justify-center pointer-events-none z-20">
                <span className="bg-[#F9F8F3] text-[#5C4A3D] border border-[#5C4A3D]/20 px-6 py-2 text-[12px] font-bold opacity-0 group-hover/work:opacity-100 transition-opacity shadow-sm tracking-[0.5em] uppercase">
                  赏阅
                </span>
              </div>
            </div>

            {/* 底部：作品信息与朱砂印章 */}
            <div className="mt-4 flex justify-between items-end border-t border-stone-200/60 pt-3">
              <div className="flex flex-col">
                <span className="text-sm md:text-base font-serif text-ink-black font-bold tracking-widest">{item.title}</span>
                <span className="text-[10px] text-stone-500 tracking-[0.2em] mt-1">彬文少年 · 学员</span>
              </div>
              {/* 模拟朱文印章 */}
              <div className="w-7 h-7 border-2 border-[#C3362B] text-[#C3362B] flex items-center justify-center text-[12px] font-bold serif-font transform -rotate-3 opacity-85 shrink-0 select-none">
                赏
              </div>
            </div>
          </div>
        ))}
      </motion.div>

      {/* ================= 沉浸式放大弹窗 ================= */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            // 背景改为带模糊效果的暖灰/墨色调，更加柔和
            className="fixed inset-0 z-[100] flex items-center justify-center bg-stone-900/90 backdrop-blur-md p-4 md:p-8"
            onClick={() => setSelectedImage(null)} 
          >
            <button 
              className="absolute top-6 right-6 text-white/50 hover:text-white w-12 h-12 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-full transition-colors z-[110]"
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
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              src={selectedImage} 
              alt="作品大图" 
              loading="lazy" 
              decoding="async" 
              className="max-w-full max-h-full object-contain shadow-2xl bg-[#F9F8F3] p-2 md:p-4 rounded-sm"
              onClick={(e) => e.stopPropagation()} 
            />
          </motion.div>
        )}
      </AnimatePresence>
      
    </div>
  );
};
