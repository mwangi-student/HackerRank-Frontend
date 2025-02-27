import { useState, useContext } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import UserContext from "../Contexts/UserContext";

const Register = ({ onClose, onToggle }) => {
  const { registerStudent, googleSignIn } = useContext(UserContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    cohort: "",
    tm_id: "",
    email: "",
    password: "",
    role: "student"
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Check if form is valid
  const isFormValid = Object.values(formData).every(
    (value) => value.trim() !== ""
  );

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid) {
      toast.error("Please fill out all fields before submitting.");
      return;
    }
    setLoading(true);
    const response = await registerStudent(formData);
    setLoading(false);

    if (response.success) {
      toast.success("Registration successful! Redirecting...");
      setTimeout(() => {
        onClose();
        onToggle();
      }, 1000);
    } else {
      toast.error(response.message || "Registration failed. Please try again.");
    }
  };

  // Handle Google Sign-In
  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
      // toast.success("Google sign-in successful!");
      setTimeout(() => {
        onClose();
        navigate("/prepare");
      }, 1000);
    } catch (error) {
      toast.error("Google sign-in failed. Please try again.");
      console.error(error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="absolute inset-0" onClick={onClose}></div>
      <div className="relative bg-white p-6 rounded-3xl shadow-xl w-[400px] md:w-[450px] z-50">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-bold">Join Us</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-200 transition duration-300 border border-black-600"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        <p className="text-gray-600 mt-1">Create an account to get started.</p>

        <form className="mt-5 space-y-3" onSubmit={handleSubmit}>
          {["fullName", "username", "cohort", "tm_id", "email"].map((field) => (
            <input
              key={field}
              type={field === "email" ? "email" : "text"}
              name={field}
              placeholder={field.replace(/_/g, " ")}
              value={formData[field]}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          ))}

          {/* Password Input */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Your password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="button"
              className="absolute right-3 top-3 text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className={`w-full mt-4 py-3 rounded-lg transition duration-300 ${
              isFormValid
                ? "bg-[#13457d] hover:bg-[#003066] text-white"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
            disabled={!isFormValid || loading}
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>

        {/* Google Sign-In Button */}
        <div className="mt-4">
          <button
            onClick={handleGoogleSignIn}
            className="w-full flex items-center justify-center py-3 border border-gray-300 rounded-lg hover:bg-gray-100 transition duration-300"
          >
            <img
              src="https://www.svgrepo.com/show/355037/google.svg"
              alt="Google"
              className="h-5 w-5 mr-2"
            />
            Sign up with Google
          </button>
        </div>

        {/* Toggle Login */}
        <p className="text-center text-sm mt-4">
          Already have an account?{" "}
          <button onClick={onToggle} className="text-blue-600 hover:underline">
            Log in
          </button>
        </p>
      </div>
    </div>
  );
};

Register.propTypes = {
  onClose: PropTypes.func.isRequired,
  onToggle: PropTypes.func.isRequired
};

export default Register;
