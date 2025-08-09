import React, { useState } from "react";

function shuffle(a){ return a.sort(()=>Math.random()-0.5); }

const base = ["🐶","🐱","🦊","🐼"];
const deck0 = shuffle([...base, ...base]).map((v,i)=>({id:i,val:v, flipped:false, matched:false}));

export default function MemoryGame(){
  const [deck,setDeck] = useState(deck0);
  const [first,setFirst] = useState(null);
  const [second,setSecond] = useState(null);
  const [canClick,setCanClick] = useState(true);

  const flip = (i) => {
    if (!canClick) return;
    const d = [...deck];
    if (d[i].flipped || d[i].matched) return;
    d[i].flipped = true;
    setDeck(d);
    if (first === null) setFirst(i);
    else if (second === null) {
      setSecond(i);
      setCanClick(false);
      setTimeout(()=> {
        const a = d[first], b = d[i];
        if (a.val === b.val) { d[first].matched = true; d[i].matched = true; }
        else { d[first].flipped = false; d[i].flipped = false; }
        setDeck([...d]);
        setFirst(null); setSecond(null); setCanClick(true);
      }, 700);
    }
  };

  const restart = () => {
    const nd = shuffle([...base, ...base]).map((v,i)=>({id:i,val:v, flipped:false, matched:false}));
    setDeck(nd); setFirst(null); setSecond(null);
  };

  return (
    <div className="center">
      <h2>Memory Match</h2>
      <div style={{display:"grid", gridTemplateColumns:"repeat(4,70px)", gap:8, justifyContent:"center", marginTop:12}}>
        {deck.map((c,i)=>(
          <button key={c.id} onClick={()=>flip(i)} style={{width:70,height:70,fontSize:28,borderRadius:8}}>
            {c.flipped || c.matched ? c.val : "❓"}
          </button>
        ))}
      </div>
      <div className="controls">
        <button className="link-btn" onClick={restart}>Restart</button>
      </div>
    </div>
  );
}
