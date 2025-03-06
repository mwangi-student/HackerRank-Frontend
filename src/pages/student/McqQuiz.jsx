import React, { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { AssessmentHeader, CountdownTimer } from "../../components";
import QuestionsContext from "../../Contexts/QuestionsContext";
import AssessmentContext from "../../Contexts/AssessmentContext";

export default function MCQQuiz() {
  const { getQuestions } = useContext(QuestionsContext); // Fetch questions from context
  const { id } = useParams(); // Get assessment ID from URL
  const { getAssessment } = useContext(AssessmentContext);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState([]);
  const [assessment, setAssessment] = useState(null);
  const [time, setTime] = useState(null);

  // Fetch questions
  useEffect(() => {
    const fetchQuestions = async () => {
      setLoading(true);
      const data = await getQuestions(id);
      if (data) setQuestions(data);
      setLoading(false);
    };
    fetchQuestions();
  }, [id, getQuestions]);

  // Fetch assessment
  useEffect(() => {
    const fetchAssessment = async () => {
      const data = await getAssessment(id);
      if (data) {
        setAssessment(data);
        setTime(data.time_limit); // Set the time limit for the countdown timer
      }
    };
    fetchAssessment();
  }, [id, getAssessment]);

  // Handle answer selection
  const handleSelect = (questionIndex, choice) => {
    setAnswers((prev) => ({ ...prev, [questionIndex]: choice }));
  };

  // Submit MCQ answers to the `mcq-submissions` table
  const submitMCQAnswers = async (answers) => {
    try {
      const response = await fetch("http://127.0.0.1:5000/mcq-submissions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          assessmentId: id,
          answers: Object.entries(answers).map(([questionIndex, choice]) => ({
            questionId: questions[questionIndex].id, // Assuming each question has an `id`
            selectedChoice: choice,
          })),
        }),
      });

      if (!response.ok) throw new Error("Failed to submit MCQ answers");
      return await response.json();
    } catch (error) {
      console.error("Error submitting MCQ answers:", error);
      return null;
    }
  };

  // Update the `complete` column in the `assessment-invitation` table
  const updateAssessmentInvitation = async (complete) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:5000/assessment-invitations/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ complete }),
        }
      );

      if (!response.ok) throw new Error("Failed to update assessment invitation");
    } catch (error) {
      console.error("Error updating assessment invitation:", error);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);

    // Submit MCQ answers
    const submissionResult = await submitMCQAnswers(answers);
    if (submissionResult) {
      // Update assessment invitation to mark as complete
      await updateAssessmentInvitation(true);
      alert("Quiz submitted successfully and assessment marked as complete!");
    } else {
      alert("Quiz submission failed");
    }
  };

  return (
    <div>
      <div className="fixed top-0 w-full z-[100]">
        <AssessmentHeader assessment={assessment} />
      </div>
      <div className="font-[Montserrat] p-8 max-w-2xl mx-auto bg-gray-50 shadow-lg rounded-lg border border-gray-200 mt-14">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
          📝 MCQ Quiz
        </h2>
        <div>
          <CountdownTimer time={time} />
        </div>

        {questions.length === 0 ? (
          <div className="text-center text-gray-500 mt-4">
            No questions available.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {questions.map((q, index) => (
              <div
                key={index}
                className="p-5 bg-white border border-gray-300 rounded-lg shadow-md"
              >
                <p className="font-semibold text-lg mb-3">
                  {index + 1}. {q.question_text}
                </p>
                <div className="mt-2 space-y-2">
                  {Object.entries(q.choices).map(([key, choice]) => (
                    <label
                      key={key}
                      className={`flex items-center space-x-3 p-2 rounded-lg cursor-pointer transition ${
                        answers[index] === key
                          ? "bg-blue-100 border border-blue-500"
                          : "hover:bg-gray-100"
                      }`}
                    >
                      <input
                        type="radio"
                        name={`question-${index}`}
                        value={key}
                        checked={answers[index] === key}
                        onChange={() => handleSelect(index, key)}
                        className="form-radio text-blue-600 hidden"
                      />
                      <div
                        className={`w-5 h-5 flex items-center justify-center rounded-full border ${
                          answers[index] === key
                            ? "bg-blue-500 text-white border-blue-500"
                            : "border-gray-400"
                        }`}
                      >
                        {answers[index] === key && "✔"}
                      </div>
                      <span className="text-gray-800">{choice}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
            <button
              type="submit"
              className="mt-6 w-full py-3 bg-blue-600 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-blue-700 transition"
            >
              Submit Quiz
            </button>
          </form>
        )}

        {submitted && (
          <div className="mt-6 p-5 bg-green-100 text-green-900 rounded-lg text-center shadow-md">
            ✅ <strong>Quiz submitted successfully!</strong> Thank you for
            participating.
          </div>
        )}
      </div>
    </div>
  );
}