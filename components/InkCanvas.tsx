
import React, { useState, useEffect } from 'react';

interface Drop {
  id: number;
  x: number;
  y: number;
  size: number;
}

export const InkCanvas: React.FC = () => {
  const [drops, setDrops] = useState<Drop[]>([]);

  const addDrop = (e: React.MouseEvent) => {
    const size = 50 + Math.random() * 100;
    const newDrop = {
      id: Date.now(),
      x: e.clientX,
      y: e.clientY,
      size
    };
    setDrops(prev => [...prev, newDrop]);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setDrops(prev => prev.filter(d => Date.now() - d.id < 4000));
    }, 100);
    return () => clearInterval(timer);
  }, []);

  return (
    <div 
      className="absolute inset-0 z-0 overflow-hidden cursor-crosshair"
      onClick={addDrop}
    >
      {/* Background Decorative Circles */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-lotus-green/5 rounded-full blur-[100px] animate-slow-spin"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-vermilion/5 rounded-full blur-[120px] animate-slow-spin" style={{ animationDirection: 'reverse' }}></div>

      {drops.map(drop => (
        <div 
          key={drop.id}
          className="ink-spread opacity-30"
          style={{ 
            left: drop.x - drop.size/2, 
            top: drop.y - drop.size/2, 
            width: drop.size, 
            height: drop.size 
          }}
        />
      ))}
    </div>
  );
};
