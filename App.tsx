
import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { COURSES, IMPROVEMENT_DATA } from './constants';
import { ImageComparison } from './components/ImageComparison';
import { InkCanvas } from './components/InkCanvas';
import { StudentGallery } from './components/StudentGallery';

const App: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState('hardpen');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const activeCourse = COURSES.find(c => c.id === activeTab) || COURSES[0];

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-paper-white/95 shadow-md py-3' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="text-2xl font-black serif-font tracking-tighter text-ink-black flex items-center gap-2">
            <span className="text-4xl text-lotus-green drop-shadow-sm">🪷</span> 
            <span className="tracking-widest">十里荷塘</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-10 text-sm font-medium tracking-wide">
            <a href="#home" className="hover:text-lotus-green transition-colors">首页</a>
            <a href="#advantages" className="hover:text-lotus-green transition-colors">教学优势</a>
            <a href="#courses" className="hover:text-lotus-green transition-colors">课程体系</a>
            <a href="#showcase" className="hover:text-lotus-green transition-colors">蜕变对比</a>
            <a href="#gallery" className="hover:text-lotus-green transition-colors">学员作品</a>
            <a href="#contact" className="bg-vermilion text-white px-6 py-2.5 rounded-full hover:scale-105 transition-transform shadow-lg">
              预约试听
            </a>
          </div>

          <button className="md:hidden text-2xl" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-paper-white border-t border-stone-200 p-6 flex flex-col space-y-4 shadow-xl">
            <a href="#home" onClick={() => setIsMobileMenuOpen(false)}>首页</a>
            <a href="#advantages" onClick={() => setIsMobileMenuOpen(false)}>教学优势</a>
            <a href="#courses" onClick={() => setIsMobileMenuOpen(false)}>课程体系</a>
            <a href="#showcase" onClick={() => setIsMobileMenuOpen(false)}>蜕变对比</a>
            <a href="#gallery" onClick={() => setIsMobileMenuOpen(false)}>学员作品</a>
            <a href="#contact" className="text-vermilion font-bold" onClick={() => setIsMobileMenuOpen(false)}>立即预约</a>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative h-screen flex items-center justify-center text-center px-4">
        <InkCanvas />
        <div className="relative z-10 max-w-4xl animate-in fade-in slide-in-from-bottom-10 duration-1000">
          <span className="inline-block px-4 py-1.5 border-2 border-lotus-green text-lotus-green rounded-full text-xs font-bold tracking-[0.3em] mb-8 bg-white/50 backdrop-blur-sm">
            专注幼小初书法教育
          </span>
          <h1 className="text-6xl md:text-8xl font-black mb-8 serif-font text-ink-black leading-[1.1]">
            十里荷塘<br/><span className="text-vermilion drop-shadow-lg">笔墨生香</span>
          </h1>
          <p className="text-xl md:text-2xl text-stone-gray mb-12 font-light tracking-[0.15em] leading-relaxed">
            正姿控笔 · 卷面提升 · 校长亲授
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a href="#contact" className="bg-lotus-green text-white px-10 py-4 rounded-full text-lg font-bold shadow-2xl hover:bg-green-800 transition-all hover:-translate-y-1">
              预约一对一试听 ➔
            </a>
            <a href="#courses" className="bg-white/80 backdrop-blur-sm border-2 border-ink-black text-ink-black px-10 py-4 rounded-full text-lg font-bold hover:bg-ink-black hover:text-white transition-all">
              查看核心课程
            </a>
          </div>
        </div>
      </section>

      {/* Advantages Section */}
      <section id="advantages" className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 serif-font">为什么选择十里荷塘？</h2>
            <div className="w-24 h-1 bg-vermilion mx-auto mb-6"></div>
            <p className="text-stone-600 max-w-2xl mx-auto text-lg leading-relaxed">
              我们不仅仅是教写字，更是通过科学的教学方法，从根源解决孩子书写痛点。
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-20">
            {[
              { icon: '👨‍🏫', title: '校长亲自授课', desc: '拒绝流水线教学。校长把关每一堂课，确保教学质量。' },
              { icon: '🎯', title: '小班制一对一', desc: '因材施教，手把手指导。每个孩子都能得到充分关注。' },
              { icon: '✨', title: '卷面提升见效快', desc: '针对考试卷面分进行专项训练。改善握笔，写出一手好字。' }
            ].map((usp, idx) => (
              <div key={idx} className="bg-paper-white p-10 rounded-3xl border border-stone-100 hover:shadow-2xl transition-all duration-500 group">
                <div className="text-6xl mb-6 group-hover:scale-110 transition-transform inline-block">{usp.icon}</div>
                <h3 className="text-2xl font-bold mb-4 serif-font text-ink-black">{usp.title}</h3>
                <p className="text-stone-600 leading-relaxed">{usp.desc}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center bg-paper-white p-10 rounded-[3rem] border border-stone-100 shadow-sm">
            <div>
              <h3 className="text-3xl font-bold mb-8 serif-font text-lotus-green">数据见证成长</h3>
              <div className="h-[400px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={IMPROVEMENT_DATA}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e5e5" />
                    <XAxis dataKey="category" axisLine={false} tickLine={false} tick={{fill: '#2C2C2C', fontSize: 14}} />
                    <YAxis axisLine={false} tickLine={false} domain={[0, 100]} />
                    <Tooltip contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)'}} />
                    <Legend verticalAlign="top" height={36}/>
                    <Bar name="入学前评分" dataKey="before" fill="#D1D5DB" radius={[4, 4, 0, 0]} barSize={40} />
                    <Bar name="学习后评分" dataKey="after" fill="#5D7A68" radius={[4, 4, 0, 0]} barSize={40} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="space-y-8">
              <h3 className="text-2xl font-bold serif-font text-ink-black">解决家长核心焦虑</h3>
              <div className="space-y-6">
                {[
                  { t: '正姿控笔', d: '彻底纠正“趴桌子”、“勾腕”等不良习惯，预防近视驼背。' },
                  { t: '作业提速', d: '掌握书写规律，让孩子写作业又快又好，不再磨蹭。' },
                  { t: '考试加分', d: '规范字体，直接提升语文作文及各科卷面印象分。' }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 p-4 rounded-xl hover:bg-white transition-colors">
                    <div className="w-8 h-8 rounded-full bg-vermilion/10 flex items-center justify-center text-vermilion shrink-0 font-bold">✓</div>
                    <div>
                      <h4 className="font-bold text-lg mb-1">{item.t}</h4>
                      <p className="text-stone-600">{item.d}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Showcase Section (Visible Transformation) */}
      <section id="showcase" className="py-24 bg-stone-50 overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 serif-font">看得见的蜕变</h2>
            <div className="w-24 h-1 bg-vermilion mx-auto mb-6"></div>
            <p className="text-stone-500 max-w-2xl mx-auto">
              对比是最好的证明。您可以上传您家孩子的作品，体验我们带来的惊喜转变。
            </p>
          </div>
          
          <ImageComparison 
            initialBeforeUrl="https://images.unsplash.com/photo-1603366615917-1fa6dad5c4fa?q=80&w=1200&auto=format&fit=crop"
            initialAfterUrl="https://images.unsplash.com/photo-1516962215378-7fa2e137ae91?q=80&w=1200&auto=format&fit=crop"
            studentName="学员：李子轩 (小学三年级)"
            details="学习阶段：硬笔正姿班 · 结课成果展示"
          />
        </div>
      </section>

      {/* Student Gallery Section */}
      <section id="gallery" className="py-24 bg-white relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-stone-100 to-transparent"></div>
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center mb-16">
            <div className="text-center md:text-left">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 serif-font">笔墨芳华 · 学员风采</h2>
              <p className="text-stone-500">汇聚学员优秀的硬笔、软笔及创作作品</p>
            </div>
            <div className="mt-8 md:mt-0">
              <a href="#contact" className="inline-flex items-center gap-2 text-vermilion font-bold group">
                我也要展示成果 <span className="transition-transform group-hover:translate-x-2">➔</span>
              </a>
            </div>
          </div>
          
          <StudentGallery />
        </div>
      </section>

      {/* Courses Section */}
      <section id="courses" className="py-24 bg-stone-50">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-16">
            <div className="lg:w-1/3">
              <h2 className="text-4xl font-bold mb-8 serif-font leading-tight">全龄段覆盖<br/>专业课程体系</h2>
              <p className="text-stone-600 mb-10 text-lg">
                我们为不同学龄段、不同需求的孩子定制了科学的晋升阶梯。
              </p>
              <div className="space-y-4">
                {COURSES.map(course => (
                  <button
                    key={course.id}
                    onClick={() => setActiveTab(course.id)}
                    className={`w-full text-left p-6 rounded-2xl flex justify-between items-center transition-all duration-300 ${
                      activeTab === course.id 
                      ? 'bg-lotus-green text-white shadow-xl scale-[1.02]' 
                      : 'bg-white hover:bg-stone-100 border border-stone-100'
                    }`}
                  >
                    <span className="font-bold text-lg">{course.icon} {course.title}</span>
                    <span className="text-xl opacity-50">→</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="lg:w-2/3 bg-white p-10 md:p-16 rounded-[3rem] shadow-sm border border-stone-100 min-h-[500px]">
               <div className="animate-in fade-in duration-500" key={activeTab}>
                  <div className="flex items-center gap-6 mb-8">
                    <span className="text-6xl">{activeCourse.icon}</span>
                    <h3 className="text-3xl font-bold serif-font">{activeCourse.title}</h3>
                  </div>
                  <p className="text-xl text-stone-700 mb-10 font-medium leading-relaxed">{activeCourse.description}</p>
                  <hr className="mb-10 opacity-10" />
                  <div className="grid md:grid-cols-2 gap-10">
                    <div>
                      <h4 className="font-bold text-vermilion mb-6 text-lg tracking-widest uppercase text-sm">教学核心点</h4>
                      <ul className="space-y-4">
                        {activeCourse.highlights.map((h, i) => (
                          <li key={i} className="flex items-center gap-3 text-stone-600">
                            <span className="w-1.5 h-1.5 bg-lotus-green rounded-full"></span>
                            {h}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="bg-paper-white p-8 rounded-3xl relative overflow-hidden">
                      <div className="text-4xl text-stone-200 absolute top-4 left-4 font-serif italic">“</div>
                      <p className="text-stone-500 italic relative z-10 pt-6 leading-relaxed">
                        {activeCourse.quote}
                      </p>
                      <div className="mt-6 text-xs font-bold text-stone-400">— 往届家长真实反馈</div>
                    </div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-ink-black text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-lotus-green/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-20">
            <div>
              <h2 className="text-5xl font-bold mb-8 serif-font">预约测评<br/>开启笔墨人生</h2>
              <p className="text-stone-400 mb-12 text-lg leading-relaxed">
                改变，从正确握笔的这一刻开始。我们将为孩子量身定制提升计划。
              </p>
              
              <div className="space-y-10">
                <div className="flex gap-6">
                  <div className="text-3xl text-lotus-green">📍</div>
                  <div>
                    <h4 className="font-bold text-xl mb-4">工作室地址</h4>
                    <div className="space-y-3">
                      <p className="text-stone-400 text-sm">虹桥校区：虹桥镇三村梅隆路66号（虹馨托管）</p>
                      <p className="text-stone-400 text-sm">蒲岐校区：蒲岐镇西门外定安小区1幢B门</p>
                    </div>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="text-3xl text-lotus-green">📞</div>
                  <div>
                    <h4 className="font-bold text-xl mb-2">联系电话</h4>
                    <p className="text-2xl font-black text-white">189 8972 7075</p>
                    <p className="text-stone-500 text-sm mt-1">校长专线 · 欢迎垂询</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-10 md:p-12 rounded-[3rem] text-ink-black shadow-2xl">
              <h3 className="text-3xl font-bold mb-8 serif-font text-center">免费试听申请</h3>
              <form onSubmit={(e) => { e.preventDefault(); alert("预约成功！"); }} className="space-y-6">
                <input type="text" required className="w-full bg-stone-50 border border-stone-100 p-4 rounded-2xl focus:ring-2 focus:ring-lotus-green outline-none" placeholder="家长姓名"/>
                <input type="tel" required className="w-full bg-stone-50 border border-stone-100 p-4 rounded-2xl focus:ring-2 focus:ring-lotus-green outline-none" placeholder="手机号码"/>
                <select className="w-full bg-stone-50 border border-stone-100 p-4 rounded-2xl outline-none">
                  <option>小学1-3年级</option>
                  <option>小学4-6年级</option>
                  <option>幼儿园/初中/其他</option>
                </select>
                <button type="submit" className="w-full bg-lotus-green text-white py-5 rounded-2xl text-lg font-bold shadow-xl hover:bg-green-800 transition-all">
                  提交申请 ➔
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-stone-900 text-stone-500 py-16 text-center text-sm">
        <div className="container mx-auto px-6">
          <div className="text-2xl font-bold text-white mb-6 serif-font