
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
    number: "",
    password: ""
  })

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const navigate = useNavigate()

  async function addUser(e) {
    e.preventDefault()

    if (isLoading) return

    setIsLoading(true)
    setError("")

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/adduser`, {
        method: "POST",
        body: JSON.stringify(newUser),
        headers: {
          "Content-Type": "application/json"
        }
      })

      const data = await response.json()

      if (response.ok) {
        navigate('/login')
      } else {
        setError(data.msg || "Registration failed. Please try again.")
      }

    } catch (error) {
      console.error("Registration error:", error)
      setError("Unable to connect to server. Please try again.")
    } finally {
      setIsLoading(false)
    }
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

        <form className="register-form" onSubmit={addUser}>

          <label className="register-label" htmlFor="name">Full Name</label>
          <input
            className="register-input"
            id="name"
            type="text"
            placeholder="Enter your full name"
            value={newUser.name}
            onChange={(e) => setnewUser({ ...newUser, name: e.target.value })}
            required
          />

          <label className="register-label" htmlFor="age">Age</label>
          <input
            className="register-input"
            id="age"
            type="number"
            min="1"
            max="120"
            placeholder="Enter your age"
            value={newUser.age || ""}
            onChange={(e) => setnewUser({ ...newUser, age: e.target.value })}
            required
          />

          <label className="register-label" htmlFor="gender">Gender</label>
          <select
            className="register-input register-select"
            name="gender"
            id="gender"
            value={newUser.gender}
            onChange={(e) => setnewUser({ ...newUser, gender: e.target.value })}
            required
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
            value={newUser.role}
            onChange={(e) => setnewUser({ ...newUser, role: e.target.value })}
            required
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
            value={newUser.email}
            onChange={(e) => setnewUser({ ...newUser, email: e.target.value })}
            required
          />

          <label className="register-label" htmlFor="number">Mobile Number</label>
          <input
            className="register-input"
            id="number"
            type="tel"
            placeholder="Enter your mobile number"
            maxLength="10"
            pattern="[0-9]{10}"
            value={newUser.number}
            onChange={(e) => setnewUser({ ...newUser, number: e.target.value })}
            required
          />

          <label className="register-label" htmlFor="password">Password</label>
          <input
            className="register-input"
            id="password"
            type="password"
            placeholder="Create a password"
            value={newUser.password}
            onChange={(e) => setnewUser({ ...newUser, password: e.target.value })}
            required
          />

          {error && (
            <p className="register-error">
              {error}
            </p>
          )}

          <button
            className="register-button"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Registering..." : "Register"}
          </button>

        </form>

        <p className="register-footer">
          Already part of KeyEstate? Create your account to get started.
        </p>

      </div>
    </div>
  )
}

export default Register
