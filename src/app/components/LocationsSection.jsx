/**
 * Componente LocationsSection
 * 
 * Este componente gestiona la sección de ubicaciones de Springfield.
 * Carga datos desde la API, proporciona filtrado por ciudad,
 * paginación y renderizado de tarjetas de ubicación.
 * 
 * @component
 * @returns {JSX.Element} Sección completa de ubicaciones
 */
'use client';

import React, { useState, useEffect, useMemo } from 'react';
import LocationCard from './LocationCard.jsx';

const LocationsSection = () => {
  // Estados para gestionar los datos de ubicaciones
  const [allLocations, setAllLocations] = useState([]);           // Todas las ubicaciones cargadas
  const [displayedLocations, setDisplayedLocations] = useState([]); // Ubicaciones mostradas actualmente
  const [loading, setLoading] = useState(true);                    // Estado de carga inicial
  const [loadingAll, setLoadingAll] = useState(true);              // Estado de carga completa
  const [error, setError] = useState(null);                        // Posible error en la carga
  const [selectedTown, setSelectedTown] = useState('all');         // Ciudad seleccionada para filtrar
  const [page, setPage] = useState(1);                             // Página actual de paginación
  const locationsPerPage = 8;                                      // Ubicaciones por página

  // Efecto para cargar las ubicaciones iniciales al montar el componente
  useEffect(() => {
    const fetchInitialLocations = async () => {
      setLoading(true);
      try {
        // Cargamos la primera página de ubicaciones
        const response = await fetch('https://thesimpsonsapi.com/api/locations?page=1');
        if (!response.ok) throw new Error('Error al cargar las ubicaciones');
        const data = await response.json();
        
        // Establecemos los datos iniciales
        setAllLocations(data.results || []);
        setDisplayedLocations(data.results.slice(0, locationsPerPage) || []);
        setPage(1);
        setLoading(false);
        
        // Iniciamos la carga de las páginas restantes en segundo plano
        fetchAllRemainingLocations(data.pages, data.results || []);
        
      } catch (err) {
        setError(err.message);
        setLoading(false);
        setLoadingAll(false);
      }
    };
    fetchInitialLocations();
  }, []);

  // Función para cargar todas las páginas restantes en segundo plano
  const fetchAllRemainingLocations = async (totalPages, initialLocations) => {
    try {
      let allResults = [...initialLocations];
      
      // Iteramos desde la página 2 hasta la última
      for (let currentPage = 2; currentPage <= totalPages; currentPage++) {
        const response = await fetch(`https://thesimpsonsapi.com/api/locations?page=${currentPage}`);
        if (!response.ok) continue; // Continuamos si hay error en una página
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

  // Memo para calcular las ubicaciones filtradas según la ciudad seleccionada
  const filteredLocations = useMemo(() => {
    return selectedTown === 'all'
      ? allLocations
      : allLocations.filter(loc => loc.town === selectedTown);
  }, [selectedTown, allLocations]);

  // Efecto para actualizar las ubicaciones mostradas cuando cambia el filtro
  useEffect(() => {
    setDisplayedLocations(filteredLocations.slice(0, locationsPerPage));
    setPage(1);
  }, [filteredLocations]);

  // Función para cargar más ubicaciones (paginación progresiva)
  const loadMoreLocations = () => {
    const nextPage = page + 1;
    const newLocations = filteredLocations.slice(0, nextPage * locationsPerPage);
    setDisplayedLocations(newLocations);
    setPage(nextPage);
  };

  // Función para manejar el cambio de página específica
  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return;
    const start = (newPage - 1) * locationsPerPage;
    const end = start + locationsPerPage;
    setDisplayedLocations(filteredLocations.slice(start, end));
    setPage(newPage);
  };

  // Cálculo del total de páginas
  const totalPages = Math.ceil(filteredLocations.length / locationsPerPage);

  // Memo para extraer y ordenar las ciudades únicas
  const towns = useMemo(() => 
    [...new Set(allLocations.map(loc => loc.town).filter(Boolean))].sort(),
    [allLocations]
  );

  // Si hay error, mostramos mensaje de error
  if (error) {
    return <div className="alert alert-error"><span>Error: {error}</span></div>;
  }

  return (
    <div className="p-6">
      
      {/* Título principal de la sección */}
      <h2 className="text-3xl font-bold text-center mb-8 text-yellow-600">
        Ubicaciones de Springfield
      </h2>

      {/* Filtro por ciudad */}
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

      {/* Renderizado condicional según estado de carga */}
      {loading ? (
        // Estado de carga inicial
        <div className="flex justify-center items-center h-64">
          <span className="loading loading-spinner loading-lg text-yellow-500"></span>
        </div>
      ) : (
        // Contenido principal cuando hay datos
        <>
          {/* Cuadrícula de tarjetas de ubicación */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {displayedLocations.map((location) => (
              <LocationCard key={location.id} location={location} />
            ))}
          </div>

          {/* Mensaje cuando no hay ubicaciones que coincidan con el filtro */}
          {displayedLocations.length === 0 && !loading && (
            <div className="text-center py-12">
              <p className="text-yellow-600 text-lg">No se encontraron ubicaciones.</p>
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

          {/* Botón para cargar más ubicaciones */}
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