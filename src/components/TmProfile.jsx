import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProfileModal = ({ isOpen, onClose, userData, onSave }) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Populate form data when userData changes
  useEffect(() => {
    if (userData) {
      setFormData({
        username: userData.username,
        email: userData.email,
        password: "",
        confirmPassword: "",
      });
    }
  }, [userData]);

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate password confirmation
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    try {
      const response = await fetch(`http://127.0.0.1:5000/tm/${userData.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password || undefined, // Only send password if it's not empty
        }),
      });

      if (!response.ok) throw new Error("Failed to update profile");

      const result = await response.json();
      toast.success(result.message);
      onSave({ ...userData, username: formData.username, email: formData.email }); // Notify parent of updated data
      onClose(); // Close the modal
    } catch (error) {
      console.error(error);
      toast.error("Error updating profile");
    }
  };

  // Handle account deletion
  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete your account? This action cannot be undone."
    );
    if (!confirmDelete) return;

    try {
      const response = await fetch(`http://127.0.0.1:5000/tm/${userData.id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) throw new Error("Failed to delete account");

      toast.success("Account deleted successfully");
      localStorage.removeItem("token"); // Clear token
      window.location.href = "/login"; // Redirect to login page
    } catch (error) {
      console.error(error);
      toast.error("Error deleting account");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-2xl">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Profile</h2>

        {/* Profile Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block font-medium text-gray-700">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="border p-2 rounded-lg w-full"
              required
            />
          </div>

          <div>
            <label className="block font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="border p-2 rounded-lg w-full"
              required
            />
          </div>

          <div>
            <label className="block font-medium text-gray-700">New Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="border p-2 rounded-lg w-full"
              placeholder="Leave blank to keep current password"
            />
          </div>

          <div>
            <label className="block font-medium text-gray-700">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="border p-2 rounded-lg w-full"
              placeholder="Confirm new password"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-between items-center mt-6">
            <button
              type="button"
              onClick={handleDelete}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              Delete Account
            </button>

            <div className="space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Save Changes
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileModal;