// games.js
window.initGame = (React, assetsUrl) => {
  const { useState, useEffect } = React;

  const WhackAMole = () => {
    const [score, setScore] = useState(0);
    const [activeMole, setActiveMole] = useState(null);

    useEffect(() => {
      const interval = setInterval(() => {
        setActiveMole(Math.floor(Math.random() * 9));
      }, 1000);
      return () => clearInterval(interval);
    }, []);

    const whackMole = (index) => {
      if (index === activeMole) {
        setScore(score + 1);
        setActiveMole(null);
      }
    };

    return React.createElement(
      'div',
      { className: "whack-a-mole" },
      React.createElement('h2', null, "Whack-a-Mole"),
      React.createElement('p', null, `Score: ${score}`),
      React.createElement(
        'div',
        { className: "game-board" },
        Array(9).fill().map((_, index) =>
          React.createElement(
            'div',
            {
              key: index,
              className: `mole ${index === activeMole ? 'active' : ''}`,
              onClick: () => whackMole(index)
            },
            index === activeMole && React.createElement('img', { src: `${assetsUrl}/chi.png`, alt: "Mole" })
          )
        )
      )
    );
  };

  const WordGame = () => {
    const words = ["apple", "banana", "cherry", "date", "fig", "grape", "kiwi", "lemon", "mango"];
    const [score, setScore] = useState(0);
    const [currentWord, setCurrentWord] = useState("");
    const [inputValue, setInputValue] = useState("");

    const selectNewWord = () => {
      const randomWord = words[Math.floor(Math.random() * words.length)];
      setCurrentWord(randomWord);
      setInputValue("");
    };

    useEffect(() => {
      selectNewWord();
    }, []);

    const checkGuess = () => {
      if (inputValue.toLowerCase() === currentWord.toLowerCase()) {
        setScore(score + 1);
        selectNewWord();
      } else {
        alert("Try again!");
      }
    };

    return React.createElement(
      'div',
      { className: "word-game" },
      React.createElement('h2', null, "English Word Game"),
      React.createElement('p', null, `Score: ${score}`),
      React.createElement('p', null, `Guess the word: ${currentWord.replace(/./g, '*')}`),
      React.createElement('input', {
        type: 'text',
        value: inputValue,
        onChange: (e) => setInputValue(e.target.value)
      }),
      React.createElement('button', {
        onClick: checkGuess
      }, "Submit"))
    );
  };

  const GameSelector = () => {
    const [selectedGame, setSelectedGame] = useState('whack-a-mole');

    return React.createElement(
      'div',
      null,
      React.createElement(
        'div',
        { className: "game-selector" },
        React.createElement('button', { onClick: () => setSelectedGame('whack-a-mole') }, "Whack-a-Mole"),
        React.createElement('button', { onClick: () => setSelectedGame('word-game') }, "English Word Game")
      ),
      React.createElement(
        'div',
        null,
        selectedGame === 'whack-a-mole' ? React.createElement(WhackAMole) : React.createElement(WordGame)
      )
    );
  };

  // Return the GameSelector component as a functional component
  return () => React.createElement(GameSelector);
};

console.log('Combined game script loaded');
