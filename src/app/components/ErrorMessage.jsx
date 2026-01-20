/**
 * Componente ErrorMessage
 * 
 * Componente reutilizable para mostrar mensajes de error en la aplicación.
 * Utiliza los estilos de alerta de DaisyUI con icono de advertencia.
 * 
 * @component
 * @param {Object} props - Propiedades del componente
 * @param {string} props.error - Mensaje de error a mostrar
 * @returns {JSX.Element} Alerta de error estilizada
 */
import React from 'react';

const ErrorMessage = ({ error }) => {
  return (
    // Alerta de error con estilos de DaisyUI
    <div className="alert alert-error">
      
      {/* Icono de advertencia/cancelación */}
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        className="stroke-current shrink-0 h-6 w-6" 
        fill="none" 
        viewBox="0 0 24 24"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth="2" 
          d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" 
        />
      </svg>
      
      {/* Mensaje de error */}
      <span>Error: {error}</span>
    </div>
  );
};

export default ErrorMessage;