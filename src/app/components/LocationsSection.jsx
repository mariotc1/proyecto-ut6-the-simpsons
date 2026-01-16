'use client';
import React, { useState, useEffect } from 'react';

const LocationsSection = () => {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);

  useEffect(() => {
    fetchLocations();
  }, []);

  const fetchLocations = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://thesimpsonsapi.com/api/locations');
      if (!response.ok) {
        throw new Error('Error al cargar las ubicaciones');
      }
      const data = await response.json();
      setLocations(data.results || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="loading loading-spinner loading-lg text-green-500"></span>
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
    <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border-4 border-green-400 shadow-lg">
      <h2 className="text-3xl font-bold text-center mb-6 text-green-600">
        Ubicaciones de Springfield
      </h2>

      {/* Mapa interactivo simulado */}
      <div className="bg-gradient-to-br from-green-200 to-green-300 rounded-xl p-8 mb-6 border-4 border-green-500 relative h-64">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-6xl mb-4">🗺️</div>
            <h3 className="text-2xl font-bold text-green-800">Mapa de Springfield</h3>
            <p className="text-green-700">Explora los lugares icónicos</p>
          </div>
        </div>
        
        {/* Puntos de interés simulados */}
        <div className="absolute top-8 left-8 w-8 h-8 bg-red-500 rounded-full animate-pulse cursor-pointer hover:scale-125 transition-transform" title="Planta Nuclear"></div>
        <div className="absolute top-16 right-12 w-8 h-8 bg-yellow-500 rounded-full animate-pulse cursor-pointer hover:scale-125 transition-transform" title="Kwik-E-Mart"></div>
        <div className="absolute bottom-12 left-16 w-8 h-8 bg-blue-500 rounded-full animate-pulse cursor-pointer hover:scale-125 transition-transform" title="Taverna de Moe"></div>
        <div className="absolute bottom-20 right-8 w-8 h-8 bg-pink-500 rounded-full animate-pulse cursor-pointer hover:scale-125 transition-transform" title="Escuela Primaria"></div>
        <div className="absolute top-1/2 left-1/2 w-8 h-8 bg-purple-500 rounded-full animate-pulse cursor-pointer hover:scale-125 transition-transform" title="Casa de los Simpsons"></div>
      </div>

      {/* Grid de ubicaciones */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {locations.map((location, index) => (
          <div key={location.id || index} className="card bg-green-100 shadow-lg border-2 border-green-300 hover:border-green-400 transition-all duration-300 hover:shadow-xl">
            <div className="card-body p-4">
              <h3 className="card-title text-lg text-green-900">
                {location.name || `Ubicación ${index + 1}`}
              </h3>
              
              <div className="flex items-center gap-2 mt-2">
                <span className="text-2xl">📍</span>
                <span className="text-green-700 text-sm">Springfield</span>
              </div>

              {location.description && (
                <p className="text-green-800 mt-2 text-sm line-clamp-2">
                  {location.description}
                </p>
              )}

              <div className="card-actions justify-end mt-4">
                <button 
                  className="btn btn-sm bg-green-400 hover:bg-green-500 text-white border-green-600"
                  onClick={() => setSelectedLocation(location)}
                >
                  Explorar
                </button>
              </div>
            </div>
          </div>
        ))}

        {/* Ubicaciones icónicas predefinidas si la API no tiene datos */}
        {locations.length === 0 && (
          <>
            {[
              { name: 'Planta Nuclear', emoji: '☢️', description: 'Donde Homer trabaja como inspector de seguridad' },
              { name: 'Kwik-E-Mart', emoji: '🏪', description: 'Tienda de conveniencia de Apu' },
              { name: 'Taverna de Moe', emoji: '🍺', description: 'Bar donde Homer se reúne con sus amigos' },
              { name: 'Escuela Primaria', emoji: '🏫', description: 'Donde estudian Bart y Lisa' },
              { name: 'Casa de los Simpsons', emoji: '🏠', description: 'El hogar amarillo familiar' },
              { name: 'Iglesia', emoji: '⛪', description: 'Donde el Reverendo Lovejoy predica' }
            ].map((location, index) => (
              <div key={index} className="card bg-green-100 shadow-lg border-2 border-green-300 hover:border-green-400 transition-all duration-300 hover:shadow-xl">
                <div className="card-body p-4">
                  <div className="flex items-center gap-3">
                    <span className="text-4xl">{location.emoji}</span>
                    <h3 className="card-title text-lg text-green-900">
                      {location.name}
                    </h3>
                  </div>
                  
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-xl">📍</span>
                    <span className="text-green-700 text-sm">Springfield</span>
                  </div>

                  <p className="text-green-800 mt-2 text-sm">
                    {location.description}
                  </p>

                  <div className="card-actions justify-end mt-4">
                    <button 
                      className="btn btn-sm bg-green-400 hover:bg-green-500 text-white border-green-600"
                      onClick={() => setSelectedLocation(location)}
                    >
                      Explorar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </>
        )}
      </div>

      {/* Modal de detalles de ubicación */}
      {selectedLocation && (
        <div className="modal modal-open">
          <div className="modal-box max-w-2xl bg-gradient-to-br from-green-50 to-emerald-50 border-4 border-green-400">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-green-800">{selectedLocation.name}</h2>
              <button 
                className="btn btn-circle bg-green-400 hover:bg-green-500 text-white border-green-600"
                onClick={() => setSelectedLocation(null)}
              >
                ✕
              </button>
            </div>
            
            <div className="text-center py-8">
              <div className="text-8xl mb-4">
                {selectedLocation.emoji || '📍'}
              </div>
              <p className="text-green-700">
                {selectedLocation.description || 'Una ubicación icónica de Springfield'}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LocationsSection;