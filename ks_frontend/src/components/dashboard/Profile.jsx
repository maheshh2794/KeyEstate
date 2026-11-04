
import './profile.css'

function Profile() {

    const user = {
        name: window.localStorage.getItem("name"),
        email: window.localStorage.getItem("email"),
        gender: window.localStorage.getItem("gender"),
        role: window.localStorage.getItem("role")
    }

    return (
        <div className="profile-page">
            <div className="profile-header">
                <h2 className="profile-page-title">My Profile</h2>
                <p className="profile-page-subtitle">
                    Manage and view your account information.
                </p>
            </div>

            <div className="profile-card">
                <div className="profile-avatar">
                    {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                </div>

                <div className="profile-user-info">
                    <h3 className="profile-name">{user.name}</h3>
                    <p className="profile-email">{user.email}</p>
                    <span className="profile-role">{user.role}</span>
                </div>

                <div className="profile-divider"></div>

                <div className="profile-details">
                    <div className="profile-detail-item">
                        <span className="profile-detail-label">Full Name</span>
                        <span className="profile-detail-value">{user.name}</span>
                    </div>

                    <div className="profile-detail-item">
                        <span className="profile-detail-label">Email Address</span>
                        <span className="profile-detail-value">{user.email}</span>
                    </div>

                    <div className="profile-detail-item">
                        <span className="profile-detail-label">Gender</span>
                        <span className="profile-detail-value">{user.gender}</span>
                    </div>

                    <div className="profile-detail-item">
                        <span className="profile-detail-label">Account Role</span>
                        <span className="profile-detail-value">{user.role}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile
