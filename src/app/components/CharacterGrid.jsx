'use client';
import React, { useState, useEffect } from 'react';
import CharacterCard from './CharacterCard.jsx';

const CharacterGrid = () => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  

  useEffect(() => {
    fetchCharacters();
  }, []);

  const fetchCharacters = async () => {
    try {
      setLoading(true);
      const response = await fetch(`https://thesimpsonsapi.com/api/characters`);
      if (!response.ok) {
        throw new Error('Error al cargar los personajes');
      }
      const data = await response.json();
      setCharacters(data.results);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const filteredCharacters = Array.isArray(characters) ? characters.filter(character =>
    character.name && character.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    character.occupation && character.occupation.toLowerCase().includes(searchTerm.toLowerCase())
  ) : [];

  if (error) {
    return (
      <div className="alert alert-error">
        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>Error: {error}</span>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-center mb-6 text-yellow-600">
          Personajes de Los Simpsons
        </h1>
        
        <div className="form-control max-w-md mx-auto">
          <input
            type="text"
            placeholder="Buscar por nombre o ocupación..."
            className="input input-bordered bg-yellow-50 border-yellow-400 text-yellow-900 placeholder-yellow-600"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {loading && characters.length === 0 ? (
        <div className="flex justify-center items-center h-64">
          <span className="loading loading-spinner loading-lg text-yellow-500"></span>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredCharacters.map((character) => (
              <CharacterCard key={character.id} character={character} />
            ))}
          </div>

          {filteredCharacters.length === 0 && !loading && (
            <div className="text-center py-12">
              <p className="text-yellow-600 text-lg">No se encontraron personajes</p>
            </div>
          )}

          
        </>
      )}
    </div>
  );
};

export default CharacterGrid;