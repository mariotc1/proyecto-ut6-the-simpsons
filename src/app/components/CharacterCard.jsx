import React, { useState } from 'react';
import CharacterModal from './CharacterModal.jsx';

const CharacterCard = ({ character }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { name, age, occupation, portrait_path, phrases, status } = character;
  
  return (
    <div className="card bg-yellow-50 shadow-xl hover:shadow-2xl transition-all duration-300 border-4 border-yellow-400 simpsons-card">
      <figure className="px-4 pt-4 h-64">
        <div className="relative w-full h-full">
          <img 
            src={`https://cdn.thesimpsonsapi.com/500${portrait_path}`}
            alt={name}
            className="absolute top-0 left-0 w-full h-full object-contain rounded-xl"
          />
        </div>
      </figure>
      <div className="card-body p-4">
        <h2 className="card-title text-xl font-bold text-yellow-900">
          {name}
          <div className={`badge ${status === 'Alive' ? 'badge-success' : 'badge-error'}`}>
            {status}
          </div>
        </h2>
        
        <div className="space-y-2 text-sm">
          {age && (
            <p className="flex items-center gap-2">
              <span className="font-semibold text-yellow-800">Edad:</span>
              <span className="text-yellow-700">{age} años</span>
            </p>
          )}
          
          {occupation && (
            <p className="flex items-center gap-2">
              <span className="font-semibold text-yellow-800">Ocupación:</span>
              <span className="text-yellow-700">{occupation}</span>
            </p>
          )}
        </div>

        {phrases && phrases.length > 0 && (
          <div className="mt-4">
            <h3 className="font-semibold text-yellow-800 mb-2">Frases célebres:</h3>
            <div className="bg-yellow-100 rounded-lg p-3">
              <p className="text-yellow-900 italic text-sm">
                "{phrases[0]}"
              </p>
              {phrases.length > 1 && (
                <p className="text-xs text-yellow-600 mt-1">
                  +{phrases.length - 1} frases más
                </p>
              )}
            </div>
          </div>
        )}

        <div className="card-actions justify-end mt-4">
          <button 
            className="btn btn-sm bg-yellow-400 hover:bg-yellow-500 text-yellow-900 border-yellow-600 simpsons-glow"
            onClick={() => setIsModalOpen(true)}
          >
            Ver detalles
          </button>
        </div>
      </div>
      
      <CharacterModal 
        character={character}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default CharacterCard;