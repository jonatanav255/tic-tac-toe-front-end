import { useState, useEffect } from 'react'
import Board from './components/Board'

// Assuming you're using Vite, you can access environment variables via import.meta.env
// const wsEndpoint = import.meta.env.VITE_WS_ENDPOINT || 'ws://localhost:8080'
// const wsEndpoint = import.meta.env.VITE_WS_ENDPOINT || 'https://api.tictactoe.jonathan-dev.com'
// const wsEndpoint = 'https://api.tictactoe.jonathan-dev.com'
const wsEndpoint = 'https://tic-tac-toe-production-0a5b.up.railway.app/'
console.log(wsEndpoint)

type Player = 'X' | 'O'
type Winner = Player | 'draw' | null

const initialBoard: string[][] = [
  ['', '', ''],
  ['', '', ''],
  ['', '', '']
]

function App () {
  const [board, setBoard] = useState<string[][]>(initialBoard)
  const [currentPlayer, setCurrentPlayer] = useState<Player>('X')
  const [winner, setWinner] = useState<Winner>(null)
  const [playerSymbol, setPlayerSymbol] = useState<Player | null>(null)
  const [socket, setSocket] = useState<WebSocket | null>(null)

  console.log("2----------CONTAINER APPPPPP----------------------------1")

  useEffect(() => {
    // Create the WebSocket connection using the environment variable
    const ws = new WebSocket(wsEndpoint)
    setSocket(ws)

    ws.onopen = () => {
      console.log('Connected to the WebSocket server')
    }

    ws.onmessage = (event: MessageEvent) => {
      // Parse the incoming message from the server
      const data = JSON.parse(event.data)
      console.log('Received:', data)

      // Handle different message types
      if (data.type === 'welcome') {
        // Store the player's symbol (X or O)
        setPlayerSymbol(data.player)
      } else if (data.type === 'start') {
        setBoard(data.board)
        setCurrentPlayer(data.currentPlayer)
        setWinner(null) // ensure winner is cleared
      } else if (data.type === 'update') {
        setBoard(data.board)
        setCurrentPlayer(data.currentPlayer)
      } else if (data.type === 'gameOver') {
        setBoard(data.board)
        setWinner(data.winner)
      } else if (data.type === 'error') {
        alert(data.message)
      } else if (data.type === 'notification') {
        alert(data.message)
      }
    }

    ws.onclose = () => {
      console.log('Disconnected from WebSocket server')
    }

    // Clean up the connection when the component unmounts
    return () => {
      ws.close()
    }
  }, [])

  const handleCellClick = (row: number, col: number) => {
    if (winner) return // Do nothing if the game is already over

    // Send a "move" message to the server
    if (socket && socket.readyState === WebSocket.OPEN) {
      const moveMessage = {
        type: 'move',
        row: row,
        col: col
      }
      socket.send(JSON.stringify(moveMessage))
    }
  }

  // Instead of just resetting local state, send a reset command to the server.
  const resetGame = () => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      const resetMessage = {
        type: 'reset'
      }
      socket.send(JSON.stringify(resetMessage))
    }
  }

  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <h1>Tic Tac Toe</h1>
      {playerSymbol && <p>You are player {playerSymbol}</p>}
      {winner ? (
        <h2>
          {winner === 'draw' ? 'Game is a draw!' : `Player ${winner} wins!`}
        </h2>
      ) : (
        <h2>Current Turn: {currentPlayer}</h2>
      )}
      <Board board={board} onCellClick={handleCellClick} />
      <button
        onClick={resetGame}
        style={{ marginTop: '20px', padding: '10px 20px' }}
      >
        Reset Game
      </button>
    </div>
  )
}

export default App
