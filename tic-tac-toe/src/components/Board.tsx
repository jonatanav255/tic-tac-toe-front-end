import Cell from './Cell'

interface BoardProps  {

  board: string [][],
  onCellClick: (row: number, col: number) => void
}
function Board({ board, onCellClick } : BoardProps) {
  return (
    <div>
      {board.map((row, rowIndex) => (
        <div key={rowIndex} style={{ display: 'flex' }}>
          {row.map((cell, colIndex) => (
            <Cell
              key={`${rowIndex}-${colIndex}`}
              value={cell}
              onClick={() => onCellClick(rowIndex, colIndex)}
            />
          ))}
        </div>
      ))}
    </div>
  )
}

export default Board
