import { useState, useEffect } from 'react';

export const useCharacters = () => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalCount: 0
  });

  const fetchCharacters = async (page = 1) => {
    try {
      setLoading(true);
      const response = await fetch(`https://thesimpsonsapi.com/api/characters?page=${page}`);
      if (!response.ok) {
        throw new Error('Error al cargar los personajes');
      }
      const data = await response.json();
      
      if (page === 1) {
        setCharacters(data.results);
      } else {
        setCharacters(prev => [...prev, ...data.results]);
      }
      
      setPagination({
        currentPage: page,
        totalPages: data.pages,
        totalCount: data.count
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCharacters();
  }, []);

  const loadMoreCharacters = () => {
    if (pagination.currentPage < pagination.totalPages) {
      fetchCharacters(pagination.currentPage + 1);
    }
  };

  return {
    characters,
    loading,
    error,
    pagination,
    fetchCharacters,
    loadMoreCharacters
  };
};