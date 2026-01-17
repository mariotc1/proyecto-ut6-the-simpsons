'use client';
import React, { useState, useEffect } from 'react';
import EpisodeCard from './EpisodeCard.jsx';

const EpisodesSection = () => {
  const [episodes, setEpisodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSeason, setSelectedSeason] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    fetchEpisodes();
  }, []);

  const fetchEpisodes = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://thesimpsonsapi.com/api/episodes');
      if (!response.ok) {
        throw new Error('Error al cargar los episodios');
      }
      const data = await response.json();
      setEpisodes(data.results || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const seasons = [...new Set(episodes.map(ep => ep.season).filter(Boolean))].sort((a, b) => a - b);
  
  const filteredEpisodes = selectedSeason === 'all' 
    ? episodes 
    : episodes.filter(ep => ep.season === parseInt(selectedSeason));

  const totalPages = Math.ceil(filteredEpisodes.length / itemsPerPage);
  const paginatedEpisodes = filteredEpisodes.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleSeasonChange = (e) => {
    setSelectedSeason(e.target.value);
    setCurrentPage(1);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="loading loading-spinner loading-lg text-yellow-500"></span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-error">
        <span>Error: {error}</span>
      </div>
    );
  }

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6">
      <h2 className="text-3xl font-bold text-center mb-6 text-blue-600">
        Episodios de Los Simpsons
      </h2>

      {/* Filtro de temporadas */}
      <div className="flex justify-center mb-6">
        <div className="form-control">
          <label className="label">
            <span className="label-text text-blue-700 font-semibold">Filtrar por temporada</span>
          </label>
          <select
            className="select select-bordered bg-blue-50 border-blue-400 text-blue-900 focus:border-blue-500"
            value={selectedSeason}
            onChange={handleSeasonChange}
          >
            <option value="all">Todas las temporadas</option>
            {seasons.map(season => (
              <option key={season} value={season}>Temporada {season}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginatedEpisodes.map((episode) => (
          <EpisodeCard key={episode.id} episode={episode} />
        ))}
      </div>

      {filteredEpisodes.length === 0 && (
        <div className="text-center py-12">
          <p className="text-blue-600 text-lg">No se encontraron episodios para esta temporada.</p>
        </div>
      )}

      {/* Paginación */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-8">
          <div className="join">
            <button
              className="join-item btn bg-blue-400 hover:bg-blue-500 text-white border-blue-600"
              onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1}
            >
              ««
            </button>
            <button
              className="join-item btn bg-blue-400 hover:bg-blue-500 text-white border-blue-600"
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              «
            </button>
            <button className="join-item btn bg-blue-400 hover:bg-blue-500 text-white border-blue-600">
              Página {currentPage} de {totalPages}
            </button>
            <button
              className="join-item btn bg-blue-400 hover:bg-blue-500 text-white border-blue-600"
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              »
            </button>
            <button
              className="join-item btn bg-blue-400 hover:bg-blue-500 text-white border-blue-600"
              onClick={() => setCurrentPage(totalPages)}
              disabled={currentPage === totalPages}
            >
              »»
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EpisodesSection;