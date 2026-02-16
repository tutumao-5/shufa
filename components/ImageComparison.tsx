
import React, { useState, useRef } from 'react';

interface ImageComparisonProps {
  initialBeforeUrl: string;
  initialAfterUrl: string;
  studentName: string;
  details: string;
  onDelete?: () => void;
}

export const ImageComparison: React.FC<ImageComparisonProps> = ({ 
  initialBeforeUrl, 
  initialAfterUrl, 
  studentName: initialName, 
  details: initialDetails,
  onDelete
}) => {
  const [position, setPosition] = useState(50);
  const [beforeImg, setBeforeImg] = useState(initialBeforeUrl);
  const [afterImg, setAfterImg] = useState(initialAfterUrl);
  const [name, setName] = useState(initialName);
  const [details, setDetails] = useState(initialDetails);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = 'touches' in e ? (e as React.TouchEvent).touches[0].clientX : (e as React.MouseEvent).clientX;
    const relativeX = x - rect.left;
    const percentage = Math.max(0, Math.min(100, (relativeX / rect.width) * 100));
    setPosition(percentage);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, type: 'before' | 'after') => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      if (type === 'before') setBeforeImg(url);
      else setAfterImg(url);
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-[3rem] shadow-2xl border border-stone-100 mb-20 relative group/card animate-in fade-in slide-in-from-bottom-10 duration-700">
      {onDelete && (
        <button 
          onClick={onDelete}
          className="absolute -top-4 -right-4 w-10 h-10 bg-vermilion text-white rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover/card:opacity-100 transition-all hover:scale-110 z-30"
          title="删除此案例"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      )}

      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
        <div className="flex-1 w-full">
          <input 
            value={name} 
            onChange={(e) => setName(e.target.value)}
            className="font-bold text-2xl text-ink-black serif-font bg-transparent border-b border-transparent hover:border-stone-200 outline-none w-full mb-1 focus:border-vermilion"
            placeholder="学员姓名/作品标题"
          />
          <input 
            value={details} 
            onChange={(e) => setDetails(e.target.value)}
            className="text-stone-500 font-medium bg-transparent border-b border-transparent hover:border-stone-200 outline-none w-full focus:border-vermilion"
            placeholder="课程阶段说明"
          />
        </div>
        <div className="flex gap-3 shrink-0">
          <label className="cursor-pointer bg-stone-100 hover:bg-stone-200 text-stone-700 px-4 py-2 rounded-xl text-sm font-bold transition-colors border border-stone-200">
            上传对比前
            <input type="file" accept="image/*" className="hidden" onChange={(e) => handleFileUpload(e, 'before')} />
          </label>
          <label className="cursor-pointer bg-lotus-green/10 hover:bg-lotus-green/20 text-lotus-green px-4 py-2 rounded-xl text-sm font-bold transition-colors border border-lotus-green/20">
            上传对比后
            <input type="file" accept="image/*" className="hidden" onChange={(e) => handleFileUpload(e, 'after')} />
          </label>
        </div>
      </div>

      <div 
        ref={containerRef}
        className="relative h-[400px] md:h-[550px] w-full overflow-hidden rounded-2xl cursor-ew-resize select-none shadow-inner bg-stone-50"
        onMouseMove={handleMove}
        onTouchMove={handleMove}
      >
        {/* After Image (Background) */}
        <div 
          className="absolute inset-0 w-full h-full bg-contain bg-no-repeat bg-center"
          style={{ backgroundImage: `url(${afterImg})` }}
        >
          <div className="absolute top-6 right-6 bg-lotus-green text-white text-[10px] px-4 py-2 rounded-full shadow-lg font-black tracking-widest uppercase z-20">
            训练后
          </div>
        </div>

        {/* Before Image (Overlay) */}
        <div 
          className="absolute inset-0 h-full bg-contain bg-no-repeat bg-center transition-all duration-75 border-r-4 border-white/80 shadow-[10px_0_30px_rgba(0,0,0,0.1)]"
          style={{ 
            backgroundImage: `url(${beforeImg})`,
            width: `${position}%`,
            zIndex: 10,
            backgroundSize: 'auto 100%' 
          }}
        >
          <div className="absolute top-6 left-6 bg-vermilion text-white text-[10px] px-4 py-2 rounded-full shadow-lg font-black tracking-widest uppercase">
            训练前
          </div>
        </div>

        {/* Handle */}
        <div 
          className="absolute top-0 bottom-0 w-1 bg-white/80 z-20 backdrop-blur-sm"
          style={{ left: `${position}%` }}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-2xl flex items-center justify-center text-ink-black font-bold border-4 border-lotus-green ring-4 ring-white/50">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M8 7l-4 4m0 0l4 4m-4-4h16m-4-4l4 4m0 0l-4 4"></path></svg>
          </div>
        </div>
      </div>
      <p className="mt-6 text-center text-stone-400 text-xs italic tracking-widest uppercase">Drag slider to compare writing details</p>
    </div>
  );
};
