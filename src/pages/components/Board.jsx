import Link from 'next/link';
import { useEffect, useState } from 'react';
import Square from './Square';
import { useRouter } from 'next/router';

const Board = () => {
  const [squares, setSquares] = useState(Array(9).fill(null)); //tablero
  const [xIsNext, setXIsNext] = useState(true); //turnos
  const [winner, setWinner] = useState(null); //ganador
  const [pieces,setPieces] = useState (6) //piezas
  useEffect(() => calculateWinner(squares), undefined); //revisa si algun jugador gano

  const router = useRouter();
  const dato = router.query.dato;

  const handleClick = (i) => {
    if (winner || squares[i] || pieces === 0 ) { return; } //si ya gano o ya esta ocupado, no ejecuta nada
    if(dato=='No-middle' && i==4 && pieces==6 ){ return; } //quien empieza no puede poner en medio en "No-middle mode"
    const newSquares = [...squares]; //copia el tablero a uno aux
    newSquares[i] = xIsNext ? 'X' : 'O'; //agrega la jugada nueva al cuadrado seleccionado
    setSquares(newSquares); //actualiza el estado del tablero con la nueva jugada
    (dato=='Moving' || dato=='No-middle') && setPieces((p)=>p-1); //resta una pieza en "Moving mode"
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
    : squares.every((square) => square !== null)
    ? 'Draw'
    : `Next player: ${xIsNext ? 'X' : 'O'}`;

  return (
    <div className="game-container flex flex-col items-center justify-center h-screen">
    <h1 className="text-3xl font-bold mb-8">Tic Tac Toe</h1>
    <div className="game">
      <div className="game-board">
        <div className="board-container">
          <div className="status mb-5">{status}</div>
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
          { (winner || squares.every((square) => square !== null)) && (
            <button className="restart-btn float-left mt-5" onClick={handleRestart}>
              Restart
            </button>
          )}
          <div className="float-right mt-5">
            <Link href="../TicTacToe" className="restart-btn">Back to menu</Link>
          </div>
        </div>
      </div>
    </div>
      <div className="game-info">
        <div>{/* status */}</div>
        <ol>{/* TODO */}</ol>
     </div>
    </div>
  );
};

export default Board;
