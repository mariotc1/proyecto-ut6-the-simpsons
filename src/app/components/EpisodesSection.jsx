'use client';
import React, { useState, useEffect, useMemo } from 'react';
import EpisodeCard from './EpisodeCard.jsx';

const EpisodesSection = () => {
  const [allEpisodes, setAllEpisodes] = useState([]);
  const [displayedEpisodes, setDisplayedEpisodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingAll, setLoadingAll] = useState(true); // To track background fetching
  const [error, setError] = useState(null);
  const [selectedSeason, setSelectedSeason] = useState('all');
  const [page, setPage] = useState(1);
  const episodesPerPage = 9;

  // 1. Initial fast load
  useEffect(() => {
    fetchInitialEpisodes();
  }, []);

  const fetchInitialEpisodes = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://thesimpsonsapi.com/api/episodes?page=1');
      if (!response.ok) throw new Error('Error al cargar los episodios');
      const data = await response.json();
      setAllEpisodes(data.results || []);
      setDisplayedEpisodes(data.results.slice(0, episodesPerPage) || []);
      setPage(1);
      setLoading(false);
      // 2. Asynchronous full data fetch
      fetchAllRemainingEpisodes(data.pages, data.results || []);
    } catch (err) {
      setError(err.message);
      setLoading(false);
      setLoadingAll(false);
    }
  };

  const fetchAllRemainingEpisodes = async (totalPages, initialEpisodes) => {
    try {
      let allResults = [...initialEpisodes];
      for (let currentPage = 2; currentPage <= totalPages; currentPage++) {
        const response = await fetch(`https://thesimpsonsapi.com/api/episodes?page=${currentPage}`);
        if (!response.ok) continue; // Or handle error more gracefully
        const data = await response.json();
        allResults.push(...(data.results || []));
      }
      setAllEpisodes(allResults);
      setLoadingAll(false); // All data is now loaded
    } catch (err) {
      // Silently fail or show a small toast notification
      console.error("Failed to fetch all episodes in background:", err);
      setLoadingAll(false);
    }
  };
  
  const filteredEpisodes = useMemo(() => {
    return selectedSeason === 'all'
      ? allEpisodes
      : allEpisodes.filter(ep => ep.season === parseInt(selectedSeason));
  }, [selectedSeason, allEpisodes]);

  useEffect(() => {
    setDisplayedEpisodes(filteredEpisodes.slice(0, episodesPerPage));
    setPage(1);
  }, [filteredEpisodes]);

  const loadMoreEpisodes = () => {
    const nextPage = page + 1;
    const newEpisodes = filteredEpisodes.slice(0, nextPage * episodesPerPage);
    setDisplayedEpisodes(newEpisodes);
    setPage(nextPage);
  };

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return;
    const start = (newPage - 1) * episodesPerPage;
    const end = start + episodesPerPage;
    setDisplayedEpisodes(filteredEpisodes.slice(start, end));
    setPage(newPage);
  };

  const totalPages = Math.ceil(filteredEpisodes.length / episodesPerPage);

  const seasons = useMemo(() => 
    [...new Set(allEpisodes.map(ep => ep.season).filter(Boolean))].sort((a, b) => a - b),
    [allEpisodes]
  );

  if (error) {
    return <div className="alert alert-error"><span>Error: {error}</span></div>;
  }

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-center mb-6 text-yellow-600">
        Episodios de Los Simpsons
      </h2>

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

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <span className="loading loading-spinner loading-lg text-yellow-500"></span>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedEpisodes.map((episode) => (
              <EpisodeCard key={episode.id} episode={episode} />
            ))}
          </div>

          {displayedEpisodes.length === 0 && !loading && (
            <div className="text-center py-12">
              <p className="text-yellow-600 text-lg">No se encontraron episodios para esta temporada.</p>
            </div>
          )}
          
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