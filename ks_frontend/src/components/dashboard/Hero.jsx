
import { Outlet } from 'react-router-dom'
import Menu from './Menu.jsx'

function Hero() {
  return (
    <div className="dashboard-layout">
      <Menu />
      <Outlet />
    </div>
  )
}

export default Hero
