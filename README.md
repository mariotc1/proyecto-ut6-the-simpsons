# El Universo de Los Simpsons - Aplicación Web Interactiva

<p align="center">
  <img src="/public/img/portada.png" alt="Vista previa de la aplicación" width="800"/>
</p>

<p align="center">
  <a href="https://the-simpsons-pearl.vercel.app/" target="_blank">
    <img src="https://img.shields.io/badge/🌐%20Live%20Demo-Visit%20Site-blue?style=for-the-badge&logo=vercel" alt="Deploy en Vercel">
  </a>
  <a href="https://github.com/mariotc1/proyecto-ut6-the-simpsons" target="_blank">
    <img src="https://img.shields.io/badge/📁%20Repository-View%20Code-green?style=for-the-badge&logo=github" alt="Repositorio GitHub">
  </a>
</p>

> **Una aplicación web moderna e interactiva que explora el fascinante universo de Los Simpsons**. Construida con las últimas tecnologías web, ofrece una experiencia inmersiva para descubrir personajes, episodios, ubicaciones y poner a prueba tus conocimientos con un quiz interactivo.

---

## Tabla de Contenidos

- [🌟 Características Principales](#-características-principales)
- [🛠️ Stack Tecnológico](#️-stack-tecnológico)
- [🚀 Instalación y Configuración](#-instalación-y-configuración)
- [📁 Estructura del Proyecto](#-estructura-del-proyecto)
- [🎮 Uso de la Aplicación](#-uso-de-la-aplicación)
- [🔧 Scripts Disponibles](#-scripts-disponibles)
- [🤝 Contribución](#-contribución)
- [👥 Autores](#-autores)
- [📄 Licencia](#-licencia)

---

## 🌟 Características Principales

### 🎭 **Exploración de Personajes**
- **Galería Completa**: Navega por todos los personajes de Los Simpsons con imágenes de alta calidad
- **Filtrado Avanzado**: Busca por nombre, género, estado, ocupación y rango de edad
- **Vista Detallada**: Accede a información completa de cada personaje con un solo clic
- **Carga Progresiva**: Paginación inteligente con botón "Cargar Más" para rendimiento óptimo

### 📺 **Gestión de Episodios**
- **Navegación por Temporadas**: Explora episodios organizados por temporadas
- **Información Completa**: Accede a detalles de cada episodio incluyendo fecha de emisión
- **Filtrado Dinámico**: Filtra episodios por temporada de forma instantánea

### 🏛️ **Descubrimiento de Ubicaciones**
- **Mapa de Springfield**: Explora los lugares icónicos de la serie
- **Filtrado por Ciudad**: Organiza las ubicaciones por diferentes ciudades
- **Descripciones Detalladas**: Conoce la historia detrás de cada lugar

### 🎯 **Quiz Interactivo**
- **Preguntas Dinámicas**: 10 preguntas aleatorias basadas en citas de personajes
- **Sistema de Puntuación**: Seguimiento en tiempo real de tu progreso
- **Feedback Visual**: Respuestas inmediatas con indicadores visuales
- **Resultados Detallados**: Muestra tu puntuación final con porcentaje y opción de repetir

### 🎨 **Experiencia de Usuario**
- **📱 Diseño Responsivo**: Experiencia perfecta en móviles, tablets y desktop
- **✨ Animaciones Fluidas**: Transiciones suaves y efectos personalizados al estilo Simpsons
- **🎨 Tema Personalizado**: Paleta de colores inspirada en la serie (amarillo, azul, naranja, rojo)
- **⚡ Rendimiento Optimizado**: Carga lazy loading y optimización de recursos
- **🔄 Estados de Carga**: Indicadores visuales durante la carga de datos

---

## 🛠️ Stack Tecnológico

### **Frontend Core**
| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| **Next.js** | 16.1.1 | Framework React con App Router |
| **React** | 19.2.3 | Biblioteca de UI con últimas características |
| **Tailwind CSS** | 4.0 | Framework de CSS utility-first |
| **DaisyUI** | 5.5.14 | Componentes UI sobre Tailwind |

### **Enhancement & Animation**
| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| **Framer Motion** | 12.26.2 | Animaciones avanzadas y transiciones |
| **React Intersection Observer** | 10.0.2 | Animaciones scroll y lazy loading |
| **Babel React Compiler** | 1.0.0 | Compilación optimizada de React |

### **Development Tools**
| Herramienta | Propósito |
|-------------|-----------|
| **ESLint 9** | Análisis de calidad de código |
| **PostCSS** | Procesamiento de CSS |
| **JSConfig** | Configuración de aliases (@/*) |

### **Data Source**
- **🌐 API**: [The Simpsons API](https://thesimpsonsapi.com/)
- **📊 Endpoints**: Characters, Episodes, Locations
- **🔄 Paginación**: Soporte completo para carga eficiente

---

## 🚀 Instalación y Configuración

### 📋 Prerrequisitos

Asegúrate de tener instalado:
- **Node.js** `v18.17.0` o superior
- **npm** `v9.0.0` o superior

### 🛠️ Pasos de Instalación

1. **📥 Clona el repositorio**
   ```bash
   git clone https://github.com/mariotc1/proyecto-ut6-the-simpsons.git
   ```

2. **📁 Navega al directorio**
   ```bash
   cd proyecto-ut6-the-simpsons
   ```

3. **📦 Instala las dependencias**
   ```bash
   npm install
   ```

4. **🚀 Inicia el servidor de desarrollo**
   ```bash
   npm run dev
   ```

5. **🌐 Abre tu navegador**
   ```
   http://localhost:3000
   ```

---

## 📁 Estructura del Proyecto

```
proyecto-ut6-the-simpsons/
├── 📂 src/app/
│   ├── 📂 components/           # 17 componentes React
│   │   ├── 🎯 CharacterGrid.jsx     # Controlador principal de la app
│   │   ├── 🧭 Header.jsx            # Navegación y pestañas
│   │   ├── 👥 CharactersContent.jsx # Gestión de personajes
│   │   ├── 📺 EpisodesSection.jsx   # Navegación de episodios
│   │   ├── 🏛️ LocationsSection.jsx  # Exploración de ubicaciones
│   │   ├── 🎮 QuizSection.jsx       # Juego de trivia interactivo
│   │   ├── 📊 StatsSection.jsx      # Visualización de datos
│   │   └── 🎨 [UI components]        # Cards, filtros, fondos
│   ├── 📂 hooks/               # Hooks personalizados React
│   │   ├── 🎭 useCharacters.js     # Gestión de datos de personajes
│   │   └── 🔍 useFilters.js        # Lógica de filtrado avanzado
│   ├── 📄 layout.js            # Layout raíz con fuentes y metadata
│   ├── 📄 page.js              # Página principal
│   └── 🎨 globals.css          # Estilos globales y animaciones
├── 📂 public/
│   ├── 📂 img/                 # Imágenes del proyecto
│   └── 🎨 [SVG assets]         # Recursos de iconos
└── ⚙️ [Config files]          # package.json, tailwind.config.js, etc.
```

---

## 🎮 Uso de la Aplicación

### **Navegación Principal**
La aplicación se organiza en pestañas principales:

1. **🎭 Personajes** - Explora el catálogo completo de personajes
2. **📺 Episodios** - Navega por episodios y temporadas
3. **🏛️ Ubicaciones** - Descubre los lugares de Springfield
4. **🎮 Quiz** - Pon a prueba tus conocimientos

### **Funcionalidades Clave**

#### **🔍 Búsqueda y Filtrado**
- Usa la barra de búsqueda para encontrar personajes por nombre
- Aplica filtros múltiples para refinar resultados
- Los filtros se combinan para búsquedas precisas

#### **📊 Paginación**
- Los resultados se cargan progresivamente
- Usa el botón "Cargar Más" para ver contenido adicional
- La carga se optimiza para mejor rendimiento

#### **🎮 Quiz Interactivo**
- Responde preguntas basadas en citas de personajes
- Recibe feedback inmediato sobre tus respuestas
- Tu puntuación se actualiza en tiempo real
- Al finalizar, revisa tus resultados y juega nuevamente

---

## 🔧 Scripts Disponibles

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | 🚀 Inicia el servidor de desarrollo |
| `npm run build` | 🏗️ Compila la aplicación para producción |
| `npm run start` | 🌐 Inicia un servidor de producción |
| `npm run lint` | 🔍 Analiza el código con ESLint |

---

## 🤝 Contribución

¡Las contribuciones son bienvenidas! Si quieres mejorar este proyecto:

1. **🍴 Fork** el repositorio
2. **🌿 Crea** una rama para tu feature (`git checkout - feature/AmazingFeature`)
3. **💾 Commit** tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. **📤 Push** a la rama (`git push origin feature/AmazingFeature`)
5. **🔀 Abre** un Pull Request

---

## 👥 Autores

Este proyecto ha sido desarrollado con por:

<table>
  <tr>
    <td align="center">
      <a href="https://github.com/Raul9097">
        <img src="https://avatars.githubusercontent.com/u/1234567?v=4" width="100px;" alt="Raúl Ortega Frutos"/>
        <br />
        <sub><b>Raúl Ortega Frutos</b></sub>
      </a>
      <br />
      <a href="https://github.com/Raul9097" title="GitHub">🐙</a>
    </td>
    <td align="center">
      <a href="https://github.com/mariotc1">
        <img src="https://avatars.githubusercontent.com/u/1234568?v=4" width="100px;" alt="Mario Tomé Core"/>
        <br />
        <sub><b>Mario Tomé Core</b></sub>
      </a>
      <br />
      <a href="https://github.com/mariotc1" title="GitHub">🐙</a>
    </td>
  </tr>
</table>

---

## 📄 Licencia

> 🎓 **Proyecto Educativo** - Este es un proyecto personal desarrollado con fines educativos. 

✅ **Libre uso** - Siéntete libre de clonarlo, experimentar y aprender de él.

---

## 🌟 Agradecimientos

- **The Simpsons API** - Por proporcionar los datos de la serie
- **Vercel** - Por el hosting de la aplicación en producción
- **DaisyUI & Tailwind CSS** - Por las excelentes herramientas de diseño

---

<p align="center">
  <sub>Hecho con ❤️ y ☕️ para fans de Los Simpsons</sub>
</p>