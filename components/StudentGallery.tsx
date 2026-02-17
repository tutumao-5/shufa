
import React, { useState, useRef } from 'react';

interface GalleryItem {
  id: number | string;
  title: string;
  student: string;
  category: string;
  imageUrl: string;
  isCustom?: boolean;
}

const INITIAL_GALLERY_ITEMS: GalleryItem[] = [];

export const StudentGallery: React.FC = () => {
  const [items, setItems] = useState<GalleryItem[]>(INITIAL_GALLERY_ITEMS);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      const newItem: GalleryItem = {
        id: Date.now(),
        title: '新作品展示',
        student: '本地上传作品',
        category: '学员风采',
        imageUrl: imageUrl,
        isCustom: true,
      };
      setItems([newItem, ...items]);
    }
  };

  const removeItem = (id: number | string) => {
    setItems(items.filter(item => item.id !== id));
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-12">
      <div 
        onClick={() => fileInputRef.current?.click()}
        className="group cursor-pointer"
      >
        <div className="relative aspect-[3/4] overflow-hidden rounded-[1.5rem] md:rounded-[2.5rem] bg-stone-50 border-2 border-dashed border-stone-200 flex flex-col items-center justify-center transition-all duration-500 hover:border-lotus-green hover:bg-lotus-green/5 hover:-translate-y-2 shadow-sm hover:shadow-xl min-h-[300px]">
          <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white flex items-center justify-center shadow-md mb-4 md:mb-6 transition-transform group-hover:scale-110">
            <svg className="w-6 h-6 md:w-8 md:h-8 text-lotus-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4"></path>
            </svg>
          </div>
          <div className="text-center">
            <h5 className="font-bold text-lg md:text-xl serif-font text-ink-black mb-1 md:mb-2">上传学员成果</h5>
            <p className="text-stone-400 text-[8px] md:text-xs tracking-widest uppercase font-bold">Upload Achievement</p>
          </div>
          <input 
            type="file" 
            ref={fileInputRef} 
            className="hidden" 
            accept="image/*" 
            onChange={handleFileUpload} 
          />
        </div>
      </div>

      {items.map((item) => (
        <div key={item.id} className="group cursor-pointer relative">
          <div className="relative aspect-[3/4] overflow-hidden rounded-[1.5rem] md:rounded-[2.5rem] bg-stone-100 shadow-xl transition-all duration-700 group-hover:shadow-2xl group-hover:-translate-y-2">
            <img 
              src={item.imageUrl} 
              alt={item.title} 
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-110" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity"></div>
            
            <div className="absolute top-6 left-6 md:top-8 md:left-8 flex justify-between w-[calc(100%-3rem)] md:w-[calc(100%-4rem)]">
              <span className="bg-white/90 backdrop-blur-md text-ink-black text-[8px] md:text-[10px] font-bold px-2 py-1 md:px-3 md:py-1.5 rounded-full shadow-lg tracking-widest uppercase">
                {item.category}
              </span>
              {item.isCustom && (
                <button 
                  onClick={(e) => { e.stopPropagation(); removeItem(item.id); }}
                  className="bg-vermilion text-white p-1.5 md:p-2 rounded-full shadow-lg opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity hover:scale-110"
                >
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              )}
            </div>
            
            <div className="absolute bottom-6 left-6 right-6 md:bottom-8 md:left-8 md:right-8 text-white transform md:translate-y-4 md:group-hover:translate-y-0 transition-transform duration-500">
               <h5 className="font-bold text-lg md:text-2xl serif-font mb-1 md:mb-2 leading-tight">{item.title}</h5>
               <div className="flex items-center gap-2 md:gap-3 text-white/70 text-xs md:text-sm font-medium">
                 <span className="w-4 md:w-6 h-px bg-white/30"></span>
                 <span>{item.student}</span>
               </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
