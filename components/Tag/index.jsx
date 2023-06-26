import { useDrag } from 'react-dnd';
import styles from './styles.module.css';

const Tag = ({ id, text }) => {
  const [{ isDragging }, drag] = useDrag({
    item: { type: 'tag', id }, // Add the `type` property here
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  return (
    <div className={`${styles.tag} ${isDragging ? styles.dragging : ''}`} ref={drag}>
      {text}
    </div>
  );
};

export default Tag;
