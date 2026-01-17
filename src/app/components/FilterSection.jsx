'use client';
import React from 'react';

const FilterSection = ({ filters, onFilterChange, characters }) => {
  const genders = [...new Set(characters.map(c => c.gender).filter(Boolean))];
  const statuses = [...new Set(characters.map(c => c.status).filter(Boolean))];
  const occupations = [...new Set(characters.map(c => c.occupation).filter(Boolean))].slice(0, 10);

  return (
    <div className="bg-yellow-50 rounded-2xl p-6 mb-8 border-2 border-yellow-400 shadow-lg">
      <h3 className="text-xl font-bold text-yellow-800 mb-4">Filtros Avanzados</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Búsqueda por nombre */}
        <div className="form-control">
          <label className="label">
            <span className="label-text text-yellow-700 font-semibold">Buscar nombre</span>
          </label>
          <input
            type="text"
            placeholder="Ej: Homer Simpson"
            className="input input-bordered bg-yellow-50 border-yellow-400 text-yellow-900 placeholder-yellow-600 focus:border-yellow-500"
            value={filters.searchTerm}
            onChange={(e) => onFilterChange('searchTerm', e.target.value)}
          />
        </div>

        {/* Filtro por género */}
        <div className="form-control">
          <label className="label">
            <span className="label-text text-yellow-700 font-semibold">Género</span>
          </label>
          <select
            className="select select-bordered bg-yellow-50 border-yellow-400 text-yellow-900 focus:border-yellow-500"
            value={filters.gender}
            onChange={(e) => onFilterChange('gender', e.target.value)}
          >
            <option value="">Todos</option>
            {genders.map(gender => (
              <option key={gender} value={gender}>{gender}</option>
            ))}
          </select>
        </div>

        {/* Filtro por estado */}
        <div className="form-control">
          <label className="label">
            <span className="label-text text-yellow-700 font-semibold">Estado</span>
          </label>
          <select
            className="select select-bordered bg-yellow-50 border-yellow-400 text-yellow-900 focus:border-yellow-500"
            value={filters.status}
            onChange={(e) => onFilterChange('status', e.target.value)}
          >
            <option value="">Todos</option>
            {statuses.map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
        </div>

        {/* Filtro por ocupación */}
        <div className="form-control">
          <label className="label">
            <span className="label-text text-yellow-700 font-semibold">Ocupación</span>
          </label>
          <select
            className="select select-bordered bg-yellow-50 border-yellow-400 text-yellow-900 focus:border-yellow-500"
            value={filters.occupation}
            onChange={(e) => onFilterChange('occupation', e.target.value)}
          >
            <option value="">Todas</option>
            {occupations.map(occupation => (
              <option key={occupation} value={occupation}>{occupation}</option>
            ))}
          </select>
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text text-yellow-700 font-semibold">Limpiar filtros</span>
          </label>
          <button
            className="btn bg-yellow-400 hover:bg-yellow-500 text-yellow-900 border-yellow-600"
            onClick={() => onFilterChange('reset', true)}
          >
            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd"/>
            </svg>
            Resetear
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterSection;