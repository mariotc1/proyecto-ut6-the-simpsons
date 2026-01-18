# The Simpsons Interactive Web App

**Una aplicación web interactiva sobre Los Simpsons construida con Next.js 16 y React 19**

[![Next.js](https://img.shields.io/badge/Next.js-16.1.1-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.3-blue?style=flat-square&logo=react)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=flat-square&logo=vercel)](https://the-simpsons-pearl.vercel.app)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

## 📋 Descripción del Proyecto

Este proyecto es una aplicación web interactiva temática de Los Simpsons, desarrollada como trabajo final para el módulo de **Desarrollo Web en Entorno Cliente** del ciclo de DAW. La aplicación showcases diversas técnicas modernas de desarrollo frontend incluyendo:

- 🎮 **Sección de Personajes**: Navegación interactiva con filtros y búsqueda
- 📺 **Galería de Episodios**: Visualización paginada con información detallada  
- 🧠 **Quiz Interactivo**: Juego de preguntas sobre Los Simpsons
- ✨ **Animaciones Fluidas**: Transiciones y micro-interacciones con Framer Motion
- 📱 **Diseño Responsive**: Experiencia optimizada para todos los dispositivos

## 🏗️ Arquitectura y Stack Tecnológico

### Stack Principal
- **Frontend Framework**: Next.js 16.1.1 con App Router
- **UI Library**: React 19.2.3
- **Styling**: Tailwind CSS 4.0 + DaisyUI 5.5.14
- **Animations**: Framer Motion 12.26.2
- **Performance**: React Compiler (experimental) + Intersection Observer

### Arquitectura de Componentes
```
src/app/
├── components/          # Componentes reutilizables
│   ├── CharacterGrid.jsx     # Componente principal 
│   ├── CharactersContent.jsx 
│   ├── TabContent.jsx        
│   ├── CharacterCard.jsx
│   ├── EpisodeCard.jsx
│   ├── Header.jsx
│   └── ...
├── hooks/              # Custom hooks
│   ├── useCharacters.js     # Lógica de personajes
│   └── useFilters.js        # Lógica de filtros
├── layout.js           # Layout principal de la app
├── page.js            # Página home
└── globals.css        # Estilos globales
```

### Patrones de Diseño Implementados
- ✅ **Component-Based Architecture**: Componentes modulares y reutilizables
- ✅ **Container/Presentational Pattern**: Separación de lógica y presentación
- ✅ **Custom Hooks**: Extracción de lógica reutilizable (useCharacters, useFilters)
- ✅ **Component Decomposition**: Refactorización de componentes grandes
- ✅ **Progressive Enhancement**: Carga progresiva de datos
- ✅ **Mobile-First Design**: Diseño responsive优先

## 🚀 Instalación y Puesta en Marcha

### Prerrequisitos
- **Node.js**: Versión 18.17.0 o superior
- **npm**: Versión 9.0.0 o superior (o yarn/pnpm)

### Pasos de Instalación

1. **Clonar el repositorio**
```bash
git clone https://github.com/mariotc1/proyecto-ut6-the-simpsons.git
cd proyecto-ut6-the-simpsons
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Iniciar servidor de desarrollo**
```bash
npm run dev
```

4. **Abrir en navegador**
```
http://localhost:3000
```

### Scripts Disponibles
```bash
npm run dev      # Servidor de desarrollo (localhost:3000)
npm run build    # Build de producción
npm run start    # Servidor de producción
npm run lint     # Análisis de código con ESLint
```

## 🎯 Características Principales

### 1. 🎭 Sección de Personajes
- **Grid Interactivo**: Visualización de personajes con diseño tipo cards
- **Sistema de Filtros**: Búsqueda por nombre y filtrado por género
- **Lazy Loading**: Carga progresiva para optimizar rendimiento
- **Hover Effects**: Animaciones sutiles al interactuar

### 2. 📺 Galería de Episodios
- **Paginación Inteligente**: Navegación eficiente entre episodios
- **Información Detallada**: Título, temporada, fecha de emisión
- **Filtros Avanzados**: Búsqueda por título y filtrado por temporada
- **Responsive Grid**: Adaptación automática al tamaño de pantalla

### 3. 🧠 Quiz Interactivo
- **Sistema de Preguntas**: Quiz dinámico sobre el universo Simpsons
- **Puntuación en Tiempo Real**: Feedback inmediato de respuestas
- **Animaciones de Transición**: Efectos visuales al responder
- **Game State Management**: Gestión completa del estado del juego

## 🌐 Despliegue y Producción

### Despliegue en Vercel

**🎯 Ya desplegada:** https://the-simpsons-pearl.vercel.app

**Para actualizar el despliegue:**
```bash
# Instalar Vercel CLI
npm i -g vercel

# Desplegar cambios
vercel --prod
```

**Alternativa - Netlify:**
- Conectar repositorio a Netlify
- Configurar build command: `npm run build`
- Configurar publish directory: `.next`

### Variables de Entorno
```bash
# .env.local
NEXT_PUBLIC_API_URL=https://api.simpsons.com
NEXT_PUBLIC_ENVIRONMENT=production
```

## 📱 Compatibilidad y Rendimiento

### Navegadores Soportados
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

### Métricas de Rendimiento
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1
- **First Input Delay**: < 100ms

## 🤝 Contribuciones

### Guía de Estilo
- **Nomenclatura**: PascalCase para componentes, camelCase para funciones
- **Imports**: Agrupar por tipo (React, third-party, local)
- **Exports**: Export default para componentes principales
- **Comentarios**: JSDoc para funciones complejas

### Flujo de Trabajo
1. Crear feature branch desde `main`
2. Desarrollo siguiendo patrones establecidos
3. Git y revisión de código
4. Merge a `main` mediante Pull Request

## 📄 Licencia

Este proyecto está licenciado bajo la **MIT License** - ver archivo [LICENSE](LICENSE) para detalles.

---

**Desarrollado por:** Mario Tomé Core  
**Módulo:** Desarrollo Web en Entorno Cliente (DAW)  
**Centro:** IES Galileo  
**Año:** 2025-2026

📧 **Contacto:** mariotomecore@gmail.com | 🐙 **GitHub:** https://github.com/mariotc1
