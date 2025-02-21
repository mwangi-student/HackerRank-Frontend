import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Apply from "./pages/Apply";
import Home from "./pages/Home";
import Compete from "./pages/Compete";
import Prepare from "./pages/Prepare";
import Leaderboard from "./pages/Leaderboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/apply" element={<Apply />} />
        <Route path="/compete" element={<Compete />} />
        <Route path="/prepare" element={<Prepare />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
      </Routes>
    </Router>
  );
}

export default App;
