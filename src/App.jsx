import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UserProvider } from "./Contexts/UserContext";
import Discover from "./pages/student/Discover";
import Home from "./pages/student/Home";
import Compete from "./pages/student/Compete";
import Prepare from "./pages/student/Prepare";
import Leaderboard from "./pages/student/Leaderboard";
import Challenges from "./pages/student/Challenges";

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/discover" element={<Discover />} />
          <Route path="/compete" element={<Compete />} />
          <Route path="/prepare" element={<Prepare />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/practice/:language" element={<Challenges />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
