'use client';
import React, { useState, useEffect } from 'react';
import EpisodeCard from './EpisodeCard.jsx';

const EpisodesSection = () => {
  const [allEpisodes, setAllEpisodes] = useState([]);
  const [displayedEpisodes, setDisplayedEpisodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSeason, setSelectedSeason] = useState('all');
  const [page, setPage] = useState(1);
  const episodesPerPage = 9;

  useEffect(() => {
    fetchAllEpisodes();
  }, []);

  const fetchAllEpisodes = async () => {
    setLoading(true);
    try {
      let allResults = [];
      let currentPage = 1;
      let totalPages = 1;
      do {
        const response = await fetch(`https://thesimpsonsapi.com/api/episodes?page=${currentPage}`);
        if (!response.ok) throw new Error('Error al cargar los episodios');
        const data = await response.json();
        allResults = [...allResults, ...data.results];
        totalPages = data.pages;
        currentPage++;
      } while (currentPage <= totalPages);
      setAllEpisodes(allResults);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };
  
  useEffect(() => {
    const filtered = selectedSeason === 'all'
      ? allEpisodes
      : allEpisodes.filter(ep => ep.season === parseInt(selectedSeason));
    setDisplayedEpisodes(filtered.slice(0, episodesPerPage));
    setPage(1);
  }, [selectedSeason, allEpisodes]);

  const loadMoreEpisodes = () => {
    const nextPage = page + 1;
    const filtered = selectedSeason === 'all'
      ? allEpisodes
      : allEpisodes.filter(ep => ep.season === parseInt(selectedSeason));
    const newEpisodes = filtered.slice(0, nextPage * episodesPerPage);
    setDisplayedEpisodes(newEpisodes);
    setPage(nextPage);
  };

  const seasons = [...new Set(allEpisodes.map(ep => ep.season).filter(Boolean))].sort((a, b) => a - b);
  const filteredCount = (selectedSeason === 'all' ? allEpisodes : allEpisodes.filter(ep => ep.season === parseInt(selectedSeason))).length;

  if (error) {
    return (
      <div className="alert alert-error">
        <span>Error: {error}</span>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-center mb-6 text-yellow-600">
        Episodios de Los Simpsons
      </h2>

      <div className="flex justify-center mb-6">
        <div className="form-control">
          <label className="label">
            <span className="label-text text-yellow-700 font-semibold">Filtrar por temporada</span>
          </label>
          <select
            className="select select-bordered bg-yellow-50 border-yellow-400 text-yellow-900 focus:border-yellow-500"
            value={selectedSeason}
            onChange={(e) => setSelectedSeason(e.target.value)}
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

          {displayedEpisodes.length < filteredCount && (
            <div className="flex justify-center mt-8">
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