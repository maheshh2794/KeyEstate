import React from 'react'
import { Link } from 'react-router-dom'

function Menu() {
  return (
    <div>
        <h1>Dashboard</h1>
        <Link to="/body">Properties</Link>
        <Link to="/body/property">View Properties</Link>
        <Link to="/body/profile">My Profile</Link>

    </div>
  )
}

export default Menu