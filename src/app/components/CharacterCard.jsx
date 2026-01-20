/**
 * Componente CharacterCard
 * 
 * Este componente muestra una tarjeta con la información de un personaje de Los Simpsons.
 * Incluye imagen, nombre, estado, edad, ocupación y frases célebres.
 * 
 * @component
 * @param {Object} character - Objeto con los datos del personaje
 * @param {string} character.name - Nombre del personaje
 * @param {string} character.age - Edad del personaje
 * @param {string} character.occupation - Ocupación del personaje
 * @param {string} character.portrait_path - Ruta de la imagen del personaje
 * @param {Array} character.phrases - Array de frases célebres del personaje
 * @param {string} character.status - Estado del personaje (Alive/Dead)
 * @returns {JSX.Element} Tarjeta de personaje renderizada
 */
import React from 'react';

const CharacterCard = ({ character }) => {
  // Extraemos las propiedades del personaje para facilitar su uso
  const { 
    name, 
    age, 
    occupation, 
    portrait_path, 
    phrases, 
    status 
  } = character;
  
  return (
    // Tarjeta principal con estilos temáticos de Los Simpsons
    <div className="card bg-yellow-50 shadow-xl hover:shadow-2xl transition-all duration-300 border-4 border-yellow-400 simpsons-card">
      
      {/* Sección de la imagen del personaje */}
      <figure className="px-4 pt-4 h-64">
        <div className="relative w-full h-full">
          <img 
            src={`https://cdn.thesimpsonsapi.com/500${portrait_path}`}
            alt={name}
            className="absolute top-0 left-0 w-full h-full object-contain rounded-xl"
          />
        </div>
      </figure>
      
      {/* Sección de información del personaje */}
      <div className="card-body p-4">
        
        {/* Título con nombre y estado */}
        <h2 className="card-title text-xl font-bold text-yellow-900">
          {name}
          <div className={`badge ${status === 'Alive' ? 'badge-success' : 'badge-error'}`}>
            {status}
          </div>
        </h2>
        
        {/* Información detallada del personaje */}
        <div className="space-y-2 text-sm">
          
          {/* Edad del personaje (si está disponible) */}
          {age && (
            <p className="flex items-center gap-2">
              <span className="font-semibold text-yellow-800">Edad:</span>
              <span className="text-yellow-700">{age} años</span>
            </p>
          )}
          
          {/* Ocupación del personaje (si está disponible) */}
          {occupation && (
            <p className="flex items-center gap-2">
              <span className="font-semibold text-yellow-800">Ocupación:</span>
              <span className="text-yellow-700">{occupation}</span>
            </p>
          )}
        </div>

        {/* Sección de frases célebres (si existen) */}
        {phrases && phrases.length > 0 && (
          <div className="mt-4">
            <h3 className="font-semibold text-yellow-800 mb-2">Frases célebres:</h3>
            <div className="bg-yellow-100 rounded-lg p-3">
              <p className="text-yellow-900 italic text-sm">
                &quot;{phrases[0]}&quot;
              </p>
              {phrases.length > 1 && (
                <p className="text-xs text-yellow-600 mt-1">
                  +{phrases.length - 1} frases más
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CharacterCard;