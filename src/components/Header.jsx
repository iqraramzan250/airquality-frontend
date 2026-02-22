import { memo } from 'react'
import reactLogo from '../assets/react.svg'
import viteLogo from '/vite.svg'
import './Header.css'

const Header = memo(() => {
  return (
    <header className="app-header">
      <div className="logo-container">
        <a 
          href="https://vite.dev" 
          target="_blank" 
          rel="noopener noreferrer"
          aria-label="Visit Vite website"
        >
          <img src={viteLogo} className="logo vite-logo" alt="Vite logo" />
        </a>
        <a 
          href="https://react.dev" 
          target="_blank" 
          rel="noopener noreferrer"
          aria-label="Visit React website"
        >
          <img src={reactLogo} className="logo react-logo" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
    </header>
  )
})

Header.displayName = 'Header'

export default Header
