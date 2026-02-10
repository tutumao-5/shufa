
import React, { useState, useRef } from 'react';

interface ImageComparisonProps {
  initialBeforeUrl: string;
  initialAfterUrl: string;
  studentName: string;
  details: string;
}

export const ImageComparison: React.FC<ImageComparisonProps> = ({ 
  initialBeforeUrl, 
  initialAfterUrl, 
  studentName, 
  details 
}) => {
  const [position, setPosition] = useState(50);
  const [beforeImg, setBeforeImg] = useState(initialBeforeUrl);
  const [afterImg, setAfterImg] = useState(initialAfterUrl);
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
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-3xl shadow-2xl border border-stone-100">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
        <div>
          <h4 className="font-bold text-2xl text-ink-black serif-font">{studentName}</h4>
          <p className="text-stone-500 font-medium">{details}</p>
        </div>
        <div className="flex gap-3">
          <label className="cursor-pointer bg-stone-100 hover:bg-stone-200 text-stone-700 px-4 py-2 rounded-xl text-sm font-bold transition-colors border border-stone-200">
            上传对比前图
            <input type="file" accept="image/*" className="hidden" onChange={(e) => handleFileUpload(e, 'before')} />
          </label>
          <label className="cursor-pointer bg-lotus-green/10 hover:bg-lotus-green/20 text-lotus-green px-4 py-2 rounded-xl text-sm font-bold transition-colors border border-lotus-green/20">
            上传对比后图
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
          <div className="absolute top-6 right-6 bg-lotus-green text-white text-xs px-4 py-2 rounded-full shadow-lg font-black tracking-widest uppercase">
            进步后
          </div>
        </div>

        {/* Before Image (Overlay) */}
        <div 
          className="absolute inset-0 h-full bg-contain bg-no-repeat bg-center transition-all duration-75 border-r-4 border-white/80 shadow-[10px_0_30px_rgba(0,0,0,0.1)]"
          style={{ 
            backgroundImage: `url(${beforeImg})`,
            width: `${position}%`,
            zIndex: 10,
            backgroundSize: 'auto 100%' // Ensure consistent scaling for comparison
          }}
        >
          <div className="absolute top-6 left-6 bg-vermilion text-white text-xs px-4 py-2 rounded-full shadow-lg font-black tracking-widest uppercase">
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
      <p className="mt-6 text-center text-stone-400 text-sm italic">拖动中心滑块查看书写细节的变化</p>
    </div>
  );
};
