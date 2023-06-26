import React from 'react';
import { useBox } from '@react-three/cannon';
import { Box } from '@react-three/drei';

const BoxComponent = (props) => {
  const [ref, api] = useBox(() => ({ mass: 1, args: [1, 1, 1], ...props }));
  return (
    <mesh
      ref={ref}
      castShadow
      receiveShadow
      onPointerDown={() => {
        api.velocity.set(0, 2, 0);
      }}
    >
      <Box args={[1, 1, 1]} />
      <meshStandardMaterial attach="material" color="hotpink" />
    </mesh>
  );
};

export default BoxComponent;
