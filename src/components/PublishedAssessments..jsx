import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import AssessmentInviteForm from "./AssessmentInviteForm";
import AssessmentContext from "../Contexts/AssessmentContext";

export default function PublishedAssessments() {
  const { authToken } = useContext(AssessmentContext); // Get authToken from context
  const [assessments, setAssessments] = useState([]);
  const [isInvitePopupOpen, setIsInvitePopupOpen] = useState(false);

  useEffect(() => {
    const fetchAssessments = async () => {
      if (!authToken) return; // Ensure user is authenticated
    
      try {
        const response = await axios.get("http://127.0.0.1:5000/assessment", {
          headers: { Authorization: `Bearer ${authToken}` }
        });

        // Filter only published assessments
        const publishedAssessments = response.data.filter(assessment => assessment.publish == 1);
        
        setAssessments(publishedAssessments); // Update state with filtered data
      } catch (error) {
        console.error("Failed to fetch assessments", error.response?.data || error.message);
      }
    };
    
    // Fetch assessments immediately when `authToken` changes
    fetchAssessments();
    
    // Set up polling every 30 seconds (adjust time as needed)
    const intervalId = setInterval(fetchAssessments, 1000); 
    
    // Cleanup polling when the component is unmounted or authToken changes
    return () => clearInterval(intervalId);
  }, [authToken]); 

  return (
    <div className="flex-wrap gap-5">
      <div>
        <h5 className="text-2xl pb-6 text-semibold">Published Assessments</h5>
        <button
          onClick={() => setIsInvitePopupOpen(true)}
          className="px-3 py-2 rounded-lg text-white bg-[#527254] hover:bg-[#13813A] transition duration-250"
        >
          Invite Students
        </button>
      </div>

      <div className="w-[1300px] items-center py-4 px-4 my-8 rounded-lg">
        {assessments.length > 0 ? (
          <ul role="list" className="bg-white divide-y divide-gray-100 rounded-lg">
            {assessments.map((assessment) => (
              <li
                key={assessment.id} // Use unique ID from API
                className="flex justify-between gap-x-6 py-3 hover:bg-[#ebebf3] px-5"
              >
                    <h3>{assessment.title}</h3>
                <button onClick={navigate("/assessment/statistics")} className="px-3 py-2 rounded-lg text-white bg-[#527254] hover:bg-[#13813A] transition duration-250">
            view
          </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-[#192533] text-[16px] font-medium">
            No assessments published.
          </p>
        )}
      </div>

      {/* Invite Students Popup */}
      {isInvitePopupOpen && (
        <AssessmentInviteForm isOpen={isInvitePopupOpen} onClose={() => setIsInvitePopupOpen(false)} />
      )}
    </div>
  );
}