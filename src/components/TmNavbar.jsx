import { useContext, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import UserContext from "../Contexts/UserContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../App.css";

const Navbar = () => {
  const { logout } = useContext(UserContext); // Get user from context
  const navigate = useNavigate();
  const location = useLocation();
  const [activeLink, setActiveLink] = useState(location.pathname);

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
                    activeLink === "/tm/assessment"
                      ? "border-b-2 border-green-500 text-sm text-green-500"
                      : ""
                  }`}
                  onClick={() => handleNavClick("/")}
                >
                  Assessments
                </button>
              </li>
              <li>
                <button
                  className={`text-white hover:text-[#79CCFF] py-4 text-sm ml-6 font-medium ${
                    activeLink === "/discover"
                      ? "border-b-2 border-green-500 text-sm ml-6 text-green-500"
                      : ""
                  }`}
                  onClick={() => handleNavClick("/discover")}
                >
                  Students
                </button>
              </li>
              <li>
                <button
                  className={`text-white hover:text-[#79CCFF] py-4 text-sm ml-6 font-medium ${
                    activeLink === "/discover"
                      ? "border-b-2 border-green-500 text-sm ml-6 text-green-500"
                      : ""
                  }`}
                  onClick={() => handleNavClick("/discover")}
                >
                  Stats
                </button>
              </li>
            </ul>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-4">
              <p className="text-white">Hello TM</p>
              <div className="text-gray-400">|</div>
              <div className="relative ml-3">
                <button
                  onClick={handleLogOut}
                  className="px-3 py-2 rounded-lg text-white bg-red-500 hover:bg-red-600 transition duration-175"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
