function AssessmentForm({ formData, handleChange, handleMCQChange, handleMCQChoicesChange, handleAddQuestion, handleCodeChange, handleSubmit, onClose }) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-white rounded-lg shadow-lg p-6 w-[90%] max-w-lg max-h-[90vh] overflow-auto">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Assessment</h2>
          
          <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={formData.title}
              onChange={handleChange}
              className="border p-2 rounded-lg w-full"
              required
            />
  
            <div>
              <label htmlFor="assessmentType" className="block mb-2 text-sm font-medium text-gray-900">
                Type of Assessment
              </label>
              <select
                id="assessmentType"
                name="assessmentType"
                value={formData.assessmentType}
                onChange={handleChange}
                className="block w-full p-2 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="" disabled>Choose type of assessment</option>
                <option value="mcq">Multiple Choice Question</option>
                <option value="code">Code Challenge Question</option>
              </select>
            </div>
  
            {formData.assessmentType === "mcq" && (
              <div className="bg-gray-100 p-4 rounded-lg">
                <label className="block text-sm font-medium">Number of Questions</label>
                <input
                  type="number"
                  min="1"
                  name="numberOfQuestions"
                  value={formData.numberOfQuestions}
                  onChange={handleChange}
                  className="border p-2 rounded-lg w-full"
                />
  
                <h3 className="text-lg font-semibold mt-4">
                  Question {formData.currentQuestionIndex + 1} / {formData.numberOfQuestions}
                </h3>
  
                <textarea
                  name="question"
                  placeholder="Enter the question"
                  value={formData.currentMCQ.question}
                  onChange={handleMCQChange}
                  className="border p-2 rounded-lg w-full"
                  required
                ></textarea>
  
                {["a", "b", "c", "d"].map((choice) => (
                  <input
                    key={choice}
                    type="text"
                    name={choice}
                    placeholder={`Choice ${choice.toUpperCase()}`}
                    value={formData.currentMCQ.choices[choice]}
                    onChange={handleMCQChoicesChange}
                    className="border p-2 rounded-lg w-full mt-1"
                    required
                  />
                ))}
  
                <label className="block mt-3">Correct Answer</label>
                <select
                  name="correctAnswer"
                  value={formData.currentMCQ.correctAnswer}
                  onChange={handleMCQChange}
                  className="block w-full p-2 border rounded-lg"
                  required
                >
                  <option value="" disabled>Select correct answer</option>
                  {["a", "b", "c", "d"].map((choice) => (
                    <option key={choice} value={choice}>{choice.toUpperCase()}</option>
                  ))}
                </select>
  
                {formData.currentQuestionIndex + 1 < formData.numberOfQuestions ? (
                  <button
                    type="button"
                    onClick={handleAddQuestion}
                    className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg"
                  >
                    Add Question
                  </button>
                ) : (
                  <button type="submit" className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg">
                    Submit
                  </button>
                )}
              </div>
            )}
  
            {formData.assessmentType === "code" && (
              <div className="bg-gray-100 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">Coding Challenge</h3>
                <textarea
                  name="task"
                  placeholder="Task Description"
                  value={formData.codeChallenge.task}
                  onChange={handleCodeChange}
                  className="border p-2 rounded-lg w-full"
                  required
                ></textarea>
                <textarea
                  name="example"
                  placeholder="Example"
                  value={formData.codeChallenge.example}
                  onChange={handleCodeChange}
                  className="border p-2 rounded-lg w-full"
                  required
                ></textarea>
                <input
                  type="text"
                  name="inputFormat"
                  placeholder="Input Format"
                  value={formData.codeChallenge.inputFormat}
                  onChange={handleCodeChange}
                  className="border p-2 rounded-lg w-full"
                  required
                />
                <input
                  type="text"
                  name="outputFormat"
                  placeholder="Output Format"
                  value={formData.codeChallenge.outputFormat}
                  onChange={handleCodeChange}
                  className="border p-2 rounded-lg w-full"
                  required
                />
                <input
                  type="text"
                  name="constraints"
                  placeholder="Constraints (Optional)"
                  value={formData.codeChallenge.constraints}
                  onChange={handleCodeChange}
                  className="border p-2 rounded-lg w-full"
                />
                <input
                  type="text"
                  name="sampleInput"
                  placeholder="Sample Input"
                  value={formData.codeChallenge.sampleInput}
                  onChange={handleCodeChange}
                  className="border p-2 rounded-lg w-full"
                  required
                />
                <input
                  type="text"
                  name="sampleOutput"
                  placeholder="Sample Output"
                  value={formData.codeChallenge.sampleOutput}
                  onChange={handleCodeChange}
                  className="border p-2 rounded-lg w-full"
                  required
                />
              </div>
            )}
  
            <div className="flex justify-end space-x-3 mt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-600 border rounded-lg hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
  
  export default AssessmentForm;
  