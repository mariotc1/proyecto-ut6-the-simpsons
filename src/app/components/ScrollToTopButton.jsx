/**
 * Componente ScrollToTopButton
 * 
 * Botón flotante que aparece al hacer scroll hacia abajo
 * y permite volver suavemente al inicio de la página.
 * Mejora la experiencia de usuario en páginas largas.
 * 
 * @component
 * @returns {JSX.Element} Botón flotante para volver arriba
 */
'use client';

import React, { useState, useEffect } from 'react';

const ScrollToTopButton = () => {
  // Estado para controlar la visibilidad del botón
  const [isVisible, setIsVisible] = useState(false);

  /**
   * Alterna la visibilidad del botón según la posición del scroll
   * El botón aparece cuando el usuario hace scroll más de 200px
   */
  const toggleVisibility = () => {
    if (window.pageYOffset > 200) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  /**
   * Realiza scroll suave hacia el inicio de la página
   */
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  // Efecto para añadir/eliminar el event listener de scroll
  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);

    // Limpieza del event listener al desmontar el componente
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    // Contenedor fijo en la esquina inferior derecha
    <div className="fixed bottom-5 right-5 z-50">
      
      {/* Renderizado condicional del botón */}
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="btn btn-circle bg-yellow-500 hover:bg-yellow-600 text-white border-yellow-700 shadow-lg transition-opacity duration-300"
          aria-label="Volver arriba"
        >
          {/* Icono de flecha hacia arriba */}
          <svg 
            className="w-6 h-6" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M5 15l7-7 7 7" 
            />
          </svg>
        </button>
      )}
    </div>
  );
};

export default ScrollToTopButton;
