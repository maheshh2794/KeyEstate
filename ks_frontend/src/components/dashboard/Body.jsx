import React from 'react'
import Menu from './Menu'
import { Outlet } from 'react-router-dom'

function Body() {
  return (
    <div>
        <div>
            <Menu></Menu>
        </div>
        <div>
            <Outlet></Outlet>
        </div>
    </div>
  )
}

export default Body