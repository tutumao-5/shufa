
import React from 'react';

interface GalleryItem {
  id: number;
  title: string;
  student: string;
  category: string;
  imageUrl: string;
}

const GALLERY_ITEMS: GalleryItem[] = [
  { id: 1, title: '《大风歌》节选', student: '张墨涵 (5年级)', category: '软笔书法', imageUrl: 'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?q=80&w=800&auto=format&fit=crop' },
  { id: 2, title: '古诗词硬笔创作', student: '林悦 (2年级)', category: '硬笔书法', imageUrl: 'https://images.unsplash.com/photo-1544640808-32ca72ac7f37?q=80&w=800&auto=format&fit=crop' },
  { id: 3, title: '颜勤礼碑临摹', student: '陈予安 (4年级)', category: '经典临摹', imageUrl: 'https://images.unsplash.com/photo-1569336415962-a4bd9f6dfc0f?q=80&w=800&auto=format&fit=crop' },
  { id: 4, title: '校内书法比赛一等奖', student: '王梓晨 (3年级)', category: '获奖作品', imageUrl: 'https://images.unsplash.com/photo-1615486511484-69e172d8ee09?q=80&w=800&auto=format&fit=crop' },
  { id: 5, title: '春联习作', student: '赵灵儿 (初一)', category: '创作', imageUrl: 'https://images.unsplash.com/photo-1596495573105-d14658e10d1c?q=80&w=800&auto=format&fit=crop' },
  { id: 6, title: '论语选句', student: '李子豪 (6年级)', category: '小楷', imageUrl: 'https://images.unsplash.com/photo-1452421822248-d4c2b47f0c81?q=80&w=800&auto=format&fit=crop' },
];

export const StudentGallery: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {GALLERY_ITEMS.map((item) => (
        <div key={item.id} className="group relative bg-white p-4 rounded-xl shadow-lg border border-stone-100 transition-all hover:-translate-y-2 hover:shadow-2xl">
          <div className="aspect-[3/4] overflow-hidden rounded-lg bg-stone-50 mb-4 relative">
            <img 
              src={item.imageUrl} 
              alt={item.title} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
            />
            <div className="absolute inset-0 bg-ink-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <span className="bg-white/90 text-ink-black px-6 py-2 rounded-full font-bold text-sm shadow-xl">查看原图</span>
            </div>
            <div className="absolute top-4 left-4">
              <span className="bg-vermilion text-white text-[10px] font-bold px-2 py-1 rounded shadow-sm tracking-widest uppercase">
                {item.category}
              </span>
            </div>
          </div>
          <div className="px-2">
            <h5 className="font-bold text-lg serif-font text-ink-black mb-1">{item.title}</h5>
            <div className="flex justify-between items-center text-sm text-stone-500 font-medium">
              <span>{item.student}</span>
              <span className="text-lotus-green">2024年春季</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
