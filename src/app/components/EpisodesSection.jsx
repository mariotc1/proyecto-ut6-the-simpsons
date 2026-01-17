'use client';
import React, { useState, useEffect } from 'react';
import EpisodeCard from './EpisodeCard.jsx';

const EpisodesSection = () => {
  const [episodes, setEpisodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
  });

  useEffect(() => {
    fetchEpisodes(1);
  }, []);

  const fetchEpisodes = async (page = 1) => {
    try {
      setLoading(true);
      const response = await fetch(`https://thesimpsonsapi.com/api/episodes?page=${page}`);
      if (!response.ok) {
        throw new Error('Error al cargar los episodios');
      }
      const data = await response.json();
      if (page === 1) {
        setEpisodes(data.results || []);
      } else {
        setEpisodes(prev => [...prev, ...(data.results || [])]);
      }
      setPagination({
        currentPage: page,
        totalPages: data.pages || 1,
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      setEpisodes([]); // Clear existing episodes before fetching new page
      fetchEpisodes(newPage);
    }
  };

  const loadMoreEpisodes = () => {
    if (pagination.currentPage < pagination.totalPages) {
      fetchEpisodes(pagination.currentPage + 1);
    }
  };

  if (error) {
    return (
      <div className="alert alert-error">
        <span>Error: {error}</span>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-center mb-8 text-yellow-600">
        Episodios de Los Simpsons
      </h2>

      {loading && episodes.length === 0 ? (
        <div className="flex justify-center items-center h-64">
          <span className="loading loading-spinner loading-lg text-yellow-500"></span>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {episodes.map((episode) => (
              <EpisodeCard key={episode.id} episode={episode} />
            ))}
          </div>

          {episodes.length === 0 && !loading && (
            <div className="text-center py-12">
              <p className="text-yellow-600 text-lg">No se encontraron episodios.</p>
            </div>
          )}

          {/* Paginación */}
          {pagination.totalPages > 1 && (
            <div className="flex justify-center mt-8">
              <div className="join">
                <button
                  className="join-item btn bg-yellow-400 hover:bg-yellow-500 text-yellow-900 border-yellow-600"
                  onClick={() => handlePageChange(1)}
                  disabled={pagination.currentPage === 1 && episodes.length > 20}
                >
                  ««
                </button>
                <button
                  className="join-item btn bg-yellow-400 hover:bg-yellow-500 text-yellow-900 border-yellow-600"
                  onClick={() => handlePageChange(pagination.currentPage - 1)}
                  disabled={pagination.currentPage === 1}
                >
                  «
                </button>
                <button className="join-item btn bg-yellow-400 hover:bg-yellow-500 text-yellow-900 border-yellow-600">
                  Página {pagination.currentPage} de {pagination.totalPages}
                </button>
                <button
                  className="join-item btn bg-yellow-400 hover:bg-yellow-500 text-yellow-900 border-yellow-600"
                  onClick={() => handlePageChange(pagination.currentPage + 1)}
                  disabled={pagination.currentPage === pagination.totalPages}
                >
                  »
                </button>
                <button
                  className="join-item btn bg-yellow-400 hover:bg-yellow-500 text-yellow-900 border-yellow-600"
                  onClick={() => handlePageChange(pagination.totalPages)}
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
                onClick={loadMoreEpisodes}
                disabled={loading && episodes.length > 0}
              >
                {loading && episodes.length > 0 ? (
                  <span className="loading loading-spinner"></span>
                ) : (
                  'Cargar más episodios'
                )}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default EpisodesSection;