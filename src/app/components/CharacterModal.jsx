'use client';
import React from 'react';
import TabManager from './TabManager.jsx';

const CharacterModal = ({ character, isOpen, onClose }) => {
  if (!isOpen || !character) return null;

  const { name, age, gender, occupation, portrait_path, phrases, status, birthdate } = character;

  return (
    <div className="modal modal-open">
      <TabManager />
      <div className="modal-box max-w-4xl bg-gradient-to-br from-yellow-50 to-orange-50 border-4 border-yellow-400">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-yellow-800">{name}</h2>
          <button 
            className="btn btn-circle bg-yellow-400 hover:bg-yellow-500 text-yellow-900 border-yellow-600"
            onClick={onClose}
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"/>
            </svg>
          </button>
        </div>

        <div className="tabs tabs-boxed bg-yellow-100 border-2 border-yellow-400 mb-6">
          <a className="tab tab-active bg-yellow-400 text-yellow-900" data-tab="info">Información</a>
          <a className="tab bg-yellow-200 text-yellow-800 hover:bg-yellow-300" data-tab="phrases">Frases</a>
          <a className="tab bg-yellow-200 text-yellow-800 hover:bg-yellow-300" data-tab="episodes">Episodios</a>
        </div>

        {/* Tab de Información */}
        <div className="tab-content" id="info-tab">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <img 
                src={`https://cdn.thesimpsonsapi.com/500${portrait_path}`}
                alt={name}
                className="rounded-xl w-full h-80 object-cover border-4 border-yellow-400 shadow-lg"
              />
            </div>
            
            <div className="space-y-4">
              <div className="stat bg-gradient-to-r from-yellow-100 to-yellow-200 rounded-xl border-2 border-yellow-400">
                <div className="stat-title text-yellow-800">Estado</div>
                <div className="stat-value text-yellow-900">
                  <span className={`badge ${status === 'Alive' ? 'badge-success' : 'badge-error'} badge-lg`}>
                    {status}
                  </span>
                </div>
              </div>

              {age && (
                <div className="stat bg-gradient-to-r from-blue-100 to-blue-200 rounded-xl border-2 border-blue-400">
                  <div className="stat-title text-blue-800">Edad</div>
                  <div className="stat-value text-blue-900">{age} años</div>
                </div>
              )}

              {gender && (
                <div className="stat bg-gradient-to-r from-purple-100 to-purple-200 rounded-xl border-2 border-purple-400">
                  <div className="stat-title text-purple-800">Género</div>
                  <div className="stat-value text-purple-900">{gender}</div>
                </div>
              )}

              {occupation && (
                <div className="stat bg-gradient-to-r from-green-100 to-green-200 rounded-xl border-2 border-green-400">
                  <div className="stat-title text-green-800">Ocupación</div>
                  <div className="stat-value text-green-900 text-sm">{occupation}</div>
                </div>
              )}

              {birthdate && (
                <div className="stat bg-gradient-to-r from-pink-100 to-pink-200 rounded-xl border-2 border-pink-400">
                  <div className="stat-title text-pink-800">Fecha de Nacimiento</div>
                  <div className="stat-value text-pink-900">{birthdate}</div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Tab de Frases */}
        <div className="tab-content hidden" id="phrases-tab">
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {phrases && phrases.length > 0 ? (
              phrases.map((phrase, index) => (
                <div key={index} className="bg-yellow-100 rounded-lg p-4 border-2 border-yellow-300 hover:border-yellow-400 transition-colors">
                  <div className="flex items-start gap-3">
                    <span className="text-2xl text-yellow-600">💬</span>
                    <p className="text-yellow-900 italic flex-1">"{phrase}"</p>
                    <span className="badge bg-yellow-400 text-yellow-900">#{index + 1}</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <p className="text-yellow-600">No hay frases registradas para este personaje</p>
              </div>
            )}
          </div>
        </div>

        {/* Tab de Episodios */}
        <div className="tab-content hidden" id="episodes-tab">
          <div className="text-center py-8">
            <p className="text-yellow-600 mb-4">Información de episodios próximamente disponible</p>
            <div className="loading loading-spinner loading-lg text-yellow-500"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharacterModal;