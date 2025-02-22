import { XMarkIcon, EyeIcon } from "@heroicons/react/24/outline";
import PropTypes from "prop-types";
import { useState } from "react";

const Register = ({ onClose, onToggle }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: ""
  });

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Check if all fields are filled
  const isFormValid = formData.fullName && formData.email && formData.password;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      {/* Click Outside to Close */}
      <div className="absolute inset-0" onClick={onClose}></div>

      {/* Modal Box */}
      <div className="relative bg-white p-6 rounded-2xl shadow-xl w-[420px] md:w-[450px] z-50">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-200 transition duration-300 border border-black-600 ..."
        >
          <XMarkIcon className="h-6 w-6" />
        </button>

        {/* Title */}
        <h2 className="text-3xl font-bold text-gray-900">Join us</h2>
        <h3 className="text-2xl font-semibold mt-1 text-gray-900">
          Create a HackerRank account
        </h3>
        <p className="text-gray-600 text-sm mt-1 py-3">
          Be part of a 23 million-strong community of developers
        </p>
        {/* Input Fields */}
        <div className="mt-5 space-y-3">
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Full Name"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Your password"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <EyeIcon
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 cursor-pointer"
            />
          </div>
        </div>

        {/* Terms & Conditions */}
        <div className="flex items-center mt-3">
          <input type="checkbox" className="w-4 h-4 border-gray-300" />
          <p className="text-sm text-gray-600 ml-2">
            I agree to HackerRank’s{" "}
            <span className="text-blue-600 cursor-pointer hover:underline">
              Terms of Service
            </span>{" "}
            and{" "}
            <span className="text-blue-600 cursor-pointer hover:underline">
              Privacy Policy.
            </span>
          </p>
        </div>

        {/* Register Button */}
        <button
          disabled={!isFormValid}
          className={`w-full mt-4 py-3 rounded-md transition duration-300 ${
            isFormValid
              ? "bg-[#13457d] hover:bg-[#003066] text-white cursor-pointer"
              : "bg-gray-400 text-white cursor-not-allowed"
          }`}
        >
          Sign up
        </button>

        {/* Social Login */}
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
        {/* Login Link */}
        <p className="text-center text-sm mt-4 text-gray-600">
          Already have an account?{" "}
          <button
            onClick={onToggle} // Add onToggle here
            className="text-blue-600 hover:underline font-medium"
          >
            Log in
          </button>
        </p>
      </div>
    </div>
  );
};

// Define PropTypes
Register.propTypes = {
  onClose: PropTypes.func.isRequired,
  onToggle: PropTypes.func.isRequired
};

export default Register;
