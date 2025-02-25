import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { XMarkIcon } from "@heroicons/react/24/outline";
import PropTypes from "prop-types";
import UserContext from "../Contexts/UserContext";

const Login = ({ onClose, onToggle }) => {
  const { login, googleSignIn } = useContext(UserContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ username: "", password: "" });
  const [role, setRole] = useState(""); // Keep role separate from formData
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(""); // Clear error on input change
  };

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  // Check if form is valid
  const isFormValid =
    formData.username.trim() !== "" &&
    formData.password.trim() !== "" &&
    (role === "student" || role === "tm");

  // Handle login submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid) return;

    setLoading(true);

    const response = await login(formData.username, formData.password); // Send only username & password
    setLoading(false);

    if (response.success) {
      // Use role to determine where to navigate (not sent to backend)
      if (role === "tm") {
        navigate("/prepare"); // Change path if needed
      } else {
        navigate("/prepare"); // Change path if needed
      }
      onClose(); // Close modal on success
    } else {
      setError(response.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="absolute inset-0" onClick={onClose}></div>

      <div className="relative bg-white p-6 rounded-3xl shadow-xl w-[400px] md:w-[450px] z-50">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-bold">
            Welcome Back! <br /> Login to your account
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-200 transition duration-300 border border-black-600"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        <p className="text-gray-600 mt-1">
          It is nice to see you again. Ready to code?
        </p>

        {error && <p className="text-red-600 text-sm mt-2">{error}</p>}

        <form className="mt-5 space-y-3" onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Your username or email"
            value={formData.username}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <select
            name="role"
            value={role}
            onChange={handleRoleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Role</option>
            <option value="student">Student</option>
            <option value="tm">Teaching Mentor (TM)</option>
          </select>

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

          <button
            type="submit"
            className={`w-full mt-4 py-3 rounded-lg transition duration-300 ${
              isFormValid
                ? "bg-[#13457d] hover:bg-[#003066] text-white"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
            disabled={!isFormValid || loading}
          >
            {loading ? "Logging in..." : "Log In"}
          </button>
        </form>

        <div className="flex justify-between items-center mt-3 text-sm">
          <label className="flex items-center space-x-2">
            <input type="checkbox" className="h-4 w-4" />
            <span>Remember me</span>
          </label>
          <a href="#" className="text-blue-600 hover:underline">
            Forgot password?
          </a>
        </div>

        <div className="flex items-center my-4">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="px-3 text-gray-500">or</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        <button onClick={handleGoogleSignIn} className="w-full flex items-center justify-center gap-2 border py-3 rounded-lg hover:bg-gray-100 transition duration-300">
          <img
            src="https://www.svgrepo.com/show/355037/google.svg"
            alt="Google"
            className="h-5 w-5"
          />
          Continue with Google
        </button>

        <p className="text-center text-sm mt-4">
          Do not have an account?{" "}
          <button onClick={onToggle} className="text-blue-600 hover:underline">
            Sign up
          </button>
        </p>
      </div>
    </div>
  );
};

Login.propTypes = {
  onClose: PropTypes.func.isRequired,
  onToggle: PropTypes.func.isRequired
};

export default Login;
