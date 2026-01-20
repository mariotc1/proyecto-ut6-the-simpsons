/**
 * Componente StatsCard
 * 
 * Tarjeta animada para mostrar estadísticas con conteo progresivo.
 * Utiliza Framer Motion para animaciones de entrada y
 * requestAnimationFrame para el conteo numérico suave.
 * 
 * @component
 * @param {Object} props - Propiedades del componente
 * @param {string} props.title - Título de la estadística
 * @param {number} props.value - Valor final a mostrar
 * @param {string} props.color - Clase CSS de gradiente de color
 * @param {JSX.Element} props.icon - Icono a mostrar
 * @param {number} props.delay - Retraso de animación en segundos
 * @returns {JSX.Element} Tarjeta de estadística animada
 */
'use client';

import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const StatsCard = ({ title, value, color, icon, delay }) => {
  // Estado para el valor animado del contador
  const [count, setCount] = useState(0);
  
  // Controladores de animación de Framer Motion
  const controls = useAnimation();
  
  // Hook para detectar cuando el componente es visible en pantalla
  const [ref, inView] = useInView({
    triggerOnce: true,    // La animación se ejecuta solo una vez
    threshold: 0.1,       // Se activa cuando el 10% del componente es visible
  });

  // Efecto para iniciar la animación de entrada cuando el componente es visible
  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  // Efecto para animar el conteo numérico cuando el componente es visible
  useEffect(() => {
    if (inView) {
      /**
       * Función de animación para el conteo progresivo
       * Utiliza requestAnimationFrame para un rendimiento óptimo
       */
      const animation = () => {
        const duration = 2000; // Duración total de la animación en milisegundos
        const start = 0;       // Valor inicial
        const end = value;     // Valor final
        const range = end - start; // Rango total a animar
        let startTime = null;  // Tiempo de inicio de la animación

        /**
         * Función de step para cada frame de la animación
         * @param {number} timestamp - Tiempo actual proporcionado por requestAnimationFrame
         */
        const step = (timestamp) => {
          if (!startTime) startTime = timestamp;
          
          // Calculamos el progreso de la animación (0 a 1)
          const progress = Math.min((timestamp - startTime) / duration, 1);
          
          // Actualizamos el contador con el valor interpolado
          setCount(Math.floor(progress * range + start));
          
          // Continuamos la animación si no ha terminado
          if (progress < 1) {
            requestAnimationFrame(step);
          }
        };

        // Iniciamos la animación
        requestAnimationFrame(step);
      };
      
      animation();
    }
  }, [value, inView]);

  // Variantes de animación para la entrada de la tarjeta
  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 50  // Comienza 50px abajo de su posición final
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,           // Duración de la animación
        delay: delay * 0.1,       // Retraso basado en el prop delay
        ease: 'easeOut',          // Función de easing suave
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      variants={cardVariants}
      initial="hidden"
      animate={controls}
      className={`card bg-gradient-to-br ${color} rounded-2xl border-2 border-yellow-400 shadow-lg p-4`}
    >
      <div className="flex items-center space-x-4">
        
        {/* Icono de la estadística */}
        <div className="flex-shrink-0 text-yellow-900">{icon}</div>
        
        {/* Contenido de la estadística */}
        <div className="flex-1">
          <div className="stat-title text-yellow-800">{title}</div>
          
          {/* Valor animado del contador */}
          <div className="stat-value text-yellow-900 font-bold text-3xl">
            {count}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default StatsCard;
