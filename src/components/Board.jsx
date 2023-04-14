import { useState } from 'react';
import Square from './Square';

const calculateWinner = (squares) => {
  const lines = [    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }

  return null;
};

const Board = () => {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [winner, setWinner] = useState(null);

  const handleClick = (i) => {
    if (winner || squares[i]) {
      return;
    }
    const newSquares = [...squares];
    newSquares[i] = xIsNext ? 'X' : 'O';
    setSquares(newSquares);
    setXIsNext(!xIsNext);
    const newWinner = calculateWinner(newSquares);
    if (newWinner) {
      setWinner(newWinner);
    }
  };

  const handleRestart = () => {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
    setWinner(null);
  };

  const renderSquare = (i) => {
    return (
      <Square
        value={squares[i]}
        onClick={() => handleClick(i)}
        disabled={winner || squares[i]}
      />
    );
  };

  const status = winner
    ? `Winner: ${winner}`
    : squares.every((square) => square !== null)
    ? 'Draw'
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
      {(winner || squares.every((square) => square !== null)) && (
        <button className="restart-btn" onClick={handleRestart}>
          Restart
        </button>
      )}
    </div>
  );
};

export default Board;
