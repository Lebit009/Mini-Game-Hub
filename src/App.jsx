import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import GameHub from "./components/GameHub";
import TicTacToe from "./components/TicTacToe";
import RockPaperScissors from "./components/RockPaperScissors";
import MemoryGame from "./components/MemoryGame";
import WhackAMole from "./components/WhackAMole";
import ReactionTimer from "./components/ReactionTimer";
import TypingTest from "./components/TypingTest";
import QuizGame from "./components/QuizGame";

export default function App() {
  return (
    <div className="app">
      <div className="header">
        <div>
          <div className="title">🎲🎮🎭 Mini Game Hub</div>
          <div className="small">7 small games — play in-browser · no backend</div>
        </div>
        <div>
          <Link to="/" className="back">Home</Link>
        </div>
      </div>

      <Routes>
        <Route path="/" element={<GameHub />} />
        <Route path="/tic-tac-toe" element={<TicTacToe />} />
        <Route path="/rock-paper-scissors" element={<RockPaperScissors />} />
        <Route path="/memory-game" element={<MemoryGame />} />
        <Route path="/whack-a-mole" element={<WhackAMole />} />
        <Route path="/reaction-timer" element={<ReactionTimer />} />
        <Route path="/typing-test" element={<TypingTest />} />
        <Route path="/quiz-game" element={<QuizGame />} />
      </Routes>
    </div>
  );
}
