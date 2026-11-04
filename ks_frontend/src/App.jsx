
import { Outlet } from 'react-router-dom'
import './App.css'
import Nav from './components/nav/Nav.jsx'

function App() {
  return (
    <div className="app-container">
      <Nav />

      <main className="app-main-content">
        <Outlet />
      </main>
    </div>
  )
}

export default App
