import React, { useState, useEffect } from "react";
import useSound from 'use-sound';
import play from "../assets/play.mp3"
import correct from "../assets/correct.mp3"
import wrong from "../assets/wrong.mp3"

const Quiz = ({ data, setStop, setQuestionNumber, questionNumber }) => {
  const [question, setQuestion] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
     const [className, setClassName] = useState("answer")
     const [letsPlay]=useSound(play)
     const [correctAnswer]=useSound(correct)
     const [wrongAnswer]=useSound(wrong)


     useEffect(() => {
      letsPlay()
     }, [letsPlay])

  useEffect(() => {
    setQuestion(data[questionNumber - 1]);
  }, [data, questionNumber]);

  const delay=(duration,callback)=>{
setTimeout(() => {
    callback()
}, duration);
  }

  const answerHandler = (item) => {
    console.log(item);
    setSelectedAnswer(item);
    delay(3000,() => {
        setClassName(item.correct ?"answer correct" :"answer wrong")
    });

    delay(5000,()=>{
        if (item.correct) {
          correctAnswer()
           delay(1000,()=>{
            setQuestionNumber(prev=>prev+1 )
            setSelectedAnswer(null)
           })
        }else{
          wrongAnswer()
           delay(1000,()=>[
            setStop(true)
           ])
        }
    })
  };

 
  return (
    <div className="trivia">
      <div className="question">{question && question.question}</div>
      <div className="answers">
        {question &&
          question.answers.map((item) => {
            return (
              <div
             
                className={`answer ${selectedAnswer===item ? className :"answer"}`}
                key={item.text}
                onClick={() => answerHandler(item)}
              >
                {item.text}
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Quiz;
