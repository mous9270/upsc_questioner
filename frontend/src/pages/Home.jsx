import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
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
    <div>
      <div>
        <h2>Question Quiz</h2>
        <p>Question: {questions[currentQuestionIndex].question}</p>
        <p>Publish Year: {questions[currentQuestionIndex].publishYear}</p>
        <div>
          <label>
            Answer:
            <input
              type="text"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
            />
          </label>
        </div>
        <button onClick={handleSubmit}>Submit</button>
        <button onClick={handleNext}>Next</button>
        {feedback && <p>{feedback}</p>}
      </div>
    </div>
  );
}

export default Home;

