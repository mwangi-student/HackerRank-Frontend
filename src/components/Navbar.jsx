import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import "../App.css";

const Navbar = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [activeLink, setActiveLink] = useState(location.pathname);
  const user = "a";

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
                src="/hackerrank-logo.svg"
                alt="hackerrank-logo"
                className="h-8"
              />
              <h4 className="text-white font-semibold text-lg">HackerRank</h4>
              <div className="text-gray-400">|</div>
            </a>
            {user ? (
              <ul className="flex items-center space-x-2">
                <li>
                  <button
                    className={`text-white hover:text-[#79CCFF] py-4 text-sm font-bold ${
                      activeLink === "/prepare"
                        ? "border-b-2 border-[#18C8E7] text-[#18C8E7] text-sm font-bold"
                        : ""
                    }`}
                    onClick={() => handleNavClick("/prepare")}
                  >
                    Prepare
                  </button>
                </li>
                <li>
                  <button
                    className={`text-white hover:text-[#79CCFF] py-4 text-lg ml-6 text-sm font-bold ${
                      activeLink === "/compete"
                        ? "border-b-2 border-[#18C8E7] text-[#18C8E7] text-sm font-bold"
                        : ""
                    }`}
                    onClick={() => handleNavClick("/compete")}
                  >
                    Compete
                  </button>
                </li>
                <li>
                  <button
                    className={`text-white hover:text-[#79CCFF] py-4 text-lg ml-6 text-sm font-bold ${
                      activeLink === "/leaderboard"
                        ? "border-b-2 border-[#18C8E7] text-[#18C8E7] text-sm font-bold"
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
                    className={`text-white hover:text-[#79CCFF] py-4 text-sm font-bold ${
                      activeLink === "/"
                        ? "border-b-2 border-[#18C8E7] text-[#18C8E7] text-sm font-bold"
                        : ""
                    }`}
                    onClick={() => handleNavClick("/")}
                  >
                    Home
                  </button>
                </li>
                <li>
                  <button
                    className={`text-white hover:text-[#79CCFF] py-4 text-lg ml-6 mr-10 text-sm font-bold ${
                      activeLink === "/discover"
                        ? "border-b-2 border-[#18C8E7] text-[#18C8E7] text-sm font-bold"
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
            {user ? (
              <div className="flex items-center space-x-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="white"
                  className="size-7"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.25 9a6.75 6.75 0 0 1 13.5 0v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 0 1-.297 1.206c-1.544.57-3.16.99-4.831 1.243a3.75 3.75 0 1 1-7.48 0 24.585 24.585 0 0 1-4.831-1.244.75.75 0 0 1-.298-1.205A8.217 8.217 0 0 0 5.25 9.75V9Zm4.502 8.9a2.25 2.25 0 1 0 4.496 0 25.057 25.057 0 0 1-4.496 0Z"
                    clipRule="evenodd"
                  />
                </svg>
                <div className="text-gray-400">|</div>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="size-9">
                  <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" clipRule="evenodd" />
                </svg>

              </div>
            ) : (
              <ul className="flex items-center space-x-2">
                <li>
                  <button
                    onClick={() => setShowRegister(true)}
                    className="block px-3 py-2 rounded-lg text-base font-medium text-white bg-blue-500 hover:bg-[#18C8E7] transition duration-175 ease-in-out"
                  >
                    Sign Up
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setShowLogin(true)}
                    className="w-20 h-8 text-white font-semibold text-base"
                  >
                    Sign In
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
