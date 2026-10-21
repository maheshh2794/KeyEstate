
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useLoginUserMutation } from '../../services/registerApi'
import { login } from './userSlice'

function Login() {
  const [user, setUser] = useState({
    email: "",
    password: ""
  })

  const dispatch = useDispatch()
  const [loginUser] = useLoginUserMutation()

  function handleLogin() {
    loginUser(user)
      .then((res) => {
        console.log(res)

        if (res.data?.token) {
          dispatch(login({ token: res.data.token }))

          console.log("Token saved:",window.localStorage.getItem("token"))
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
