/**
 * Componente QuizSection
 * 
 * Componente interactivo de quiz sobre frases de Los Simpsons.
 * Genera preguntas aleatorias a partir de las frases de los personajes,
 * gestiona el flujo del juego, puntuación y resultados.
 * 
 * @component
 * @param {Object} props - Propiedades del componente
 * @param {Array} props.characters - Array de personajes para generar preguntas
 * @returns {JSX.Element} Sección completa del quiz
 */
'use client';

import React, { useState, useEffect } from 'react';

const QuizSection = ({ characters }) => {
  // Estados para gestionar el flujo del quiz
  const [quizState, setQuizState] = useState('idle');        // Estado: idle, playing, finished
  const [currentQuestion, setCurrentQuestion] = useState(0); // Índice de la pregunta actual
  const [score, setScore] = useState(0);                    // Puntuación actual
  const [questions, setQuestions] = useState([]);          // Array de preguntas generadas
  const [selectedAnswer, setSelectedAnswer] = useState(null); // Respuesta seleccionada
  const [showResult, setShowResult] = useState(false);      // Mostrar resultado de la pregunta

  /**
   * Genera preguntas aleatorias a partir de los personajes con frases
   * @returns {Array} Array de preguntas con opciones múltiples
   */
  const generateQuestions = () => {
    // Filtramos personajes que tienen frases disponibles
    const characterWithPhrases = characters.filter(c => c.phrases && c.phrases.length > 0);
    
    // Mezclamos aleatoriamente y seleccionamos 10 personajes
    const shuffled = characterWithPhrases.sort(() => 0.5 - Math.random());
    const selectedCharacters = shuffled.slice(0, 10);

    // Generamos las preguntas para cada personaje seleccionado
    const generatedQuestions = selectedCharacters.map((character, index) => {
      // Seleccionamos una frase aleatoria del personaje
      const phrase = character.phrases[Math.floor(Math.random() * character.phrases.length)];
      
      // Generamos opciones incorrectas (3 personajes diferentes)
      const wrongOptions = characters
        .filter(c => c.id !== character.id)
        .sort(() => 0.5 - Math.random())
        .slice(0, 3)
        .map(c => c.name);

      // Mezclamos todas las opciones (correcta + incorrectas)
      const options = [character.name, ...wrongOptions].sort(() => 0.5 - Math.random());

      return {
        id: index + 1,
        phrase: phrase,
        correctAnswer: character.name,
        options: options,
        character: character
      };
    });

    return generatedQuestions;
  };

  /**
   * Inicia una nueva partida de quiz
   */
  const startQuiz = () => {
    const newQuestions = generateQuestions();
    setQuestions(newQuestions);
    setQuizState('playing');
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowResult(false);
  };

  /**
   * Maneja la selección de una respuesta
   * @param {string} answer - Respuesta seleccionada
   */
  const handleAnswer = (answer) => {
    setSelectedAnswer(answer);
    setShowResult(true);

    // Incrementamos la puntuación si la respuesta es correcta
    if (answer === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }

    // Avanzamos a la siguiente pregunta después de 2 segundos
    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setShowResult(false);
      } else {
        setQuizState('finished');
      }
    }, 2000);
  };

  /**
   * Reinicia el quiz al estado inicial
   */
  const resetQuiz = () => {
    setQuizState('idle');
    setCurrentQuestion(0);
    setScore(0);
    setQuestions([]);
    setSelectedAnswer(null);
    setShowResult(false);
  };

  // Renderizado según el estado del quiz
  if (quizState === 'idle') {
    return (
      // Pantalla inicial del quiz
      <div className="bg-yellow-50 rounded-2xl p-8 border-2 border-yellow-400 shadow-lg text-center">
        
        {/* Icono del quiz */}
        <div className="flex justify-center mb-4">
          <svg className="w-16 h-16 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
          </svg>
        </div>
        
        {/* Título y descripción */}
        <h2 className="text-3xl font-bold text-yellow-800 mb-4">Quiz de Frases de Los Simpsons</h2>
        <p className="text-yellow-700 mb-8">Pon a prueba tus conocimientos sobre los personajes icónicos de Springfield.</p>
        
        {/* Botón de inicio o mensaje de carga */}
        {characters.filter(c => c.phrases && c.phrases.length > 0).length > 4 ? (
          <button 
            className="btn btn-lg bg-yellow-400 hover:bg-yellow-500 text-yellow-900 border-yellow-600"
            onClick={startQuiz}
          >
            <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Comenzar Quiz
          </button>
        ) : (
          <div className="text-yellow-600">
            <span className="loading loading-spinner"></span>
            <p className="mt-2">Cargando personajes para el quiz...</p>
          </div>
        )}
      </div>
    );
  }

  // Pantalla de juego activo
  if (quizState === 'playing' && questions.length > 0) {
    const question = questions[currentQuestion];
    
    return (
      <div className="bg-yellow-50 rounded-2xl p-6 border-2 border-yellow-400 shadow-lg">
        
        {/* Cabecera con progreso y puntuación */}
        <div className="flex justify-between items-center mb-4">
          <div className="text-yellow-700 font-semibold">
            Pregunta {currentQuestion + 1} de {questions.length}
          </div>
          <div className="text-yellow-700 font-semibold">
            Puntuación: {score}
          </div>
        </div>

        {/* Barra de progreso */}
        <div className="w-full bg-yellow-200 rounded-full h-2.5 mb-6">
          <div 
            className="bg-yellow-500 h-2.5 rounded-full transition-all duration-500"
            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          ></div>
        </div>

        {/* Caja con la frase del personaje */}
        <div className="relative bg-white rounded-2xl p-6 mb-6 border-2 border-yellow-300 shadow-inner">
          <div className="absolute top-2 left-4 text-6xl text-yellow-300 opacity-50">"</div>
          <p className="text-center text-xl text-yellow-900 italic font-medium z-10 relative">
            {question.phrase}
          </p>
          <div className="absolute bottom-2 right-4 text-6xl text-yellow-300 opacity-50">"</div>
        </div>

        {/* Opciones de respuesta */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {question.options.map((option, index) => {
            // Determinamos el estilo del botón según el estado
            let buttonClass = "btn p-4 h-full text-lg font-medium border-2 transition-all duration-300 ";
            
            if (showResult) {
              // Después de mostrar el resultado
              if (option === question.correctAnswer) {
                buttonClass += "bg-green-500 text-white border-green-600 scale-105";
              } else if (option === selectedAnswer) {
                buttonClass += "bg-red-500 text-white border-red-600";
              } else {
                buttonClass += "bg-gray-200 text-gray-500 border-gray-300 opacity-50";
              }
            } else {
              // Antes de seleccionar respuesta
              buttonClass += "bg-white hover:bg-yellow-100 text-yellow-900 border-yellow-300 hover:border-yellow-400";
            }

            return (
              <button
                key={index}
                className={buttonClass}
                onClick={() => !showResult && handleAnswer(option)}
                disabled={showResult}
              >
                {option}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // Pantalla de resultados finales
  if (quizState === 'finished') {
    const percentage = Math.round((score / questions.length) * 100);
    
    return (
      <div className="bg-yellow-50 rounded-2xl p-8 border-2 border-yellow-400 shadow-lg text-center">
        
        {/* Icono de éxito */}
        <div className="flex justify-center mb-4 text-yellow-500">
          <svg className="w-20 h-20" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
          </svg>
        </div>
        
        {/* Título y resultados */}
        <h2 className="text-3xl font-bold text-yellow-800 mb-2">¡Quiz Completado!</h2>
        <p className="text-yellow-700 mb-6">Este es tu resultado final:</p>
        
        {/* Caja de resultados */}
        <div className="bg-white rounded-xl p-6 mb-6 border-2 border-yellow-300 shadow-inner">
          <div className="text-5xl font-bold text-yellow-900 mb-2">{score} / {questions.length}</div>
          <div className="text-2xl text-yellow-800 font-semibold">{percentage}% de aciertos</div>
        </div>

        {/* Botones de acción */}
        <div className="flex gap-4 justify-center">
          <button 
            className="btn btn-lg bg-yellow-400 hover:bg-yellow-500 text-yellow-900 border-yellow-600"
            onClick={startQuiz}
          >
            <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h5" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 20v-5h-5" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 20h5v-5" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 4h-5v5" />
            </svg>
            Jugar de Nuevo
          </button>
          <button 
            className="btn btn-lg bg-gray-300 hover:bg-gray-400 text-gray-800"
            onClick={resetQuiz}
          >
            Salir
          </button>
        </div>
      </div>
    );
  }

  // Estado nulo (no debería ocurrir)
  return null;
};

export default QuizSection;