
import { Outlet } from 'react-router-dom'
import Menu from './Menu.jsx'
import './hero.css'

function Hero() {
  return (
    <div className="dashboard-layout">
      <Menu />

      <main className="dashboard-content">
        <Outlet />
      </main>
    </div>
  )
}

export default Hero
