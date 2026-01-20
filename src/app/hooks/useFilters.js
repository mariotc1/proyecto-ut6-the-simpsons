/**
 * Hook Personalizado useFilters
 * 
 * Este hook gestiona el estado de los filtros para los personajes
 * y proporciona funciones para aplicar filtros múltiples sobre
 * el array de personajes. Soporta búsqueda por texto, género,
 * estado, ocupación y rango de edad.
 * 
 * @hook
 * @returns {Object} Objeto con estado y funciones para gestionar filtros
 * @returns {Object} returns.filters - Estado actual de los filtros
 * @returns {Function} returns.handleFilterChange - Función para actualizar filtros
 * @returns {Function} returns.applyFilters - Función para aplicar filtros a personajes
 */
import { useState } from 'react';

export const useFilters = () => {
  // Estado para almacenar todos los filtros activos
  const [filters, setFilters] = useState({
    searchTerm: '',    // Término de búsqueda (nombre u ocupación)
    gender: '',        // Filtro por género (Male/Female)
    status: '',        // Filtro por estado (Alive/Deceased)
    occupation: '',    // Filtro por ocupación específica
    minAge: '',        // Edad mínima del rango
    maxAge: ''         // Edad máxima del rango
  });

  /**
   * Función para manejar cambios en los filtros
   * Soporta actualización individual y reset completo
   * @param {string} key - Clave del filtro a actualizar
   * @param {string|boolean} value - Nuevo valor del filtro
   */
  const handleFilterChange = (key, value) => {
    if (key === 'reset') {
      // Si key es 'reset', reiniciamos todos los filtros a su estado inicial
      setFilters({
        searchTerm: '',
        gender: '',
        status: '',
        occupation: '',
        minAge: '',
        maxAge: ''
      });
    } else {
      // Actualizamos solo el filtro específico usando spread operator
      setFilters(prev => ({ ...prev, [key]: value }));
    }
  };

  /**
   * Función para aplicar todos los filtros activos sobre un array de personajes
   * Realiza filtrado múltiple según los criterios activos
   * @param {Array} characters - Array de personajes a filtrar
   * @returns {Array} Array de personajes filtrados según los criterios activos
   */
  const applyFilters = (characters) => {
    // Verificamos que characters sea un array válido
    return Array.isArray(characters) ? characters.filter(character => {
      
      // FILTRO DE BÚSQUEDA POR TEXTO
      // Busca coincidencias en nombre u ocupación (case insensitive)
      const searchMatch = !filters.searchTerm || 
        (character.name && character.name.toLowerCase().includes(filters.searchTerm.toLowerCase())) ||
        (character.occupation && character.occupation.toLowerCase().includes(filters.searchTerm.toLowerCase()));

      // FILTRO POR GÉNERO
      // Coincidencia exacta con el género seleccionado
      const genderMatch = !filters.gender || character.gender === filters.gender;

      // FILTRO POR ESTADO  
      // Coincidencia exacta con el estado seleccionado
      const statusMatch = !filters.status || character.status === filters.status;

      // FILTRO POR OCUPACIÓN
      // Coincidencia exacta con la ocupación seleccionada
      const occupationMatch = !filters.occupation || character.occupation === filters.occupation;

      // FILTRO POR RANGO DE EDAD
      let ageMatch = true;
      if (filters.minAge || filters.maxAge) {
        // Parseamos la edad del personaje a número
        const age = parseInt(character.age);
        if (!isNaN(age)) {
          // Verificamos que la edad esté dentro del rango especificado
          if (filters.minAge && age < parseInt(filters.minAge)) ageMatch = false;
          if (filters.maxAge && age > parseInt(filters.maxAge)) ageMatch = false;
        } else {
          // Si el personaje no tiene edad y hay filtros de edad, no coincide
          ageMatch = false;
        }
      }

      // El personaje debe coincidir con TODOS los filtros activos
      return searchMatch && genderMatch && statusMatch && occupationMatch && ageMatch;
    }) : [];
  };

  // Retornamos el estado y las funciones para que los componentes las utilicen
  return {
    filters,              // Estado actual de los filtros
    handleFilterChange,    // Función para modificar filtros
    applyFilters          // Función para aplicar filtros a personajes
  };
};