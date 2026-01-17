'use client';
import React, { useState, useEffect } from 'react';
import LocationCard from './LocationCard.jsx';

const LocationsSection = () => {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
  });

  useEffect(() => {
    fetchLocations(1);
  }, []);

  const fetchLocations = async (page = 1) => {
    try {
      setLoading(true);
      const response = await fetch(`https://thesimpsonsapi.com/api/locations?page=${page}`);
      if (!response.ok) {
        throw new Error('Error al cargar las ubicaciones');
      }
      const data = await response.json();
      if (page === 1) {
        setLocations(data.results || []);
      } else {
        setLocations(prev => [...prev, ...(data.results || [])]);
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

  const loadMoreLocations = () => {
    if (pagination.currentPage < pagination.totalPages) {
      fetchLocations(pagination.currentPage + 1);
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      setLocations([]); // Clear existing locations before fetching new page
      fetchLocations(newPage);
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
        Ubicaciones de Springfield
      </h2>

      {loading && locations.length === 0 ? (
        <div className="flex justify-center items-center h-64">
          <span className="loading loading-spinner loading-lg text-yellow-500"></span>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {locations.map((location) => (
              <LocationCard key={location.id} location={location} />
            ))}
          </div>

          {locations.length === 0 && !loading && (
            <div className="text-center py-12">
              <p className="text-yellow-600 text-lg">No se encontraron ubicaciones.</p>
            </div>
          )}

          {/* Paginación */}
          {pagination.totalPages > 1 && (
            <div className="flex justify-center mt-8">
              <div className="join">
                <button
                  className="join-item btn bg-yellow-400 hover:bg-yellow-500 text-yellow-900 border-yellow-600"
                  onClick={() => handlePageChange(1)}
                  disabled={pagination.currentPage === 1 && locations.length > 20}
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
                onClick={loadMoreLocations}
                disabled={loading}
              >
                {loading && locations.length > 0 ? (
                  <span className="loading loading-spinner"></span>
                ) : (
                  'Cargar más ubicaciones'
                )}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default LocationsSection;