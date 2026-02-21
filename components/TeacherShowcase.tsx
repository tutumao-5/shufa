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
      id: Date.now(),
      name: '王海芬',
      photo: '',
      awards: [
        '“丹青绘宏图、翰墨谱新篇”乐清市机关献礼建党百年华诞、庆“三八”书画比赛书法类三等奖（作品：《苏东坡 题跋》）',
        '庆“五一”乐清市教职工书法比赛三等奖',
        '“助力乡村振兴”——寻找地标产品胶州大白菜书画展征稿活动书法作品佳作奖',
        '第二届“德翔杯”迎新春书画作品展入选作品',
        '“知临杯”乐清市书法篆刻大展入展'
      ],
      works: [],
      bio: ''
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
    <div className="grid gap-24 md:gap-32">
      {teachers.map((teacher, index) => (
        <motion.div 
          key={teacher.id}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className={`relative flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 items-center group/teacher`}
        >
          {/* Delete Button */}
          {teachers.length > 1 && (
            <button 
              onClick={() => removeTeacher(teacher.id)}
              className="absolute -top-6 -right-6 w-10 h-10 bg-vermilion text-white rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover/teacher:opacity-100 transition-opacity z-20 hover:scale-110"
            >
              ✕
            </button>
          )}

          {/* Teacher Photo Pane */}
          <div className="w-full lg:w-5/12 relative">
            <div 
              onClick={() => fileInputRefs.current[`photo-${teacher.id}`]?.click()}
              className="aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl border-8 border-white bg-stone-100 cursor-pointer group/photo relative"
            >
              {teacher.photo ? (
                <img 
                  src={teacher.photo} 
                  alt="Teacher" 
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-stone-400 gap-4">
                  <div className="w-16 h-16 rounded-full bg-stone-200 flex items-center justify-center">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
                    </svg>
                  </div>
                  <span className="text-xs font-black tracking-widest uppercase">点击上传教师艺术照</span>
                </div>
              )}
              <div className="absolute inset-0 bg-black/0 group-hover/photo:bg-black/10 transition-colors flex items-center justify-center">
                <span className="bg-white/90 px-4 py-2 rounded-full text-[10px] font-bold opacity-0 group-hover/photo:opacity-100 transition-opacity shadow-sm">更换照片</span>
              </div>
              <input 
                type="file" 
                ref={el => fileInputRefs.current[`photo-${teacher.id}`] = el}
                className="hidden" 
                accept="image/*" 
                onChange={handleImageUpload(teacher.id, 'photo')} 
              />
            </div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-vermilion/10 rounded-full blur-3xl -z-10"></div>
          </div>

          {/* Teacher Info Pane - 加入了 min-w-0 和 overflow-hidden */}
          <div className="w-full lg:w-7/12 space-y-8 min-w-0 overflow-hidden">
            <div className="space-y-4">
              <div className="flex flex-col md:flex-row md:items-baseline gap-4">
                <input 
                  value={teacher.name}
                  onChange={(e) => handleUpdateTeacher(teacher.id, 'name', e.target.value)}
                  placeholder="教师姓名"
                  className="text-4xl md:text-5xl font-black font-calligraphy text-ink-black bg-transparent border-b border-transparent hover:border-stone-200 focus:border-vermilion outline-none w-full md:w-auto"
                />
              </div>
              <textarea 
                value={teacher.bio}
                onChange={(e) => handleUpdateTeacher(teacher.id, 'bio', e.target.value)}
                placeholder="在此输入教师简介，描述其教学风格与艺术见解..."
                className="w-full text-stone-600 leading-relaxed text-lg italic serif-font bg-transparent border-b border-transparent hover:border-stone-200 focus:border-vermilion outline-none min-h-[100px] resize-none"
              />
            </div>

            {/* Awards Pane */}
            <div className="space-y-4">
              <h4 className="text-xs font-black tracking-[0.3em] text-stone-400 uppercase flex items-center gap-2">
                <span className="w-8 h-px bg-stone-200"></span>
                获奖荣誉 / Awards
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {teacher.awards.map((award, i) => (
                  <div key={i} className="flex items-center gap-3 text-stone-700 bg-white/50 p-3 rounded-lg border border-stone-100 shadow-sm group/award">
                    <span className="w-1.5 h-1.5 bg-vermilion rounded-full shrink-0"></span>
                    <input 
                      value={award}
                      onChange={(e) => handleAwardChange(teacher.id, i, e.target.value)}
                      placeholder={`荣誉奖项 ${i + 1}`}
                      className="text-sm font-medium bg-transparent outline-none w-full"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Works Gallery Pane - 自动滚动闪烁版 */}
            <div className="space-y-4 w-full relative">
              <h4 className="text-xs font-black tracking-[0.3em] text-stone-400 uppercase flex items-center gap-2 mb-6">
                <span className="w-8 h-px bg-stone-200"></span>
                作品展示 / Portfolio
              </h4>
              
              {/* 滚动视口容器 */}
              <div className="relative w-full overflow-hidden rounded-xl py-2">
                {/* 左右遮罩，营造边缘水墨虚化感 */}
                <div className="absolute inset-y-0 left-0 w-8 md:w-12 bg-gradient-to-r from-[#FAF7F0] to-transparent z-10 pointer-events-none"></div>
                <div className="absolute inset-y-0 right-0 w-8 md:w-12 bg-gradient-to-l from-[#FAF7F0] to-transparent z-10 pointer-events-none"></div>
                
                {/* 滚动的长条 */}
                <div className="animate-marquee flex gap-4 md:gap-6">
                  {/* 生成 32 张图(16张重复两次)以实现无缝循环滚动 */}
                  {[...Array(16), ...Array(16)].map((_, i) => {
                    const imageIndex = (i % 16) + 1; 
                    return (
                      <div 
                        key={i} 
                        className="w-24 md:w-36 shrink-0 aspect-[1/3] rounded-sm overflow-hidden shadow-[4px_4px_10px_rgba(0,0,0,0.1)] border border-stone-200 bg-white animate-flash"
                        style={{ animationDelay: `${(i % 5) * 0.8}s` }}
                      >
                        {/* 核心修复：使用了相对路径 ./ 以适配云端沙盒环境，并添加 .jpg.jpg */}
                        <img 
                          src={`./works/work-${imageIndex}.jpg.jpg`} 
                          alt={`书法作品 ${imageIndex}`} 
                          className="w-full h-full object-cover hover:scale-110 transition-transform duration-700 cursor-pointer"
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

          </div>
        </motion.div>
      ))}

      {/* Add Teacher Button */}
      <div className="flex justify-center pt-12">
        <button 
          onClick={addTeacher}
          className="group flex items-center gap-4 bg-ink-black text-white px-12 py-5 rounded-full font-black tracking-widest hover:bg-vermilion transition-all shadow-2xl hover:-translate-y-2"
        >
          <span className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center group-hover:rotate-90 transition-transform">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
            </svg>
          </span>
          添加更多教师展示位
        </button>
      </div>
    </div>
  );
};