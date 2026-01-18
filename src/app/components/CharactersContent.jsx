import React from 'react';
import CharacterCard from './CharacterCard.jsx';
import StatsSection from './StatsSection.jsx';
import FilterSection from './FilterSection.jsx';

const CharactersContent = ({ 
  characters, 
  loading, 
  filteredCharacters, 
  filters, 
  onFilterChange, 
  pagination, 
  fetchCharacters, 
  loadMoreCharacters 
}) => {
  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6">
      <StatsSection characters={characters} />
      
      <FilterSection 
        filters={filters} 
        onFilterChange={onFilterChange}
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
              <div className="join flex-nowrap overflow-x-auto">
                <button 
                  className="join-item btn bg-yellow-400 hover:bg-yellow-500 text-yellow-900 border-yellow-600"
                  onClick={() => fetchCharacters(1)}
                  disabled={pagination.currentPage === 1}
                >
                  ««
                </button>
                <button 
                  className="join-item btn bg-yellow-400 hover:bg-yellow-500 text-yellow-900 border-yellow-600"
                  onClick={() => fetchCharacters(Math.max(1, pagination.currentPage - 1))}
                  disabled={pagination.currentPage === 1}
                >
                  «
                </button>
                <button className="join-item btn bg-yellow-400 hover:bg-yellow-500 text-yellow-900 border-yellow-600 px-2">
                  Página {pagination.currentPage} de {pagination.totalPages}
                </button>
                <button 
                  className="join-item btn bg-yellow-400 hover:bg-yellow-500 text-yellow-900 border-yellow-600"
                  onClick={() => fetchCharacters(Math.min(pagination.totalPages, pagination.currentPage + 1))}
                  disabled={pagination.currentPage === pagination.totalPages}
                >
                  »
                </button>
                <button 
                  className="join-item btn bg-yellow-400 hover:bg-yellow-500 text-yellow-900 border-yellow-600"
                  onClick={() => fetchCharacters(pagination.totalPages)}
                  disabled={pagination.currentPage === pagination.totalPages}
                >
                  »»
                </button>
              </div>
            </div>
          )}

          {/* Botón cargar más */}
          {pagination.currentPage < pagination.totalPages && (
            <div className="flex justify-center mt-4">
              <button 
                className="btn btn-wide bg-yellow-400 hover:bg-yellow-500 text-yellow-900 border-yellow-600 w-full sm:w-auto"
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
  );
};

export default CharactersContent;