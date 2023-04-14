import styles from '../styles/Square.module.css';

const Square = (props) => {
  return (
    <button className={styles.square} onClick={props.onClick}>
      {props.value === 'X' && <div className={styles.x}>X</div>}
      {props.value === 'O' && <div className={styles.o}>O</div>}
    </button>
  );
}

export default Square;
