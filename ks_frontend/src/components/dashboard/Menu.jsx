
import { Link } from 'react-router-dom'

function Menu() {
    return (
        <div>
            <h2>Dashboard</h2>

            <Link to="/home/property">Properties</Link>
            <Link to="/home/profile">My Profile</Link>
            <Link to="/home/addproperty">Add Property</Link>
        </div>
    )
}

export default Menu
