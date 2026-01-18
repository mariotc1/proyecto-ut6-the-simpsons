import React from 'react';
import EpisodesSection from './EpisodesSection.jsx';
import LocationsSection from './LocationsSection.jsx';
import QuizSection from './QuizSection.jsx';

const TabContent = ({ activeTab, characters }) => {
  const renderTabContent = () => {
    switch (activeTab) {
      case 'episodes':
        return (
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6">
            <EpisodesSection />
          </div>
        );
      
      case 'locations':
        return (
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6">
            <LocationsSection />
          </div>
        );
      
      case 'quiz':
        return (
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6">
            <QuizSection characters={characters} />
          </div>
        );
      
      default:
        return null;
    }
  };

  return renderTabContent();
};

export default TabContent;