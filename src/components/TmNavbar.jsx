import { useContext, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import UserContext from "../Contexts/UserContext";
import ProfileModal from "./TmProfile"; // Import the ProfileModal component
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../App.css";

const Navbar = () => {
  const { logout, user } = useContext(UserContext); // Get user from context
  const navigate = useNavigate();
  const location = useLocation();
  const [activeLink, setActiveLink] = useState(location.pathname);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location.pathname]);

  const handleNavClick = (path) => {
    setActiveLink(path);
    navigate(path);
  };

  const handleLogOut = () => {
    try {
      console.log("Logging out...");
      logout(); // Ensure this function is valid
      console.log("Logout successful!");
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Error logging out. Please try again.");
    }
  };

  return (
    <div className="font-[Satoshi]">
      <nav className="bg-[#192533] px-2 py-2">
        <div className="flex justify-between items-center px-6">
          <div className="flex items-center space-x-4">
            <a className="flex items-center space-x-2 mr-6">
              <img
                src="/tm-hackerrank-logo.svg"
                alt="hackerrank-logo"
                className="h-8"
              />
              <h4 className="text-white font-semibold text-lg">HackerRank</h4>
              <div className="text-gray-400">|</div>
            </a>
            <ul className="flex items-center space-x-2">
              <li>
                <button
                  className={`text-white hover:text-[#79CCFF] py-4 text-sm font-medium ${
                    activeLink === "/tm/assessments"
                      ? "border-b-2 border-green-500 text-green-500"
                      : ""
                  }`}
                  onClick={() => handleNavClick("/tm/assessments")}
                >
                  Assessments
                </button>
              </li>
              <li>
                <button
                  className={`text-white hover:text-[#79CCFF] py-4 text-sm ml-6 font-medium ${
                    activeLink === "/tm/students"
                      ? "border-b-2 border-green-500 text-green-500"
                      : ""
                  }`}
                  onClick={() => handleNavClick("/tm/students")}
                >
                  Students
                </button>
              </li>
              <li>
                <button
                  className={`text-white hover:text-[#79CCFF] py-4 text-sm ml-6 font-medium ${
                    activeLink === "/tm/stats"
                      ? "border-b-2 border-green-500 text-green-500"
                      : ""
                  }`}
                  onClick={() => handleNavClick("/tm/stats")}
                >
                  Stats
                </button>
              </li>
            </ul>
          </div>

          <div className="flex items-center space-x-4">
            <button
              className="text-white hover:text-[#79CCFF] py-4 text-sm ml-6 font-medium"
              onClick={() => setIsProfileOpen(true)} // Open modal on click
            >
              Profile
            </button>
            <div className="text-gray-400">|</div>
            <button
              onClick={handleLogOut}
              className="px-3 py-2 rounded-lg text-white bg-red-500 hover:bg-red-600 transition duration-175"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Profile Modal */}
      <ProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        userData={user} // Pass user data from context
        onSave={(updatedUser) => {
          console.log("Updated Profile:", updatedUser);
          setIsProfileOpen(false);
        }}
      />
    </div>
  );
};

export default Navbar;
