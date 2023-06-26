import React, { useState } from 'react';
import { useSprings, animated, to } from 'react-spring';
import { useDrag } from 'react-use-gesture';
import styles from './styles.module.css';

const items = [
  { id: '1', text: 'Tag 1' },
  { id: '2', text: 'Tag 2' },
  { id: '3', text: 'Tag 3' },
  // Add as many tags as needed
];

const TagPlayground = () => {
  const [coords, setCoords] = useState(items.map(() => ({ x: 0, y: 0 })));

  const [springs, api] = useSprings(items.length, (i) => ({
    x: coords[i].x,
    y: coords[i].y,
    rotate: 0,
    scale: 1,
    config: { mass: 1, tension: 500, friction: 30 },
  }));

  const bind = useDrag(({ args: [index], down, movement: [mx, my], velocity }) => {
    const rotate = velocity * 10 * (index % 2 ? -1 : 1);
    const scale = down ? 1.1 : 1;

    if (!down) {
      // Store the new position when the drag ends
      setCoords((prev) => {
        const newCoords = [...prev];
        newCoords[index] = { x: mx, y: my };
        return newCoords;
      });
    }

    api.start((i) => {
      if (i !== index) return;
      return {
        x: mx,
        y: my,
        rotate: down ? rotate : 0,
        scale,
        immediate: down,
      };
    });
  });

  return (
    <div className={styles.playground}>
      {springs.map(({ x, y, rotate, scale }, i) => (
        <animated.div
          key={items[i].id}
          style={{
            transform: to(
              [x, y, rotate, scale],
              (x, y, r, s) => `translate3d(${x}px, ${y}px, 0) rotate(${r}deg) scale(${s})`,
            ),
          }}
          className={styles.tag}
          {...bind(i)}
        >
          {items[i].text}
        </animated.div>
      ))}
    </div>
  );
};

export default TagPlayground;
