import { useState } from 'react';
import styles from '../../styles/Square.module.css';

const MOVES_MATRIX = [ //movimientos posibles
  [1, 3, 4],    // 0
  [0, 2, 4],    // 1
  [1, 4, 5],    // 2
  [0, 4, 6],    // 3
  [0, 1, 2, 3, 5, 6, 7, 8],    // 4
  [2, 4, 8],    // 5
  [3, 4, 7],    // 6
  [6, 4, 8],    // 7
  [5, 7, 4],    // 8
];

const CROSS_MOVES_MATRIX = [ //movimientos posibles
  [1, 3, 4],    // 0
  [0, 2, 3, 4, 5],    // 1
  [1, 4, 5],    // 2
  [0, 1, 4, 6, 7],    // 3
  [0, 1, 2, 3, 5, 6, 7, 8],    // 4
  [1, 2, 4, 7, 8],    // 5
  [3, 4, 7],    // 6
  [3, 4, 5, 6, 8],    // 7
  [5, 7, 4],    // 8
];

const Square = (props) => {
  const [touching, setTouching] = useState(false);
  const [touchData, setTouchData] = useState(null);

  const isDraggable = () => {
    return (!props.winner && props.pieces === 0 && props.value != null);
  };

  const dragstart = (e) => {
    if (props.pieces === 0) {
      e.dataTransfer.setData('text/plain', props.value);
      e.dataTransfer.setData('number', props.i);
    }
  };

  const drop = (e) => {
    if (props.pieces !== 0) return;

    const value = e.dataTransfer.getData('text/plain');
    const fromIndex = parseInt(e.dataTransfer.getData('number'), 10);
    const toIndex = props.i;

    const movesMatrix = props.dato === 'Cross-movements' ? CROSS_MOVES_MATRIX : MOVES_MATRIX;

    if (!canMoveToSquare(fromIndex, toIndex, movesMatrix) || props.winner || props.squares[toIndex] || (value === 'X') !== props.xIsNext) {
      return;
    }

    const newSquares = [...props.squares];
    newSquares[toIndex] = value;
    newSquares[fromIndex] = null;
    props.setSquares(newSquares);
    props.setXIsNext(!props.xIsNext);
  };

  const handleTouchStart = (e) => {
    if (props.pieces === 0 && props.value != null) {
      setTouching(true);
      setTouchData({ value: props.value, fromIndex: props.i });
    }
  };

  const handleTouchMove = (e) => {
    e.preventDefault();
  };

  const handleTouchEnd = (e) => {
    if (!touching || props.pieces !== 0) return;

    setTouching(false);

    const touch = e.changedTouches[0];
    const element = document.elementFromPoint(touch.clientX, touch.clientY);

    if (element && element.dataset.index) {
      const toIndex = parseInt(element.dataset.index, 10);

      const movesMatrix = props.dato === 'Cross-movements' ? CROSS_MOVES_MATRIX : MOVES_MATRIX;

      if (!canMoveToSquare(touchData.fromIndex, toIndex, movesMatrix) || props.winner || props.squares[toIndex] || (touchData.value === 'X') !== props.xIsNext) {
        return;
      }

      const newSquares = [...props.squares];
      newSquares[toIndex] = touchData.value;
      newSquares[touchData.fromIndex] = null;
      props.setSquares(newSquares);
      props.setXIsNext(!props.xIsNext);
    }
  };

  const canMoveToSquare = (fromIndex, toIndex, movesMatrix) => {
    const possibleMoves = movesMatrix[fromIndex];
    return possibleMoves.includes(toIndex);
  };

  return (
    <button 
      className={styles.square} 
      onClick={props.onClick} 
      draggable={isDraggable()}
      onDragStart={dragstart} 
      onDragOver={(e) => e.preventDefault()}
      onDrop={drop}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      data-index={props.i}
    >
      {props.value === 'X' && <div className={styles.x}>X</div>}
      {props.value === 'O' && <div className={styles.o}>O</div>}
    </button>
  );
}

export default Square;
