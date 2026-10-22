import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Register() {

  const [newUser, setnewUser] = useState({
    name: "",
    age: 0,
    gender: "",
    role: "",
    email: "",
    password: ""
  })

  const navigate = useNavigate()

  function addUser() {
    fetch("http://localhost:4000/adduser", {
      method: "post",
      body: JSON.stringify(newUser),
      headers: {
        "Content-Type": "application/json"
      }
    }).then((response) => {
      if (response.ok) {
        navigate('/login')
      }
    })
  }


  return (
    <div>
      Name:<input type="text" onChange={(e) => setnewUser({ ...newUser, name: e.target.value })} />
      <br />
      Age:<input type="text" onChange={(e) => setnewUser({ ...newUser, age: e.target.value })} />
      <br />
      <label for="gender">Gender:</label>

      <select name="gender" id="gender" required onChange={(e) => setnewUser({ ...newUser, gender: e.target.value })}>
        <option value="" disabled selected>Select Gender</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="other">Other</option>
      </select>
      <br />
      Role:<input type="text" onChange={(e) => setnewUser({ ...newUser, role: e.target.value })} />
      <br />
      Email:<input type="email" onChange={(e) => setnewUser({ ...newUser, email: e.target.value })} />
      <br />
      Password:<input type="text" onChange={(e) => setnewUser({ ...newUser, password: e.target.value })} />
      <br />
      <button onClick={addUser}>Register</button>
    </div>
  )
}

export default Register