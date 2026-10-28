
import { Link } from 'react-router-dom'
import './menu.css'

function Menu() {

    const role = window.localStorage.getItem("role")

    return (
        <aside className="dashboard-menu">
            <h2 className="menu-title">Dashboard</h2>

            <nav className="menu-links">
                <Link className="menu-link" to="/home/property">
                    <span className="menu-icon">⌂</span>
                    Home
                </Link>

                <Link className="menu-link" to="/home/property">
                    <span className="menu-icon">▦</span>
                    Properties
                </Link>

                <Link className="menu-link" to="/home/bookings">
                    <span className="menu-icon">▤</span>
                    Bookings
                </Link>

                {role === "buyer" && (
                    <>
                        <Link className="menu-link" to="/home/addproperty">
                            <span className="menu-icon">＋</span>
                            Add Property
                        </Link>

                        <Link className="menu-link" to="/home/addproperty">
                            <span className="menu-icon">▤</span>
                            Listings
                        </Link>
                    </>
                )}
                <Link className="menu-link" to="/home/favorites">
                    <span className="menu-icon">♡</span>
                    Favorites
                </Link>

                <Link className="menu-link" to="/home/profile">
                    <span className="menu-icon">♙</span>
                    My Profile
                </Link>
            </nav>
        </aside>
    )
}

export default Menu
