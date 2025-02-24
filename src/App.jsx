import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Discover from "./pages/Discover";
import Home from "./pages/Home";
import Compete from "./pages/Compete";
import Prepare from "./pages/Prepare";
import Leaderboard from "./pages/Leaderboard";
import Challenges from "./pages/Challenges";

function App() {
  return (
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
  );
}

export default App;
