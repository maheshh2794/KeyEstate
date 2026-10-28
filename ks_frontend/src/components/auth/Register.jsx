
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './register.css'

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
    <div className="register-page">
      <div className="register-card">
        <div className="register-header">
          <h1 className="register-title">Create Account</h1>
          <p className="register-subtitle">
            Join KeyEstate and find your perfect place.
          </p>
        </div>

        <div className="register-form">
          <label className="register-label" htmlFor="name">Full Name</label>
          <input
            className="register-input"
            id="name"
            type="text"
            placeholder="Enter your full name"
            onChange={(e) => setnewUser({ ...newUser, name: e.target.value })}
          />

          <label className="register-label" htmlFor="age">Age</label>
          <input
            className="register-input"
            id="age"
            type="text"
            placeholder="Enter your age"
            onChange={(e) => setnewUser({ ...newUser, age: e.target.value })}
          />

          <label className="register-label" htmlFor="gender">Gender</label>
          <select
            className="register-input register-select"
            name="gender"
            id="gender"
            required
            defaultValue=""
            onChange={(e) => setnewUser({ ...newUser, gender: e.target.value })}
          >
            <option value="" disabled>Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>

          <label className="register-label" htmlFor="role">Role</label>
          <select
            className="register-input register-select"
            name="role"
            id="role"
            required
            defaultValue=""
            onChange={(e) => setnewUser({ ...newUser, role: e.target.value })}
          >
            <option value="" disabled>Select Role</option>
            <option value="buyer">Buyer</option>
            <option value="seller">Seller</option>
          </select>

          <label className="register-label" htmlFor="email">Email Address</label>
          <input
            className="register-input"
            id="email"
            type="email"
            placeholder="Enter your email"
            onChange={(e) => setnewUser({ ...newUser, email: e.target.value })}
          />

          <label className="register-label" htmlFor="password">Password</label>
          <input
            className="register-input"
            id="password"
            type="text"
            placeholder="Create a password"
            onChange={(e) => setnewUser({ ...newUser, password: e.target.value })}
          />

          <button className="register-button" onClick={addUser}>
            Register
          </button>
        </div>

        <p className="register-footer">
          Already part of KeyEstate? Create your account to get started.
        </p>
      </div>
    </div>
  )
}

export default Register
