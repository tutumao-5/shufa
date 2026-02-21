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
  const [scrollProgress, setScrollProgress] = useState<{ [key: number]: number }>({});
  // 用于控制图片放大弹窗的状态
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  
  const [teachers, setTeachers] = useState<Teacher[]>([
    {
      id: 1,
      name: '王海芬',
      photo: '/images/faculty/wang-haifen-portrait.png',
      awards: [
        '“丹青绘宏图、翰墨谱新篇”乐清市机关献礼建党百年华诞、庆“三八”书画比赛二等奖。',
        '乐清市教育工会关于开展庆祝第132个“五一”国际劳动节乐清市教职工书法比赛获三等奖',
        '温州市第九届视觉艺术大赛中入展',
        '胶州大白菜.乡村振兴主题文化公益展获佳作奖',
        '吉林省第二届“德翔杯”迎新春书画大赛中入展',
        '乐清市“知临杯”书法篆刻大展中入展',
        '笔墨雅韵奖第二届全国书法公益大赛中入展',
        '乐清市书法家协会会员-王海芬'
      ],
      // 自动生成 work-1.png 到 work-6.png 的路径
      works: Array.from({ length: 6 }, (_, i) => `/images/faculty/works/work-${i + 1}.png`),
      bio: '王海芬老师致力于书法教育多年，以传承传统文化为己任，教学风格严谨而富有激情。'
    }
  ]);

  const handleScroll = (id: number) => (e: React.UIEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    const scrollWidth = container.scrollWidth - container.clientWidth;
    if (scrollWidth > 0) {
      const progress = (container.scrollLeft / scrollWidth) * 100;
      setScrollProgress(prev => ({ ...prev, [id]: progress }));
    }
  };

  const handleUpdateTeacher = (id: number, field: keyof Teacher, value: any) => {
    setTeachers(prev => prev.map(t => t.id === id ? { ...t, [field]: value } : t));
  };

  const handleAwardChange = (id: number, index: number, value: string) => {
    const teacher = teachers.find(t => t.id === id);
    if (teacher) {
      const newAwards = [...teacher.awards];
      newAwards[index] = value;
      handleUpdateTeacher(id, 'awards', newAwards);
    }
  };

  const addTeacher = () => {
    setTeachers([...teachers, {
      id: Date.now(),
      name: '',
      photo: '',
      awards: ['', '', ''],
      works: [],
      bio: ''
    }]);
  };

  const removeTeacher = (id: number) => {
    if (teachers.length > 1) {
      setTeachers(teachers.filter(t => t.id !== id));
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
          {/* Delete Button */}
          {teachers.length > 1 && (
            <button 
              onClick={() => removeTeacher(teacher.id)}
              className="absolute -top-4 -right-4 w-8 h-8 bg-vermilion text-white rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover/teacher:opacity-100 transition-opacity z-30 hover:scale-110"
            >
              ✕
            </button>
          )}

          <div className="bg-white rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-sm border border-stone-100 hover:shadow-xl transition-shadow duration-700">
            <div className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>
              
              {/* Photo Section */}
              <div className="lg:w-2/5 relative overflow-hidden group/photo">
                <div 
                  className="aspect-[4/5] lg:aspect-auto lg:h-full bg-stone-50 relative"
                >
                  {teacher.photo ? (
                    <img 
                      src={teacher.photo} 
                      alt={teacher.name} 
                      className="w-full h-full object-cover group-hover/photo:scale-105 transition-all duration-1000"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-stone-300 gap-3">
                      <div className="w-12 h-12 rounded-full border-2 border-stone-100 flex items-center justify-center">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                        </svg>
                      </div>
                      <span className="text-[10px] font-bold tracking-widest uppercase">暂无照片</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/0 transition-colors" />
                </div>
                
                {/* Vertical Name Tag */}
                <div className={`absolute bottom-8 ${index % 2 === 0 ? 'right-8' : 'left-8'} z-10`}>
                   <div className="serif-vertical bg-white/90 backdrop-blur px-3 py-6 rounded-sm shadow-xl border border-white/50">
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
                    <textarea 
                      value={teacher.bio}
                      onChange={(e) => handleUpdateTeacher(teacher.id, 'bio', e.target.value)}
                      placeholder="在此输入教师简介，描述其教学风格与艺术见解..."
                      className="w-full text-stone-600 leading-relaxed text-base md:text-lg italic serif-font bg-transparent border-none focus:ring-0 outline-none min-h-[80px] resize-none relative z-10"
                    />
                  </div>

                  {/* Awards */}
                  <div className="space-y-4">
                    <h4 className="text-xs md:text-sm font-black tracking-[0.2em] text-ink-black uppercase flex items-center gap-3">
                      <span className="w-8 h-px bg-vermilion/30"></span>
                      荣誉奖项 / Honors
                    </h4>
                    <div className="space-y-2">
                      {teacher.awards.map((award, i) => (
                        <div key={i} className="flex items-start gap-3 group/award">
                          <span className="w-1 h-1 bg-vermilion rounded-full mt-2.5 shrink-0 opacity-40 group-hover/award:opacity-100 transition-opacity"></span>
                          <input 
                            value={award}
                            onChange={(e) => handleAwardChange(teacher.id, i, e.target.value)}
                            placeholder={`荣誉奖项 ${i + 1}`}
                            className="text-sm text-stone-500 font-medium bg-transparent outline-none w-full border-b border-transparent hover:border-stone-100 focus:border-vermilion/30 transition-colors py-1"
                          />
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
                      <span className="text-[10px] font-bold text-stone-300 tracking-widest uppercase">Slide to view / 点击放大</span>
                    </div>
                    
                    <div className="relative group/scroll">
                      <div 
                        onScroll={handleScroll(teacher.id)}
                        className="flex gap-4 overflow-x-auto pb-6 scrollbar-hide snap-x snap-mandatory"
                        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                      >
                        {teacher.works.map((work, i) => (
                          <div 
                            key={i} 
                            // 点击触发弹窗
                            onClick={() => work ? setSelectedImage(work) : null}
                            className={`w-32 md:w-40 shrink-0 aspect-square rounded-xl overflow-hidden shadow-sm group/work bg-stone-50 border border-stone-100 relative snap-start ${work ? 'cursor-pointer' : ''}`}
                          >
                            {work ? (
                              <img 
                                src={work} 
                                alt={`Work ${i+1}`} 
                                className="w-full h-full object-cover group-hover/work:scale-105 transition-transform duration-700"
                                referrerPolicy="no-referrer"
                              />
                            ) : (
                              <div className="absolute inset-0 flex items-center justify-center text-stone-200">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                                </svg>
                              </div>
                            )}
                            {/* 悬浮提示：放大 */}
                            {work && (
                               <div className="absolute inset-0 bg-black/0 group-hover/work:bg-black/10 transition-colors flex items-center justify-center pointer-events-none">
                                  <span className="bg-white/90 px-3 py-1.5 rounded-full text-[10px] font-bold opacity-0 group-hover/work:opacity-100 transition-opacity shadow-sm">
                                    点击放大
                                  </span>
                               </div>
                            )}
                          </div>
                        ))}
                      </div>

                      {/* 修复后的 Progress Bar */}
                      <div className="absolute bottom-2 left-0 right-0 h-1.5 bg-stone-200 rounded-full overflow-hidden">
                        <motion.div 
                          className="h-full bg-vermilion rounded-full"
                          // 设置初始15%的宽度，确保刚打开页面时进度条可见
                          initial={{ width: "15%" }}
                          // 滑动时，保证最小宽度为15%，最大为100%
                          animate={{ width: `${Math.max(scrollProgress[teacher.id] || 0, 15)}%` }}
                          transition={{ type: "spring", bounce: 0, duration: 0.1 }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer Quote/Tag */}
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

      {/* Add Teacher Button */}
      <div className="flex justify-center pt-8">
        <button 
          onClick={addTeacher}
          className="group flex items-center gap-4 bg-white border border-stone-200 text-ink-black px-10 py-4 rounded-full font-bold tracking-widest hover:bg-ink-black hover:text-white transition-all shadow-sm hover:shadow-xl"
        >
          <span className="w-6 h-6 bg-stone-100 group-hover:bg-white/20 rounded-full flex items-center justify-center transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
            </svg>
          </span>
          新增教师展示
        </button>
      </div>

      {/* 图片放大全屏弹窗 */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 backdrop-blur-sm p-4 md:p-8"
            onClick={() => setSelectedImage(null)} // 点击背景关闭
          >
            {/* 关闭按钮 */}
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
            {/* 放大显示的图片 */}
            <motion.img 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              src={selectedImage} 
              alt="Enlarged artwork" 
              className="max-w-full max-h-full object-contain shadow-2xl rounded-sm"
              onClick={(e) => e.stopPropagation()} // 阻止点击图片自身时触发关闭
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};