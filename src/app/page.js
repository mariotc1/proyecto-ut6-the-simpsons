/**
 * Componente Home (Página Principal)
 * 
 * Página principal de la aplicación que renderiza el componente
 * CharacterGrid, que contiene toda la funcionalidad principal
 * de navegación y gestión de personajes de Los Simpsons.
 * 
 * @component
 * @returns {JSX.Element} Página principal con CharacterGrid
 */
import CharacterGrid from './components/CharacterGrid.jsx';

/**
 * Componente Home - Página principal de la aplicación
 * @returns {JSX.Element} Layout principal con cuadrícula de personajes
 */
export default function Home() {
  return (
    // Contenedor principal con altura mínima de pantalla
    <div className="min-h-screen">
      
      {/* Componente principal que gestiona toda la aplicación */}
      <CharacterGrid />
    </div>
  );
}