import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-yellow-400/90 backdrop-blur-sm text-yellow-900 p-8">
      <div className="container mx-auto text-center">
        <div className="mb-4">
          <h3 className="text-lg font-bold simpsons-text">Proyecto - El Universo de Los Simpsons</h3>
        </div>
        <div className="text-sm mb-4">
          <p>Trabajo del módulo de Desarrollo Web Entorno Cliente, del CFGS de DAW</p>
          <p>Hecho por <span className="font-semibold">Raúl Ortega Frutos</span> y <span className="font-semibold">Mario Tomé Core</span>.</p>
        </div>
        <div className="text-xs">
          <p>
            Datos proporcionados por <a href="https://thesimpsonsapi.com" target="_blank" rel="noopener noreferrer" className="link link-hover">TheSimpsonsAPI.com</a>
          </p>
          <p>© {new Date().getFullYear()} - Todos los derechos reservados.</p>
        </div>
        <div className="flex justify-center gap-4 mt-4">
          <span className="text-2xl">🍩</span>
          <span className="text-2xl">🍺</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;