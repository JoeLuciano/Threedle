import { useRef, useState, useEffect } from 'react';
import { Text } from '@react-three/drei';
import { useSpring, a } from '@react-spring/three';

export default function WordleBox(props) {
  const mesh = useRef();
  const frontFaceRef = useRef();
  const leftFaceRef = useRef();
  const backFaceRef = useRef();
  const rightFaceRef = useRef();

  const [currentFace, setCurrentFace] = useState(0);
  const [frontFaceText, setFrontFaceText] = useState('');
  const [leftFaceText, setLeftFaceText] = useState('');
  const [backFaceText, setBackFaceText] = useState('');
  const [rightFaceText, setRightFaceText] = useState('');

  const black = '#2F2F2F';
  const [frontFaceColor, setFrontFaceColor] = useState(black);
  const [topFaceColor, setTopFaceColor] = useState(black);
  const [backFaceColor, setBackFaceColor] = useState(black);
  const [bottomFaceColor, setBottomFaceColor] = useState(black);
  const [leftFaceColor, setLeftFaceColor] = useState(black);
  const [rightFaceColor, setRightFaceColor] = useState(black);

  const [currentY, setCurrentY] = useState(0);

  useEffect(() => {
    leftFaceRef.current.rotation.y -= Math.PI / 2;
    rightFaceRef.current.rotation.y += Math.PI / 2;
    backFaceRef.current.rotation.y += Math.PI;
  }, [mesh]);

  useEffect(() => {
    if (props.text) {
      setCurrentY((current) => current + Math.PI / 2);
      setCurrentFace((cur) => {
        return cur > 2 ? (cur = 0) : (cur += 1);
      });
      if (currentFace === 0) {
        setLeftFaceText(props.text);
      } else if (currentFace === 1) {
        setBackFaceText(props.text);
      } else if (currentFace === 2) {
        setRightFaceText(props.text);
      } else {
        setFrontFaceText(props.text);
      }
    }
  }, [props.text]);

  const { rotationY } = useSpring({
    rotationY: currentY,
    config: { duration: 500 },
  });

  return (
    <>
      <a.mesh {...props} ref={mesh} rotation-y={rotationY}>
        <boxBufferGeometry args={[1, 1, 1]} />
        <meshStandardMaterial attachArray='material' color={rightFaceColor} />
        <meshStandardMaterial attachArray='material' color={leftFaceColor} />
        <meshStandardMaterial attachArray='material' color={topFaceColor} />
        <meshStandardMaterial attachArray='material' color={bottomFaceColor} />
        <meshStandardMaterial attachArray='material' color={frontFaceColor} />
        <meshStandardMaterial attachArray='material' color={backFaceColor} />
        <Text
          ref={rightFaceRef}
          color={'#EC2D2D'}
          fontSize={1}
          position={[0.51, 0, 0]}>
          {rightFaceText}
        </Text>
        <Text
          ref={frontFaceRef}
          color={'#EC2D2D'}
          fontSize={1}
          position={[0, 0, 0.51]}>
          {frontFaceText}
        </Text>
        <Text
          ref={leftFaceRef}
          color={'#EC2D2D'}
          fontSize={1}
          position={[-0.51, 0, 0]}>
          {leftFaceText}
        </Text>
        <Text
          ref={backFaceRef}
          color={'#EC2D2D'}
          fontSize={1}
          position={[0, 0, -0.51]}>
          {backFaceText}
        </Text>
      </a.mesh>
    </>
  );
}
