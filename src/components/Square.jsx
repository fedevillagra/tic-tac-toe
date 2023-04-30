import styles from '../styles/Square.module.css';

const canMoveToSquare = (fromIndex, toIndex) => {
    fromIndex=parseInt(fromIndex)
    // Obtener los índices de los cuadrados vecinos
    const neighbors = [
      fromIndex - 3, // arriba
      fromIndex + 3, // abajo
      fromIndex - 1, // izquierda
      fromIndex + 1  // derecha
    ];

    // Si es la pieza central, puede moverse a cualquier cuadrado vecino
    if (fromIndex === 4) {
      return true;
    }

    // Si es una esquina, solo puede moverse a los cuadrados vecinos y al centro
    if (fromIndex % 2 === 0 && fromIndex !== 4) {
      neighbors.push(4); // añadir el centro
      return neighbors.includes(toIndex);
    }

  // Si es una pieza que no está en una esquina, solo puede moverse a los cuadrados vecinos adyacentes a su fila o columna
  if (fromIndex % 2 !== 0) {
    return neighbors.includes(toIndex);
  }

    return false;
};

const Square = (props) => {
  const dragging = () => { return (props.pieces==0 && props.value!=null) } //solo se pueden mover piezas cuando estas se acaban
  const dragstart = (e) => { 
      e.dataTransfer.setData('text/plain', props.value)
      e.target.id = props.i
      e.dataTransfer.setData('number', props.i)
  }
  const drop = (e) => {
    e.preventDefault();
    //cuadrado nuevo al que se dropeo
    const newSquare = e.currentTarget; 
    if (props.winner || newSquare.children.length) { //si ya gano o esta ocupado, no ejecuta nada
      return;
    }
      // value e i son del cuadrado viejo, mientras que ahora props.value y props.i son del cuadrado nuevo
      const value = e.dataTransfer.getData('text');
      const i = e.dataTransfer.getData('number');

      if (canMoveToSquare(i, props.i) && (value === 'X') === props.xIsNext) {// Si la pieza puede ser movida al cuadrado nuevo y es el turno del jugador actual
        //actualizar el ultimo movimiento drop al tablero
        const newSquares = [...props.squares];
        newSquares.splice(i, 1, props.value)
        newSquares[props.i] = value;
        props.setSquares(newSquares);
        props.setXIsNext(!props.xIsNext); //cambia el turno
    }
  }

  return (
    <button 
    className={styles.square} 
    onClick={props.onClick} 
    draggable={!props.winner && dragging()}
    onDragStart={dragstart} //pasa data de la pieza levantada hacia donde se quiere colocar
    onDragOver={(e) => e.preventDefault()}
    onDrop={drop} //mover pieza
    >
      {props.value === 'X' && <div className={styles.x}>X</div>}
      {props.value === 'O' && <div className={styles.o}>O</div>}
    </button>
  );
}

export default Square;