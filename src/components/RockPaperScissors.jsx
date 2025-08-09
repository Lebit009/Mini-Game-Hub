import React, { useState } from "react";

const choices = ["Rock","Paper","Scissors"];
const outcome = (p,c) => {
  if (p===c) return "Draw";
  if ((p==="Rock"&&c==="Scissors") || (p==="Paper"&&c==="Rock") || (p==="Scissors"&&c==="Paper")) return "You win!";
  return "Computer wins";
};

export default function RockPaperScissors(){
  const [result,setResult] = useState(null);
  const [comp,setComp] = useState(null);

  const play = (pick) => {
    const c = choices[Math.floor(Math.random()*3)];
    setComp(c);
    setResult(outcome(pick,c));
  };

  return (
    <div className="center">
      <h2>Rock · Paper · Scissors</h2>
      <div className="controls" style={{marginTop:12}}>
        {choices.map(c=>(
          <button key={c} className="link-btn" onClick={()=>play(c)}>{c}</button>
        ))}
      </div>
      {result && (
        <div style={{marginTop:14}}>
          <div className="small">Computer picked: <strong>{comp}</strong></div>
          <h3>{result}</h3>
          <button className="back" style={{marginTop:8}} onClick={()=>{setResult(null); setComp(null)}}>Play again</button>
        </div>
      )}
    </div>
  );
}
