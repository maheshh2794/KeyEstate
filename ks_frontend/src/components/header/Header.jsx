
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../auth/userSlice'

function Header() {
    const dispatch = useDispatch()

    const token = useSelector((state) => state.Ruser.token)
    return ( 
        <header>
            <h1>KeyEstate</h1>
            <div>
                {token ? (
                    <button onClick={() => dispatch(logout())}>
                        Logout
                    </button>
                ) : (
                    <>
                        <Link to="/login">Login</Link>
                        <Link to="/register">Register</Link>
                    </>
                )}
            </div>
        </header>
    )
}

export default Header
