'use client';
import React, { useState, useEffect } from 'react';

const EpisodesSection = () => {
  const [episodes, setEpisodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSeason, setSelectedSeason] = useState('all');

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
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border-4 border-blue-400 shadow-lg">
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
            onChange={(e) => setSelectedSeason(e.target.value)}
          >
            <option value="all">Todas las temporadas</option>
            {seasons.map(season => (
              <option key={season} value={season}>Temporada {season}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Timeline de episodios */}
      <div className="space-y-4 max-h-96 overflow-y-auto">
        {filteredEpisodes.map((episode, index) => (
          <div key={episode.id || index} className="timeline-item">
            <div className="card bg-blue-100 shadow-lg border-2 border-blue-300 hover:border-blue-400 transition-all duration-300">
              <div className="card-body p-4">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-blue-400 rounded-full flex items-center justify-center text-white font-bold">
                      {episode.episode_number || index + 1}
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="card-title text-lg text-blue-900">
                      {episode.title || `Episodio ${index + 1}`}
                    </h3>
                    
                    <div className="flex flex-wrap gap-2 mt-2">
                      {episode.season && (
                        <span className="badge bg-blue-400 text-white">
                          Temporada {episode.season}
                        </span>
                      )}
                      {episode.air_date && (
                        <span className="badge bg-indigo-400 text-white">
                          {new Date(episode.air_date).toLocaleDateString()}
                        </span>
                      )}
                    </div>

                    {episode.synopsis && (
                      <p className="text-blue-800 mt-2 text-sm line-clamp-2">
                        {episode.synopsis}
                      </p>
                    )}
                  </div>

                  <div className="flex-shrink-0">
                    <button className="btn btn-sm bg-blue-400 hover:bg-blue-500 text-white border-blue-600">
                      Ver
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredEpisodes.length === 0 && (
        <div className="text-center py-8">
          <p className="text-blue-600">No se encontraron episodios</p>
        </div>
      )}
    </div>
  );
};

export default EpisodesSection;