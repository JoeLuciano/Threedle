import './App.css';
import React, { useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Vector3 } from 'three';
import WordleRow from './components/WordleRow';

const wordle = 'POINT';

export const App = () => {
  const [allowSubmit, setAllowSubmit] = useState(false);
  const [currentGuess, setCurrentGuess] = useState('');
  const [matchingLetters, setMatchingLetters] = useState(Array(5).fill(''));
  const [guessCount, setGuessCount] = useState(0);
  const [guesses, setGuesses] = useState();

  const fontSize = 0.5;

  document.onkeydown = handleChange;

  function delay(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }

  useEffect(() => {
    if (currentGuess.length === 5) {
      setAllowSubmit(true);
    } else {
      setAllowSubmit(false);
    }
  }, [currentGuess]);

  function handleChange(event) {
    if (currentGuess.length < 5 && String(event.key).length === 1) {
      const alpha_chars_only = event.key.replace(/[^a-zA-Z]/gi, '');
      setCurrentGuess((prev) => prev.concat(alpha_chars_only.toUpperCase()));
    } else if (event.key === 'Backspace') {
      setCurrentGuess((prev) => prev.slice(0, -1));
    } else if (event.key === 'Enter') {
      allowSubmit && handleSubmit();
    }
  }

  async function handleSubmit() {
    setAllowSubmit(false);
    for (const index in currentGuess) {
      await delay(300);
      const letter = currentGuess[index];
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
    await delay(1000);
    setGuessCount((prev) => prev + 1);
  }

  // UPDATE CURRENT GUESS
  useEffect(() => {
    setGuesses((prev) => {
      return {
        ...prev,
        [guessCount]: (
          <WordleRow
            key={guessCount}
            positionY={0}
            currentGuess={currentGuess}
            matchingLetters={matchingLetters}
            fontSize={fontSize}
          />
        ),
      };
    });
  }, [currentGuess, guessCount, matchingLetters]);

  // ADD NEW ROW
  useEffect(() => {
    setGuesses((prev) => {
      setCurrentGuess('');
      setMatchingLetters(Array(5).fill(''));

      let shiftedRows = [];
      if (prev) {
        for (const rowNum in prev) {
          const row = prev[rowNum];
          const shiftedRow = React.cloneElement(row, {
            positionY: row.props.positionY + fontSize * 1.2,
          });
          shiftedRows.push(shiftedRow);
        }
      }

      return {
        ...shiftedRows,
        [guessCount]: (
          <WordleRow
            key={guessCount}
            positionY={0}
            currentGuess={[]}
            matchingLetters={[]}
            fontSize={fontSize}
          />
        ),
      };
    });
  }, [guessCount]);

  const cameraPosition = new Vector3(0, 0, 3);
  const lookAtPos = new Vector3(0, 1, 0);

  const CameraAdjustment = () => {
    useFrame((state, delta) => {
      state.camera.lookAt(lookAtPos);
    });
    return <></>;
  };

  return (
    <Canvas camera={{ position: cameraPosition }}>
      <ambientLight intensity={1} />
      <pointLight position={[10, 10, 10]} />
      {guesses && Object.values(guesses)}
      <OrbitControls />
      <CameraAdjustment />
    </Canvas>
  );
};
