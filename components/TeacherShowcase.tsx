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

export const TeacherShowcase: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  
  const scrollContainerRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});
  const progressBarRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});

  const [teachers] = useState<Teacher[]>([
    {
      id: 1,
      name: '王海芬',
      photo: `${import.meta.env.BASE_URL}images/faculty/wang-haifen-portrait.png`,
      awards: [
        '乐清市硬笔书法家协会委员',
        '乐清市书法家协会（软笔）会员',
        '作品多次在省内外书画大赛中荣获大奖',
        '乐清市机关献礼建党百年华诞书画比赛二等奖',
        '乐清市教职工书法比赛三等奖',
        '温州市第九届视觉艺术大赛入展',
        '吉林省第二届“德翔杯”迎新春书画大赛入展',
        '乐清市“知临杯”书法篆刻大展入展'
      ],
      works: Array.from({ length: 16 }, (_, i) => `${import.meta.env.BASE_URL}images/faculty/works/work-${i + 1}.png`),
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
          <div className="bg-white rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-sm border border-stone-100 hover:shadow-xl transition-shadow duration-700">
            <div className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>
              
              {/* Photo Section */}
              <div className="lg:w-2/5 relative overflow-hidden group/photo">
                <div 
                  // 优化1：加入 bg-stone-200 animate-pulse 开启呼吸灯骨架屏效果
                  className="aspect-[4/5] lg:aspect-auto lg:h-full bg-stone-200 animate-pulse relative cursor-pointer"
                  onClick={() => teacher.photo ? setSelectedImage(teacher.photo) : null}
                >
                  {teacher.photo && (
                    <img 
                      src={teacher.photo} 
                      alt={teacher.name} 
                      loading={index === 0 ? "eager" : "lazy"} // 首位教师立该加载
                      fetchPriority={index === 0 ? "high" : "auto"} // 提升网络请求优先级
                      decoding="async" 
                      // 优化2：图片加载完成时，移除透明度为0的类，同时移除父级的呼吸灯效果，实现平滑渐显
                      onLoad={(e) => {
                        e.currentTarget.classList.remove('opacity-0');
                        e.currentTarget.parentElement?.classList.remove('animate-pulse');
                      }}
                      className="w-full h-full object-cover group-hover/photo:scale-105 transition-all duration-1000 opacity-0 relative z-10"
                      referrerPolicy="no-referrer"
                    />
                  )}
                  {teacher.photo && (
                     <div className="absolute inset-0 bg-black/0 group-hover/photo:bg-black/10 transition-colors flex items-center justify-center pointer-events-none z-20">
                        <span className="bg-white/90 px-3 py-1.5 rounded-full text-[10px] font-bold opacity-0 group-hover/photo:opacity-100 transition-opacity shadow-sm">
                          点击放大
                        </span>
                     </div>
                  )}
                </div>
                
                <div className={`absolute bottom-8 ${index % 2 === 0 ? 'right-8' : 'left-8'} z-30 pointer-events-none`}>
                   <div className="serif-vertical bg-white/95 px-3 py-6 rounded-sm shadow-xl border border-white/50">
                     <span className="text-3xl font-black font-calligraphy text-ink-black tracking-widest">{teacher.name || '待输入'}</span>
                   </div>
                </div>
              </div>

              {/* Content Section */}
              <div className="lg:w-3/5 p-8 md:p-12 lg:p-16 flex flex-col justify-between bg-white overflow-hidden">
                <div className="space-y-10">
                  
                  {/* Bio */}
                  <div className="relative">
                    <div className="absolute -top-4 -left-4 text-6xl font-serif text-stone-100 select-none">“</div>
                    <div className="w-full text-stone-600 leading-loose text-base md:text-lg italic serif-font relative z-10 whitespace-pre-line">
                      {teacher.bio}
                    </div>
                  </div>

                  {/* Awards */}
                  <div className="space-y-4">
                    <h4 className="text-xs md:text-sm font-black tracking-[0.2em] text-ink-black uppercase flex items-center gap-3">
                      <span className="w-8 h-px bg-vermilion/30"></span>
                      荣誉奖项 / Honors
                    </h4>
                    <div className="space-y-3">
                      {teacher.awards.map((award, i) => (
                        <div key={i} className="flex items-start gap-3 group/award">
                          <span className="w-1 h-1 bg-vermilion rounded-full mt-2.5 shrink-0 opacity-60"></span>
                          <div className="text-sm text-stone-600 font-medium">
                            {award}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Portfolio */}
                  <div className="space-y-6">
                    <div className="flex items-center justify-between pr-4">
                      <h4 className="text-xs md:text-sm font-black tracking-[0.2em] text-ink-black uppercase flex items-center gap-3">
                        <span className="w-8 h-px bg-vermilion/30"></span>
                        作品展示 / Portfolio
                      </h4>
                      <span className="text-[10px] font-bold text-stone-300 tracking-widest uppercase">拖动滑块 / 点击放大</span>
                    </div>
                    
                    <div className="relative group/scroll">
                      <div 
                        ref={el => scrollContainerRefs.current[teacher.id] = el}
                        onScroll={handleScroll(teacher.id)}
                        className="flex gap-4 overflow-x-auto pb-6 snap-x snap-mandatory transform-gpu [&::-webkit-scrollbar]:hidden"
                        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                      >
                        {teacher.works.map((work, i) => (
                          <div 
                            key={i} 
                            onClick={() => work ? setSelectedImage(work) : null}
                            // 同样为作品网格开启呼吸灯骨架屏
                            className={`w-32 md:w-40 shrink-0 aspect-square rounded-xl overflow-hidden shadow-sm group/work bg-stone-200 animate-pulse border border-stone-100 relative snap-start ${work ? 'cursor-pointer' : ''}`}
                          >
                            {work && (
                              <img 
                                src={work} 
                                alt={`Work ${i+1}`} 
                                loading="lazy" 
                                decoding="async" 
                                onLoad={(e) => {
                                  e.currentTarget.classList.remove('opacity-0');
                                  e.currentTarget.parentElement?.classList.remove('animate-pulse');
                                }}
                                className="w-full h-full object-cover group-hover/work:scale-105 transition-all duration-700 opacity-0 relative z-10"
                                referrerPolicy="no-referrer"
                              />
                            )}
                            {work && (
                               <div className="absolute inset-0 bg-black/0 group-hover/work:bg-black/10 transition-colors flex items-center justify-center pointer-events-none z-20">
                                  <span className="bg-white/90 px-3 py-1.5 rounded-full text-[10px] font-bold opacity-0 group-hover/work:opacity-100 transition-opacity shadow-sm">
                                    点击放大
                                  </span>
                               </div>
                            )}
                          </div>
                        ))}
                      </div>

                      <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-stone-200 rounded-full">
                        <div 
                          ref={el => progressBarRefs.current[teacher.id] = el}
                          className="absolute top-0 left-0 h-full bg-vermilion rounded-full pointer-events-none transition-none"
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

                <div className="mt-12 pt-8 border-t border-stone-50 flex justify-between items-center shrink-0">
                   <div className="flex items-center gap-2">
                     <div className="w-2 h-2 rounded-full bg-lotus-green"></div>
                     <span className="text-[10px] font-bold text-stone-400 tracking-widest uppercase">Professional Faculty</span>
                   </div>
                   <div className="text-[10px] font-serif italic text-stone-300">Ten Mile Lotus Pond</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      ))}

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
