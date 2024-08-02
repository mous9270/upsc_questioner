import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner.jsx';

function Home() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    setLoading(true);
    axios
      .get('http://localhost:5555/questions')
      .then((res) => {
        setQuestions(res.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  const handleSubmit = () => {
    if (questions[currentQuestionIndex].answer.toLowerCase() === userAnswer.toLowerCase()) {
      setFeedback('Correct!');
    } else {
      setFeedback('Wrong! The correct answer is ' + questions[currentQuestionIndex].answer);
    }
  };

  const handleNext = () => {
    setFeedback('');
    setUserAnswer('');
    setCurrentQuestionIndex((prevIndex) => (prevIndex + 1) % questions.length);
  };

  if (loading) {
    return <Spinner />;
  }

  if (questions.length === 0) {
    return <div>No questions available.</div>;
  }

  return (
    <div
      className="bg-cover bg-center min-h-screen flex items-center justify-center"
      style={{ backgroundImage: 'url("/background_image.png")' }}
    >
      <div className="bg-white bg-opacity-75 p-8 rounded-lg shadow-md max-w-lg w-full text-center">
        <h1 className="text-3xl font-bold mb-4">UPSCQuestions</h1>
        <h2 className="text-2xl font-semibold mb-2">Question</h2>
        <p className="text-gray-700 mb-4">{questions[currentQuestionIndex].question}</p>
        <div className="mb-4">
          <input
            type="text"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            className="border border-gray-300 p-2 w-full rounded"
            placeholder="Answer"
          />
        </div>
        <div className="flex justify-center space-x-4">
          <button
            onClick={handleSubmit}
            className="bg-blue-500 text-white px-4 py-2 rounded-full shadow hover:bg-blue-600 focus:outline-none"
          >
            Submit
          </button>
          <button
            onClick={handleNext}
            className="bg-gray-500 text-white px-4 py-2 rounded-full shadow hover:bg-gray-600 focus:outline-none"
          >
            Next
          </button>
        </div>
        {feedback && <p className="mt-4 text-lg">{feedback}</p>}
      </div>
    </div>
  );
}

export default Home;

