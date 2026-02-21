import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';

interface Teacher {
  id: number;
  name: string;
  photo: string;
  awards: string[];
  works: string[];
  bio: string;
}

export const TeacherShowcase: React.FC = () => {
  const [teachers, setTeachers] = useState<Teacher[]>([
    {
      id: 1, // 这里使用固定ID而不是Date.now()，因为这是初始数据
      name: '王海芬',
      // 下面这行是关键修改：填入你上传的图片路径
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
      works: ['', '', ''],
      // 可以在这里填入老师的简介，如果不填会显示占位符
      bio: '王海芬老师致力于书法教育多年，以传承传统文化为己任，教学风格严谨而富有激情。' 
    }
  ]);

  const fileInputRefs = useRef<{ [key: string]: HTMLInputElement | null }>({});

  const handleUpdateTeacher = (id: number, field: keyof Teacher, value: any) => {
    setTeachers(prev => prev.map(t => t.id === id ? { ...t, [field]: value } : t));
  };

  const handleImageUpload = (id: number, field: 'photo' | 'works', index?: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      if (field === 'photo') {
        handleUpdateTeacher(id, 'photo', url);
      } else if (typeof index === 'number') {
        const teacher = teachers.find(t => t.id === id);
        if (teacher) {
          const newWorks = [...teacher.works];
          newWorks[index] = url;
          handleUpdateTeacher(id, 'works', newWorks);
        }
      }
    }
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
      works: ['', '', ''],
      bio: ''
    }]);
  };

  const removeTeacher = (id: number) => {
    if (teachers.length > 1) {
      setTeachers(teachers.filter(t => t.id !== id));
    }
  };

  return (
    <div className="space-y-20 md:space-y-32">
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
                  onClick={() => fileInputRefs.current[`photo-${teacher.id}`]?.click()}
                  className="aspect-[4/5] lg:aspect-auto lg:h-full bg-stone-50 cursor-pointer relative"
                >
                  {teacher.photo ? (
                    <img 
                      src={teacher.photo} 
                      alt={teacher.name} 
                      className="w-full h-full object-cover grayscale group-hover/photo:grayscale-0 group-hover/photo:scale-105 transition-all duration-1000"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-stone-300 gap-3">
                      <div className="w-12 h-12 rounded-full border-2 border-dashed border-stone-200 flex items-center justify-center">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 4v16m8-8H4"></path>
                        </svg>
                      </div>
                      <span className="text-[10px] font-bold tracking-widest uppercase">上传艺术照</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/0 group-hover/photo:bg-black/5 transition-colors" />
                  <input 
                    type="file" 
                    ref={el => fileInputRefs.current[`photo-${teacher.id}`] = el}
                    className="hidden" 
                    accept="image/*" 
                    onChange={handleImageUpload(teacher.id, 'photo')} 
                  />
                </div>
                
                {/* Vertical Name Tag */}
                <div className={`absolute bottom-8 ${index % 2 === 0 ? 'right-8' : 'left-8'} z-10`}>
                   <div className="serif-vertical bg-white/90 backdrop-blur px-3 py-6 rounded-sm shadow-xl border border-white/50">
                     <span className="text-3xl font-black font-calligraphy text-ink-black tracking-widest">{teacher.name || '待输入'}</span>
                   </div>
                </div>
              </div>

              {/* Content Section */}
              <div className="lg:w-3/5 p-8 md:p-12 lg:p-16 flex flex-col justify-between bg-white">
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
                    <h4 className="text-[10px] font-black tracking-[0.3em] text-stone-300 uppercase flex items-center gap-3">
                      <span className="w-6 h-px bg-stone-100"></span>
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
                  <div className="space-y-4">
                    <h4 className="text-[10px] font-black tracking-[0.3em] text-stone-300 uppercase flex items-center gap-3">
                      <span className="w-6 h-px bg-stone-100"></span>
                      作品展示 / Portfolio
                    </h4>
                    <div className="grid grid-cols-3 gap-3 md:gap-4">
                      {teacher.works.map((work, i) => (
                        <div 
                          key={i} 
                          onClick={() => fileInputRefs.current[`work-${teacher.id}-${i}`]?.click()}
                          className="aspect-square rounded-xl overflow-hidden shadow-sm group/work cursor-pointer bg-stone-50 border border-stone-100 relative"
                        >
                          {work ? (
                            <img 
                              src={work} 
                              alt="Work" 
                              className="w-full h-full object-cover group-hover/work:scale-110 transition-transform duration-700"
                              referrerPolicy="no-referrer"
                            />
                          ) : (
                            <div className="absolute inset-0 flex items-center justify-center text-stone-200">
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 4v16m8-8H4"></path>
                              </svg>
                            </div>
                          )}
                          <div className="absolute inset-0 bg-black/0 group-hover/work:bg-black/5 transition-colors flex items-center justify-center">
                             <span className="bg-white/90 px-2 py-1 rounded-full text-[8px] font-bold opacity-0 group-hover/work:opacity-100 transition-opacity shadow-sm">上传</span>
                          </div>
                          <input 
                            type="file" 
                            ref={el => fileInputRefs.current[`work-${teacher.id}-${i}`] = el}
                            className="hidden" 
                            accept="image/*" 
                            onChange={handleImageUpload(teacher.id, 'works', i)} 
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer Quote/Tag */}
                <div className="mt-12 pt-8 border-t border-stone-50 flex justify-between items-center">
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
    </div>
  );
};
