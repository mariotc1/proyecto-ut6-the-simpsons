'use client';
import React from 'react';

const LocationCard = ({ location }) => {
  const { name, image_path, town, use } = location;

  // Assuming the base URL for images is the same as for characters
  const imageUrl = `https://cdn.thesimpsonsapi.com/500${image_path}`;

  return (
    <div className="card bg-yellow-50 shadow-xl hover:shadow-2xl transition-all duration-300 border-4 border-yellow-400">
      <figure className="px-4 pt-4 h-56 bg-gray-200 rounded-xl">
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
        <div className="space-y-1 text-sm mt-2">
          {town && (
            <p className="flex items-center gap-2">
              <span className="font-semibold text-yellow-800">Ciudad:</span>
              <span className="text-yellow-700">{town}</span>
            </p>
          )}
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
