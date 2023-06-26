import React from 'react';
import { usePlane } from '@react-three/cannon';
import { Plane } from '@react-three/drei';

const Ground = (props) => {
  const [ref] = usePlane(() => ({ mass: 0, ...props }));
  return (
    <mesh ref={ref} receiveShadow>
      <Plane args={[100, 100]} />
      <meshStandardMaterial attach="material" color="lightblue" />
    </mesh>
  );
};

export default Ground;
