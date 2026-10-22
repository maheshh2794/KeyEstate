
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useLoginUserMutation } from '../../services/registerApi'
import { login } from './userSlice'
import { useNavigate } from 'react-router-dom'

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
    <div>
      Email:
      <input
        type="email"
        value={user.email}
        onChange={(e) =>
          setUser({ ...user, email: e.target.value })
        }
      />

      <br />

      Password:
      <input
        type="password"
        value={user.password}
        onChange={(e) =>
          setUser({ ...user, password: e.target.value })
        }
      />

      <br />

      <button onClick={handleLogin}>Login</button>
    </div>
  )
}

export default Login
