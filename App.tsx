import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react'; // 新增导入，用于图片放大弹窗的动画
import { COURSES } from './constants';
import { TeacherShowcase } from './components/TeacherShowcase';
import { InkCanvas } from './components/InkCanvas';
import { StudentGallery } from './components/StudentGallery';
import localLogo from './logo.png'; 

const App: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // 用于控制全局图片放大的状态（目前用于 Logo）
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const [scrollProgress, setScrollProgress] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const progressTrackRef = useRef<HTMLDivElement>(null);

  // 表单状态管理
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    ageGroup: '',
    campus: ''
  });
  const [formError, setFormError] = useState('');
  const [isSubmitSuccess, setIsSubmitSuccess] = useState(false);

  // 导航项配置
  const navItems = [
    { name: '首页', id: 'home' },
    { name: '教学优势', id: 'advantages' },
    { name: '教师风采', id: 'teachers' },
    { name: '学员作品', id: 'gallery' },
    { name: '课程体系', id: 'courses' },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleHorizontalScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      const progress = (scrollLeft / (scrollWidth - clientWidth)) * 100;
      setScrollProgress(isNaN(progress) ? 0 : progress);
    }
  };

  const handleProgressBarInteraction = (e: React.MouseEvent | React.TouchEvent) => {
    if (!progressTrackRef.current || !scrollContainerRef.current) return;
    
    const rect = progressTrackRef.current.getBoundingClientRect();
    const x = 'touches' in e ? (e as React.TouchEvent).touches[0].clientX : (e as React.MouseEvent).clientX;
    const clickX = x - rect.left;
    const percentage = Math.max(0, Math.min(100, (clickX / rect.width) * 100));
    
    const { scrollWidth, clientWidth } = scrollContainerRef.current;
    const targetScroll = (percentage / 100) * (scrollWidth - clientWidth);
    
    scrollContainerRef.current.scrollTo({
      left: targetScroll,
      behavior: 'smooth'
    });
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setFormError(''); 
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.ageGroup || !formData.campus) {
      setFormError('请将报名信息填写完整');
      return;
    }
    const phoneRegex = /^1[3-9]\d{9}$/;
    if (!phoneRegex.test(formData.phone)) {
      setFormError('请输入正确的联系电话（11位手机号）');
      return;
    }
    setIsSubmitSuccess(true);
    setFormError('');
    setFormData({ name: '', phone: '', ageGroup: '', campus: '' });
  };

  const [activeTab, setActiveTab] = useState('hardpen');
  const activeCourse = COURSES.find(c => c.id === activeTab) || COURSES[0];

  const LotusIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 md:w-7 md:h-7">
      <path d="M12 22C12 22 13 18 17 15C19 13.5 21 13 21 11C21 8 18 6 15 7C14 7.3 13 8 12 10C11 8 10 7.3 9 7C6 6 3 8 3 11C3 13 5 13.5 7 15C11 18 12 22 12 22Z" />
      <path d="M12 21C12 21 11.5 16 8 13C6 11.3 4.5 11 4.5 9.5C4.5 7.5 6.5 6.5 8.5 7.5C9.5 8 10.5 9 12 11C13.5 9 14.5 8 15.5 7.5C17.5 6.5 19.5 7.5 19.5 9.5C19.5 11 18 11.3 16 13C12.5 16 12 21 12 21Z" opacity="0.6" />
      <path d="M12 18C12 18 11.7 14 10 11.5C9.3 10.5 8.5 10 8.5 9C8.5 7.8 9.5 7 10.5 7.5C11 7.8 11.5 8.5 12 9.5C12.5 8.5 13 7.8 13.5 7.5C14.5 7 15.5 7.8 15.5 9C15.5 10 14.7 10.5 14 11.5C12.3 14 12 18 12 18Z" opacity="0.8" />
    </svg>
  );

  return (
    <div className="min-h-screen overflow-x-hidden">
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled ? 'glass-nav py-2 shadow-md' : 'bg-paper-white/30 py-4 md:py-6'
      }`}>
        <div className="container mx-auto px-4 md:px-8 flex justify-between items-center">
          <div className="flex items-center gap-2 md:gap-4">
            {/* Logo 区域：移除上传逻辑，改为点击放大 */}
            <div 
              onClick={() => setSelectedImage(localLogo)}
              className="w-10 h-10 md:w-14 md:h-14 bg-ink-black rounded-full flex items-center justify-center text-white transition-all duration-500 hover:bg-vermilion cursor-pointer overflow-hidden border-2 border-transparent hover:border-white shadow-lg relative group"
            >
              {localLogo ? (
                <img src={localLogo} alt="十里荷塘书法社 Logo" className="w-full h-full object-cover" />
              ) : (
                <LotusIcon />
              )}
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-[8px] font-bold uppercase tracking-tighter">放大</span>
              </div>
            </div>
            
            <a href="#home" className="text-ink-black flex flex-col leading-none">
              <span className="font-calligraphy text-xl md:text-3xl font-bold">十里荷塘书法社</span>
              <span className="text-[7px] md:text-[10px] tracking-[0.3em] md:tracking-[0.5em] text-stone-400 mt-1 font-sans uppercase font-bold">Calligraphy Society</span>
            </a>
          </div>
          
          <div className="hidden md:flex items-center space-x-10 text-sm font-bold tracking-widest text-ink-black/70">
            {navItems.map((item) => (
              <a key={item.id} href={`#${item.id}`} className="hover:text-vermilion transition-colors relative group py-2">
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-vermilion transition-all group-hover:w-full"></span>
              </a>
            ))}
            <a href="#contact" className="bg-ink-black text-white px-7 py-2.5 rounded-full hover:bg-vermilion transition-all shadow-xl hover:-translate-y-1">
              预约试听
            </a>
          </div>

          <button className="md:hidden text-2xl p-2 text-ink-black" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden fixed inset-0 z-[60] bg-paper-white flex flex-col items-center justify-center p-8 animate-in fade-in zoom-in duration-300">
            <button 
              className="absolute top-6 right-6 w-12 h-12 flex items-center justify-center text-2xl bg-stone-100 rounded-full" 
              onClick={() => setIsMobileMenuOpen(false)}
            >
              ✕
            </button>
            <div className="flex flex-col items-center space-y-8 w-full">
              {navItems.map((item, idx) => (
                <a 
                  key={item.id} 
                  href={`#${item.id}`} 
                  className="text-2xl font-serif text-ink-black tracking-widest hover:text-vermilion transition-colors" 
                  style={{ animationDelay: `${idx * 100}ms` }}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              <div className="pt-8 w-full">
                <a href="#contact" className="block w-full bg-vermilion text-white text-center py-5 rounded-2xl font-bold shadow-xl text-xl" onClick={() => setIsMobileMenuOpen(false)}>立即预约试听</a>
              </div>
            </div>
            <div className="absolute bottom-12 text-stone-300 text-[10px] tracking-[0.5em] uppercase font-bold">
              Ten Mile Lotus Pond
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative min-h-[90vh] md:h-screen flex items-center justify-center overflow-hidden pt-20">
        <InkCanvas />
        <div className="container mx-auto px-6 md:px-8 relative z-10 grid lg:grid-cols-12 gap-8 md:gap-12 items-center">
          <div className="lg:col-span-8 text-left animate-in fade-in slide-in-from-left-20 duration-1000">
            <div className="inline-flex items-center gap-3 md:gap-4 mb-4 md:mb-8">
              <span className="h-px w-8 md:w-12 bg-vermilion"></span>
              <span className="text-vermilion font-bold tracking-[0.3em] md:tracking-[0.5em] text-[10px] md:text-xs uppercase">Premium Art Education</span>
            </div>
            <h1 className="text-4xl sm:text-7xl md:text-[9rem] font-black font-calligraphy text-ink-black leading-[1.1] md:leading-[0.9] mb-8 md:mb-10">
              十里荷塘<br />
              <span className="text-vermilion inline-block transform md:-translate-x-4">书法社</span>
            </h1>
            <p className="text-sm md:text-xl text-stone-500 max-w-xl mb-10 md:mb-14 font-light leading-relaxed md:leading-loose tracking-[0.1em] md:tracking-widest">
              正姿控笔 · 卷面提升 · 校长亲授<br className="md:hidden" />
              在喧嚣世界中，为孩子寻一处静谧，落一笔从容。
            </p>
            <div className="flex flex-col sm:flex-row gap-4 md:gap-6">
              <a href="#contact" className="group bg-lotus-green text-white px-8 md:px-12 py-4 md:py-6 rounded-2xl md:rounded-full text-base md:text-lg font-bold shadow-2xl hover:bg-ink-black transition-all flex items-center justify-center gap-3">
                开启艺术之旅 
                <span className="group-hover:translate-x-2 transition-transform">➔</span>
              </a>
              <div className="flex items-center justify-center sm:justify-start gap-4 text-stone-400">
                <div className="flex -space-x-2">
                  {[1,2,3].map(i => <div key={i} className="w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-paper-white bg-stone-200"></div>)}
                </div>
                <span className="text-xs md:text-sm font-medium italic">500+ 学员的一致认可</span>
              </div>
            </div>
          </div>
          <div className="hidden lg:block lg:col-span-4 relative">
             <div className="serif-vertical text-6xl md:text-8xl font-black text-ink-black/10 absolute -right-20 top-0 select-none animate-float">
               书法是一种修养
             </div>
             <div className="relative z-10 bg-paper-white p-4 shadow-2xl rounded-sm transform rotate-3 hover:rotate-0 transition-transform duration-700">
               <img src="https://images.unsplash.com/photo-1544640808-32ca72ac7f37?q=80&w=600&auto=format&fit=crop" className="w-full grayscale hover:grayscale-0 transition-all duration-700" alt="Calligraphy" />
               <div className="mt-4 flex justify-between items-center text-[10px] font-bold tracking-widest text-stone-400">
                 <span>ESTD. 2018</span>
                 <span>墨香·荷塘</span>
               </div>
             </div>
          </div>
        </div>
      </section>

      {/* Advantages Section */}
      <section id="advantages" className="py-20 md:py-32 relative bg-sage/30 overflow-hidden">
        <div className="container mx-auto px-6 md:px-8">
          <div className="max-w-3xl mb-12 md:mb-24">
            <h2 className="text-3xl md:text-6xl font-bold mb-4 md:mb-8 serif-font text-ink-black section-heading text-left !mx-0">教学核心优势</h2>
            <p className="text-base md:text-xl text-stone-500 leading-relaxed md:leading-loose">我们深知，书法教育不仅是技法的传授，更是审美的唤醒与性格的磨砺。</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {[
              { icon: '👨‍🏫', title: '名师领衔', tag: 'Expert', desc: '由校长亲自执教，不仅传授运笔之道，更分享人生智慧，确保每个细节都有名师点拨。' },
              { icon: '🎯', title: '定制成长', tag: 'Personal', desc: '针对不同阶段的孩子，设计差异化教学方案。在小班氛围中，每个笔画都得到温柔守护。' },
              { icon: '✨', title: '雅室学堂', tag: 'Environment', desc: '书香盈室，荷香满园。在极富传统韵味的空间里，让孩子静下心来，与纸墨对话。' }
            ].map((usp, idx) => (
              <div key={idx} className="group relative bg-white/50 backdrop-blur-sm p-6 md:p-12 rounded-[1.5rem] md:rounded-[2rem] border border-white hover:bg-white hover:shadow-2xl transition-all duration-500">
                <div className="absolute top-6 right-6 md:top-8 md:right-8 text-[8px] md:text-[10px] font-bold tracking-widest text-stone-300 uppercase">{usp.tag}</div>
                <div className="text-3xl md:text-5xl mb-4 md:mb-8 transform group-hover:-translate-y-2 transition-transform duration-500">{usp.icon}</div>
                <h3 className="text-lg md:text-2xl font-bold mb-3 md:mb-6 serif-font text-ink-black">{usp.title}</h3>
                <p className="text-stone-500 leading-relaxed text-xs md:text-sm">{usp.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Teacher Showcase Section */}
      <section id="teachers" className="py-24 md:py-40 bg-paper-white relative overflow-hidden">
        <div className="container mx-auto px-6 md:px-8 relative z-10">
          <div className="text-center mb-20 md:mb-32">
            <h2 className="text-3xl md:text-6xl font-black serif-font text-ink-black mb-6 section-heading">教师风采</h2>
            <p className="text-stone-500 tracking-[0.2em] md:tracking-[0.4em] text-xs md:text-sm uppercase font-bold">Mastery & Artistry</p>
          </div>
          
          <TeacherShowcase />
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-20 md:py-32 bg-white">
        <div className="container mx-auto px-6 md:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-20 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-5xl font-bold serif-font text-ink-black mb-4">笔墨芳华 · 学员风采</h2>
              <p className="text-stone-500 text-sm md:text-lg">每一幅字都是光阴的缩影，记录着指尖与纸张碰撞出的温度。</p>
            </div>
            <a href="#contact" className="w-full md:w-auto text-center px-8 py-3 border border-ink-black rounded-full hover:bg-ink-black hover:text-white transition-all text-sm font-bold tracking-widest">加入我们 ➔</a>
          </div>
          <StudentGallery />
        </div>
      </section>

      {/* Course Section */}
      <section id="courses" className="py-20 md:py-32 bg-sage/20 relative overflow-hidden">
        <div className="container mx-auto px-6 md:px-8">
          <div className="grid lg:grid-cols-12 gap-10 md:gap-20">
            <div className="lg:col-span-4">
              <h2 className="text-3xl md:text-5xl font-bold serif-font text-ink-black mb-8 md:mb-12 leading-tight">精研课程体系</h2>
              <div className="flex flex-row md:flex-col gap-3 overflow-x-auto no-scrollbar pb-4 md:pb-0">
                {COURSES.map(course => (
                  <button
                    key={course.id}
                    onClick={() => setActiveTab(course.id)}
                    className={`shrink-0 md:shrink group text-left p-4 md:p-8 rounded-[1.2rem] md:rounded-[2rem] transition-all duration-500 relative overflow-hidden border ${
                      activeTab === course.id 
                        ? 'bg-ink-black text-white shadow-xl scale-[1.02] border-ink-black' 
                        : 'bg-white hover:shadow-lg border-white'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center md:block gap-2">
                        <span className="text-2xl md:text-3xl md:mb-4 block">{course.icon}</span>
                        <h4 className="font-bold text-sm md:text-xl serif-font whitespace-nowrap">{course.title}</h4>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
            <div className="lg:col-span-8">
              <div className="bg-white rounded-[2rem] md:rounded-[4rem] p-6 md:p-20 shadow-sm relative animate-in fade-in slide-in-from-right-10 duration-700" key={activeTab}>
                <div className="text-5xl md:text-[12rem] font-serif text-stone-100 absolute -top-2 md:-top-10 -left-2 md:-left-10 select-none opacity-40">墨</div>
                <div className="relative z-10">
                  <div className="flex items-center gap-4 md:gap-6 mb-6 md:mb-12">
                    <span className="text-3xl md:text-6xl p-2 md:p-4 bg-sage/30 rounded-xl md:rounded-3xl">{activeCourse.icon}</span>
                    <div>
                      <h3 className="text-lg md:text-4xl font-bold serif-font text-ink-black mb-1 md:mb-2">{activeCourse.title}</h3>
                      <p className="text-vermilion font-bold tracking-[0.1em] md:tracking-[0.2em] text-[7px] md:text-xs uppercase">Curriculum Highlights</p>
                    </div>
                  </div>
                  <p className="text-base md:text-2xl text-stone-600 mb-6 md:mb-12 font-medium leading-relaxed">{activeCourse.description}</p>
                  <div className="grid md:grid-cols-2 gap-6 md:gap-12">
                    <ul className="space-y-3 md:space-y-6">
                      {activeCourse.highlights.map((h, i) => (
                        <li key={i} className="flex items-start gap-2 text-stone-500">
                          <span className="w-4 h-4 rounded-full bg-lotus-green/10 flex items-center justify-center text-lotus-green text-[8px] shrink-0 mt-1">✓</span>
                          <span className="text-sm md:text-lg">{h}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="bg-sage/10 p-5 md:p-10 rounded-[1.2rem] md:rounded-[3rem] border border-sage/30">
                      <p className="text-stone-500 italic text-xs md:text-lg leading-relaxed mb-4 md:mb-6">"{activeCourse.quote}"</p>
                      <div className="flex items-center gap-2 md:gap-3">
                        <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-stone-200"></div>
                        <span className="text-[8px] md:text-[10px] font-bold tracking-widest text-stone-400 uppercase">家长感言</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 md:py-32 bg-white relative">
        <div className="container mx-auto px-6 md:px-8">
          <div className="bg-paper-white rounded-[2.5rem] md:rounded-[5rem] overflow-hidden shadow-2xl border border-stone-100 flex flex-col lg:flex-row">
            <div className="lg:w-1/2 p-8 md:p-24 bg-ink-black text-white relative">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
              <div className="relative z-10">
                <h2 className="text-3xl md:text-6xl font-black serif-font mb-6 md:mb-12 leading-tight">让改变<br />从今天开始</h2>
                <p className="text-stone-400 text-sm md:text-xl mb-8 md:mb-16 leading-relaxed md:leading-loose">每一位伟大的书法家，都曾有过笨拙的起笔。我们在这里，陪伴孩子写好人生的每一个字。</p>
                <div className="space-y-6 md:space-y-12">
                  <div className="flex gap-4 md:gap-8">
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-white/10 flex items-center justify-center text-vermilion shrink-0">📍</div>
                    <div>
                      <h4 className="font-bold text-sm md:text-xl mb-1 md:mb-4 serif-font">艺术馆址</h4>
                      <p className="text-stone-400 text-[10px] md:text-sm leading-relaxed">虹桥校区：三村梅隆路66号<br />蒲岐校区：定安小区1幢B门</p>
                    </div>
                  </div>
                  <div className="flex gap-4 md:gap-8">
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-white/10 flex items-center justify-center text-lotus-green shrink-0">📞</div>
                    <div>
                      <h4 className="font-bold text-sm md:text-xl mb-1 md:mb-2 serif-font">咨询专线</h4>
                      <p className="text-lg md:text-3xl font-black text-white">189 8972 7075</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="lg:w-1/2 p-8 md:p-24 bg-white flex flex-col justify-center">
              {isSubmitSuccess ? (
                <div className="text-center animate-in zoom-in duration-500">
                  <div className="w-16 h-16 md:w-24 md:h-24 bg-lotus-green text-white rounded-full flex items-center justify-center mx-auto mb-6 md:mb-8 shadow-xl">
                    <svg className="w-8 h-8 md:w-12 md:h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                  </div>
                  <h3 className="text-2xl md:text-4xl font-bold serif-font text-ink-black mb-4 md:mb-6">报名提交成功！</h3>
                  <p className="text-stone-500 text-sm md:text-lg leading-relaxed mb-8 md:mb-12">
                    感谢您对十里荷塘书法社的关注。我们的顾问老师将在24小时内联系您。
                  </p>
                  <button 
                    onClick={() => setIsSubmitSuccess(false)}
                    className="w-full md:w-auto px-10 py-4 border-2 border-ink-black rounded-full font-bold hover:bg-ink-black hover:text-white transition-all"
                  >
                    返回表单
                  </button>
                </div>
              ) : (
                <>
                  <h3 className="text-2xl md:text-3xl font-bold mb-8 md:mb-12 serif-font text-ink-black">免费试课报名</h3>
                  <form className="space-y-6 md:space-y-8" onSubmit={handleSubmit}>
                    <div>
                      <input 
                        type="text" 
                        name="name"
                        value={formData.name}
                        onChange={handleFormChange}
                        placeholder="您的称呼" 
                        className={`w-full bg-stone-50 border-b-2 py-3 md:py-4 outline-none transition-colors px-2 text-sm md:text-base ${formError && !formData.name ? 'border-vermilion/50' : 'border-stone-100 focus:border-vermilion'}`} 
                      />
                    </div>
                    <div>
                      <input 
                        type="tel" 
                        name="phone"
                        value={formData.phone}
                        onChange={handleFormChange}
                        placeholder="联系电话" 
                        className={`w-full bg-stone-50 border-b-2 py-3 md:py-4 outline-none transition-colors px-2 text-sm md:text-base ${formError && (!formData.phone || !/^1[3-9]\d{9}$/.test(formData.phone)) ? 'border-vermilion/50' : 'border-stone-100 focus:border-vermilion'}`} 
                      />
                    </div>
                    <div>
                      <select 
                        name="ageGroup"
                        value={formData.ageGroup}
                        onChange={handleFormChange}
                        className={`w-full bg-stone-50 border-b-2 py-3 md:py-4 outline-none transition-colors px-2 appearance-none text-sm md:text-base ${formError && !formData.ageGroup ? 'border-vermilion/50' : 'border-stone-100 focus:border-vermilion'}`}
                      >
                        <option value="">请选择学龄段</option>
                        <option value="幼儿园">学龄段：幼儿园</option>
                        <option value="小学1-3年级">学龄段：小学1-3年级</option>
                        <option value="小学4-6年级">学龄段：小学4-6年级</option>
                        <option value="初中">学龄段：初中</option>
                      </select>
                    </div>
                    <div>
                      <select 
                        name="campus"
                        value={formData.campus}
                        onChange={handleFormChange}
                        className={`w-full bg-stone-50 border-b-2 py-3 md:py-4 outline-none transition-colors px-2 appearance-none text-sm md:text-base ${formError && !formData.campus ? 'border-vermilion/50' : 'border-stone-100 focus:border-vermilion'}`}
                      >
                        <option value="">请选择报名校区</option>
                        <option value="虹桥校区">校区选择：虹桥校区</option>
                        <option value="蒲岐校区">校区选择：蒲岐校区</option>
                      </select>
                    </div>

                    {formError && (
                      <div className="p-3 md:p-4 bg-vermilion/5 border-l-4 border-vermilion text-vermilion text-xs md:text-sm font-bold">
                        ⚠ {formError}
                      </div>
                    )}

                    <button 
                      type="submit"
                      className="w-full bg-vermilion text-white py-4 md:py-6 rounded-xl md:rounded-2xl text-lg md:text-xl font-bold shadow-2xl hover:bg-ink-black transition-all transform hover:-translate-y-1"
                    >
                      立即报名 ➔
                    </button>
                    <p className="text-center text-stone-400 text-[10px] md:text-xs">提交后，我们将在24小时内与您预约时间</p>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-ink-black text-white pt-20 pb-10">
        <div className="container mx-auto px-6 md:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start mb-16 gap-10">
            <div>
              <div className="text-2xl md:text-3xl font-black serif-font tracking-widest mb-4">十里荷塘书法社</div>
              <p className="text-stone-500 max-w-sm text-sm leading-loose">深耕少儿书法教育，让传统文化之美在新生代心中生根发芽。</p>
            </div>
            <div className="grid grid-cols-2 gap-10 md:gap-20 w-full md:w-auto">
              <div>
                <h5 className="font-bold mb-4 text-xs tracking-widest uppercase">快速导航</h5>
                <ul className="space-y-3 text-stone-500 text-xs">
                  <li><a href="#advantages" className="hover:text-white">教学优势</a></li>
                  <li><a href="#courses" className="hover:text-white">课程体系</a></li>
                  <li><a href="#gallery" className="hover:text-white">学员风采</a></li>
                </ul>
              </div>
              <div>
                <h5 className="font-bold mb-4 text-xs tracking-widest uppercase">关注我们</h5>
                <ul className="space-y-3 text-stone-500 text-xs">
                  <li><a href="#" className="hover:text-white">微信公众号</a></li>
                  <li><a href="#" className="hover:text-white">联系我们</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-[10px] text-stone-600 gap-4">
            <p>© 2026 十里荷塘书法社 · 虹桥/蒲岐旗舰校区</p>
            <p>DESIGN BY ARTISTIC HERITAGE</p>
          </div>
        </div>
      </footer>

      {/* 图片放大全屏弹窗 */}
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
              alt="Enlarged Logo" 
              className="max-w-full max-h-full object-contain shadow-2xl rounded-sm"
              onClick={(e) => e.stopPropagation()} 
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
