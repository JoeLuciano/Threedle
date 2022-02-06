import './App.css';
import { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Html, Text } from '@react-three/drei';
import WordleRow from './components/WordleRow';

const wordle = 'POINT';

function App() {
  const [allowInput, setAllowInput] = useState(true);
  const [currentGuess, setCurrentGuess] = useState('');
  const [guesses, setGuesses] = useState(Array(6).fill(''));
  const [matchingLetters, setMatchingLetters] = useState(Array(5).fill(''));
  const [topRowY, setTopRowY] = useState(0);
  const [wordleRows, setWordleRows] = useState();

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
      await delay(200);
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
    setPrevRow(
      <WordleRow
        key='second'
        positionY={1}
        currentGuess={{ ...currentGuess }}
        matchingLetters={{ ...matchingLetters }}
      />
    );
    setTopRowY((prev) => prev + 1);
  }

  const activeRow = (
    <WordleRow
      key='first'
      positionY={0}
      currentGuess={currentGuess}
      matchingLetters={matchingLetters}
    />
  );

  const [prevRow, setPrevRow] = useState();
  const [showActiveRow, setShowActiveRow] = useState(true);

  return (
    <Canvas camera={{ position: [0, 0, 5] }}>
      <ambientLight intensity={1} />
      <pointLight position={[10, 10, 10]} />
      {prevRow}
      {activeRow}

      <Html position={[-0.3, -1, 0]}>
        <input
          type='text'
          name='textBox'
          value={currentGuess}
          style={{ width: '5rem' }}
          placeholder='input'
          onChange={handleChange}
        />
        <button onClick={handleSubmit}>Submit</button>
      </Html>
      <OrbitControls />
    </Canvas>
  );
}

export default App;
