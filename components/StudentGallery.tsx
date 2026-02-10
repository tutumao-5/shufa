
import React, { useState, useRef } from 'react';

interface GalleryItem {
  id: number | string;
  title: string;
  student: string;
  category: string;
  imageUrl: string;
  isCustom?: boolean;
}

const INITIAL_GALLERY_ITEMS: GalleryItem[] = [
  { id: 1, title: '《大风歌》节选', student: '张墨涵 (5年级)', category: '软笔书法', imageUrl: 'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?q=80&w=800&auto=format&fit=crop' },
  { id: 2, title: '古诗词硬笔创作', student: '林悦 (2年级)', category: '硬笔书法', imageUrl: 'https://images.unsplash.com/photo-1544640808-32ca72ac7f37?q=80&w=800&auto=format&fit=crop' },
  { id: 3, title: '颜勤礼碑临摹', student: '陈予安 (4年级)', category: '经典临摹', imageUrl: 'https://images.unsplash.com/photo-1569336415962-a4bd9f6dfc0f?q=80&w=800&auto=format&fit=crop' },
  { id: 4, title: '校内书法比赛一等奖', student: '王梓晨 (3年级)', category: '获奖作品', imageUrl: 'https://images.unsplash.com/photo-1615486511484-69e172d8ee09?q=80&w=800&auto=format&fit=crop' },
  { id: 5, title: '春联习作', student: '赵灵儿 (初一)', category: '创作', imageUrl: 'https://images.unsplash.com/photo-1596495573105-d14658e10d1c?q=80&w=800&auto=format&fit=crop' },
  { id: 6, title: '论语选句', student: '李子豪 (6年级)', category: '小楷', imageUrl: 'https://images.unsplash.com/photo-1452421822248-d4c2b47f0c81?q=80&w=800&auto=format&fit=crop' },
];

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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
      {/* Upload New Work Card */}
      <div 
        onClick={() => fileInputRef.current?.click()}
        className="group cursor-pointer"
      >
        <div className="relative aspect-[3/4] overflow-hidden rounded-[2.5rem] bg-stone-50 border-2 border-dashed border-stone-200 flex flex-col items-center justify-center transition-all duration-500 hover:border-lotus-green hover:bg-lotus-green/5 hover:-translate-y-4 shadow-sm hover:shadow-xl">
          <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center shadow-md mb-6 transition-transform group-hover:scale-110">
            <svg className="w-8 h-8 text-lotus-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4"></path>
            </svg>
          </div>
          <div className="text-center">
            <h5 className="font-bold text-xl serif-font text-ink-black mb-2">上传学员成果</h5>
            <p className="text-stone-400 text-xs tracking-widest uppercase font-bold">Upload Achievement</p>
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
          <div className="relative aspect-[3/4] overflow-hidden rounded-[2.5rem] bg-stone-100 shadow-xl transition-all duration-700 group-hover:shadow-2xl group-hover:-translate-y-4">
            <img 
              src={item.imageUrl} 
              alt={item.title} 
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-110" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity"></div>
            
            <div className="absolute top-8 left-8 flex justify-between w-[calc(100%-4rem)]">
              <span className="bg-white/90 backdrop-blur-md text-ink-black text-[10px] font-bold px-3 py-1.5 rounded-full shadow-lg tracking-widest uppercase">
                {item.category}
              </span>
              {item.isCustom && (
                <button 
                  onClick={(e) => { e.stopPropagation(); removeItem(item.id); }}
                  className="bg-vermilion text-white p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity hover:scale-110"
                >
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              )}
            </div>
            
            <div className="absolute bottom-8 left-8 right-8 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
               <h5 className="font-bold text-2xl serif-font mb-2 leading-tight">{item.title}</h5>
               <div className="flex items-center gap-3 text-white/70 text-sm font-medium">
                 <span className="w-6 h-px bg-white/30"></span>
                 <span>{item.student}</span>
               </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
