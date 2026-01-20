/**
 * Componente CharacterGrid
 * 
 * Este es el componente principal que gestiona la cuadrícula de personajes de Los Simpsons.
 * Controla la navegación por pestañas, carga de datos, filtrado y renderizado del contenido.
 * 
 * @component
 * @returns {JSX.Element} Layout principal de la aplicación
 */
'use client';

import React, { useState } from 'react';

// Importaciones de componentes de la aplicación
import Header from './Header.jsx';
import ScrollToTopButton from './ScrollToTopButton.jsx';
import SimpsonsBackground from './SimpsonsBackground.jsx';
import CharactersContent from './CharactersContent.jsx';
import TabContent from './TabContent.jsx';
import ErrorMessage from './ErrorMessage.jsx';

// Importaciones de hooks personalizados
import { useCharacters } from '../hooks/useCharacters.js';
import { useFilters } from '../hooks/useFilters.js';

const CharacterGrid = () => {
  // Estado para controlar la pestaña activa en la navegación
  const [activeTab, setActiveTab] = useState('characters');
  
  // Hook personalizado para gestionar los datos de personajes
  const {
    characters,        // Array de personajes cargados
    loading,           // Estado de carga
    error,             // Posible error en la carga
    pagination,        // Información de paginación
    fetchCharacters,   // Función para cargar personajes
    loadMoreCharacters // Función para cargar más personajes
  } = useCharacters();

  // Hook personalizado para gestionar el filtrado de personajes
  const {
    filters,           // Filtros aplicados
    handleFilterChange, // Función para manejar cambios en filtros
    applyFilters       // Función para aplicar filtros al array
  } = useFilters();

  // Aplicamos los filtros a los personajes para obtener el array filtrado
  const filteredCharacters = applyFilters(characters);

  // Si hay un error, mostramos el componente de error
  if (error) {
    return <ErrorMessage error={error} />;
  }

  return (
    // Contenedor principal con altura mínima de pantalla
    <div className="min-h-screen relative">
      
      {/* Botón para volver arriba de la página */}
      <ScrollToTopButton />
      
      {/* Fondo temático de Los Simpsons */}
      <SimpsonsBackground />

      {/* 
        Contenido principal posicionado sobre el fondo.
        Usamos z-10 para asegurar que esté por encima del fondo.
      */}
      <div className="relative z-10 min-h-screen flex flex-col">
        
        {/* Cabecera con navegación por pestañas */}
        <Header activeTab={activeTab} setActiveTab={setActiveTab} />
        
        {/* 
          Contenedor principal del contenido.
          flex-1 para que ocupe todo el espacio disponible.
        */}
        <div className="container mx-auto px-4 py-8 flex-1">
          
          {/* Renderizado condicional según la pestaña activa */}
          {activeTab === 'characters' ? (
            // Contenido de personajes con todas sus funcionalidades
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
            // Otras pestañas (episodios, ubicaciones, etc.)
            <TabContent activeTab={activeTab} characters={characters} />
          )}
        </div>
      </div>
    </div>
  );
};

export default CharacterGrid;