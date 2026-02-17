
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
  const [beforeImg, setBeforeImg] = useState(initialBeforeUrl);
  const [afterImg, setAfterImg] = useState(initialAfterUrl);
  const [name, setName] = useState(initialName);
  const [details, setDetails] = useState(initialDetails);
  
  const beforeInputRef = useRef<HTMLInputElement>(null);
  const afterInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, type: 'before' | 'after') => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      if (type === 'before') setBeforeImg(url);
      else setAfterImg(url);
    }
  };

  return (
    <div className="w-full bg-white p-5 md:p-8 rounded-[1.5rem] md:rounded-[3rem] shadow-2xl border border-stone-100 relative group/card animate-in fade-in slide-in-from-bottom-10 duration-700 h-full flex flex-col">
      {onDelete && (
        <button 
          onClick={(e) => { e.stopPropagation(); onDelete(); }}
          className="absolute -top-3 -right-3 w-8 h-8 md:w-10 md:h-10 bg-vermilion text-white rounded-full flex items-center justify-center shadow-lg opacity-100 md:opacity-0 group-hover/card:opacity-100 transition-all hover:scale-110 z-30"
          title="删除此案例"
        >
          <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      )}

      {/* Header Info */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-6 md:mb-8 gap-4 shrink-0">
        <div className="flex-1 w-full">
          <input 
            value={name} 
            onChange={(e) => setName(e.target.value)}
            className="font-bold text-lg md:text-2xl text-ink-black serif-font bg-transparent border-b border-transparent hover:border-stone-200 outline-none w-full mb-1 focus:border-vermilion"
            placeholder="请输入学员姓名"
          />
          <input 
            value={details} 
            onChange={(e) => setDetails(e.target.value)}
            className="text-stone-500 font-medium bg-transparent border-b border-transparent hover:border-stone-200 outline-none w-full focus:border-vermilion text-xs md:text-base"
            placeholder="请输入作品描述（如：硬笔课第10课时成果）"
          />
        </div>
      </div>

      {/* Side-by-Side Comparison Container */}
      <div className="grid grid-cols-2 gap-2 h-[280px] sm:h-[350px] md:h-[450px] w-full overflow-hidden rounded-xl md:rounded-2xl grow bg-stone-50">
        {/* Before Half - Clickable */}
        <div 
          onClick={() => beforeInputRef.current?.click()}
          className="relative overflow-hidden group/before border-r-2 border-white/50 cursor-pointer bg-stone-100 hover:bg-stone-200 transition-colors"
        >
          {beforeImg ? (
            <div 
              className="absolute inset-0 w-full h-full bg-contain bg-no-repeat bg-center transition-transform duration-700 group-hover/before:scale-105"
              style={{ backgroundImage: `url(${beforeImg})` }}
            />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-stone-400 gap-2">
              <svg className="w-8 h-8 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
              <span className="text-[10px] font-bold tracking-widest uppercase">点击上传作品</span>
            </div>
          )}
          <div className="absolute top-3 left-3 md:top-4 md:left-4 bg-vermilion text-white text-[7px] md:text-[10px] px-2 py-1 md:px-3 md:py-1.5 rounded-full shadow-lg font-black tracking-widest uppercase z-10">
            训练前
          </div>
          <div className="absolute inset-0 bg-black/0 group-hover/before:bg-black/5 transition-colors flex items-center justify-center">
             <span className="bg-white/90 px-3 py-1 rounded-full text-[8px] font-bold opacity-0 group-hover/before:opacity-100 transition-opacity">点击更换图片</span>
          </div>
          <input type="file" ref={beforeInputRef} accept="image/*" className="hidden" onChange={(e) => handleFileUpload(e, 'before')} />
        </div>

        {/* After Half - Clickable */}
        <div 
          onClick={() => afterInputRef.current?.click()}
          className="relative overflow-hidden group/after cursor-pointer bg-stone-100 hover:bg-stone-200 transition-colors"
        >
          {afterImg ? (
            <div 
              className="absolute inset-0 w-full h-full bg-contain bg-no-repeat bg-center transition-transform duration-700 group-hover/after:scale-105"
              style={{ backgroundImage: `url(${afterImg})` }}
            />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-stone-400 gap-2">
              <svg className="w-8 h-8 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
              <span className="text-[10px] font-bold tracking-widest uppercase">点击上传作品</span>
            </div>
          )}
          <div className="absolute top-3 right-3 md:top-4 md:right-4 bg-lotus-green text-white text-[7px] md:text-[10px] px-2 py-1 md:px-3 md:py-1.5 rounded-full shadow-lg font-black tracking-widest uppercase z-10">
            训练后
          </div>
          <div className="absolute inset-0 bg-black/0 group-hover/after:bg-black/5 transition-colors flex items-center justify-center">
             <span className="bg-white/90 px-3 py-1 rounded-full text-[8px] font-bold opacity-0 group-hover/after:opacity-100 transition-opacity">点击更换图片</span>
          </div>
          <input type="file" ref={afterInputRef} accept="image/*" className="hidden" onChange={(e) => handleFileUpload(e, 'after')} />
        </div>
      </div>
      
      <p className="mt-4 text-center text-stone-400 text-[8px] md:text-[10px] italic tracking-widest uppercase shrink-0">点击上方方格直接上传图片</p>
    </div>
  );
};
