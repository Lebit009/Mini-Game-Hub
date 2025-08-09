import React from "react";
import { Link } from "react-router-dom";

const games = [
  { name: "Tic Tac Toe", path: "/tic-tac-toe", desc: "Classic 3x3" },
  { name: "Rock Paper Scissors", path: "/rock-paper-scissors", desc: "Beat the computer" },
  { name: "Memory Game", path: "/memory-game", desc: "Find matching pairs" },
  { name: "Whack a Mole", path: "/whack-a-mole", desc: "Click the mole" },
  { name: "Reaction Timer", path: "/reaction-timer", desc: "Click when it turns green" },
  { name: "Typing Test", path: "/typing-test", desc: "Speed & accuracy" },
  { name: "Quiz Game", path: "/quiz-game", desc: "Multiple choice quiz" },
];

export default function GameHub() {
  return (
    <div>
      <div className="games-grid">
        {games.map((g) => (
          <div className="card" key={g.path}>
            <h3 style={{margin:0}}>{g.name}</h3>
            <div className="small" style={{marginTop:6}}>{g.desc}</div>
            <Link to={g.path} className="link-btn">Play</Link>
          </div>
        ))}
      </div>
      <div className="center small" style={{marginTop:16}}>
        Tip: use ESC to quickly return to the hub.
      </div>
    </div>
  );
}
