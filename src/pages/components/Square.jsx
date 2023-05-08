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

const canMoveToSquare = (fromIndex, toIndex) => {
    const possibleMoves = MOVES_MATRIX[fromIndex];
    return possibleMoves.includes(toIndex);
};

const Square = (props) => {
  //si no hay un ganador, las piezas se acaban y el cuadrado esta ocupado con una pieza, este se puede arrastrar
  const isDraggable = () => { return (!props.winner && props.pieces==0 && props.value!=null) }
  const dragstart = (e) => { 
      e.dataTransfer.setData('text/plain', props.value)
      e.dataTransfer.setData('number', props.i)
  }
  const drop = (e) => {
    e.preventDefault();
    const value = e.dataTransfer.getData('text/plain');
    const fromIndex = parseInt(e.dataTransfer.getData('number'), 10);
    const toIndex = props.i;
  
    // Si es un dispositivo táctil
    if (e.type === 'touchend') {
      // Obtener las coordenadas de la posición actual del dedo
      const clientX = e.changedTouches[0].clientX;
      const clientY = e.changedTouches[0].clientY;
  
      // Buscar el elemento en la página que se encuentre debajo del dedo
      const element = document.elementFromPoint(clientX, clientY);
      
      // Si el elemento es el botón y es un movimiento válido
      if (element === e.target && canMoveToSquare(fromIndex, toIndex) && !props.winner && props.squares[toIndex] == null && (value === 'X') === props.xIsNext) {
        const newSquares = [...props.squares];
        newSquares[toIndex] = value;
        newSquares[fromIndex] = null;
        props.setSquares(newSquares);
        props.setXIsNext(!props.xIsNext);
      }
    } else {
      // Si no es un dispositivo táctil, seguir usando el evento drop original
      if (!canMoveToSquare(fromIndex, toIndex) || props.winner || props.squares[toIndex] || (value==='X') !== props.xIsNext) {
        return;
      }
      const newSquares = [...props.squares];
      newSquares[toIndex] = value;
      newSquares[fromIndex] = null;
      props.setSquares(newSquares);
      props.setXIsNext(!props.xIsNext);
    }
  }

  return (
    <button 
    className={styles.square} 
    onClick={props.onClick} 
    draggable={isDraggable()}
    onDragStart={dragstart}
    onDragOver={(e) =>e.preventDefault()}
    onDrop={drop} 
    onTouchStart={drop} 
    onTouchEnd={drop}
    onTouchMove={drop}
    >
      {props.value === 'X' && <div className={styles.x}>X</div>}
      {props.value === 'O' && <div className={styles.o}>O</div>}
    </button>
  );
}

export default Square;