'use client';
import React from 'react';

const EpisodeCard = ({ episode }) => {
  const { name, image_path, season, episode_number, air_date, synopsis } = episode;

  const imageUrl = `https://cdn.thesimpsonsapi.com/500${image_path}`;

  return (
    <div className="card bg-yellow-50 shadow-xl hover:shadow-2xl transition-all duration-300 border-4 border-yellow-400">
      <figure className="px-4 pt-4 h-48 bg-gray-200 rounded-xl">
        {image_path ? (
          <img 
            src={imageUrl}
            alt={name}
            className="w-full h-full object-cover rounded-xl"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-500">
            <span>No Image</span>
          </div>
        )}
      </figure>
      <div className="card-body p-4">
        <h2 className="card-title text-lg font-bold text-yellow-900 truncate" title={name}>
          {name}
        </h2>
        <div className="flex flex-wrap gap-2 text-xs my-2">
          {season && (
            <span className="badge bg-yellow-400 text-yellow-900">
              Temporada {season}
            </span>
          )}
          {episode_number && (
            <span className="badge bg-yellow-400 text-yellow-900">
              Ep. {episode_number}
            </span>
          )}
          {air_date && (
            <span className="badge bg-orange-400 text-yellow-900">
              {new Date(air_date).toLocaleDateString()}
            </span>
          )}
        </div>
        {synopsis && (
          <p className="text-yellow-800 text-xs line-clamp-3">
            {synopsis}
          </p>
        )}
      </div>
    </div>
  );
};

export default EpisodeCard;

