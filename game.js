// typing-word-game.js
window.initGame = (React, assetsUrl) => {
  const { useState, useEffect } = React;

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

    const handleKeyPress = (event) => {
      if (event.key === 'Enter') {
        checkGuess();
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
        onChange: (e) => setInputValue(e.target.value),
        onKeyPress: handleKeyPress
      }),
      React.createElement('button', {
        onClick: checkGuess
      }, "Submit"))
    );
  };

  return () => React.createElement(WordGame);
};

console.log('English Word Game script loaded');
