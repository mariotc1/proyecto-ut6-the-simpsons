import React from 'react';

const SimpsonsBackground = () => {
  return (
    <div className="fixed inset-0 z-0">
      <img 
        src="/img/image.png" 
        alt="The Simpsons Background"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-200/30 via-orange-200/20 to-yellow-300/40"></div>
    </div>
  );
};

export default SimpsonsBackground;