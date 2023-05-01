import { useEffect, useState } from 'react';
import Square from './Square';

const Board = () => {
  const [squares, setSquares] = useState(Array(9).fill(null)); //tablero
  const [xIsNext, setXIsNext] = useState(true); //turnos
  const [winner, setWinner] = useState(null); //ganador
  const [pieces,setPieces] = useState (6) //piezas
  useEffect(() => calculateWinner(squares), undefined); //revisa si algun jugador gano

  const handleClick = (i) => {
    if (winner || squares[i] || pieces === 0 ) { //si ya gano o ya esta ocupado, no ejecuta nada
      return;
    }
    const newSquares = [...squares]; //copia el tablero a uno aux
    newSquares[i] = xIsNext ? 'X' : 'O'; //agrega la jugada nueva al cuadrado seleccionado
    setSquares(newSquares); //actualiza el estado del tablero con la nueva jugada
    setPieces((p)=>p-1);
    setXIsNext(!xIsNext); //cambia el turno del jugador
  };

  const handleRestart = () => {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
    setWinner(null);
    setPieces(6);
  };

  const renderSquare = (i) => {
    return (
      <Square
        i={i}
        value={squares[i]} //enlaza cada cuadrado a un lugar del array tablero
        onClick={() => handleClick(i)} //cambia el value de la linea anterior
        disabled={winner || squares[i]} //si ya gano o ya esta ocupado el cuadrado se deshabilita
        pieces={pieces}
        setXIsNext={setXIsNext}
        xIsNext={xIsNext}
        setSquares={setSquares}
        squares={squares}
        winner={winner}
      />
    );
  };

  const calculateWinner = (squares) => {
    const lines = [    
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
  
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i]; //crea una variable aux con cada posible forma de ganar (posiciones)
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) { //evalua si las posiciones estan ocupadas por el mismo jugador 
        setWinner(squares[a]);
      }
    }
  };

  const status = winner //crea una variable dinamica que muestra el ganador o el turno
    ? `Winner: ${winner}`
    : `Next player: ${xIsNext ? 'X' : 'O'}`;

  return (
    <div className="board-container">
      <div className="status mb-8">{status}</div>
      <div className="board">
        <div className="board-row">
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
        </div>
        <div className="board-row">
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
        </div>
        <div className="board-row">
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
        </div>
      </div>
      { winner && (
        <button className="restart-btn" onClick={handleRestart}>
          Restart
        </button>
      )}
    </div>
  );
};

export default Board;
