// typing-word-game.js
window.initGame = (React) => {
  const { useState, useEffect } = React;

  const WordGame = () => {
    const words = [
      "apple", "banana", "cherry", "date", "fig",
      "grape", "kiwi", "lemon", "mango", "mouse",
      "pen", "shoe", "ball", "cup", "bird",
      "house", "road", "cake", "table", "chair",
      "star", "stay", "tree", "cat"
    ];
    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(0);
    const [currentWord, setCurrentWord] = useState("");
    const [inputValue, setInputValue] = useState("");
    const [timeLeft, setTimeLeft] = useState(30);
    const [gameOver, setGameOver] = useState(false);
    const [gameStarted, setGameStarted] = useState(false); // New state variable

    const selectNewWord = () => {
      const randomWord = words[Math.floor(Math.random() * words.length)];
      setCurrentWord(randomWord);
      setInputValue("");
    };

    useEffect(() => {
      if (gameStarted) {
        selectNewWord();
        const timer = setInterval(() => {
          setTimeLeft(prev => {
            if (prev <= 1) {
              clearInterval(timer);
              setGameOver(true);
              if (score > highScore) {
                setHighScore(score);
              }
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
        return () => clearInterval(timer);
      }
    }, [gameStarted]);

    const checkGuess = () => {
      if (inputValue.toLowerCase() === currentWord.toLowerCase() && !gameOver) {
        setScore(score + 1);
        selectNewWord();
      } else {
        alert("Try again!");
      }
    };

    const resetGame = () => {
      setScore(0);
      setTimeLeft(30);
      setGameOver(false);
      selectNewWord();
      setGameStarted(false); // Reset the game started state
    };

    const startGame = () => {
      setGameStarted(true); // Set game started to true
      setGameOver(false); // Reset game over state
      setScore(0);
      setTimeLeft(30);
      selectNewWord();
    };

    const handleKeyPress = (event) => {
      if (event.key === 'Enter' && !gameOver) {
        checkGuess();
      }
    };

    return React.createElement(
      'div',
      { className: "word-game" },
      React.createElement('h2', null, "English Word Game"),
      React.createElement('p', null, `Score: ${score}`),
      React.createElement('p', null, `High Score: ${highScore}`),
      React.createElement('p', null, `Time left: ${timeLeft} seconds`),
      React.createElement('div', { className: "word-container" },
        React.createElement('p', null, `Type the word:`),
        React.createElement('div', { className: "word-box" }, currentWord)
      ),
      React.createElement('input', {
        type: 'text',
        value: inputValue,
        onChange: (e) => setInputValue(e.target.value),
        onKeyPress: handleKeyPress,
        placeholder: "Your guess here",
        disabled: gameOver || !gameStarted // Disable input if game is over or not started
      }),
      React.createElement('button', {
        onClick: gameOver ? resetGame : (gameStarted ? checkGuess : startGame),
        disabled: gameOver && !gameStarted
      }, gameOver ? "Play Again" : (gameStarted ? "Submit" : "Start")),
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
