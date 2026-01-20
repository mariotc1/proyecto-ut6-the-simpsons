/**
 * Componente SimpsonsBackground
 * 
 * Componente de fondo decorativo para la aplicación.
 * Muestra una imagen temática de Los Simpsons con un
 * overlay degradado para mejorar la legibilidad del contenido.
 * 
 * @component
 * @returns {JSX.Element} Fondo con imagen y overlay
 */
import React from 'react';

const SimpsonsBackground = () => {
  return (
    // Contenedor fijo que cubre toda la pantalla, detrás del contenido
    <div className="fixed inset-0 z-0">
      
      {/* Imagen de fondo temática */}
      <img 
        src="/img/image.png" 
        alt="The Simpsons Background"
        className="w-full h-full object-cover"
      />
      
      {/* Overlay con gradiente para mejorar legibilidad del contenido */}
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-200/30 via-orange-200/20 to-yellow-300/40"></div>
    </div>
  );
};

export default SimpsonsBackground;