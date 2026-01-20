/**
 * Componente LocationCard
 * 
 * Tarjeta para mostrar información de ubicaciones de Los Simpsons.
 * Incluye imagen, nombre, ciudad y tipo de uso del lugar.
 * 
 * @component
 * @param {Object} props - Propiedades del componente
 * @param {Object} props.location - Objeto con datos de la ubicación
 * @param {string} props.location.name - Nombre de la ubicación
 * @param {string} props.location.image_path - Ruta de la imagen
 * @param {string} props.location.town - Ciudad donde se encuentra
 * @param {string} props.location.use - Tipo de uso o propósito
 * @returns {JSX.Element} Tarjeta de ubicación renderizada
 */
'use client';

import React from 'react';

const LocationCard = ({ location }) => {
  // Extraemos las propiedades de la ubicación para facilitar su uso
  const { 
    name,        // Nombre de la ubicación
    image_path,  // Ruta de la imagen
    town,        // Ciudad
    use          // Tipo de uso
  } = location;

  // Construimos la URL completa de la imagen usando la misma base que los personajes
  const imageUrl = `https://cdn.thesimpsonsapi.com/500${image_path}`;

  return (
    // Tarjeta principal con estilos temáticos de Los Simpsons
    <div className="card bg-yellow-50 shadow-xl hover:shadow-2xl transition-all duration-300 border-4 border-yellow-400">
      
      {/* Sección de la imagen de la ubicación */}
      <figure className="px-4 pt-4 h-56 bg-gray-200 rounded-xl">
        {image_path ? (
          // Si hay imagen, la mostramos
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
      
      {/* Sección de información de la ubicación */}
      <div className="card-body p-4">
        
        {/* Título con nombre de la ubicación */}
        <h2 
          className="card-title text-lg font-bold text-yellow-900 truncate" 
          title={name}
        >
          {name}
        </h2>
        
        {/* Información detallada de la ubicación */}
        <div className="space-y-1 text-sm mt-2">
          
          {/* Ciudad de la ubicación (si está disponible) */}
          {town && (
            <p className="flex items-center gap-2">
              <span className="font-semibold text-yellow-800">Ciudad:</span>
              <span className="text-yellow-700">{town}</span>
            </p>
          )}
          
          {/* Tipo de uso de la ubicación (si está disponible) */}
          {use && (
            <p className="flex items-center gap-2">
              <span className="font-semibold text-yellow-800">Uso:</span>
              <span className="text-yellow-700">{use}</span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default LocationCard;
