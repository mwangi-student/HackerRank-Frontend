import React, { useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import UserContext from "../Contexts/UserContext";
import { toast } from "react-toastify";

export default function PasswordResetForm() {
  const { resetPassword } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const { token } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      toast.error("Invalid or missing reset token");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      await resetPassword(token, password);
      toast.success("Password successfully reset!");
      navigate("/login");
    } catch (error) {
      toast.error(error.message || "Failed to reset password");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center text-gray-700">
          Reset Password
        </h2>
        <p className="text-sm text-gray-500 text-center mb-4">
          Enter your email and new password
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Email
            </label>
            <input
              type="email"
              className="mt-1 w-full p-3 border rounded-lg focus:ring focus:ring-blue-300"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">
              New Password
            </label>
            <input
              type="password"
              className="mt-1 w-full p-3 border rounded-lg focus:ring focus:ring-blue-300"
              placeholder="Enter new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Confirm Password
            </label>
            <input
              type="password"
              className="mt-1 w-full p-3 border rounded-lg focus:ring focus:ring-blue-300"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Reset Password
          </button>
        </form>
        <button
          onClick={() => navigate("/login")}
          className="mt-4 w-full text-blue-600 hover:underline text-sm"
        >
          Back to Login
        </button>
      </div>
    </div>
  );
}
