import { useState } from 'react';
import Board from './components/Board';

const initialBoard = [
  ['', '', ''],
  ['', '', ''],
  ['', '', '']
];

function App() {
  const [board, setBoard] = useState(initialBoard);
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [winner, setWinner] = useState(null);

  const handleCellClick = (row, col) => {
    // Prevent moves if there's a winner or the cell is already filled
    if (winner || board[row][col] !== '') return;

    // Create a new board state with the move applied
    const newBoard = board.map((r, rowIndex) =>
      r.map((cell, colIndex) => {
        if (rowIndex === row && colIndex === col) {
          return currentPlayer;
        }
        return cell;
      })
    );
    setBoard(newBoard);

    // Check win conditions
    if (checkWin(newBoard, currentPlayer)) {
      setWinner(currentPlayer);
    } else if (checkDraw(newBoard)) {
      setWinner('Draw');
    } else {
      // Toggle player turn
      setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
    }
  };

  // Check rows, columns, and diagonals for a win
  const checkWin = (board, player) => {
    for (let i = 0; i < 3; i++) {
      if (
        board[i][0] === player &&
        board[i][1] === player &&
        board[i][2] === player
      )
        return true;
      if (
        board[0][i] === player &&
        board[1][i] === player &&
        board[2][i] === player
      )
        return true;
    }
    if (
      board[0][0] === player &&
      board[1][1] === player &&
      board[2][2] === player
    )
      return true;
    if (
      board[0][2] === player &&
      board[1][1] === player &&
      board[2][0] === player
    )
      return true;
    return false;
  };

  // Check if every cell is filled
  const checkDraw = (board) => {
    return board.every((row) => row.every((cell) => cell !== ''));
  };

  const resetGame = () => {
    setBoard(initialBoard);
    setCurrentPlayer('X');
    setWinner(null);
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Tic Tac Toe</h1>
      {winner ? (
        <h2>{winner === 'Draw' ? 'Game is a draw!' : `Player ${winner} wins!`}</h2>
      ) : (
        <h2>Current Turn: {currentPlayer}</h2>
      )}
      <Board board={board} onCellClick={handleCellClick} />
      <button onClick={resetGame} style={{ marginTop: '20px', padding: '10px 20px' }}>
        Reset Game
      </button>
    </div>
  );
}

export default App;
