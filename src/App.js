import './App.css';
import { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Html, Text } from '@react-three/drei';
import WordleBox from './components/WordleBox';

function App() {
  const [allowInput, setAllowInput] = useState(true);
  const [textBox, setTextBox] = useState('');

  function delay(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }

  async function handleChange(event) {
    if (
      allowInput &&
      event.target.value.length <= 5 &&
      textBox.slice(0, event.target.value.length - 1) ===
        event.target.value.slice(0, event.target.value.length - 1)
    ) {
      const alpha_chars_only = event.target.value.replace(/[^a-zA-Z]/gi, '');
      setAllowInput(false);
      setTextBox(alpha_chars_only.toUpperCase());
      await delay(200);
      setAllowInput(true);
    }
  }

  useEffect(() => {
    const timeOutId = setTimeout(() => setTextBox(textBox), 300);
    return () => clearTimeout(timeOutId);
  }, [textBox]);

  return (
    <Canvas>
      <ambientLight intensity={1} />
      <pointLight position={[10, 10, 10]} />
      <WordleBox position={[-2.4, 0, 0]} text={textBox[0]} />
      <WordleBox position={[-1.2, 0, 0]} text={textBox[1]} />
      <WordleBox position={[0, 0, 0]} text={textBox[2]} />
      <WordleBox position={[1.2, 0, 0]} text={textBox[3]} />
      <WordleBox position={[2.4, 0, 0]} text={textBox[4]} />
      <Html position={[-0.3, -1, 0]}>
        <input
          type='text'
          name='textBox'
          value={textBox}
          style={{ width: '5rem' }}
          placeholder='input'
          onChange={handleChange}
        />
      </Html>
      <OrbitControls />
    </Canvas>
  );
}

export default App;
