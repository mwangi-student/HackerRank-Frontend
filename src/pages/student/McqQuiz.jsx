import React, { useState, useContext } from "react";
import { AssessmentHeader, CountdownTimer } from "../../components";
import QuestionsContext from "../../Contexts/QuestionsContext";
import AssessmentContext from "../../Contexts/AssessmentContext";


export default function MCQQuiz() {
  const { getQuestions } = useContext(QuestionsContext); // Fetch questions from context
  const { id } = useParams(); // Get assessment ID from URL
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState([])

  useEffect(() => {
      const fetchQuestions = async () => {
        setLoading(true);
        const data = await getQuestions(id);
        if (data) setQuestions(data);
        setLoading(false);
      };
      fetchQuestions();
    }, [id, getQuestions]);

  const handleSelect = (questionIndex, choice) => {
    setAnswers((prev) => ({ ...prev, [questionIndex]: choice }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div>
      <div className="fixed top-0 w-full z-[100]">
        <AssessmentHeader />
      </div>
      <div className="font-[Montserrat] p-8 max-w-2xl mx-auto bg-gray-50 shadow-lg rounded-lg border border-gray-200 mt-14">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
          📝 MCQ Quiz
        </h2>
        <div><CountdownTimer /></div>

        {questions.length === 0 ? (
          <div className="text-center text-gray-500 mt-4">No questions available.</div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {questions.map((q, index) => (
              <div
                key={index}
                className="p-5 bg-white border border-gray-300 rounded-lg shadow-md"
              >
                <p className="font-semibold text-lg mb-3">
                  {index + 1}. {q.question}
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
            ✅ <strong>Quiz submitted successfully!</strong> Thank you for participating.
          </div>
        )}
      </div>
    </div>
  );
}
