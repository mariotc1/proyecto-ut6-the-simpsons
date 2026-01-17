'use client';
import React from 'react';

const EpisodeCard = ({ episode }) => {
  const { title, season, episode_number, air_date, synopsis } = episode;

  return (
    <div className="card bg-blue-50 shadow-xl hover:shadow-2xl transition-all duration-300 border-4 border-blue-400">
      <div className="card-body p-6">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0">
            <div className="w-16 h-16 bg-blue-400 rounded-full flex items-center justify-center text-white font-bold text-2xl">
              {episode_number || '?'}
            </div>
          </div>
          <div className="flex-1">
            <h2 className="card-title text-xl font-bold text-blue-900 mb-2">{title}</h2>
            <div className="flex flex-wrap gap-2 text-sm">
              {season && (
                <span className="badge bg-blue-400 text-white">
                  Temporada {season}
                </span>
              )}
              {air_date && (
                <span className="badge bg-indigo-400 text-white">
                  {new Date(air_date).toLocaleDateString()}
                </span>
              )}
            </div>
          </div>
        </div>
        {synopsis && (
          <p className="text-blue-800 mt-4 text-sm">{synopsis}</p>
        )}
      </div>
    </div>
  );
};

export default EpisodeCard;
