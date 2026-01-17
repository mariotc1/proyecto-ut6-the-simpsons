'use client';
import React from 'react';

const Header = ({ activeTab, setActiveTab }) => {
  const navLinks = [
    { id: 'characters', name: 'Personajes', icon: '👥' },
    { id: 'episodes', name: 'Episodios', icon: '📺' },
    { id: 'locations', name: 'Ubicaciones', icon: '🗺️' },
    { id: 'quiz', name: 'Quiz', icon: '🎮' },
  ];

  return (
    <header className="bg-yellow-400/90 backdrop-blur-sm shadow-md sticky top-0 z-30">
      <div className="navbar container mx-auto">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </label>
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
          <a className="btn btn-ghost normal-case text-xl simpsons-text text-yellow-900" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>El Universo de Los Simpsons</a>
        </div>
        <div className="navbar-end hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            {navLinks.map((link) => (
              <li key={link.id}>
                <a
                  onClick={() => setActiveTab(link.id)}
                  className={`font-semibold transition-all duration-300 ${
                    activeTab === link.id
                      ? 'bg-gradient-to-r from-yellow-500 to-yellow-600 text-white shadow-lg transform scale-105'
                      : 'text-yellow-900 hover:bg-yellow-500/50'
                  }`}
                >
                  <span className="flex items-center gap-2">
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