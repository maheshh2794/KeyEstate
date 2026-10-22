


function Profile() {

    const user = {
        name: window.localStorage.getItem("name"),
        email: window.localStorage.getItem("email"),
        gender: window.localStorage.getItem("gender"),
        role: window.localStorage.getItem("role")
    }

    return (
        <div>
            <h2>Profile</h2>
            <p>Welcome to your profile page!</p>
            <div>
                <h3>{user.name}</h3>
                <p>{user.email}</p>
                <p>Role: {user.role}</p>
            </div>
        </div>
    )
}

export default Profile