import React, { useState, useRef } from "react";

const PHRASE = "the quick brown fox jumps over the lazy dog";

export default function TypingTest(){
  const [text, setText] = useState("");
  const [running, setRunning] = useState(false);
  const startRef = useRef(null);
  const [time, setTime] = useState(null);

  const onChange = (e) => {
    const val = e.target.value;
    if (!running){ setRunning(true); startRef.current = Date.now(); }
    setText(val);
    if (val.trim() === PHRASE) {
      const t = Date.now() - startRef.current;
      setTime(t);
      setRunning(false);
    }
  };

  const reset = () => { setText(""); setRunning(false); setTime(null); startRef.current = null; };

  return (
    <div className="center">
      <h2>Typing Test</h2>
      <div className="small">Type this phrase:</div>
      <div style={{marginTop:8, padding:12, background:"#071023", borderRadius:8}}>{PHRASE}</div>
      <textarea value={text} onChange={onChange} rows={4} style={{width:"100%", marginTop:10, padding:10, borderRadius:8}} placeholder="Start typing..."></textarea>
      <div className="controls">
        <button className="link-btn" onClick={reset}>Reset</button>
      </div>
      <div className="small" style={{marginTop:8}}>{time ? `Time: ${time} ms` : (running ? "Running..." : "Not completed")}</div>
    </div>
  );
}
