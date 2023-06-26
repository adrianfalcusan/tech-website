import React from 'react';
import Image from 'next/image';

import BlockchainRain from '../components/BlockchainRain';
import gearWheel from '../assets/gear.svg';
import TagsPlayground from '../components/TagsPlayground';

import styles from './HomePage.module.css';

const HomePage = () => {
  return (
    <div>
      <div className={styles.container}>
        <Image src={gearWheel} className={styles.wheel}></Image>
      </div>
      <BlockchainRain />
      <TagsPlayground />
    </div>
  );
};

export default HomePage;
