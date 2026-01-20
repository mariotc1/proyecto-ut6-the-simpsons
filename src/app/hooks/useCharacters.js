/**
 * Hook Personalizado useCharacters
 * 
 * Este hook gestiona todo el estado y la lógica relacionada
 * con la carga y manejo de personajes de Los Simpsons desde la API.
 * Proporciona funcionalidades de paginación, carga progresiva
 * y manejo de errores de forma centralizada.
 * 
 * @hook
 * @returns {Object} Objeto con estado y funciones para gestionar personajes
 * @returns {Array} returns.characters - Array de personajes cargados
 * @returns {boolean} returns.loading - Estado de carga actual
 * @returns {string|null} returns.error - Mensaje de error si existe
 * @returns {Object} returns.pagination - Información de paginación
 * @returns {Function} returns.fetchCharacters - Función para cargar personajes específicos
 * @returns {Function} returns.loadMoreCharacters - Función para cargar más personajes
 */
import { useState, useEffect } from 'react';

export const useCharacters = () => {
  // Estados para gestionar los datos de personajes
  const [characters, setCharacters] = useState([]);     // Todos los personajes cargados
  const [loading, setLoading] = useState(true);          // Estado de carga
  const [error, setError] = useState(null);              // Mensaje de error si ocurre
  const [pagination, setPagination] = useState({          // Información de paginación
    currentPage: 1,    // Página actual
    totalPages: 1,    // Total de páginas disponibles
    totalCount: 0      // Total de personajes en la API
  });

  /**
   * Función para obtener personajes desde la API
   * Maneja tanto carga inicial como paginación
   * @param {number} page - Número de página a cargar (default: 1)
   */
  const fetchCharacters = async (page = 1) => {
    try {
      // Iniciamos estado de carga
      setLoading(true);
      
      // Realizamos petición a la API
      const response = await fetch(`https://thesimpsonsapi.com/api/characters?page=${page}`);
      if (!response.ok) {
        throw new Error('Error al cargar los personajes');
      }
      
      // Parseamos la respuesta JSON
      const data = await response.json();
      
      // Actualizamos el estado de personajes
      if (page === 1) {
        // Si es la primera página, reemplazamos todos los personajes
        setCharacters(data.results);
      } else {
        // Si es paginación, añadimos personajes al array existente
        setCharacters(prev => [...prev, ...data.results]);
      }
      
      // Actualizamos información de paginación
      setPagination({
        currentPage: page,
        totalPages: data.pages,
        totalCount: data.count
      });
      
    } catch (err) {
      // En caso de error, actualizamos el estado de error
      setError(err.message);
    } finally {
      // Siempre finalizamos el estado de carga
      setLoading(false);
    }
  };

  // Efecto para cargar los personajes iniciales al montar el hook
  useEffect(() => {
    fetchCharacters();
  }, []);

  /**
   * Función para cargar más personajes (paginación progresiva)
   * Solo carga si no estamos en la última página
   */
  const loadMoreCharacters = () => {
    if (pagination.currentPage < pagination.totalPages) {
      fetchCharacters(pagination.currentPage + 1);
    }
  };

  // Retornamos todos los estados y funciones necesarios
  return {
    characters,            // Array de personajes cargados
    loading,               // Estado de carga
    error,                 // Mensaje de error
    pagination,            // Información de paginación
    fetchCharacters,       // Función para cargar página específica
    loadMoreCharacters     // Función para cargar más personajes
  };
};