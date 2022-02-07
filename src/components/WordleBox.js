import { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import { useSpring, a } from '@react-spring/three';
import { Vector3 } from 'three';

export default function WordleBox({ positionVals, letter, match, fontSize }) {
  const mesh = useRef();

  const rightFaceRef = useRef();
  const leftFaceRef = useRef();
  const topFaceRef = useRef();
  const bottomFaceRef = useRef();
  const frontFaceRef = useRef();
  const backFaceRef = useRef();

  const [currentFace, setCurrentFace] = useState(0);
  const [rightFaceText, setRightFaceText] = useState();
  const [leftFaceText, setLeftFaceText] = useState();
  const [topFaceText, setTopFaceText] = useState();
  const [bottomFaceText, setBottomFaceText] = useState();
  const [frontFaceText, setFrontFaceText] = useState();
  const [backFaceText, setBackFaceText] = useState();

  const black = '#2F2F2F';
  const [rightFaceColor, setRightFaceColor] = useState(black);
  const [leftFaceColor, setLeftFaceColor] = useState(black);
  const [topFaceColor, setTopFaceColor] = useState(black);
  const [bottomFaceColor, setBottomFaceColor] = useState(black);
  const [frontFaceColor, setFrontFaceColor] = useState(black);
  const [backFaceColor, setBackFaceColor] = useState(black);

  const [angleX, setAngleX] = useState(0);
  const [angleY, setAngleY] = useState(Math.PI / 2);

  // Orient faces so text to display
  useEffect(() => {
    rightFaceRef.current.rotation.y = Math.PI / 2;
    rightFaceRef.current.position.x = fontSize / 2 + 0.01;
    leftFaceRef.current.rotation.y = -Math.PI / 2;
    leftFaceRef.current.position.x = -(fontSize / 2 + 0.01);

    topFaceRef.current.rotation.x = -Math.PI / 2;
    topFaceRef.current.position.y = fontSize / 2 + 0.01;
    bottomFaceRef.current.rotation.x = Math.PI / 2;
    bottomFaceRef.current.position.y = -(fontSize / 2 + 0.01);

    frontFaceRef.current.position.z = fontSize / 2 + 0.01;
    backFaceRef.current.rotation.y = Math.PI;
    backFaceRef.current.position.z = -(fontSize / 2 + 0.01);
  }, [mesh]);

  useEffect(() => {
    if (letter) {
      setAngleY((current) => current + Math.PI / 2);
      setCurrentFace((cur) => {
        return cur > 2 ? (cur = 0) : (cur += 1);
      });
      if (currentFace === 0) {
        setLeftFaceText(letter);
      } else if (currentFace === 1) {
        setBackFaceText(letter);
      } else if (currentFace === 2) {
        setRightFaceText(letter);
      } else {
        setFrontFaceText(letter);
      }
    } else {
      setAngleY((current) => current - Math.PI / 2);
      setCurrentFace((cur) => {
        return cur < 1 ? (cur = 0) : (cur -= 1);
      });
    }
  }, [letter]); // Need to figure out how to hold state of current face within this use effect

  useEffect(() => {
    if (match === 'match') {
      setAngleX((current) => current + Math.PI / 2);
      topFaceRef.current.rotation.z = currentFace * (-Math.PI / 2);
      setTopFaceText(letter);
      setTopFaceColor('green');
    } else if (match === 'close') {
      setAngleX((current) => current + Math.PI / 2);
      topFaceRef.current.rotation.z = currentFace * (-Math.PI / 2);
      setTopFaceText(letter);
      setTopFaceColor('yellow');
    } else if (match === 'miss') {
      setAngleX((current) => current + Math.PI / 2);
      topFaceRef.current.rotation.z = currentFace * (-Math.PI / 2);
      setTopFaceText(letter);
      setTopFaceColor('red');
    }
  }, [match, letter]);

  const vec = new Vector3(positionVals[0], positionVals[1], positionVals[2]);
  useFrame(() => mesh.current.position.lerp(vec, 0.01));

  const { rotationX } = useSpring({
    rotationX: angleX,
    config: { duration: 500 },
  });

  const { rotationY } = useSpring({
    rotationY: angleY,
    config: { duration: 500 },
  });

  const fontColor = '#EC2D2D';

  return (
    <>
      <a.mesh ref={mesh} rotation-x={rotationX} rotation-y={rotationY}>
        <boxBufferGeometry args={[fontSize, fontSize, fontSize]} />
        {/* Order of meshStandardMaterials matters  */}
        <meshStandardMaterial attachArray='material' color={rightFaceColor} />
        <meshStandardMaterial attachArray='material' color={leftFaceColor} />
        <meshStandardMaterial attachArray='material' color={topFaceColor} />
        <meshStandardMaterial attachArray='material' color={bottomFaceColor} />
        <meshStandardMaterial attachArray='material' color={frontFaceColor} />
        <meshStandardMaterial attachArray='material' color={backFaceColor} />
        <Text ref={rightFaceRef} color={fontColor} fontSize={fontSize}>
          {rightFaceText}
        </Text>
        <Text ref={leftFaceRef} color={fontColor} fontSize={fontSize}>
          {leftFaceText}
        </Text>
        <Text ref={topFaceRef} color={fontColor} fontSize={fontSize}>
          {topFaceText}
        </Text>
        <Text ref={bottomFaceRef} color={fontColor} fontSize={fontSize}>
          {bottomFaceText}
        </Text>
        <Text ref={frontFaceRef} color={fontColor} fontSize={fontSize}>
          {frontFaceText}
        </Text>
        <Text ref={backFaceRef} color={fontColor} fontSize={fontSize}>
          {backFaceText}
        </Text>
      </a.mesh>
    </>
  );
}
