'use client';
import React from 'react';

const StatsCard = ({ title, value, color, icon }) => {
  return (
    <div className={`stat bg-gradient-to-br ${color} rounded-2xl shadow-lg border-2 border-yellow-400 hover:shadow-xl transition-all duration-300`}>
      <div className="stat-figure text-yellow-600">
        {icon}
      </div>
      <div className="stat-title text-yellow-900 font-bold">{title}</div>
      <div className="stat-value text-yellow-800">{value}</div>
    </div>
  );
};

export default StatsCard;