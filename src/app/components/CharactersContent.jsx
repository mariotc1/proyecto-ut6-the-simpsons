/**
 * Componente CharactersContent
 * 
 * Este componente gestiona todo el contenido relacionado con los personajes:
 * - Estadísticas generales
 * - Sistema de filtrado
 * - Cuadrícula de personajes
 * - Sistema de paginación
 * - Botón para cargar más personajes
 * 
 * @component
 * @param {Object} props - Propiedades del componente
 * @param {Array} props.characters - Array completo de personajes
 * @param {boolean} props.loading - Estado de carga de datos
 * @param {Array} props.filteredCharacters - Array de personajes filtrados
 * @param {Object} props.filters - Objeto con filtros aplicados
 * @param {Function} props.onFilterChange - Función para manejar cambios en filtros
 * @param {Object} props.pagination - Información de paginación
 * @param {Function} props.fetchCharacters - Función para cargar personajes específicos
 * @param {Function} props.loadMoreCharacters - Función para cargar más personajes
 * @returns {JSX.Element} Contenido completo de personajes
 */
import React from 'react';

// Importaciones de componentes relacionados
import CharacterCard from './CharacterCard.jsx';
import StatsSection from './StatsSection.jsx';
import FilterSection from './FilterSection.jsx';

const CharactersContent = ({ 
  characters,           // Todos los personajes cargados
  loading,             // Estado de carga
  filteredCharacters,  // Personajes después de aplicar filtros
  filters,             // Filtros activos
  onFilterChange,      // Manejador de cambios en filtros
  pagination,          // Datos de paginación
  fetchCharacters,     // Función para cargar página específica
  loadMoreCharacters   // Función para cargar más personajes
}) => {
  return (
    // Contenedor principal con fondo semitransparente y bordes redondeados
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6">
      
      {/* Sección de estadísticas generales de personajes */}
      <StatsSection characters={characters} />
      
      {/* Sección de filtros para buscar personajes */}
      <FilterSection 
        filters={filters} 
        onFilterChange={onFilterChange}
        characters={characters}
      />

      {/* 
        Renderizado condicional:
        - Si está cargando y no hay personajes: mostrar spinner
        - Si no: mostrar contenido completo
      */}
      {loading && characters.length === 0 ? (
        // Estado de carga inicial
        <div className="flex justify-center items-center h-64">
          <span className="loading loading-spinner loading-lg text-yellow-500"></span>
        </div>
      ) : (
        // Contenido principal cuando hay datos
        <>
          {/* Cuadrícula de personajes filtrados */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredCharacters.map((character) => (
              <CharacterCard key={character.id} character={character} />
            ))}
          </div>

          {/* Mensaje cuando no hay personajes que coincidan con los filtros */}
          {filteredCharacters.length === 0 && !loading && (
            <div className="text-center py-12">
              <p className="text-yellow-600 text-lg">No se encontraron personajes</p>
            </div>
          )}

          {/* Sistema de paginación - solo se muestra si hay personajes */}
          {filteredCharacters.length > 0 && (
            <div className="flex justify-center mt-8">
              <div className="join flex-nowrap overflow-x-auto">
                
                {/* Botón para ir a la primera página */}
                <button 
                  className="join-item btn bg-yellow-400 hover:bg-yellow-500 text-yellow-900 border-yellow-600"
                  onClick={() => fetchCharacters(1)}
                  disabled={pagination.currentPage === 1}
                >
                  ««
                </button>
                
                {/* Botón para ir a la página anterior */}
                <button 
                  className="join-item btn bg-yellow-400 hover:bg-yellow-500 text-yellow-900 border-yellow-600"
                  onClick={() => fetchCharacters(Math.max(1, pagination.currentPage - 1))}
                  disabled={pagination.currentPage === 1}
                >
                  «
                </button>
                
                {/* Indicador de página actual */}
                <button className="join-item btn bg-yellow-400 hover:bg-yellow-500 text-yellow-900 border-yellow-600 px-2">
                  Página {pagination.currentPage} de {pagination.totalPages}
                </button>
                
                {/* Botón para ir a la página siguiente */}
                <button 
                  className="join-item btn bg-yellow-400 hover:bg-yellow-500 text-yellow-900 border-yellow-600"
                  onClick={() => fetchCharacters(Math.min(pagination.totalPages, pagination.currentPage + 1))}
                  disabled={pagination.currentPage === pagination.totalPages}
                >
                  »
                </button>
                
                {/* Botón para ir a la última página */}
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

          {/* Botón para cargar más personajes - se muestra si no estamos en la última página */}
          {pagination.currentPage < pagination.totalPages && (
            <div className="flex justify-center mt-4">
              <button 
                className="btn btn-wide bg-yellow-400 hover:bg-yellow-500 text-yellow-900 border-yellow-600 w-full sm:w-auto"
                onClick={loadMoreCharacters}
                disabled={loading}
              >
                {loading ? (
                  // Mientras carga, mostrar spinner
                  <span className="loading loading-spinner"></span>
                ) : (
                  // Texto normal cuando no está cargando
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