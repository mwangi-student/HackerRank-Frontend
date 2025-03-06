import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { ChallengeQuestion, CodeEditor, AssessmentHeader } from "../../components";
import AssessmentContext from "../../Contexts/AssessmentContext";
import { useCodeChallenges } from "../../Contexts/CodeChallengeContext";

export default function CodeChallenge() {
  const { id } = useParams(); // 🔹 Get challenge ID from URL
  const { getCodeChallenge } = useCodeChallenges(); // 🔹 Get function from context
  const { getAssessment } = useContext(AssessmentContext);
  const [assessment, setAssessment] = useState(null);
  const [selectedChallenge, setSelectedChallenge] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch challenge
  useEffect(() => {
    const fetchChallenge = async () => {
      setLoading(true);
      const data = await getCodeChallenge(id);
      if (data) setSelectedChallenge(data);
      setLoading(false);
    };
    fetchChallenge();
  }, [id, getCodeChallenge]);

  // Fetch assessment
  useEffect(() => {
    const fetchAssessment = async () => {
      const data = await getAssessment(id);
      if (data) setAssessment(data);
    };
    fetchAssessment();
  }, [id, getAssessment]);

  if (loading) return <div className="text-white p-6">Loading...</div>;
  if (!selectedChallenge) return <div className="text-red-500 p-6">Challenge not found</div>;

  return (
    <div>
      <AssessmentHeader assessment={assessment} />
      <div className="flex flex-row h-screen pl-6 py-8 bg-[#000D1C] font-[Montserrat]">
        {/* Challenge Question Section (Fixed Width) */}
        <div className="w-[900px] overflow-auto pr-4">
          <ChallengeQuestion challenge={selectedChallenge} assessment={assessment} />
        </div>

        {/* Code Editor Section (Takes Remaining Space) */}
        <div className="flex-grow overflow-auto overflow-x-hidden">
          <div className="w-full">
            <CodeEditor challengeId={id} />
          </div>
        </div>
      </div>
    </div>
  );
}
