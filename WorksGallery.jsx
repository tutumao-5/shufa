
import React, { useState, useEffect } from 'react';

// 简易解析器：提取 Markdown 文件里的配置（标题、图片等）和正文
const parseFrontmatter = (mdContent) => {
  const match = mdContent.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) return { data: {}, content: mdContent };
  
  const frontmatter = match[1];
  const content = match[2];
  const data = {};
  
  frontmatter.split('\n').forEach(line => {
    const [key, ...valueArr] = line.split(':');
    if (key && valueArr.length) {
      let value = valueArr.join(':').trim();
      // 去除首尾的双引号或单引号
      value = value.replace(/(^"|"$)|(^'|'$)/g, '');
      data[key.trim()] = value;
    }
  });
  
  return { data, content };
};

export default function WorksGallery() {
  const [works, setWorks] = useState([]);

  useEffect(() => {
    // Vite 专属大招：一键读取目录下所有的 .md 文件内容
    const files = import.meta.glob('/src/content/works/*.md', { query: '?raw', import: 'default', eager: true });
    
    const loadedWorks = Object.entries(files).map(([filePath, rawContent]) => {
      const { data, content } = parseFrontmatter(rawContent);
      return {
        id: filePath,
        title: data.title || '无标题',
        author: data.author || '佚名',
        image: data.image || '',
        description: content.trim()
      };
    });
    
    setWorks(loadedWorks);
  }, []);

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>学员作品展示</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
        {works.map(work => (
          <div key={work.id} style={{ border: '1px solid #eee', borderRadius: '8px', overflow: 'hidden', padding: '15px' }}>
            {work.image && (
              <img src={work.image} alt={work.title} style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '4px' }} />
            )}
            <h3 style={{ margin: '10px 0 5px' }}>{work.title}</h3>
            <p style={{ color: '#666', fontSize: '14px', margin: '0 0 10px' }}>作者：{work.author}</p>
            <p style={{ fontSize: '15px', lineHeight: '1.6' }}>{work.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
