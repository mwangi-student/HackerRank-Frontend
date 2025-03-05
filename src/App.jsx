import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { UserProvider } from "./Contexts/UserContext";
import { QuestionsProvider } from "./Contexts/QuestionsContext";
import { AssessmentProvider } from "./Contexts/AssessmentContext";
import { AssessmentInviteProvider } from "./Contexts/AssessmentInviteContext";
import { AssessmentSubmissionProvider } from "./Contexts/AssessmentSubmissionContext";
import { CodeChallengeProvider } from "./Contexts/CodeChallengeContext";
import PublicRoute from "./Contexts/PublicRoute";

import Discover from "./pages/student/Discover";
import Home from "./pages/student/Home";
import Prepare from "./pages/student/Prepare";
import Leaderboard from "./pages/student/Leaderboard";
import Challenges from "./pages/student/Challenges";
import PasswordReset from "./pages/PasswordReset";
import PasswordResetForm from "./pages/PassworResetForm"
import AdminAssessment from "./pages/tm/AdminAssessment";
import Students from "./pages/tm/Students";
import TakeChallenge from "./pages/student/TakeChallenge";
import CodeChallenge from "./pages/student/CodeChallenge";
import MCQQuiz from "./pages/student/McqQuiz";
import McqResults from "./pages/student/McqResults";
import AssessmentsStatistics from "./pages/tm/AssessmentsStatistics";

function App() {
  return (
    <UserProvider>
      <QuestionsProvider>
        <AssessmentProvider>
          <AssessmentInviteProvider>
            <AssessmentSubmissionProvider>
              <CodeChallengeProvider>
                <Router>
                  <ToastContainer position="top-right" autoClose={3000} />
                  <Routes>
                    {/* Public routes (only for non-logged-in users) */}
                    <Route path="/" element={<PublicRoute element={<Home />} />} />
                    <Route path="/discover" element={<PublicRoute element={<Discover />} />} />

                    {/* Private routes (for authenticated users) */}
                    <Route path="/prepare" element={<Prepare />} />
                    <Route path="/leaderboard" element={<Leaderboard />} />
                    <Route path="/practice/:language" element={<Challenges />} />
                    <Route path="/password-reset" element={<PasswordReset />} />
                    <Route path="/reset-password/:token" element={<PasswordResetForm />} />
                    <Route path="/tm/assessments" element={<AdminAssessment />} />
                    <Route path="/tm/students" element={<Students />} />
                    <Route path="/practice/code" element={<TakeChallenge />} />
                    <Route path="/assessment/challenge" element={<CodeChallenge />} />
                    <Route path="/assessment/mcquestions" element={<MCQQuiz />} />
                    <Route path="/assessment/mcqresults" element={<McqResults />} />
                    <Route path="/assessment/statistics" element={<AssessmentsStatistics />} />
                  </Routes>
                </Router>
              </CodeChallengeProvider>
            </AssessmentSubmissionProvider>
          </AssessmentInviteProvider>
        </AssessmentProvider>
      </QuestionsProvider>
    </UserProvider>
  );
}

export default App;
