import "./App.css";
import React, { useState } from "react";

const App = () => {
  let audio = new Audio("/robot.wav");
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(false);
  const start = () => {
    audio.play();
  };

  async function fetchAnswers() {
    fetch("	https://api.adviceslip.com/advice")
      .then((response) => response.json())
      .then((json) => setAnswers((previous) => [json.slip.advice]));
    setLoading(true);
    start();

    await new Promise((resolve) =>
      setTimeout(() => {
        resolve();
      }, 4500)
    );
    setLoading(false);
  }

  return (
    <>
      <div className="App">
        <div className="box gradient-border">
          <h1>Advice-o-Tron 3000</h1>
          <h6>Click the button to get life-changing advice!</h6>
          {answers.map((answer, index) => (
            <div className="answer" key={index}>
              {answer}
            </div>
          ))}
        </div>
        <button
          className="button1 bouncy"
          onClick={fetchAnswers}
          disabled={loading}
        >
          Get Life Changing Advice
        </button>
        <div className="robot">
          <div className="head"></div>
          <div className="torso"></div>
          <div className={loading ? "left-animated" : "left"}></div>
          <div className="right"></div>
          <div className={loading ? "eye1-animated" : "eye1"}></div>
          <div className={loading ? "eye2-animated" : "eye2"}></div>
          <div className={loading ? "mouth-animated" : "mouth"}></div>
        </div>
      </div>
    </>
  );
};

export default App;
