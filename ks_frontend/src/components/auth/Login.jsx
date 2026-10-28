
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useLoginUserMutation } from '../../services/registerApi'
import { login } from './userSlice'
import { useNavigate } from 'react-router-dom'
import './login.css'

function Login() {
  const [user, setUser] = useState({
    email: "",
    password: ""
  })

  const navigate = useNavigate()

  const dispatch = useDispatch()
  const [loginUser] = useLoginUserMutation()

  function handleLogin() {
    loginUser(user)
      .then((res) => {
        console.log(res)

        if (res.data?.token) {
          dispatch(login({ token: res.data.token, name: res.data.name, email: res.data.email, gender: res.data.gender, role: res.data.role, id: res.data.id }))

          console.log("Token saved:", window.localStorage.getItem("token"))
          navigate('/home/property')

        } else {
          console.log("Login failed:", res.error || res.data)
        }
      })
      .catch((error) => {
        console.error("Login error:", error)
      })
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-header">
          <h1 className="login-title">Welcome Back</h1>
          <p className="login-subtitle">Sign in to your KeyEstate account</p>
        </div>

        <div className="login-form">
          <label className="login-label">Email Address</label>
          <input
            className="login-input"
            type="email"
            placeholder="Enter your email"
            value={user.email}
            onChange={(e) =>
              setUser({ ...user, email: e.target.value })
            }
          />

          <label className="login-label">Password</label>
          <input
            className="login-input"
            type="password"
            placeholder="Enter your password"
            value={user.password}
            onChange={(e) =>
              setUser({ ...user, password: e.target.value })
            }
          />

          <button className="login-button" onClick={handleLogin}>
            Login
          </button>
        </div>

        <p className="login-footer">
          Don't have an account? <a href="/register">Register here</a>
        </p>
      </div>
    </div>
  )
}

export default Login
