
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

    function handleChange(e) {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    }

    function handleEdit() {
        setFormData(user);
        setMessage("");
        setIsEditing(true);
    }

    function handleCancel() {
        setFormData(user);
        setIsEditing(false);
        setMessage("");
    }

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

            localStorage.setItem("name", updatedUser.name);
            localStorage.setItem("email", updatedUser.email);
            localStorage.setItem("age", updatedUser.age);
            localStorage.setItem("gender", updatedUser.gender);
            localStorage.setItem("number", updatedUser.number);

            setIsEditing(false);
            setMessage("Your profile has been updated successfully!");

        } catch (error) {
            setIsError(true);
            setMessage(
                error?.data?.msg || "Profile update failed. Please try again."
            );
        }
    }

    return (
        <div className="profile-page">

            {/* Page Heading */}
            <div className="profile-header">
                <div>
                    <span className="profile-eyebrow">
                        ACCOUNT SETTINGS
                    </span>

                    <h2 className="profile-page-title">
                        My Profile
                    </h2>

                    <p className="profile-page-subtitle">
                        Manage your personal information and account details.
                    </p>
                </div>
            </div>

            {/* Profile Card */}
            <div className="profile-card">

                {/* Profile Identity */}
                <div className="profile-top">

                    <div className="profile-avatar">
                        {user.name
                            ? user.name.charAt(0).toUpperCase()
                            : "U"}
                    </div>

                    <div className="profile-user-info">

                        <h3 className="profile-name">
                            {user.name || "User"}
                        </h3>

                        <p className="profile-email">
                            {user.email || "No email provided"}
                        </p>

                        <span className="profile-role">
                            <span className="profile-role-dot"></span>
                            {user.role || "User"}
                        </span>

                    </div>

                </div>

                <div className="profile-divider"></div>

                {/* Section Heading */}
                <div className="profile-section-heading">
                    <div>
                        <h3>Personal Information</h3>
                        <p>
                            {isEditing
                                ? "Update your details below."
                                : "Your registered account information."}
                        </p>
                    </div>

                    {!isEditing && (
                        <button
                            type="button"
                            className="profile-edit-btn"
                            onClick={handleEdit}
                        >
                            <span>✎</span> Edit Profile
                        </button>
                    )}
                </div>

                {/* Profile Form */}
                <form
                    className="profile-details"
                    onSubmit={handleSave}
                >

                    {/* Full Name */}
                    <div className="profile-detail-item">
                        <label className="profile-detail-label">
                            Full Name
                        </label>

                        {isEditing ? (
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="profile-input"
                                placeholder="Enter your full name"
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
                        <label className="profile-detail-label">
                            Email Address
                        </label>

                        {isEditing ? (
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="profile-input"
                                placeholder="Enter your email"
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
                        <label className="profile-detail-label">
                            Age
                        </label>

                        {isEditing ? (
                            <input
                                type="number"
                                name="age"
                                min="1"
                                max="120"
                                value={formData.age}
                                onChange={handleChange}
                                className="profile-input"
                                placeholder="Enter your age"
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
                        <label className="profile-detail-label">
                            Gender
                        </label>

                        {isEditing ? (
                            <select
                                name="gender"
                                value={formData.gender}
                                onChange={handleChange}
                                className="profile-input"
                                required
                            >
                                <option value="">Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                        ) : (
                            <span className="profile-detail-value">
                                {user.gender || "Not provided"}
                            </span>
                        )}
                    </div>

                    {/* Phone Number */}
                    <div className="profile-detail-item">
                        <label className="profile-detail-label">
                            Phone Number
                        </label>

                        {isEditing ? (
                            <input
                                type="tel"
                                name="number"
                                value={formData.number}
                                onChange={handleChange}
                                className="profile-input"
                                placeholder="Enter your phone number"
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
                        <label className="profile-detail-label">
                            Account Role
                        </label>

                        <span className="profile-detail-value profile-role-value">
                            {user.role || "Not provided"}
                        </span>
                    </div>

                    {/* Success / Error Message */}
                    {message && (
                        <div
                            className={`profile-message ${
                                isError ? "profile-error" : "profile-success"
                            }`}
                            role="status"
                        >
                            <span>
                                {isError ? "!" : "✓"}
                            </span>
                            {message}
                        </div>
                    )}

                    {/* Action Buttons */}
                    {isEditing && (
                        <div className="profile-actions">

                            <button
                                type="submit"
                                className="profile-save-btn"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <>
                                        <span className="profile-spinner"></span>
                                        Saving...
                                    </>
                                ) : (
                                    "Save Changes"
                                )}
                            </button>

                            <button
                                type="button"
                                className="profile-cancel-btn"
                                onClick={handleCancel}
                                disabled={isLoading}
                            >
                                Cancel
                            </button>

                        </div>
                    )}

                </form>

                {/* Footer */}
                <div className="profile-footer">
                    Your personal information is associated with your KeyEstate account.
                </div>

            </div>
        </div>
    );
}

export default Profile;
