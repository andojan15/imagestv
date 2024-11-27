import React from 'react';

const MondrianBackground: React.FC = () => {
  const shapes = [
    { color: 'bg-red-500', size: 'w-1/4 h-1/4' },
    { color: 'bg-blue-500', size: 'w-1/3 h-1/3' },
    { color: 'bg-yellow-500', size: 'w-1/5 h-1/5' },
    { color: 'bg-white', size: 'w-1/6 h-1/6' },
    { color: 'bg-gray-200', size: 'w-1/7 h-1/7' },
  ];

  return (
    <div className="fixed inset-0 -z-10 opacity-10">
      {[...Array(10)].map((_, i) => (
        <div
          key={i}
          className={`absolute ${shapes[i % shapes.length].color} ${shapes[i % shapes.length].size}`}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            transform: `rotate(${Math.random() * 360}deg)`,
          }}
        />
      ))}
    </div>
  );
};

export default MondrianBackground;
