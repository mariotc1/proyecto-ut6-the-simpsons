'use client';
import React, { useState } from 'react';
import Header from './Header.jsx';
import ScrollToTopButton from './ScrollToTopButton.jsx';
import SimpsonsBackground from './SimpsonsBackground.jsx';
import CharactersContent from './CharactersContent.jsx';
import TabContent from './TabContent.jsx';
import ErrorMessage from './ErrorMessage.jsx';
import { useCharacters } from '../hooks/useCharacters.js';
import { useFilters } from '../hooks/useFilters.js';

const CharacterGrid = () => {
  const [activeTab, setActiveTab] = useState('characters');
  
  const {
    characters,
    loading,
    error,
    pagination,
    fetchCharacters,
    loadMoreCharacters
  } = useCharacters();

  const {
    filters,
    handleFilterChange,
    applyFilters
  } = useFilters();

  const filteredCharacters = applyFilters(characters);

  if (error) {
    return <ErrorMessage error={error} />;
  }

  return (
    <div className="min-h-screen relative">
      <ScrollToTopButton />
      <SimpsonsBackground />

      {/* Contenido principal sobre el fondo */}
      <div className="relative z-10 min-h-screen flex flex-col">
        <Header activeTab={activeTab} setActiveTab={setActiveTab} />
        
        <div className="container mx-auto px-4 py-8 flex-1">
          {activeTab === 'characters' ? (
            <CharactersContent
              characters={characters}
              loading={loading}
              filteredCharacters={filteredCharacters}
              filters={filters}
              onFilterChange={handleFilterChange}
              pagination={pagination}
              fetchCharacters={fetchCharacters}
              loadMoreCharacters={loadMoreCharacters}
            />
          ) : (
            <TabContent activeTab={activeTab} characters={characters} />
          )}
        </div>
      </div>
    </div>
  );
};

export default CharacterGrid;