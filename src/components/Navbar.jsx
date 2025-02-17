import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
const Navbar = () => {
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
    <div>
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-link-container">
            <ul className="nav-link-items">
              <li className="nav-item nav-logo-container">
                <a className="nav-item">
                  <img
                    src="/hackerrank_logo.svg fill.svg"
                    alt="hackerrank-logo"
                  />
                </a>
                <h4 className="nav-heading nav-item">HackerRank</h4>
                <div className="nav-seperator nav-item">|</div>
              </li>
              <li className="nav-item">
                <button
                  className={`nav-item ${
                    activeLink === "/prepare" ? "active" : ""
                  }`}
                  onClick={() => handleNavClick("/prepare")}
                >
                  <span>Prepare</span>
                </button>
              </li>
              <li className="nav-item">
                <button
                  className={`nav-item ${activeLink === "/" ? "active" : ""}`}
                  onClick={() => handleNavClick("/")}
                >
                  <span>Certify</span>
                </button>
              </li>
              <li className="nav-item">
                <button
                  className={`nav-item ${
                    activeLink === "/compete" ? "active" : ""
                  }`}
                  onClick={() => handleNavClick("/compete")}
                >
                  <span>Compete</span>
                </button>
              </li>
              <li className="nav-item">
                <button
                  className={`nav-item ${
                    activeLink === "/apply" ? "active" : ""
                  }`}
                  onClick={() => handleNavClick("/apply")}
                >
                  <span>Apply</span>
                </button>
              </li>
            </ul>
          </div>
          <div className="nav-buttons-container">
            <div className="search nav-item">
              <input type="text" placeholder="Search" className="search-box" />
            </div>
            <ul className="side-buttons-container">
              <li className="nav-item">
                <a href="#" className="btn-developers">
                  Hiring developers?
                </a>
              </li>
              <li className="nav-item">
                <button
                  onClick={() => setShowLogin(true)}
                  className="btn btn-login"
                >
                  Log In
                </button>
              </li>
              <li className="nav-item">
                <button
                  onClick={() => setShowRegister(true)}
                  className="btn btn-signup"
                >
                  Sign Up
                </button>
              </li>
            </ul>
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
