/**
 * Componente EpisodesSection
 * 
 * Este componente gestiona la sección de episodios de Los Simpsons.
 * Carga datos desde la API, proporciona filtrado por temporada,
 * paginación y renderizado de tarjetas de episodios.
 * Implementa carga progresiva y carga en segundo plano para mejor UX.
 * 
 * @component
 * @returns {JSX.Element} Sección completa de episodios
 */
'use client';

import React, { useState, useEffect, useMemo } from 'react';
import EpisodeCard from './EpisodeCard.jsx';

const EpisodesSection = () => {
  // Estados para gestionar los datos de episodios
  const [allEpisodes, setAllEpisodes] = useState([]);           // Todos los episodios cargados
  const [displayedEpisodes, setDisplayedEpisodes] = useState([]); // Episodios mostrados actualmente
  const [loading, setLoading] = useState(true);                    // Estado de carga inicial
  const [loadingAll, setLoadingAll] = useState(true);              // Estado de carga completa
  const [error, setError] = useState(null);                        // Posible error en la carga
  const [selectedSeason, setSelectedSeason] = useState('all');     // Temporada seleccionada para filtrar
  const [page, setPage] = useState(1);                             // Página actual de paginación
  const episodesPerPage = 9;                                        // Episodios por página

  /**
   * Función para cargar los episodios iniciales (primera página)
   * Utiliza useCallback para optimizar rendimiento y evitar re-renders innecesarios
   */
  const fetchInitialEpisodes = React.useCallback(async () => {
    setLoading(true);
    try {
      // Cargamos la primera página de episodios
      const response = await fetch('https://thesimpsonsapi.com/api/episodes?page=1');
      if (!response.ok) throw new Error('Error al cargar los episodios');
      const data = await response.json();
      
      // Establecemos los datos iniciales
      setAllEpisodes(data.results || []);
      setDisplayedEpisodes(data.results.slice(0, episodesPerPage) || []);
      setPage(1);
      setLoading(false);
      
      // Iniciamos la carga de las páginas restantes en segundo plano
      fetchAllRemainingEpisodes(data.pages, data.results || []);

    } catch (err) {
      setError(err.message);
      setLoading(false);
      setLoadingAll(false);
    }
  }, [episodesPerPage]);

  // Efecto para cargar los episodios iniciales al montar el componente
  useEffect(() => {
    fetchInitialEpisodes();
  }, [fetchInitialEpisodes]);

  /**
   * Función para cargar todas las páginas restantes en segundo plano
   * Esto permite al usuario ver contenido mientras se carga el resto
   * @param {number} totalPages - Número total de páginas
   * @param {Array} initialEpisodes - Episodios iniciales ya cargados
   */
  const fetchAllRemainingEpisodes = async (totalPages, initialEpisodes) => {
    try {
      let allResults = [...initialEpisodes];
      
      // Iteramos desde la página 2 hasta la última
      for (let currentPage = 2; currentPage <= totalPages; currentPage++) {
        const response = await fetch(`https://thesimpsonsapi.com/api/episodes?page=${currentPage}`);
        if (!response.ok) continue; // Continuamos si hay error en una página específica
        const data = await response.json();
        allResults.push(...(data.results || []));
      }
      
      setAllEpisodes(allResults);
      setLoadingAll(false); // Todos los datos están ahora cargados
    } catch (err) {
      // Manejo silencioso del error para no interrumpir la experiencia del usuario
      console.error("Failed to fetch all episodes in background:", err);
      setLoadingAll(false);
    }
  };
  
  /**
   * Memo para calcular los episodios filtrados según la temporada seleccionada
   * Convierte el selectedSeason a número para comparación correcta
   */
  const filteredEpisodes = useMemo(() => {
    return selectedSeason === 'all'
      ? allEpisodes
      : allEpisodes.filter(ep => ep.season === parseInt(selectedSeason));
  }, [selectedSeason, allEpisodes]);

  // Efecto para actualizar los episodios mostrados cuando cambia el filtro
  useEffect(() => {
    setDisplayedEpisodes(filteredEpisodes.slice(0, episodesPerPage));
    setPage(1);
  }, [filteredEpisodes]);

  /**
   * Función para cargar más episodios (paginación progresiva)
   * Incrementa la página y añade más episodios al array mostrado
   */
  const loadMoreEpisodes = () => {
    const nextPage = page + 1;
    const newEpisodes = filteredEpisodes.slice(0, nextPage * episodesPerPage);
    setDisplayedEpisodes(newEpisodes);
    setPage(nextPage);
  };

  /**
   * Función para manejar el cambio de página específica
   * @param {number} newPage - Nueva página a la que navegar
   */
  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return;
    const start = (newPage - 1) * episodesPerPage;
    const end = start + episodesPerPage;
    setDisplayedEpisodes(filteredEpisodes.slice(start, end));
    setPage(newPage);
  };

  // Cálculo del total de páginas
  const totalPages = Math.ceil(filteredEpisodes.length / episodesPerPage);

  // Memo para extraer y ordenar las temporadas únicas numéricamente
  const seasons = useMemo(() => 
    [...new Set(allEpisodes.map(ep => ep.season).filter(Boolean))].sort((a, b) => a - b),
    [allEpisodes]
  );

  // Si hay error, mostramos mensaje de error
  if (error) {
    return <div className="alert alert-error"><span>Error: {error}</span></div>;
  }

  return (
    <div className="p-6">
      
      {/* Título principal de la sección */}
      <h2 className="text-3xl font-bold text-center mb-6 text-yellow-600">
        Episodios de Los Simpsons
      </h2>

      {/* Filtro por temporada */}
      <div className="flex justify-center mb-6">
        <div className="form-control">
          <label className={`label ${loadingAll ? 'opacity-50' : ''}`}>
            <span className="label-text text-yellow-700 font-semibold">
              {loadingAll ? 'Cargando filtros...' : 'Filtrar por temporada'}
            </span>
          </label>
          <select
            className="select select-bordered bg-yellow-50 border-yellow-400 text-yellow-900 focus:border-yellow-500"
            value={selectedSeason}
            onChange={(e) => setSelectedSeason(e.target.value)}
            disabled={loadingAll}
          >
            <option value="all">Todas las temporadas</option>
            {seasons.map(season => (
              <option key={season} value={season}>Temporada {season}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Renderizado condicional según estado de carga */}
      {loading ? (
        // Estado de carga inicial
        <div className="flex justify-center items-center h-64">
          <span className="loading loading-spinner loading-lg text-yellow-500"></span>
        </div>
      ) : (
        // Contenido principal cuando hay datos
        <>
          {/* Cuadrícula de tarjetas de episodios */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedEpisodes.map((episode) => (
              <EpisodeCard key={episode.id} episode={episode} />
            ))}
          </div>

          {/* Mensaje cuando no hay episodios que coincidan con el filtro */}
          {displayedEpisodes.length === 0 && !loading && (
            <div className="text-center py-12">
              <p className="text-yellow-600 text-lg">No se encontraron episodios para esta temporada.</p>
            </div>
          )}
          
          {/* Sistema de paginación */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-8">
              <div className="join">
                <button className="join-item btn bg-yellow-400 hover:bg-yellow-500 text-yellow-900 border-yellow-600" onClick={() => handlePageChange(1)} disabled={page === 1}>««</button>
                <button className="join-item btn bg-yellow-400 hover:bg-yellow-500 text-yellow-900 border-yellow-600" onClick={() => handlePageChange(page - 1)} disabled={page === 1}>«</button>
                <button className="join-item btn bg-yellow-400 hover:bg-yellow-500 text-yellow-900 border-yellow-600">Página {page} de {totalPages}</button>
                <button className="join-item btn bg-yellow-400 hover:bg-yellow-500 text-yellow-900 border-yellow-600" onClick={() => handlePageChange(page + 1)} disabled={page === totalPages}>»</button>
                <button className="join-item btn bg-yellow-400 hover:bg-yellow-500 text-yellow-900 border-yellow-600" onClick={() => handlePageChange(totalPages)} disabled={page === totalPages}>»»</button>
              </div>
            </div>
          )}

          {/* Botón para cargar más episodios */}
          {displayedEpisodes.length < filteredEpisodes.length && (
            <div className="flex justify-center mt-4">
              <button 
                className="btn btn-wide bg-yellow-400 hover:bg-yellow-500 text-yellow-900 border-yellow-600 w-full sm:w-auto"
                onClick={loadMoreEpisodes}
              >
                Cargar más episodios
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default EpisodesSection;