import React, { useEffect, useState } from "react";
import "../css/QuizGame.css"; // Assuming you have a CSS file for styling

export default function QuizGame() {
  const [questionData, setQuestionData] = useState(null);
  const [selected, setSelected] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [loading, setLoading] = useState(false);

  function decodeHtml(html) {
    const txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  }

  async function fetchQuestion() {
    setLoading(true);
    setShowAnswer(false);
    setSelected(null);

    try {
      const res = await fetch("https://opentdb.com/api.php?amount=1&type=multiple");
      const data = await res.json();

      if (data.results && data.results.length > 0) {
        const q = data.results[0];
        const options = [...q.incorrect_answers, q.correct_answer]
          .map(decodeHtml)
          .sort(() => Math.random() - 0.5);
        setQuestionData({
          question: decodeHtml(q.question),
          options,
          answer: decodeHtml(q.correct_answer),
        });
      }
    } catch (error) {
      console.error("Failed to fetch question", error);
      setQuestionData(null);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchQuestion();
  }, []);

  function handleOptionClick(option) {
    if (showAnswer) return;
    setSelected(option);
    setShowAnswer(true);
  }

  return (
    <div className="quiz-container">
      <h2>Random Quiz Game</h2>

      {loading && <p>Loading question...</p>}

      {!loading && questionData && (
        <>
          <p className="question">{questionData.question}</p>

          <div className="options">
            {questionData.options.map((opt) => {
              let className = "";
              if (showAnswer) {
                if (opt === questionData.answer) className = "correct";
                else if (opt === selected) className = "wrong";
              }

              return (
                <button
                  key={opt}
                  onClick={() => handleOptionClick(opt)}
                  disabled={showAnswer}
                  className={className}
                >
                  {opt}
                </button>
              );
            })}
          </div>

          {showAnswer && (
            <div className="result-message">
              {selected === questionData.answer ? (
                <p style={{ color: "green" }}>✅ Correct!</p>
              ) : (
                <p style={{ color: "red" }}>
                  ❌ Wrong! The correct answer is <strong>{questionData.answer}</strong>.
                </p>
              )}
              <button className="next-btn" onClick={fetchQuestion}>
                Next Question
              </button>
            </div>
          )}
        </>
      )}

      {!loading && !questionData && <p>Failed to load question. Try again.</p>}
    </div>
  );
}
