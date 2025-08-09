import React, { useState } from "react";

const calculateWinner = (s) => {
  const lines = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6],
  ];
  for (let [a,b,c] of lines) if (s[a] && s[a] === s[b] && s[a] === s[c]) return s[a];
  return null;
};

export default function TicTacToe(){
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xNext, setXNext] = useState(true);

  const winner = calculateWinner(board);
  const handleClick = (i) => {
    if (board[i] || winner) return;
    const nb = [...board];
    nb[i] = xNext ? "X" : "O";
    setBoard(nb);
    setXNext(!xNext);
  };

  const reset = () => { setBoard(Array(9).fill(null)); setXNext(true); };

  return (
    <div className="center">
      <h2>Tic Tac Toe</h2>
      <div style={{display:"grid", gridTemplateColumns:"repeat(3,90px)", gap:8, justifyContent:"center", marginTop:12}}>
        {board.map((v,i)=>(
          <button key={i} onClick={()=>handleClick(i)} style={{width:90,height:90,fontSize:26, borderRadius:8}}>
            {v}
          </button>
        ))}
      </div>
      <div style={{marginTop:12}}>
        <div className="small">{winner ? `Winner: ${winner}` : `Next: ${xNext ? "X" : "O"}`}</div>
        <div className="controls">
          <button className="link-btn" onClick={reset}>Restart</button>
        </div>
      </div>
    </div>
  );
}
