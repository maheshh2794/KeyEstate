
import { useState } from "react";
import { useUpdateProfileMutation } from "../../services/registerApi";
import "./profile.css";

function Profile() {

    const [user, setUser] = useState({
        name: localStorage.getItem("name") || "",
        email: localStorage.getItem("email") || "",
        age: localStorage.getItem("age") || "",
        gender: localStorage.getItem("gender") || "",
        number: localStorage.getItem("number") || "",
        role: localStorage.getItem("role") || ""
    });

    const [formData, setFormData] = useState(user);
    const [isEditing, setIsEditing] = useState(false);
    const [message, setMessage] = useState("");
    const [isError, setIsError] = useState(false);

    const [updateProfile, { isLoading }] =
        useUpdateProfileMutation();

    // Handle input changes
    function handleChange(e) {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    }

    // Open edit mode
    function handleEdit() {
        setFormData(user);
        setMessage("");
        setIsEditing(true);
    }

    // Cancel editing
    function handleCancel() {
        setFormData(user);
        setIsEditing(false);
        setMessage("");
    }

    // Save updated profile
    async function handleSave(e) {
        e.preventDefault();

        try {
            setMessage("");
            setIsError(false);

            const response = await updateProfile({
                name: formData.name.trim(),
                email: formData.email.trim(),
                age: Number(formData.age),
                gender: formData.gender,
                number: formData.number.trim()
            }).unwrap();

            const updatedUser = {
                ...user,
                name: response.user.name,
                email: response.user.email,
                age: response.user.age,
                gender: response.user.gender,
                number: response.user.number
            };

            setUser(updatedUser);
            setFormData(updatedUser);

            // Update localStorage
            localStorage.setItem("name", updatedUser.name);
            localStorage.setItem("email", updatedUser.email);
            localStorage.setItem("age", updatedUser.age);
            localStorage.setItem("gender", updatedUser.gender);
            localStorage.setItem("number", updatedUser.number);

            setIsEditing(false);
            setMessage("Profile updated successfully!");

        } catch (error) {
            setIsError(true);
            setMessage(
                error?.data?.msg || "Profile update failed. Please try again."
            );
        }
    }

    return (
        <div className="profile-page">

            <div className="profile-header">
                <h2 className="profile-page-title">
                    My Profile
                </h2>

                <p className="profile-page-subtitle">
                    Manage and view your account information.
                </p>
            </div>

            <div className="profile-card">

                {/* Profile Avatar */}
                <div className="profile-avatar">
                    {user.name
                        ? user.name.charAt(0).toUpperCase()
                        : "U"}
                </div>

                {/* Profile Header Details */}
                <div className="profile-user-info">

                    <h3 className="profile-name">
                        {user.name}
                    </h3>

                    <p className="profile-email">
                        {user.email}
                    </p>

                    <span className="profile-role">
                        {user.role}
                    </span>

                </div>

                <div className="profile-divider"></div>

                {/* Profile Form */}
                <form
                    className="profile-details"
                    onSubmit={handleSave}
                >

                    {/* Full Name */}
                    <div className="profile-detail-item">

                        <span className="profile-detail-label">
                            Full Name
                        </span>

                        {isEditing ? (
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="profile-input"
                                required
                            />
                        ) : (
                            <span className="profile-detail-value">
                                {user.name || "Not provided"}
                            </span>
                        )}

                    </div>

                    {/* Email */}
                    <div className="profile-detail-item">

                        <span className="profile-detail-label">
                            Email Address
                        </span>

                        {isEditing ? (
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="profile-input"
                                required
                            />
                        ) : (
                            <span className="profile-detail-value">
                                {user.email || "Not provided"}
                            </span>
                        )}

                    </div>

                    {/* Age */}
                    <div className="profile-detail-item">

                        <span className="profile-detail-label">
                            Age
                        </span>

                        {isEditing ? (
                            <input
                                type="number"
                                name="age"
                                min="1"
                                max="120"
                                value={formData.age}
                                onChange={handleChange}
                                className="profile-input"
                                required
                            />
                        ) : (
                            <span className="profile-detail-value">
                                {user.age || "Not provided"}
                            </span>
                        )}

                    </div>

                    {/* Gender */}
                    <div className="profile-detail-item">

                        <span className="profile-detail-label">
                            Gender
                        </span>

                        {isEditing ? (
                            <select
                                name="gender"
                                value={formData.gender}
                                onChange={handleChange}
                                className="profile-input"
                                required
                            >
                                <option value="">
                                    Select Gender
                                </option>

                                <option value="Male">
                                    Male
                                </option>

                                <option value="Female">
                                    Female
                                </option>

                                <option value="Other">
                                    Other
                                </option>
                            </select>
                        ) : (
                            <span className="profile-detail-value">
                                {user.gender || "Not provided"}
                            </span>
                        )}

                    </div>

                    {/* Phone Number */}
                    <div className="profile-detail-item">

                        <span className="profile-detail-label">
                            Phone Number
                        </span>

                        {isEditing ? (
                            <input
                                type="tel"
                                name="number"
                                value={formData.number}
                                onChange={handleChange}
                                className="profile-input"
                                required
                            />
                        ) : (
                            <span className="profile-detail-value">
                                {user.number || "Not provided"}
                            </span>
                        )}

                    </div>

                    {/* Account Role */}
                    <div className="profile-detail-item">

                        <span className="profile-detail-label">
                            Account Role
                        </span>

                        <span className="profile-detail-value">
                            {user.role || "Not provided"}
                        </span>

                    </div>

                    {/* Success/Error Message */}
                    {message && (
                        <p
                            className="profile-message"
                            style={{
                                color: isError ? "#c33f55" : "#25865d"
                            }}
                        >
                            {message}
                        </p>
                    )}

                    {/* Buttons */}
                    <div className="profile-actions">

                        {isEditing ? (
                            <>
                                <button
                                    type="submit"
                                    className="profile-save-btn"
                                    disabled={isLoading}
                                >
                                    {isLoading
                                        ? "Saving..."
                                        : "Save Changes"}
                                </button>

                                <button
                                    type="button"
                                    className="profile-cancel-btn"
                                    onClick={handleCancel}
                                    disabled={isLoading}
                                >
                                    Cancel
                                </button>
                            </>
                        ) : (
                            <button
                                type="button"
                                className="profile-edit-btn"
                                onClick={handleEdit}
                            >
                                Update Profile
                            </button>
                        )}

                    </div>

                </form>

            </div>

        </div>
    );
}

export default Profile;
