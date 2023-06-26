import React from 'react';
import { Canvas } from 'react-three-fiber';
import { Physics } from '@react-three/cannon';
import BoxComponent from '../../components/BoxComponent';
import Ground from '../../components/Ground';
import StripeCheckoutButton from '../../components/StripeCheckoutButton';

const Test = () => {
  return (
    <>
      {' '}
      <StripeCheckoutButton />
      <Canvas shadowMap>
        <color attach="background" args={['#171717']} />
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 15, 10]} penumbra={1} castShadow />
        <Physics>
          <BoxComponent position={[0, 2, 0]} />
          <Ground rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} />
        </Physics>
      </Canvas>
    </>
  );
};

export default Test;
