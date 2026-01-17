'use client';
import React from 'react';
import StatsCard from './StatsCard.jsx';

const StatsSection = ({ characters }) => {
  const totalCharacters = characters.length;
  const aliveCharacters = characters.filter(c => c.status === 'Alive').length;
  const deadCharacters = characters.filter(c => c.status === 'Deceased').length;
  const maleCharacters = characters.filter(c => c.gender === 'Male').length;
  const femaleCharacters = characters.filter(c => c.gender === 'Female').length;
  const avgAge = characters
    .filter(c => c.age && !isNaN(c.age))
    .reduce((sum, c) => sum + parseInt(c.age), 0) /
    characters.filter(c => c.age && !isNaN(c.age)).length || 0;

  const stats = [
    {
      title: "Total Personajes",
      value: totalCharacters,
      color: "from-yellow-100 to-yellow-200",
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"/>
        </svg>
      ),
    },
    {
      title: "Vivos",
      value: aliveCharacters,
      color: "from-green-100 to-green-200",
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
        </svg>
      ),
    },
    {
      title: "Fallecidos",
      value: deadCharacters,
      color: "from-red-100 to-red-200",
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"/>
        </svg>
      ),
    },
    {
      title: "Hombres",
      value: maleCharacters,
      color: "from-blue-100 to-blue-200",
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"/>
        </svg>
      ),
    },
    {
      title: "Mujeres",
      value: femaleCharacters,
      color: "from-pink-100 to-pink-200",
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"/>
        </svg>
      ),
    },
    {
      title: "Edad Promedio",
      value: Math.round(avgAge),
      color: "from-purple-100 to-purple-200",
      icon: (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"/>
        </svg>
      ),
    },
  ];

  return (
    <div className="mb-8">
      <h2 className="text-3xl font-bold text-center mb-6 text-yellow-600">
        Estadísticas de Springfield
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {stats.map((stat, index) => (
          <StatsCard
            key={stat.title}
            title={stat.title}
            value={stat.value}
            color={stat.color}
            icon={stat.icon}
            delay={index}
          />
        ))}
      </div>
    </div>
  );
};

export default StatsSection;