
import React, { useState, useEffect } from 'react';

interface Drop {
  id: number;
  x: number;
  y: number;
}

export const InkCanvas: React.FC = () => {
  const [drops, setDrops] = useState<Drop[]>([]);

  const addDrop = (e: React.MouseEvent) => {
    const newDrop = {
      id: Date.now(),
      x: e.clientX,
      y: e.clientY
    };
    setDrops(prev => [...prev, newDrop]);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setDrops(prev => prev.filter(d => Date.now() - d.id < 3000));
    }, 100);
    return () => clearInterval(timer);
  }, []);

  return (
    <div 
      className="absolute inset-0 z-0 overflow-hidden cursor-crosshair opacity-20"
      onClick={addDrop}
    >
      {drops.map(drop => (
        <div 
          key={drop.id}
          className="ink-spread"
          style={{ left: drop.x - 50, top: drop.y - 50, width: 100, height: 100 }}
        />
      ))}
    </div>
  );
};
