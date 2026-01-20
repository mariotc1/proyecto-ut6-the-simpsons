/**
 * Componente Footer
 * 
 * Pie de página de la aplicación con información del proyecto,
 * créditos de los desarrolladores y enlaces a recursos.
 * Incluye elementos temáticos de Los Simpsons.
 * 
 * @component
 * @returns {JSX.Element} Footer completo con información del proyecto
 */
import React from 'react';

const Footer = () => {
  return (
    // Footer con fondo semitransparente y efecto de desenfoque
    <footer className="bg-yellow-400/90 backdrop-blur-sm text-yellow-950 p-8">
      
      {/* Contenedor centrado con máximos anchos */}
      <div className="container mx-auto text-center">
        
        {/* Título principal del proyecto */}
        <div className="mb-4">
          <h3 className="text-lg font-bold simpsons-text">
            Proyecto - El Universo de Los Simpsons
          </h3>
        </div>
        
        {/* Información académica y créditos */}
        <div className="text-sm mb-4">
          <p>
            Trabajo del módulo de Desarrollo Web Entorno Cliente, del CFGS de DAW
          </p>
          <p>
            Hecho por{' '}
            <span className="font-semibold">Raúl Ortega Frutos</span>{' '}
            y{' '}
            <span className="font-semibold">Mario Tomé Core</span>.
          </p>
        </div>
        
        {/* Información de la API y derechos de autor */}
        <div className="text-xs">
          <p>
            Datos proporcionados por{' '}
            <a 
              href="https://thesimpsonsapi.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="link link-hover"
            >
              TheSimpsonsAPI.com
            </a>
          </p>
          <p>
            © {new Date().getFullYear()} - Todos los derechos reservados.
          </p>
        </div>
        
        {/* Elementos temáticos de Los Simpsons */}
        <div className="flex justify-center gap-4 mt-4">
          <span className="text-2xl">🍩</span>
          <span className="text-2xl">🍺</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;