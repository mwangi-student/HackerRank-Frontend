import { useState } from "react";
import { Footer, Navbar } from "../components/index";
import { Link } from "react-router-dom";
import Register from "../components/Register";
import Login from "../components/Login"; // Assuming you have a Login component

function Home() {
  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  // Function to switch to the Register (Sign Up) modal
  const handleShowRegister = () => {
    setShowRegister(true);
    setShowLogin(false);
  };

  // Function to switch to the Login (Sign In) modal
  const handleShowLogin = () => {
    setShowLogin(true);
    setShowRegister(false);
  };

  return (
    <div className="font-[Montserrat] flex flex-col min-h-screen w-full">
      <div className="fixed top-0 w-full z-[100]">
        <Navbar />
      </div>
      <main className="flex-grow">
        <div className="h-[400px] w-full items-center text-center gap-5 p-[5%] flex-wrap bg-gradient-to-b from-[rgba(178,248,253,0.8)] to-[#dddddd00]">
          <h2 className="text-[38px] font-bold mx-auto mt-12 text-[#003066]">
            Welcome to HackerRank
          </h2>
          <p className="font-bold text-lg">
            Hub for Coding Assessments & Skill Growth
          </p>
          <p className="text-lg mt-6 px-[150px] font-medium">
            HackerRank is the ultimate platform for testing, improving, and
            showcasing your coding skills. Get real-world challenges, instant
            feedback, and performance insights—all in one place!
          </p>
        </div>
        <div className="h-[200px] w-full items-center text-center gap-5 py-[2%] px-[5%] ">
          <p className="text-lg font-medium px-[150px] mb-10">
            HackerRank is a powerful platform designed to evaluate and enhance
            the technical skills of software development students. Inspired by
            platforms like HackerRank, our system automates technical
            assessments, allowing students to showcase their coding abilities
            while enabling mentors to efficiently review, grade, and provide
            feedback.
          </p>
          <Link
            to="/discover"
            className="py-7 px-9 bg-[#003066] text-lg text-white rounded-full"
          >
            Discover
          </Link>
        </div>
        <div className="h-[170px] w-full items-center text-center gap-5 mt-[110px] py-2 px-[5%] bg-[#003066]">
          <p className="text-xl font-bold px-[150px] my-10 text-white">
            Are you ready to start?
          </p>
          <button
            onClick={handleShowLogin}
            className="w-20 h-8 text-white font-semibold text-base rounded-lg bg-blue-600  "
          >
            Sign In
          </button>
          <button
            onClick={handleShowRegister}
            className="w-20 h-8 text-white font-semibold text-base ml-4"
          >
            Sign Up
          </button>
        </div>
        <Footer />
      </main>

      {/* Sign In Modal */}
      {showLogin && (
        <Login
          onClose={() => setShowLogin(false)}
          onToggle={handleShowRegister} // Switch to Sign Up
        />
      )}

      {/* Sign Up Modal */}
      {showRegister && (
        <Register
          onClose={() => setShowRegister(false)}
          onToggle={handleShowLogin} // Switch to Sign In
        />
      )}
    </div>
  );
}

export default Home;
