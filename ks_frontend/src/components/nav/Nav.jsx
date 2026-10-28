
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../auth/userSlice'
import './nav.css'

function Nav() {
    const dispatch = useDispatch()

    const token = useSelector((state) => state.Ruser.token)

    return (
        <nav className="nav">
            <h1 className="nav-logo">KeyEstate</h1>

            <div className="nav-links">
                {token ? (
                    <Link
                        className="nav-link nav-logout"
                        to="/login"
                        onClick={() => dispatch(logout())}
                    >
                        Logout
                    </Link>
                ) : (
                    <>
                        <Link className="nav-link nav-login" to="/login">
                            Login
                        </Link>

                        <Link className="nav-link nav-register" to="/register">
                            Register
                        </Link>
                    </>
                )}
            </div>
        </nav>
    )
}

export default Nav
