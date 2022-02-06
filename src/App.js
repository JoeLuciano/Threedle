import './App.css';
import { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Html, Text } from '@react-three/drei';
import WordleRow from './components/WordleRow';
import _ from 'lodash';

const wordle = 'POINT';

function App() {
  const [allowInput, setAllowInput] = useState(true);
  const [currentGuess, setCurrentGuess] = useState('');
  const [matchingLetters, setMatchingLetters] = useState(Array(5).fill(''));
  const [guessCount, setGuessCount] = useState(0);
  const [guesses, setGuesses] = useState();
  const [topRowY, setTopRowY] = useState(0);

  function delay(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }

  async function handleChange(event) {
    if (
      allowInput &&
      event.target.value.length <= 5 &&
      currentGuess.slice(0, event.target.value.length - 1) ===
        event.target.value.slice(0, event.target.value.length - 1)
    ) {
      const alpha_chars_only = event.target.value.replace(/[^a-zA-Z]/gi, '');
      setAllowInput(false);
      setCurrentGuess(alpha_chars_only.toUpperCase());
      await delay(200);
      setAllowInput(true);
    }
  }

  async function handleSubmit() {
    for (const index in currentGuess) {
      const letter = currentGuess[index];
      await delay(100);
      setMatchingLetters((prev) => {
        let currentResult = '';
        const start = prev.slice(0, index);
        const end = prev.slice(index + 1);
        if (letter === wordle.split('')[index]) {
          currentResult = 'match';
        } else if (wordle.includes(letter)) {
          currentResult = 'close';
        } else {
          currentResult = 'miss';
        }
        return [...start, currentResult, ...end];
      });
    }

    setTopRowY((prev) => prev + 1.1);
    setGuessCount((prev) => prev + 1);

    await delay(1000);

    await delay(3000);
  }

  useEffect(() => {
    setGuesses((prev) => {
      if (prev && prev.hasOwnProperty(guessCount)) {
        return {
          ...prev,
          [guessCount]: (
            <WordleRow
              key={guessCount}
              positionY={topRowY - guessCount * 1.1}
              currentGuess={currentGuess}
              matchingLetters={matchingLetters}
            />
          ),
        };
      } else {
        setCurrentGuess('');
        setMatchingLetters(Array(5).fill(''));
        return {
          ...prev,
          [guessCount]: (
            <WordleRow
              key={guessCount}
              positionY={0}
              currentGuess={[]}
              matchingLetters={[]}
            />
          ),
        };
      }
    });
  }, [topRowY, guessCount, currentGuess, matchingLetters]);

  console.log(guesses);

  return (
    <Canvas camera={{ position: [0, 0, 5] }}>
      <ambientLight intensity={1} />
      <pointLight position={[10, 10, 10]} />
      {guesses && guesses[5]}
      {guesses && guesses[4]}
      {guesses && guesses[3]}
      {guesses && guesses[2]}
      {guesses && guesses[1]}
      {guesses && guesses[0]}
      <Html position={[-0.3, -1, 0]}>
        <input
          type='text'
          name='textBox'
          value={currentGuess}
          style={{ width: '5rem' }}
          placeholder='input'
          onChange={handleChange}
        />
        <button onClick={handleSubmit}>Submit</button>{' '}
        {/** TODO: Disable submit button after pressing it */}
      </Html>
      <OrbitControls />
    </Canvas>
  );
}

export default App;
