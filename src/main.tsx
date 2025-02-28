import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import Chat from './Chat/Chat.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <div style={{display:"flex", gap:"10px"}}>
      <App />
      <Chat />
    </div>
  </StrictMode>
)
