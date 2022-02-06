import WordleBox from './WordleBox';

export default function WordleRow({
  positionY,
  currentGuess,
  matchingLetters,
}) {
  return (
    <>
      <WordleBox
        positionVals={[-2.4, positionY, 0]}
        text={currentGuess[0]}
        match={matchingLetters[0]}
      />
      <WordleBox
        positionVals={[-1.2, positionY, 0]}
        text={currentGuess[1]}
        match={matchingLetters[1]}
      />
      <WordleBox
        positionVals={[0, positionY, 0]}
        text={currentGuess[2]}
        match={matchingLetters[2]}
      />
      <WordleBox
        positionVals={[1.2, positionY, 0]}
        text={currentGuess[3]}
        match={matchingLetters[3]}
      />
      <WordleBox
        positionVals={[2.4, positionY, 0]}
        text={currentGuess[4]}
        match={matchingLetters[4]}
      />
    </>
  );
}
