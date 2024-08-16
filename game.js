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
      React.createElement('div', { className: "word-container" },
        React.createElement('p', null, `Type the word:`),
        React.createElement('div', { className: "word-box" }, currentWord)
      ),
      React.createElement('input', {
        type: 'text',
        value: inputValue,
        onChange: (e) => setInputValue(e.target.value),
        onKeyPress: handleKeyPress,
        placeholder: "Your guess here"
      }),
      React.createElement('button', {
        onClick: checkGuess
      }, "Submit"),
      React.createElement('style', null, `
        body {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          margin: 0;
          background: linear-gradient(to right, #ffe7e7, #d0e1f9);
        }
        .word-game {
          text-align: center;
        }
        .word-container {
          margin: 20px 0;
        }
        .word-box {
          display: inline-block;
          width: 200px;  
          height: 50px;   
          border: 2px solid #000;
          text-align: center;
          line-height: 50px;  
          font-size: 24px;
          background-color: #f8f8f8;
        }
        input {
          font-size: 18px;
          padding: 10px;
          margin: 10px 0;
        }
        button {
          padding: 10px 20px;
          font-size: 18px;
          cursor: pointer;
        }
      `)
    );
  };

  return WordGame;
};

console.log('English Word Game script loaded');
