
import React, { useState, useEffect, useRef } from 'react';
import { COURSES } from './constants';
import { ImageComparison } from './components/ImageComparison';
import { InkCanvas } from './components/InkCanvas';
import { StudentGallery } from './components/StudentGallery';

const App: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [logoImage, setLogoImage] = useState<string | null>(null);
  const logoInputRef = useRef<HTMLInputElement>(null);

  // 导航项配置：名称与对应的 Section ID，按页面显示顺序排列
  const navItems = [
    { name: '首页', id: 'home' },
    { name: '教学优势', id: 'advantages' },
    { name: '蜕变对比', id: 'showcase' },
    { name: '学员作品', id: 'gallery' },
    { name: '课程体系', id: 'courses' },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setLogoImage(url);
    }
  };

  const [activeTab, setActiveTab] = useState('hardpen');
  const activeCourse = COURSES.find(c => c.id === activeTab) || COURSES[0];

  // 荷花图标组件 (Lotus Icon)
  const LotusIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 md:w-7 md:h-7">
      <path d="M12 22C12 22 13 18 17 15C19 13.5 21 13 21 11C21 8 18 6 15 7C14 7.3 13 8 12 10C11 8 10 7.3 9 7C6 6 3 8 3 11C3 13 5 13.5 7 15C11 18 12 22 12 22Z" />
      <path d="M12 21C12 21 11.5 16 8 13C6 11.3 4.5 11 4.5 9.5C4.5 7.5 6.5 6.5 8.5 7.5C9.5 8 10.5 9 12 11C13.5 9 14.5 8 15.5 7.5C17.5 6.5 19.5 7.5 19.5 9.5C19.5 11 18 11.3 16 13C12.5 16 12 21 12 21Z" opacity="0.6" />
      <path d="M12 18C12 18 11.7 14 10 11.5C9.3 10.5 8.5 10 8.5 9C8.5 7.8 9.5 7 10.5 7.5C11 7.8 11.5 8.5 12 9.5C12.5 8.5 13 7.8 13.5 7.5C14.5 7 15.5 7.8 15.5 9C15.5 10 14.7 10.5 14 11.5C12.3 14 12 18 12 18Z" opacity="0.8" />
    </svg>
  );

  return (
    <div className="min-h-screen">
      {/* Navigation - 固定在顶部 (fixed)，始终可见 */}
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled 
        ? 'glass-nav py-3 shadow-lg' 
        : 'bg-paper-white/50 py-6'
      }`}>
        <div className="container mx-auto px-8 flex justify-between items-center">
          <div className="flex items-center gap-3">
            {/* 点击可上传图标的 Logo 容器 */}
            <div 
              onClick={() => logoInputRef.current?.click()}
              className="w-10 h-10 md:w-12 md:h-12 bg-ink-black rounded-full flex items-center justify-center text-white transition-all duration-500 group-hover:rotate-[360deg] hover:bg-vermilion cursor-pointer overflow-hidden border-2 border-transparent hover:border-white shadow-md relative group"
            >
              {logoImage ? (
                <img src={logoImage} alt="Society Logo" className="w-full h-full object-cover" />
              ) : (
                <LotusIcon />
              )}
              {/* 悬停提示文字 */}
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-[8px] font-bold uppercase tracking-tighter">更换</span>
              </div>
              <input 
                type="file" 
                ref={logoInputRef} 
                className="hidden" 
                accept="image/*" 
                onChange={handleLogoUpload} 
              />
            </div>
            
            <a href="#home" className="text-lg md:text-xl font-black serif-font tracking-[0.2em] text-ink-black flex flex-col leading-none">
              <span>十里荷塘书法社</span>
              <span className="text-[10px] tracking-[0.4em] text-stone-400 mt-1 font-sans uppercase">Calligraphy Society</span>
            </a>
          </div>
          
          <div className="hidden md:flex items-center space-x-10 text-sm font-bold tracking-widest text-ink-black/70">
            {navItems.map((item) => (
              <a 
                key={item.id}
                href={`#${item.id}`} 
                className="hover:text-vermilion transition-colors relative group py-2"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-vermilion transition-all group-hover:w-full"></span>
              </a>
            ))}
            <a href="#contact" className="bg-ink-black text-white px-7 py-2.5 rounded-full hover:bg-vermilion transition-all shadow-xl hover:-translate-y-1">
              预约试听
            </a>
          </div>

          <button className="md:hidden text-2xl p-2" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-white border-t border-stone-100 p-8 flex flex-col space-y-6 shadow-2xl animate-in slide-in-from-top duration-300">
            {navItems.map((item) => (
              <a key={item.id} href={`#${item.id}`} className="text-xl font-serif text-ink-black" onClick={() => setIsMobileMenuOpen(false)}>{item.name}</a>
            ))}
            <a href="#contact" className="bg-vermilion text-white text-center py-4 rounded-xl font-bold" onClick={() => setIsMobileMenuOpen(false)}>立即预约</a>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
        <InkCanvas />
        <div className="container mx-auto px-8 relative z-10 grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-8 text-left animate-in fade-in slide-in-from-left-20 duration-1000">
            <div className="inline-flex items-center gap-4 mb-8">
              <span className="h-px w-12 bg-vermilion"></span>
              <span className="text-vermilion font-bold tracking-[0.5em] text-xs uppercase">Premium Art Education</span>
            </div>
            <h1 className="text-6xl md:text-[9rem] font-black serif-font text-ink-black leading-[0.9] mb-8">
              十里荷塘<br/>
              <span className="text-vermilion inline-block transform -translate-x-2">书法社</span>
            </h1>
            <p className="text-lg md:text-xl text-stone-500 max-w-xl mb-12 font-light leading-loose tracking-widest">
              正姿控笔 · 卷面提升 · 校长亲授<br/>
              在喧嚣世界中，为孩子寻一处静谧，落一笔从容。
            </p>
            <div className="flex flex-wrap gap-6">
              <a href="#contact" className="group bg-lotus-green text-white px-10 py-5 rounded-full text-lg font-bold shadow-2xl hover:bg-ink-black transition-all flex items-center gap-3">
                开启艺术之旅 
                <span className="group-hover:translate-x-2 transition-transform">➔</span>
              </a>
              <div className="flex items-center gap-4 text-stone-400">
                <div className="flex -space-x-3">
                  {[1,2,3].map(i => <div key={i} className="w-10 h-10 rounded-full border-2 border-paper-white bg-stone-200"></div>)}
                </div>
                <span className="text-sm font-medium italic">500+ 学员的一致认可</span>
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
        
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-30">
          <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-ink-black">Scroll</span>
          <div className="w-px h-16 bg-gradient-to-b from-ink-black to-transparent"></div>
        </div>
      </section>

      {/* Advantages Section */}
      <section id="advantages" className="py-32 relative bg-sage/30 overflow-hidden">
        <div className="container mx-auto px-8 pt-12">
          <div className="max-w-3xl mb-24">
            <h2 className="text-5xl md:text-6xl font-bold mb-8 serif-font text-ink-black section-heading text-left !mx-0">教学核心优势</h2>
            <p className="text-xl text-stone-500 leading-loose">
              我们深知，书法教育不仅是技法的传授，更是审美的唤醒与性格的磨砺。
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { icon: '👨‍🏫', title: '名师领衔', tag: 'Expert', desc: '由校长亲自执教，不仅传授运笔之道，更分享人生智慧，确保每个细节都有名师点拨。' },
              { icon: '🎯', title: '定制成长', tag: 'Personal', desc: '针对不同阶段的孩子，设计差异化教学方案。在小班氛围中，每个笔画都得到温柔守护。' },
              { icon: '✨', title: '雅室学堂', tag: 'Environment', desc: '书香盈室，荷香满园。在极富传统韵味的空间里，让孩子静下心来，与纸墨对话。' }
            ].map((usp, idx) => (
              <div key={idx} className="group relative bg-white/50 backdrop-blur-sm p-12 rounded-[2rem] border border-white hover:bg-white hover:shadow-2xl transition-all duration-500">
                <div className="absolute top-8 right-8 text-[10px] font-bold tracking-widest text-stone-300 uppercase">{usp.tag}</div>
                <div className="text-5xl mb-8 transform group-hover:-translate-y-2 transition-transform duration-500">{usp.icon}</div>
                <h3 className="text-2xl font-bold mb-6 serif-font text-ink-black">{usp.title}</h3>
                <p className="text-stone-500 leading-relaxed text-sm">{usp.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Showcase Section */}
      <section id="showcase" className="py-32 bg-paper-white relative">
        <div className="container mx-auto px-8 pt-12">
          <div className="text-center mb-24">
            <span className="text-vermilion font-bold tracking-[0.4em] text-xs uppercase mb-4 block">Visual Proof</span>
            <h2 className="text-5xl md:text-6xl font-bold serif-font text-ink-black section-heading">看得见的蜕变</h2>
          </div>
          
          <ImageComparison 
            initialBeforeUrl="https://images.unsplash.com/photo-1603366615917-1fa6dad5c4fa?q=80&w=1200&auto=format&fit=crop"
            initialAfterUrl="https://images.unsplash.com/photo-1516962215378-7fa2e137ae91?q=80&w=1200&auto=format&fit=crop"
            studentName="学员作品对比"
            details="硬笔书法提升班 · 第三阶段成果"
          />
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-32 bg-white">
        <div className="container mx-auto px-8 pt-12">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div className="max-w-2xl">
              <h2 className="text-5xl font-bold serif-font text-ink-black mb-6">笔墨芳华 · 学员风采</h2>
              <p className="text-stone-500 text-lg">
                每一幅字都是光阴的缩影，记录着指尖与纸张碰撞出的温度。
              </p>
            </div>
            <a href="#contact" className="px-8 py-3 border border-ink-black rounded-full hover:bg-ink-black hover:text-white transition-all text-sm font-bold tracking-widest">
              加入我们 ➔
            </a>
          </div>
          <StudentGallery />
        </div>
      </section>

      {/* Course Section */}
      <section id="courses" className="py-32 bg-sage/20 relative overflow-hidden">
        <div className="container mx-auto px-8 pt-12">
          <div className="grid lg:grid-cols-12 gap-20">
            <div className="lg:col-span-4">
              <h2 className="text-5xl font-bold serif-font text-ink-black mb-12 leading-tight">精研课程体系</h2>
              <div className="flex flex-col gap-4">
                {COURSES.map(course => (
                  <button
                    key={course.id}
                    onClick={() => setActiveTab(course.id)}
                    className={`group text-left p-8 rounded-[2rem] transition-all duration-500 relative overflow-hidden ${
                      activeTab === course.id 
                      ? 'bg-ink-black text-white shadow-2xl scale-[1.05]' 
                      : 'bg-white hover:shadow-xl'
                    }`}
                  >
                    <div className="flex items-center justify-between relative z-10">
                      <div>
                        <span className="text-3xl mb-4 block">{course.icon}</span>
                        <h4 className="font-bold text-xl serif-font">{course.title}</h4>
                      </div>
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${activeTab === course.id ? 'bg-vermilion rotate-90' : 'bg-stone-100'}`}>
                        <span className="text-xl">→</span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="lg:col-span-8">
              <div className="bg-white rounded-[4rem] p-12 md:p-20 shadow-sm relative animate-in fade-in slide-in-from-right-10 duration-700" key={activeTab}>
                <div className="text-[12rem] font-serif text-stone-50 absolute -top-10 -left-10 select-none opacity-40">墨</div>
                <div className="relative z-10">
                  <div className="flex items-center gap-6 mb-12">
                    <span className="text-6xl p-4 bg-sage/30 rounded-3xl">{activeCourse.icon}</span>
                    <div>
                      <h3 className="text-4xl font-bold serif-font text-ink-black mb-2">{activeCourse.title}</h3>
                      <p className="text-vermilion font-bold tracking-[0.2em] text-xs uppercase">Curriculum Highlights</p>
                    </div>
                  </div>
                  <p className="text-2xl text-stone-600 mb-12 font-medium leading-relaxed">{activeCourse.description}</p>
                  
                  <div className="grid md:grid-cols-2 gap-12">
                    <ul className="space-y-6">
                      {activeCourse.highlights.map((h, i) => (
                        <li key={i} className="flex items-start gap-4 text-stone-500">
                          <span className="w-6 h-6 rounded-full bg-lotus-green/10 flex items-center justify-center text-lotus-green text-xs shrink-0 mt-1">✓</span>
                          <span className="text-lg">{h}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="bg-sage/10 p-10 rounded-[3rem] border border-sage/30">
                      <p className="text-stone-500 italic text-lg leading-relaxed mb-8">"{activeCourse.quote}"</p>
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-stone-200"></div>
                        <span className="text-xs font-bold tracking-widest text-stone-400">往届家长感言</span>
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
      <section id="contact" className="py-32 bg-white relative">
        <div className="container mx-auto px-8 pt-12">
          <div className="bg-paper-white rounded-[5rem] overflow-hidden shadow-2xl border border-stone-100 flex flex-col lg:flex-row">
            <div className="lg:w-1/2 p-16 lg:p-24 bg-ink-black text-white relative">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
              <div className="relative z-10">
                <h2 className="text-6xl font-black serif-font mb-12 leading-tight">让改变<br/>从今天开始</h2>
                <p className="text-stone-400 text-xl mb-16 leading-loose">
                  每一位伟大的书法家，都曾有过笨拙的起笔。我们在这里，陪伴孩子写好人生的每一个字。
                </p>
                
                <div className="space-y-12">
                  <div className="flex gap-8">
                    <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-vermilion">📍</div>
                    <div>
                      <h4 className="font-bold text-xl mb-4 serif-font">艺术馆址</h4>
                      <p className="text-stone-400 text-sm leading-relaxed">
                        虹桥校区：三村梅隆路66号<br/>
                        蒲岐校区：定安小区1幢B门
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-8">
                    <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-lotus-green">📞</div>
                    <div>
                      <h4 className="font-bold text-xl mb-2 serif-font">咨询专线</h4>
                      <p className="text-3xl font-black text-white">189 8972 7075</p>
                      <p className="text-stone-500 text-xs mt-2 tracking-[0.3em] uppercase">Principal Direct Line</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:w-1/2 p-16 lg:p-24 bg-white">
              <h3 className="text-3xl font-bold mb-12 serif-font text-ink-black">免费预约测评</h3>
              <form className="space-y-8">
                <div className="relative">
                  <input type="text" placeholder="您的称呼" className="w-full bg-stone-50 border-b-2 border-stone-100 py-4 outline-none focus:border-vermilion transition-colors px-2" />
                </div>
                <div className="relative">
                  <input type="tel" placeholder="联系电话" className="w-full bg-stone-50 border-b-2 border-stone-100 py-4 outline-none focus:border-vermilion transition-colors px-2" />
                </div>
                <div className="relative">
                  <select className="w-full bg-stone-50 border-b-2 border-stone-100 py-4 outline-none focus:border-vermilion transition-colors px-2 appearance-none">
                    <option>学龄段：小学1-3年级</option>
                    <option>学龄段：小学4-6年级</option>
                    <option>学龄段：幼儿园/初中</option>
                  </select>
                </div>
                <button className="w-full bg-vermilion text-white py-6 rounded-2xl text-xl font-bold shadow-2xl hover:bg-ink-black transition-all transform hover:-translate-y-1">
                  提交申请 ➔
                </button>
                <p className="text-center text-stone-400 text-xs">提交后，我们将在24小时内通过电话与您预约具体测评时间</p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-ink-black text-white pt-32 pb-16">
        <div className="container mx-auto px-8">
          <div className="flex flex-col md:flex-row justify-between items-start mb-20 gap-12">
            <div>
              <div className="text-3xl font-black serif-font tracking-widest mb-6">十里荷塘书法社</div>
              <p className="text-stone-500 max-w-sm leading-loose">
                深耕少儿书法教育，让传统文化之美在新生代心中生根发芽。
              </p>
            </div>
            <div className="grid grid-cols-2 gap-20">
              <div>
                <h5 className="font-bold mb-6 text-sm tracking-widest uppercase">快速导航</h5>
                <ul className="space-y-4 text-stone-500 text-sm">
                  <li><a href="#advantages" className="hover:text-white">教学优势</a></li>
                  <li><a href="#courses" className="hover:text-white">课程体系</a></li>
                  <li><a href="#gallery" className="hover:text-white">学员风采</a></li>
                </ul>
              </div>
              <div>
                <h5 className="font-bold mb-6 text-sm tracking-widest uppercase">关注我们</h5>
                <ul className="space-y-4 text-stone-500 text-sm">
                  <li><a href="#" className="hover:text-white">微信公众号</a></li>
                  <li><a href="#" className="hover:text-white">小红书主页</a></li>
                  <li><a href="#" className="hover:text-white">联系我们</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="pt-16 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-xs text-stone-600 gap-4">
            <p>© 2026 十里荷塘书法社 · 虹桥/蒲岐旗舰校区</p>
            <p>DESIGN BY ARTISTIC HERITAGE</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
