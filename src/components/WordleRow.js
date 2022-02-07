import WordleBox from './WordleBox';

export default function WordleRow({
  positionY,
  currentGuess,
  matchingLetters,
  fontSize,
}) {
  const leftMost = -(2.4 * fontSize);
  const left = -(1.2 * fontSize);
  const middle = 0 * fontSize;
  const right = 1.2 * fontSize;
  const rightMost = 2.4 * fontSize;

  return (
    <>
      <WordleBox
        positionVals={[leftMost, positionY, 0]}
        letter={currentGuess[0]}
        match={matchingLetters[0]}
        fontSize={fontSize}
      />
      <WordleBox
        positionVals={[left, positionY, 0]}
        letter={currentGuess[1]}
        match={matchingLetters[1]}
        fontSize={fontSize}
      />
      <WordleBox
        positionVals={[middle, positionY, 0]}
        letter={currentGuess[2]}
        match={matchingLetters[2]}
        fontSize={fontSize}
      />
      <WordleBox
        positionVals={[right, positionY, 0]}
        letter={currentGuess[3]}
        match={matchingLetters[3]}
        fontSize={fontSize}
      />
      <WordleBox
        positionVals={[rightMost, positionY, 0]}
        letter={currentGuess[4]}
        match={matchingLetters[4]}
        fontSize={fontSize}
      />
    </>
  );
}
