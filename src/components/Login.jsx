import { useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import PropTypes from "prop-types";

const Login = ({ onClose, onToggle }) => {
  const [formData, setFormData] = useState({ username: "", password: "" });

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Check if all fields are filled
  const isFormValid =
    formData.username.trim() !== "" && formData.password.trim() !== "";

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      {/* Click Outside to Close */}
      <div className="absolute inset-0" onClick={onClose}></div>

      {/* Modal Box */}
      <div className="relative bg-white p-6 rounded-3xl shadow-xl w-[400px] md:w-[450px] z-50">
        {/* Close Button */}
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-bold">
            Welcome Back! <br /> Login to your account
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-200 transition duration-300 border border-black-600 ..."
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        <p className="text-gray-600 mt-1">
          It is nice to see you again. Ready to code?
        </p>

        {/* Input Fields */}
        <div className="mt-5 space-y-3">
          <div className="relative">
            <input
              type="text"
              name="username"
              placeholder="Your username or email"
              value={formData.username}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="relative">
            <input
              type="password"
              name="password"
              placeholder="Your password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Login Button */}
        <button
          className={`w-full mt-4 py-3 rounded-lg transition duration-300 ${
            isFormValid
              ? "bg-[#13457d] hover:bg-[#003066] text-white"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
          disabled={!isFormValid}
        >
          Log In
        </button>

        {/* Remember Me & Forgot Password */}
        <div className="flex justify-between items-center mt-3 text-sm">
          <label className="flex items-center space-x-2">
            <input type="checkbox" className="h-4 w-4" />
            <span>Remember me</span>
          </label>
          <a href="#" className="text-blue-600 hover:underline">
            Forgot password?
          </a>
        </div>

        {/* OR Divider */}
        <div className="flex items-center my-4">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="px-3 text-gray-500">or</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        {/* Social Logins */}
        <button className="w-full flex items-center justify-center gap-2 border py-3 rounded-lg hover:bg-gray-100 transition duration-300">
          <img
            src="https://www.svgrepo.com/show/355037/google.svg"
            alt="Google"
            className="h-5 w-5"
          />
          Continue with Google
        </button>

        {/* Signup Link */}
        <p className="text-center text-sm mt-4">
          Do not have an account?{" "}
          <button
            onClick={onToggle} // Add onToggle here
            className="text-blue-600 hover:underline"
          >
            Sign up
          </button>
        </p>
      </div>
    </div>
  );
};

// Define PropTypes
Login.propTypes = {
  onClose: PropTypes.func.isRequired,
  onToggle: PropTypes.func.isRequired
};

export default Login;
