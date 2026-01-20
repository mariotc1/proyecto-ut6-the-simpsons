/**
 * Componente Header
 * 
 * Cabecera de navegación principal de la aplicación.
 * Incluye menú responsive para móvil y escritorio,
 * con navegación por pestañas y efectos visuales.
 * 
 * @component
 * @param {Object} props - Propiedades del componente
 * @param {string} props.activeTab - ID de la pestaña activa
 * @param {Function} props.setActiveTab - Función para cambiar la pestaña activa
 * @returns {JSX.Element} Cabecera completa con navegación
 */
'use client';

import React from 'react';

const Header = ({ activeTab, setActiveTab }) => {
  // Array de enlaces de navegación con sus iconos SVG
  const navLinks = [
    { 
      id: 'characters', 
      name: 'Personajes', 
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.653-.124-1.282-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.653.124-1.282.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    },
    { 
      id: 'episodes', 
      name: 'Episodios', 
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ) 
    },
    { 
      id: 'locations', 
      name: 'Ubicaciones', 
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      )
    },
    { 
      id: 'quiz', 
      name: 'Quiz', 
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
  ];

  return (
    // Header con fondo semitransparente, efecto de desenfoque y posición fija
    <header className="bg-yellow-400/90 backdrop-blur-sm shadow-md sticky top-0 z-30">
      
      {/* Barra de navegación de DaisyUI */}
      <div className="navbar container mx-auto">
        
        {/* Sección izquierda - logo y menú móvil */}
        <div className="navbar-start">
          
          {/* Menú desplegable para dispositivos móviles */}
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              {/* Icono de hamburguesa para menú móvil */}
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </label>
            
            {/* Menú desplegable para móvil */}
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <a
                    onClick={() => setActiveTab(link.id)}
                    className={activeTab === link.id ? 'active text-yellow-900' : 'text-yellow-900'}
                  >
                    {link.icon} {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Título/logo de la aplicación */}
          <a 
            className="btn btn-ghost normal-case text-xl simpsons-text text-yellow-950" 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            El Universo de Los Simpsons
          </a>
        </div>
        
        {/* Sección derecha - navegación para escritorio */}
        <div className="navbar-end hidden lg:flex">
          <ul className="menu menu-horizontal p-0">
            {navLinks.map((link) => (
              <li key={link.id}>
                <a
                  onClick={() => setActiveTab(link.id)}
                  className={`font-semibold transition-all duration-300 rounded-lg px-3 py-2 ${
                    activeTab === link.id
                      ? 'bg-gradient-to-r from-yellow-500 to-yellow-600 text-white shadow-lg transform scale-105'
                      : 'text-yellow-900 hover:bg-yellow-500/50'
                  }`}
                >
                  <span className="flex items-center gap-1">
                    <span className="text-lg">{link.icon}</span>
                    <span>{link.name}</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;