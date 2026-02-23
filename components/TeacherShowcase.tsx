import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface Teacher {
  id: number;
  name: string;
  photo: string;
  awards: string[];
  works: string[];
  bio: string;
}

// 提取腾讯云 COS 全局加速域名
const COS_BASE_URL = 'https://shufa-images-1405677616.cos.ap-guangzhou.myqcloud.com/';

export const TeacherShowcase: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  
  const scrollContainerRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});
  const progressBarRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});

  const [teachers] = useState<Teacher[]>([
    {
      id: 1,
      name: '王海芬',
      photo: `${COS_BASE_URL}images/faculty/wang-haifen-portrait.png`,
      awards: [
        '乐清市硬笔书法家协会委员',
        '乐清市书法家协会（软笔）会员',
        '多次在省内外书画大赛中荣获大奖',
        '乐清市机关献礼建党百年比赛二等奖',
        '乐清市教职工书法比赛三等奖',
        '温州市第九届视觉艺术大赛入展',
        '吉林省第二届“德翔杯”书画大赛入展',
        '乐清市“知临杯”书法篆刻大展入展'
      ],
      // 数量 6 张，保持 warks 路径
      works: Array.from({ length: 6 }, (_, i) => `${COS_BASE_URL}images/faculty/warks/${i + 1}.png`),
      bio: '【教学承诺】校长亲自执教\n书法之教，贵在“懂孩子、通教育”。王老师深耕一线教学25载，专注书法教育12年，集深厚的教育学积淀与极致的耐心于一身。\n我们深信，学习书法不仅是技法的磨练，更是心理与审美的共鸣。选择一位懂教育的专业良师，将为孩子开启一段受益终身的艺术之旅。'
    }
  ]);

  const handleScroll = (id: number) => (e: React.UIEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    const scrollWidth = container.scrollWidth - container.clientWidth;
    if (scrollWidth > 0) {
      const progress = (container.scrollLeft / scrollWidth) * 100;
      const bar = progressBarRefs.current[id];
      if (bar) {
        bar.style.width = `${Math.max(progress, 15)}%`;
      }
    }
  };

  const handleSliderChange = (id: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const progress = Number(e.target.value);
    const container = scrollContainerRefs.current[id];
    if (container) {
      const scrollWidth = container.scrollWidth - container.clientWidth;
      container.scrollLeft = (progress / 100) * scrollWidth;
    }
    const bar = progressBarRefs.current[id];
    if (bar) {
      bar.style.width = `${Math.max(progress, 15)}%`;
    }
  };

  return (
    <div className="space-y-20 md:space-y-32 relative">
      {teachers.map((teacher, index) => (
        <motion.div 
          key={teacher.id}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: index * 0.1 }}
          className="relative group/teacher max-w-6xl mx-auto"
        >
          {/* ================= 外层装裱背景 (宣纸色 + 细边框) ================= */}
          <div className="bg-[#F9F8F3] p-4 md:p-6 border border-[#E0DACE] shadow-lg relative">
            
            {/* 内层内容区 */}
            <div className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} bg-white border border-stone-200/60 relative z-10`}>
              
              {/* === 左侧：教师照片与名牌 === */}
              <div className="lg:w-[45%] relative p-4 md:p-6 lg:p-8 bg-[#F9F8F3] border-b lg:border-b-0 lg:border-r border-stone-200/60 flex items-center justify-center">
                <div 
                  className="relative border-4 border-white shadow-md bg-stone-200 animate-pulse w-full h-full min-h-[400px] cursor-pointer group/photo overflow-hidden"
                  onClick={() => teacher.photo ? setSelectedImage(teacher.photo) : null}
                >
                  {teacher.photo && (
                    <img 
                      src={teacher.photo} 
                      alt={teacher.name} 
                      loading="eager"
                      fetchPriority="high"
                      decoding="async" 
                      onLoad={(e) => {
                        e.currentTarget.classList.remove('opacity-0');
                        e.currentTarget.parentElement?.classList.remove('animate-pulse');
                      }}
                      className="w-full h-full object-cover group-hover/photo:scale-105 transition-all duration-1000 opacity-0 relative z-10"
                      referrerPolicy="no-referrer"
                    />
                  )}
                  {/* 照片悬浮遮罩 */}
                  {teacher.photo && (
                     <div className="absolute inset-0 bg-stone-900/0 group-hover/photo:bg-[#5C4A3D]/5 transition-colors duration-500 flex items-center justify-center pointer-events-none z-20">
                        <span className="bg-[#F9F8F3] text-[#5C4A3D] border border-[#5C4A3D]/20 px-4 py-1.5 text-[10px] font-bold opacity-0 group-hover/photo:opacity-100 transition-opacity shadow-sm tracking-[0.3em]">
                          放大相片
                        </span>
                     </div>
                  )}

                  {/* 古典竖排姓名牌 + 印章 */}
                  <div className="absolute bottom-6 right-6 z-30 pointer-events-none">
                     <div className="serif-vertical bg-[#F9F8F3] px-2.5 py-6 shadow-lg border border-[#E0DACE] flex flex-col items-center gap-4">
                       <span className="text-2xl font-black font-calligraphy text-ink-black tracking-widest">{teacher.name || '待输入'}</span>
                       <div className="w-5 h-5 border border-[#C3362B] text-[#C3362B] flex items-center justify-center text-[10px] font-bold transform -rotate-3 opacity-90 serif-font">
                         印
                       </div>
                     </div>
                  </div>
                </div>
              </div>

              {/* === 右侧：教师简介与作品集 === */}
              <div className="lg:w-[55%] p-6 md:p-10 lg:p-12 flex flex-col justify-between bg-white relative">
                
                {/* 右上角水印点缀 (可选) */}
                <div className="absolute top-4 right-6 text-[8px] font-bold text-stone-300 tracking-widest uppercase serif-font">
                  Mastery & Artistry
                </div>

                <div className="space-y-8 lg:space-y-10">
                  
                  {/* 1. 教学理念引言 */}
                  <div className="relative pt-4">
                    <div className="absolute -top-4 -left-3 text-5xl md:text-6xl font-serif text-stone-100 select-none">“</div>
                    <div className="w-full text-stone-600 leading-relaxed text-sm md:text-base italic serif-font relative z-10 whitespace-pre-line text-justify pr-4">
                      {teacher.bio}
                    </div>
                  </div>

                  {/* 2. 荣誉奖项 */}
                  <div>
                    <h4 className="text-xs md:text-sm font-black tracking-widest text-ink-black uppercase flex items-center gap-3 mb-4 border-b border-stone-100 pb-2">
                      荣誉奖项 <span className="text-[10px] text-stone-400 ml-1 font-sans">HONORS</span>
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2.5 gap-x-6">
                      {teacher.awards.map((award, i) => (
                        <div key={i} className="flex items-start gap-2 group/award">
                          <span className="text-[#C3362B] text-[10px] mt-1 opacity-70">◆</span>
                          <div className="text-xs text-stone-600">
                            {award}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 3. 作品展示画廊 */}
                  <div>
                    <div className="flex items-end justify-between border-b border-stone-100 pb-2 mb-4">
                      <h4 className="text-xs md:text-sm font-black tracking-widest text-ink-black uppercase flex items-center gap-3">
                        作品展示 <span className="text-[10px] text-stone-400 ml-1 font-sans">PORTFOLIO</span>
                      </h4>
                      <span className="text-[10px] text-stone-400 tracking-widest hidden sm:block">滑动赏阅</span>
                    </div>
                    
                    <div className="relative group/scroll">
                      <div 
                        ref={el => scrollContainerRefs.current[teacher.id] = el}
                        onScroll={handleScroll(teacher.id)}
                        className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory transform-gpu [&::-webkit-scrollbar]:hidden"
                        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                      >
                        {teacher.works.map((work, i) => (
                          <div 
                            key={i} 
                            onClick={() => work ? setSelectedImage(work) : null}
                            // 作品集小卡片的装裱样式
                            className={`w-24 md:w-32 shrink-0 aspect-[2/3] p-1 bg-[#F9F8F3] border border-[#E0DACE] shadow-sm group/work snap-start ${work ? 'cursor-pointer' : ''}`}
                          >
                            <div className="w-full h-full relative overflow-hidden bg-white">
                              {work && (
                                <img 
                                  src={work} 
                                  alt={`Work ${i+1}`} 
                                  loading="eager" 
                                  decoding="async" 
                                  onLoad={(e) => {
                                    e.currentTarget.classList.remove('opacity-0');
                                  }}
                                  className="w-full h-full object-cover group-hover/work:scale-105 transition-all duration-700 opacity-0 relative z-10"
                                  referrerPolicy="no-referrer"
                                />
                              )}
                              {work && (
                                 <div className="absolute inset-0 bg-stone-900/0 group-hover/work:bg-[#5C4A3D]/10 transition-colors flex items-center justify-center pointer-events-none z-20">
                                    <span className="bg-[#F9F8F3] text-[#5C4A3D] px-2 py-1 border border-[#5C4A3D]/20 text-[10px] font-bold opacity-0 group-hover/work:opacity-100 transition-opacity shadow-sm">
                                      赏
                                    </span>
                                 </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* 自定义进度条：改为传统的极细朱红色线 */}
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-stone-200">
                        <div 
                          ref={el => progressBarRefs.current[teacher.id] = el}
                          className="absolute top-0 left-0 h-full bg-[#C3362B] pointer-events-none transition-none"
                          style={{ width: '15%' }}
                        />
                        <input 
                          type="range" 
                          min="0" 
                          max="100" 
                          defaultValue="0"
                          onChange={handleSliderChange(teacher.id)}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* 底部印记 */}
                <div className="mt-8 pt-6 border-t border-stone-50 flex justify-between items-center shrink-0">
                   <div className="flex items-center gap-2">
                     <div className="w-1.5 h-1.5 rotate-45 bg-[#C3362B]"></div>
                     <span className="text-[10px] font-bold text-stone-400 tracking-widest uppercase">Professional Faculty</span>
                   </div>
                   <div className="text-[10px] font-serif italic text-stone-300">Ten Mile Lotus Pond</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      ))}

      {/* ================= 沉浸式放大弹窗 (与学员作品保持一致) ================= */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
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
              alt="Enlarged view" 
              loading="lazy" 
              decoding="async" 
              // 放大后的图片加上米白卡纸边框
              className="max-w-full max-h-full object-contain shadow-2xl bg-[#F9F8F3] p-2 md:p-4 rounded-sm"
              onClick={(e) => e.stopPropagation()} 
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
