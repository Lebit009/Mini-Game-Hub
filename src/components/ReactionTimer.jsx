import React, { useState, useRef } from "react";

export default function ReactionTimer(){
  const [state, setState] = useState("waiting"); // waiting, ready, now
  const [message, setMessage] = useState("Click to start");
  const [best, setBest] = useState(null);
  const startRef = useRef(null);
  const timeoutRef = useRef(null);

  const start = () => {
    if (state !== "waiting") return;
    setState("ready"); setMessage("Wait for green...");
    const delay = Math.floor(Math.random()*2000)+1000;
    timeoutRef.current = setTimeout(()=>{
      setState("now"); setMessage("Click now!");
      startRef.current = Date.now();
    }, delay);
  };

  const click = () => {
    if (state==="waiting") start();
    else if (state==="ready") {
      // clicked too soon
      clearTimeout(timeoutRef.current);
      setState("waiting"); setMessage("Too soon! Click to try again.");
    } else if (state==="now") {
      const diff = Date.now() - startRef.current;
      setBest(prev => prev === null ? diff : Math.min(prev, diff));
      setMessage(`Reaction: ${diff} ms — click to try again`);
      setState("waiting");
    }
  };

  return (
    <div className="center">
      <h2>Reaction Timer</h2>
      <div onClick={click} style={{margin:"18px auto", width:260, height:120, background: state==="now" ? "#10b981" : state==="ready" ? "#ef4444" : "#374151", borderRadius:10, display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer"}}>
        <div style={{fontSize:18, fontWeight:700}}>{message}</div>
      </div>
      <div className="small">Best: {best===null ? "—" : `${best} ms`}</div>
    </div>
  );
}
