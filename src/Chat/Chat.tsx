// src/Chat.tsx
import React, { useState, useEffect } from 'react'
// import type { Socket } from 'socket.io-client'
import io from 'socket.io-client'

const socket = io('https://tic-tac-toe-production-0a5b.up.railway.app/')

// const socket = io('http://localhost:3000') as Socket

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<string[]>([])
  const [input, setInput] = useState('')

  useEffect(() => {
    socket.on('chatMessage', (msg: string) => {
      setMessages(prev => [...prev, msg])
    })

    return () => {
      socket.off('chatMessage')
    }
  }, [])

  const sendMessage = () => {
    if (input.trim()) {
      socket.emit('chatMessage', input)
      setInput('')
    }
  }

  return (
    <div>
      <h2>Chat</h2>
      <div style={{ height: '300px', overflowY: 'scroll', border: '1px solid #ccc', padding: '10px' }}>
        {messages.map((msg, index) => (
          <div key={index}>{msg}</div>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
        placeholder="Type your message..."
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  )
}

export default Chat
