/**
 * Componente EpisodeCard
 * 
 * Tarjeta para mostrar información de episodios de Los Simpsons.
 * Incluye imagen, título, temporada, número de episodio,
 * fecha de emisión y sinopsis del episodio.
 * 
 * @component
 * @param {Object} props - Propiedades del componente
 * @param {Object} props.episode - Objeto con datos del episodio
 * @param {string} props.episode.name - Nombre del episodio
 * @param {string} props.episode.image_path - Ruta de la imagen
 * @param {string} props.episode.season - Número de temporada
 * @param {string} props.episode.episode_number - Número del episodio
 * @param {string} props.episode.air_date - Fecha de emisión
 * @param {string} props.episode.synopsis - Sinopsis del episodio
 * @returns {JSX.Element} Tarjeta de episodio renderizada
 */
'use client';

import React from 'react';

const EpisodeCard = ({ episode }) => {
  // Extraemos las propiedades del episodio para facilitar su uso
  const { 
    name,            // Nombre del episodio
    image_path,      // Ruta de la imagen
    season,          // Número de temporada
    episode_number,   // Número del episodio
    air_date,        // Fecha de emisión
    synopsis         // Sinopsis del episodio
  } = episode;

  // Construimos la URL completa de la imagen usando la base de la API
  const imageUrl = `https://cdn.thesimpsonsapi.com/500${image_path}`;

  return (
    // Tarjeta principal con estilos temáticos de Los Simpsons
    <div className="card bg-yellow-50 shadow-xl hover:shadow-2xl transition-all duration-300 border-4 border-yellow-400">
      
      {/* Sección de la imagen del episodio */}
      <figure className="px-4 pt-4 h-48 bg-gray-200 rounded-xl">
        {image_path ? (
          // Si hay imagen, la mostramos con object-cover para mantener proporciones
          <img 
            src={imageUrl}
            alt={name}
            className="w-full h-full object-cover rounded-xl"
          />
        ) : (
          // Si no hay imagen, mostramos un placeholder
          <div className="w-full h-full flex items-center justify-center text-gray-500">
            <span>No Image</span>
          </div>
        )}
      </figure>
      
      {/* Sección de información del episodio */}
      <div className="card-body p-4">
        
        {/* Título del episodio con truncado para evitar desbordamiento */}
        <h2 
          className="card-title text-lg font-bold text-yellow-900 truncate" 
          title={name}
        >
          {name}
        </h2>
        
        {/* Badges con información del episodio */}
        <div className="flex flex-wrap gap-2 text-xs my-2">
          
          {/* Badge de temporada (si está disponible) */}
          {season && (
            <span className="badge bg-yellow-400 text-yellow-900">
              Temporada {season}
            </span>
          )}
          
          {/* Badge de número de episodio (si está disponible) */}
          {episode_number && (
            <span className="badge bg-yellow-400 text-yellow-900">
              Ep. {episode_number}
            </span>
          )}
          
          {/* Badge de fecha de emisión (si está disponible) */}
          {air_date && (
            <span className="badge bg-orange-400 text-yellow-900">
              {new Date(air_date).toLocaleDateString()}
            </span>
          )}
        </div>
        
        {/* Sinopsis del episodio (si está disponible) */}
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

