/**
 * Componente TabContent
 * 
 * Componente que gestiona el contenido de las diferentes pestañas
 * de la aplicación (Episodios, Ubicaciones, Quiz).
 * Renderiza el componente correspondiente según la pestaña activa.
 * 
 * @component
 * @param {Object} props - Propiedades del componente
 * @param {string} props.activeTab - ID de la pestaña activa
 * @param {Array} props.characters - Array de personajes (necesario para el Quiz)
 * @returns {JSX.Element} Contenido de la pestaña activa
 */
import React from 'react';

// Importaciones de los componentes de contenido
import EpisodesSection from './EpisodesSection.jsx';
import LocationsSection from './LocationsSection.jsx';
import QuizSection from './QuizSection.jsx';

const TabContent = ({ activeTab, characters }) => {
  /**
   * Función que renderiza el contenido según la pestaña activa
   * @returns {JSX.Element|null} Componente correspondiente o null
   */
  const renderTabContent = () => {
    switch (activeTab) {
      case 'episodes':
        // Contenido para la pestaña de Episodios
        return (
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6">
            <EpisodesSection />
          </div>
        );
      
      case 'locations':
        // Contenido para la pestaña de Ubicaciones
        return (
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6">
            <LocationsSection />
          </div>
        );
      
      case 'quiz':
        // Contenido para la pestaña de Quiz (necesita los personajes)
        return (
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6">
            <QuizSection characters={characters} />
          </div>
        );
      
      default:
        // Si no hay pestaña activa o no es reconocida
        return null;
    }
  };

  // Renderizamos el contenido de la pestaña activa
  return renderTabContent();
};

export default TabContent;