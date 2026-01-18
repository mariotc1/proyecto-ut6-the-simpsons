import { useState } from 'react';

export const useFilters = () => {
  const [filters, setFilters] = useState({
    searchTerm: '',
    gender: '',
    status: '',
    occupation: '',
    minAge: '',
    maxAge: ''
  });

  const handleFilterChange = (key, value) => {
    if (key === 'reset') {
      setFilters({
        searchTerm: '',
        gender: '',
        status: '',
        occupation: '',
        minAge: '',
        maxAge: ''
      });
    } else {
      setFilters(prev => ({ ...prev, [key]: value }));
    }
  };

  const applyFilters = (characters) => {
    return Array.isArray(characters) ? characters.filter(character => {
      // Filtro de búsqueda
      const searchMatch = !filters.searchTerm || 
        (character.name && character.name.toLowerCase().includes(filters.searchTerm.toLowerCase())) ||
        (character.occupation && character.occupation.toLowerCase().includes(filters.searchTerm.toLowerCase()));

      // Filtro de género
      const genderMatch = !filters.gender || character.gender === filters.gender;

      // Filtro de estado
      const statusMatch = !filters.status || character.status === filters.status;

      // Filtro de ocupación
      const occupationMatch = !filters.occupation || character.occupation === filters.occupation;

      // Filtro de edad
      let ageMatch = true;
      if (filters.minAge || filters.maxAge) {
        const age = parseInt(character.age);
        if (!isNaN(age)) {
          if (filters.minAge && age < parseInt(filters.minAge)) ageMatch = false;
          if (filters.maxAge && age > parseInt(filters.maxAge)) ageMatch = false;
        } else {
          ageMatch = false; // Si no tiene edad y hay filtro de edad
        }
      }

      return searchMatch && genderMatch && statusMatch && occupationMatch && ageMatch;
    }) : [];
  };

  return {
    filters,
    handleFilterChange,
    applyFilters
  };
};