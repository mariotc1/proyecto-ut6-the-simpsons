'use client';
import React, { useState, useEffect } from 'react';
import CharacterCard from './CharacterCard.jsx';
import StatsSection from './StatsSection.jsx';
import FilterSection from './FilterSection.jsx';
import EpisodesSection from './EpisodesSection.jsx';
import LocationsSection from './LocationsSection.jsx';
import QuizSection from './QuizSection.jsx';
import Header from './Header.jsx';

const CharacterGrid = () => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('characters');
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalCount: 0
  });
  const [filters, setFilters] = useState({
    searchTerm: '',
    gender: '',
    status: '',
    occupation: '',
    minAge: '',
    maxAge: ''
  });
  

  useEffect(() => {
    fetchCharacters();
  }, []);

  const fetchCharacters = async (page = 1) => {
    try {
      setLoading(true);
      const response = await fetch(`https://thesimpsonsapi.com/api/characters?page=${page}`);
      if (!response.ok) {
        throw new Error('Error al cargar los personajes');
      }
      const data = await response.json();
      
      if (page === 1) {
        setCharacters(data.results);
      } else {
        setCharacters(prev => [...prev, ...data.results]);
      }
      
      setPagination({
        currentPage: page,
        totalPages: data.pages,
        totalCount: data.count
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const loadMoreCharacters = () => {
    if (pagination.currentPage < pagination.totalPages) {
      fetchCharacters(pagination.currentPage + 1);
    }
  };

  const handleFilterChange = (key, value) => {
    if (key === 'reset') {
      setFilters({
        searchTerm: '',
        gender: '',
        status: '',
        occupation: '',
        minAge: '',
        maxAge: ''
      });
    } else {
      setFilters(prev => ({ ...prev, [key]: value }));
    }
  };

  const filteredCharacters = Array.isArray(characters) ? characters.filter(character => {
    // Filtro de búsqueda
    const searchMatch = !filters.searchTerm || 
      (character.name && character.name.toLowerCase().includes(filters.searchTerm.toLowerCase())) ||
      (character.occupation && character.occupation.toLowerCase().includes(filters.searchTerm.toLowerCase()));

    // Filtro de género
    const genderMatch = !filters.gender || character.gender === filters.gender;

    // Filtro de estado
    const statusMatch = !filters.status || character.status === filters.status;

    // Filtro de ocupación
    const occupationMatch = !filters.occupation || character.occupation === filters.occupation;

    // Filtro de edad
    let ageMatch = true;
    if (filters.minAge || filters.maxAge) {
      const age = parseInt(character.age);
      if (!isNaN(age)) {
        if (filters.minAge && age < parseInt(filters.minAge)) ageMatch = false;
        if (filters.maxAge && age > parseInt(filters.maxAge)) ageMatch = false;
      } else {
        ageMatch = false; // Si no tiene edad y hay filtro de edad
      }
    }

    return searchMatch && genderMatch && statusMatch && occupationMatch && ageMatch;
  }) : [];

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
    <div className="min-h-screen relative">
      {/* Background con la imagen de los Simpsons */}
      <div className="fixed inset-0 z-0">
        <img 
          src="/img/image.png" 
          alt="The Simpsons Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-200/30 via-orange-200/20 to-yellow-300/40"></div>
      </div>

      {/* Contenido principal sobre el fondo */}
      <div className="relative z-10 min-h-screen flex flex-col">
        <Header activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className="container mx-auto px-4 py-8 flex-1">
      {activeTab === 'characters' && (
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6">
          <StatsSection characters={characters} />
          
          <FilterSection 
            filters={filters} 
            onFilterChange={handleFilterChange}
            characters={characters}
          />

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

          {/* Paginación */}
          {filteredCharacters.length > 0 && (
            <div className="flex justify-center mt-8">
              <div className="join">
                <button 
                  className="join-item btn bg-yellow-400 hover:bg-yellow-500 text-yellow-900 border-yellow-600"
                  onClick={() => fetchCharacters(1)}
                  disabled={pagination.currentPage === 1}
                >
                  Primera
                </button>
                <button 
                  className="join-item btn bg-yellow-400 hover:bg-yellow-500 text-yellow-900 border-yellow-600"
                  onClick={() => fetchCharacters(Math.max(1, pagination.currentPage - 1))}
                  disabled={pagination.currentPage === 1}
                >
                  Anterior
                </button>
                <button className="join-item btn bg-yellow-400 hover:bg-yellow-500 text-yellow-900 border-yellow-600">
                  Página {pagination.currentPage} de {pagination.totalPages}
                </button>
                <button 
                  className="join-item btn bg-yellow-400 hover:bg-yellow-500 text-yellow-900 border-yellow-600"
                  onClick={() => fetchCharacters(Math.min(pagination.totalPages, pagination.currentPage + 1))}
                  disabled={pagination.currentPage === pagination.totalPages}
                >
                  Siguiente
                </button>
                <button 
                  className="join-item btn bg-yellow-400 hover:bg-yellow-500 text-yellow-900 border-yellow-600"
                  onClick={() => fetchCharacters(pagination.totalPages)}
                  disabled={pagination.currentPage === pagination.totalPages}
                >
                  Última
                </button>
              </div>
            </div>
          )}

          {/* Botón cargar más */}
          {pagination.currentPage < pagination.totalPages && (
            <div className="flex justify-center mt-4">
              <button 
                className="btn btn-wide bg-yellow-400 hover:bg-yellow-500 text-yellow-900 border-yellow-600"
                onClick={loadMoreCharacters}
                disabled={loading}
              >
                {loading ? (
                  <span className="loading loading-spinner"></span>
                ) : (
                  'Cargar más personajes'
                )}
              </button>
            </div>
          )}
        </>
        )}
        </div>
      )}

      {activeTab === 'episodes' && (
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6">
          <EpisodesSection />
        </div>
      )}

      {activeTab === 'locations' && (
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6">
          <LocationsSection />
        </div>
      )}

      {activeTab === 'quiz' && (
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6">
            <QuizSection characters={characters} />
          </div>
        )}
        </div>
      </div>
    </div>
  );
};

export default CharacterGrid;