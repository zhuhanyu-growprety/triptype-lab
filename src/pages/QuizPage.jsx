import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { tptiContent, computeResult } from '../lib/scoring';
import { getQuestionImage } from '../lib/imageMap';
import { saveLastResult } from '../lib/storage';
import ProgressBar from '../components/ProgressBar';
import OptionCard from '../components/OptionCard';

export default function QuizPage() {
  const navigate = useNavigate();
  const questions = tptiContent.questions;
  const total = questions.length;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});

  const currentQuestion = questions[currentIndex];
  const selectedKey = answers[currentQuestion.id];
  const questionImage = getQuestionImage(currentQuestion.id);

  function handleSelect(optionKey) {
    const nextAnswers = { ...answers, [currentQuestion.id]: optionKey };
    setAnswers(nextAnswers);

    if (currentIndex < total - 1) {
      setCurrentIndex((prev) => prev + 1);
      return;
    }

    const { typeCode, scores, result } = computeResult(nextAnswers);
    if (result) {
      saveLastResult({ answers: nextAnswers, scores, typeCode, result });
    }
    navigate(`/result?type=${typeCode}`);
  }

  function handlePrevious() {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  }

  return (
    <div className="page quiz-page">
      <ProgressBar current={currentIndex + 1} total={total} />

      <div className="quiz-image-card">
        <img
          key={currentQuestion.id}
          src={questionImage}
          alt={`第 ${currentIndex + 1} 题场景插画`}
          className="quiz-image"
          decoding="async"
        />
      </div>

      <h2 className="quiz-question">{currentQuestion.question}</h2>

      <div className="quiz-options">
        {currentQuestion.options.map((option) => (
          <OptionCard
            key={option.key}
            optionKey={option.key}
            text={option.text}
            selected={selectedKey === option.key}
            onSelect={handleSelect}
          />
        ))}
      </div>

      <div className="quiz-nav">
        <button
          type="button"
          className="btn btn-ghost"
          onClick={handlePrevious}
          disabled={currentIndex === 0}
        >
          上一题
        </button>
      </div>
    </div>
  );
}
