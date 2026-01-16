'use client';
import React, { useEffect } from 'react';

const TabManager = () => {
  useEffect(() => {
    const handleTabClick = (e) => {
      if (e.target.dataset.tab) {
        // Remover clase activa de todos los tabs
        document.querySelectorAll('.tab').forEach(tab => {
          tab.classList.remove('tab-active', 'bg-yellow-400', 'text-yellow-900');
          tab.classList.add('bg-yellow-200', 'text-yellow-800');
        });
        
        // Añadir clase activa al tab seleccionado
        e.target.classList.add('tab-active', 'bg-yellow-400', 'text-yellow-900');
        e.target.classList.remove('bg-yellow-200', 'text-yellow-800');
        
        // Ocultar todo el contenido
        document.querySelectorAll('.tab-content').forEach(content => {
          content.classList.add('hidden');
        });
        
        // Mostrar el contenido correspondiente
        const targetTab = document.getElementById(`${e.target.dataset.tab}-tab`);
        if (targetTab) {
          targetTab.classList.remove('hidden');
        }
      }
    };

    // Añadir event listeners a todos los tabs
    document.querySelectorAll('.tab[data-tab]').forEach(tab => {
      tab.addEventListener('click', handleTabClick);
    });

    // Limpiar event listeners
    return () => {
      document.querySelectorAll('.tab[data-tab]').forEach(tab => {
        tab.removeEventListener('click', handleTabClick);
      });
    };
  }, []);

  return null;
};

export default TabManager;