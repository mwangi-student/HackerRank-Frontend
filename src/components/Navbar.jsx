import { useContext, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import UserContext from "../Contexts/UserContext";
import Login from "./Login";
import Register from "./Register";
import "../App.css";

const Navbar = () => {
  const { currentUser, logout } = useContext(UserContext); // Get user from context
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
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

  return (
    <div className="font-[Satoshi]">
      <nav className="bg-[#192533] px-2 py-2">
        <div className="flex justify-between items-center px-6">
          <div className="flex items-center space-x-4">
            <a className="flex items-center space-x-2 mr-6">
              <img
                src="/hackerrank_logo.svg fill.svg"
                alt="hackerrank-logo"
                className="h-8"
              />
              <h4 className="text-white font-semibold text-lg">HackerRank</h4>
              <div className="text-gray-400">|</div>
            </a>

            {currentUser ? ( // Show different navigation if logged in
              <ul className="flex items-center space-x-2">
                <li>
                  <button
                    className={`text-white hover:text-[#79CCFF] py-4 text-sm font-medium ${
                      activeLink === "/prepare"
                        ? "border-b-2 border-[#18C8E7] text-[#18C8E7]"
                        : ""
                    }`}
                    onClick={() => handleNavClick("/prepare")}
                  >
                    Prepare
                  </button>
                </li>
                <li>
                  <button
                    className={`text-white hover:text-[#79CCFF] py-4 text-sm font-medium ${
                      activeLink === "/compete"
                        ? "border-b-2 border-[#18C8E7] text-[#18C8E7]"
                        : ""
                    }`}
                    onClick={() => handleNavClick("/compete")}
                  >
                    Compete
                  </button>
                </li>
                <li>
                  <button
                    className={`text-white hover:text-[#79CCFF] py-4 text-sm font-medium ${
                      activeLink === "/leaderboard"
                        ? "border-b-2 border-[#18C8E7] text-[#18C8E7]"
                        : ""
                    }`}
                    onClick={() => handleNavClick("/leaderboard")}
                  >
                    Leaderboard
                  </button>
                </li>
              </ul>
            ) : (
              <ul className="flex items-center space-x-2">
                <li>
                  <button
                    className={`text-white hover:text-[#79CCFF] py-4 text-sm font-medium ${
                      activeLink === "/"
                        ? "border-b-2 border-[#18C8E7] text-[#18C8E7]"
                        : ""
                    }`}
                    onClick={() => handleNavClick("/")}
                  >
                    Home
                  </button>
                </li>
                <li>
                  <button
                    className={`text-white hover:text-[#79CCFF] py-4 text-sm font-medium ${
                      activeLink === "/discover"
                        ? "border-b-2 border-[#18C8E7] text-[#18C8E7]"
                        : ""
                    }`}
                    onClick={() => handleNavClick("/discover")}
                  >
                    Discover
                  </button>
                </li>
              </ul>
            )}
          </div>

          <div className="flex items-center space-x-4">
            {currentUser ? (
              <div className="flex items-center space-x-4">
                <span className="text-white font-semibold">
                  {currentUser.username}
                </span>
                <button
                  onClick={logout}
                  className="px-3 py-2 rounded-lg text-white bg-red-500 hover:bg-red-600 transition duration-175"
                >
                  Logout
                </button>
              </div>
            ) : (
              <ul className="flex items-center space-x-2">
                <li>
                  <button
                    onClick={() => setShowLogin(true)}
                    className="block px-3 py-2 rounded-lg text-white bg-blue-500 hover:bg-[#18C8E7] transition duration-175"
                  >
                    Sign In
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setShowRegister(true)}
                    className="w-20 h-8 text-white font-semibold"
                  >
                    Sign Up
                  </button>
                </li>
              </ul>
            )}
          </div>
        </div>
      </nav>

      {showLogin && (
        <Login
          onClose={() => setShowLogin(false)}
          onToggle={() => {
            setShowLogin(false);
            setShowRegister(true);
          }}
        />
      )}
      {showRegister && (
        <Register
          onClose={() => setShowRegister(false)}
          onToggle={() => {
            setShowRegister(false);
            setShowLogin(true);
          }}
        />
      )}
    </div>
  );
};

export default Navbar;
