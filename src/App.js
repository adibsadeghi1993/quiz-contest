import "./App.css";
import React, { useEffect, useState,useMemo } from "react";

import { data } from "./Data";
import Quiz from "./components/Quiz";
import Timer from "./components/Timer";

function App() {
  const [questionNumber, setQuestionNumber] = useState(1);
  const [stop, setStop] = useState(false);

  const [earned, setEarned] = useState("$ 0");

  const monyPyramid = useMemo(() => [
    { id: 1, amount: "$ 100" },
    { id: 2, amount: "$ 200" },
    { id: 3, amount: "$ 300" },
    { id: 4, amount: "$ 500" },
    { id: 5, amount: "$ 1000" },
    { id: 6, amount: "$ 2000" },
    { id: 7, amount: "$ 4000" },
    { id: 8, amount: "$ 8000" },
    { id: 9, amount: "$ 16000" },
    { id: 10, amount: "$ 32000" },
    { id: 11, amount: "$ 64000" },
    { id: 12, amount: "$ 125000" },
    { id: 13, amount: "$ 250000" },
    { id: 14, amount: "$ 500000" },
    { id: 15, amount: "$ 1000000" },
  ].reverse(),[]);

  useEffect(() => {
    if (questionNumber > 1) {
      console.log(monyPyramid);
      console.log(questionNumber)
      const findMony = monyPyramid.find(
        (item) => (item.id === questionNumber-1)
      );
      console.log(findMony);
      setEarned(findMony.amount);
    }
  }, [questionNumber,monyPyramid,earned]);

  return (
    <div className="app">
      <div className="main">
        {stop ? (
          <h1 className="endText">you earned:{earned}</h1>
        ) : (
          <>
            <div className="top">
              <div className="timer">
                <Timer setStop={setStop} questionNumber={questionNumber} />
              </div>
            </div>
            <div className="bottom">
              <Quiz
                data={data}
                setStop={setStop}
                setQuestionNumber={setQuestionNumber}
                questionNumber={questionNumber}
              />
            </div>
          </>
        )}
      </div>
      <div className="pyramid">
        <ul className="monyList">
          {monyPyramid?.map((item) => {
            return (
              <li
                key={item.amount}
                className={`monyListItem ${
                  questionNumber === item.id ? "active" : null
                } `}
              >
                <span className="monyListItemNumber">{item.id}</span>
                <span className="monyListItemAmount">{item.amount}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default App;
