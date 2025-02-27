import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { UserProvider } from "./Contexts/UserContext";
import Discover from "./pages/student/Discover";
import Home from "./pages/student/Home";
import Compete from "./pages/student/Compete";
import Prepare from "./pages/student/Prepare";
import Leaderboard from "./pages/student/Leaderboard";
import Challenges from "./pages/student/Challenges";
import PasswordReset from "./pages/PasswordReset";
import PasswordResetForm from "./pages/PassworResetForm";

import AdminAssessment from "./pages/tm/AdminAssessment";
import Students from "./pages/tm/Students";
import Statistics from "./pages/tm/Statistics";

function App() {
  return (
    <UserProvider>
      <ToastContainer position="top-right" autoClose={3000} />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/discover" element={<Discover />} />
          <Route path="/compete" element={<Compete />} />
          <Route path="/prepare" element={<Prepare />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/practice/:language" element={<Challenges />} />
          <Route path="/password-reset" element={<PasswordReset />} />
          <Route
            path="/reset-password/:token"
            element={<PasswordResetForm />}
          />
          <Route path="/tm/assessments" element={<AdminAssessment />} />
          <Route path="/tm/students" element={<Students />} />
          <Route path="/tm/stats" element={<Statistics />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
