import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { io } from 'socket.io-client';

import './App.css'
const socket = io('http://localhost:3000');

function App() {
  const [count, setCount] = useState(0)

  socket.on('backend', (message) => console.log(message))

  useEffect(() => {
    socket.emit('frontend', "helloefromfrontendzooor")

    const testRequest =  async ( ) => fetch('http://localhost:3000')
    testRequest()
  }, [])
  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
