
import { Outlet } from 'react-router-dom'
import Header from './components/header/Header.jsx'
import './App.css'
import { useSelector } from 'react-redux'
import Body from './components/dashboard/Body.jsx'

function App() {

  const token = useSelector((state) => state.Ruser.token)

  return (
    <div>
      <Header />
      <br />
      {token ? <Body></Body> : <Outlet />}

    </div>
  )
}

export default App
