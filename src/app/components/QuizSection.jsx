'use client';
import React, { useState, useEffect } from 'react';

const QuizSection = ({ characters }) => {
  const [quizState, setQuizState] = useState('idle'); // idle, playing, finished
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);

  const generateQuestions = () => {
    const characterWithPhrases = characters.filter(c => c.phrases && c.phrases.length > 0);
    const generatedQuestions = [];

    for (let i = 0; i < Math.min(10, characterWithPhrases.length); i++) {
      const character = characterWithPhrases[i];
      const phrase = character.phrases[Math.floor(Math.random() * character.phrases.length)];
      
      // Generar opciones incorrectas
      const wrongOptions = characters
        .filter(c => c.id !== character.id)
        .sort(() => Math.random() - 0.5)
        .slice(0, 3)
        .map(c => c.name);

      // Mezclar opciones
      const options = [character.name, ...wrongOptions].sort(() => Math.random() - 0.5);

      generatedQuestions.push({
        id: i + 1,
        phrase: phrase,
        correctAnswer: character.name,
        options: options,
        character: character
      });
    }

    return generatedQuestions;
  };

  const startQuiz = () => {
    const newQuestions = generateQuestions();
    setQuestions(newQuestions);
    setQuizState('playing');
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowResult(false);
  };

  const handleAnswer = (answer) => {
    setSelectedAnswer(answer);
    setShowResult(true);

    if (answer === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }

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

  const resetQuiz = () => {
    setQuizState('idle');
    setCurrentQuestion(0);
    setScore(0);
    setQuestions([]);
    setSelectedAnswer(null);
    setShowResult(false);
  };

  if (quizState === 'idle') {
    return (
      <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 border-4 border-purple-400 shadow-lg text-center">
        <div className="text-6xl mb-4">🎯</div>
        <h2 className="text-3xl font-bold text-purple-600 mb-4">Quiz de Frases de Los Simpsons</h2>
        <p className="text-purple-700 mb-6">¿Quién dijo esta famosa frase?</p>
        <p className="text-purple-600 mb-8">Pon a prueba tus conocimientos sobre los personajes icónicos de Springfield</p>
        
        {characters.filter(c => c.phrases && c.phrases.length > 0).length > 0 ? (
          <button 
            className="btn btn-lg bg-purple-400 hover:bg-purple-500 text-white border-purple-600"
            onClick={startQuiz}
          >
            🎮 Comenzar Quiz
          </button>
        ) : (
          <div className="text-yellow-600">
            <p>Cargando personajes para el quiz...</p>
          </div>
        )}
      </div>
    );
  }

  if (quizState === 'playing' && questions.length > 0) {
    const question = questions[currentQuestion];
    
    return (
      <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border-4 border-purple-400 shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <div className="text-purple-700 font-semibold">
            Pregunta {currentQuestion + 1} de {questions.length}
          </div>
          <div className="text-purple-700 font-semibold">
            Puntuación: {score}
          </div>
        </div>

        {/* Barra de progreso */}
        <div className="w-full bg-purple-200 rounded-full h-3 mb-6">
          <div 
            className="bg-purple-500 h-3 rounded-full transition-all duration-500"
            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          ></div>
        </div>

        {/* Quote bubble */}
        <div className="bg-white rounded-2xl p-6 mb-6 border-2 border-purple-300 shadow-md">
          <div className="flex items-start gap-4">
            <div className="text-4xl">💬</div>
            <p className="text-xl text-purple-900 italic font-medium">
              "{question.phrase}"
            </p>
          </div>
        </div>

        {/* Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {question.options.map((option, index) => {
            let buttonClass = "btn p-4 text-lg font-medium border-2 ";
            
            if (showResult) {
              if (option === question.correctAnswer) {
                buttonClass += "bg-green-400 text-white border-green-600";
              } else if (option === selectedAnswer && option !== question.correctAnswer) {
                buttonClass += "bg-red-400 text-white border-red-600";
              } else {
                buttonClass += "bg-gray-200 text-gray-500 border-gray-400";
              }
            } else {
              buttonClass += "bg-white hover:bg-purple-100 text-purple-900 border-purple-300 hover:border-purple-400";
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

        {showResult && (
          <div className="mt-6 text-center">
            {selectedAnswer === question.correctAnswer ? (
              <div className="text-green-600 font-bold text-xl">✅ ¡Correcto!</div>
            ) : (
              <div className="text-red-600 font-bold text-xl">
                ❌ Incorrecto. La respuesta correcta es: {question.correctAnswer}
              </div>
            )}
          </div>
        )}
      </div>
    );
  }

  if (quizState === 'finished') {
    const percentage = Math.round((score / questions.length) * 100);
    
    return (
      <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 border-4 border-purple-400 shadow-lg text-center">
        <div className="text-6xl mb-4">🏆</div>
        <h2 className="text-3xl font-bold text-purple-600 mb-4">Quiz Completado</h2>
        
        <div className="bg-white rounded-xl p-6 mb-6 border-2 border-purple-300">
          <div className="text-5xl font-bold text-purple-600 mb-2">{score}/{questions.length}</div>
          <div className="text-xl text-purple-700">{percentage}% de aciertos</div>
        </div>

        <div className="mb-6">
          {percentage >= 80 ? (
            <div className="text-green-600 text-xl font-bold">🌟 ¡Eres un experto en Los Simpsons!</div>
          ) : percentage >= 60 ? (
            <div className="text-yellow-600 text-xl font-bold">👍 ¡Buen trabajo! Conoces bien Springfield</div>
          ) : percentage >= 40 ? (
            <div className="text-orange-600 text-xl font-bold">📚 Sigue viendo Los Simpsons</div>
          ) : (
            <div className="text-red-600 text-xl font-bold">😅 ¿Seguro que eres fan de Los Simpsons?</div>
          )}
        </div>

        <div className="flex gap-4 justify-center">
          <button 
            className="btn btn-lg bg-purple-400 hover:bg-purple-500 text-white border-purple-600"
            onClick={startQuiz}
          >
            🔄 Jugar de Nuevo
          </button>
          <button 
            className="btn btn-lg bg-gray-400 hover:bg-gray-500 text-white border-gray-600"
            onClick={resetQuiz}
          >
            🏠 Salir
          </button>
        </div>
      </div>
    );
  }

  return null;
};

export default QuizSection;