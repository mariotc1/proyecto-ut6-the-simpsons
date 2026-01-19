'use client';
import React, { useState, useEffect, useMemo } from 'react';
import LocationCard from './LocationCard.jsx';

const LocationsSection = () => {
  const [allLocations, setAllLocations] = useState([]);
  const [displayedLocations, setDisplayedLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingAll, setLoadingAll] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTown, setSelectedTown] = useState('all');
  const [page, setPage] = useState(1);
  const locationsPerPage = 8;

  useEffect(() => {
    const fetchInitialLocations = async () => {
      setLoading(true);
      try {
        const response = await fetch('https://thesimpsonsapi.com/api/locations?page=1');
        if (!response.ok) throw new Error('Error al cargar las ubicaciones');
        const data = await response.json();
        setAllLocations(data.results || []);
        setDisplayedLocations(data.results.slice(0, locationsPerPage) || []);
        setPage(1);
        setLoading(false);
        fetchAllRemainingLocations(data.pages, data.results || []);
        
      } catch (err) {
        setError(err.message);
        setLoading(false);
        setLoadingAll(false);
      }
    };
    fetchInitialLocations();
  }, []);

  const fetchAllRemainingLocations = async (totalPages, initialLocations) => {
    try {
      let allResults = [...initialLocations];
      for (let currentPage = 2; currentPage <= totalPages; currentPage++) {
        const response = await fetch(`https://thesimpsonsapi.com/api/locations?page=${currentPage}`);
        if (!response.ok) continue;
        const data = await response.json();
        allResults.push(...(data.results || []));
      }
      setAllLocations(allResults);
      setLoadingAll(false);
    } catch (err) {
      console.error("Failed to fetch all locations in background:", err);
      setLoadingAll(false);
    }
  };

  const filteredLocations = useMemo(() => {
    return selectedTown === 'all'
      ? allLocations
      : allLocations.filter(loc => loc.town === selectedTown);
  }, [selectedTown, allLocations]);

  useEffect(() => {
    setDisplayedLocations(filteredLocations.slice(0, locationsPerPage));
    setPage(1);
  }, [filteredLocations]);

  const loadMoreLocations = () => {
    const nextPage = page + 1;
    const newLocations = filteredLocations.slice(0, nextPage * locationsPerPage);
    setDisplayedLocations(newLocations);
    setPage(nextPage);
  };

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return;
    const start = (newPage - 1) * locationsPerPage;
    const end = start + locationsPerPage;
    setDisplayedLocations(filteredLocations.slice(start, end));
    setPage(newPage);
  };

  const totalPages = Math.ceil(filteredLocations.length / locationsPerPage);

  const towns = useMemo(() => 
    [...new Set(allLocations.map(loc => loc.town).filter(Boolean))].sort(),
    [allLocations]
  );

  if (error) {
    return <div className="alert alert-error"><span>Error: {error}</span></div>;
  }

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-center mb-8 text-yellow-600">
        Ubicaciones de Springfield
      </h2>

      <div className="flex justify-center mb-6">
        <div className="form-control">
          <label className={`label ${loadingAll ? 'opacity-50' : ''}`}>
            <span className="label-text text-yellow-700 font-semibold">
              {loadingAll ? 'Cargando filtros...' : 'Filtrar por ciudad'}
            </span>
          </label>
          <select
            className="select select-bordered bg-yellow-50 border-yellow-400 text-yellow-900 focus:border-yellow-500"
            value={selectedTown}
            onChange={(e) => setSelectedTown(e.target.value)}
            disabled={loadingAll}
          >
            <option value="all">Todas las ciudades</option>
            {towns.map(town => (
              <option key={town} value={town}>{town}</option>
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {displayedLocations.map((location) => (
              <LocationCard key={location.id} location={location} />
            ))}
          </div>

          {displayedLocations.length === 0 && !loading && (
            <div className="text-center py-12">
              <p className="text-yellow-600 text-lg">No se encontraron ubicaciones.</p>
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

          {displayedLocations.length < filteredLocations.length && (
            <div className="flex justify-center mt-4">
              <button 
                className="btn btn-wide bg-yellow-400 hover:bg-yellow-500 text-yellow-900 border-yellow-600 w-full sm:w-auto"
                onClick={loadMoreLocations}
              >
                Cargar más ubicaciones
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default LocationsSection;