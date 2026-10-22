
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../auth/userSlice'

function Nav() {
    const dispatch = useDispatch()

    const token = useSelector((state) => state.Ruser.token)
    return ( 
        <div className="nav">
            <h1>KeyEstate</h1>
            <div>
                {token ? (
                    <Link to="/login" onClick={() => dispatch(logout())}>Logout</Link>
                ) : (
                    <>
                        <Link to="/login">Login</Link>
                        <Link to="/register">Register</Link>
                    </>
                )}
            </div>
        </div>
    )
}

export default Nav
