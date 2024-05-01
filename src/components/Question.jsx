import React, { useState } from 'react';
import he from 'he';
import "../style/question.css"

export default function Question({question, cbQuestions, cbIncPoints}) {
    const [answered,setAnswered]=useState(false);
    const [goodGuess,setGoodGuess]=useState(false);
    
    let correctAnswer = question.correct_answer;


    let allAnswers = [...question.incorrect_answers, question.correct_answer]
    shuffle(allAnswers);
    // console.log(allAnswers);

    function shuffle(array) {
        let currentIndex = array.length;
      
        // While there remain elements to shuffle...
        while (currentIndex != 0) {
      
          // Pick a remaining element...
          let randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;
      
          // And swap it with the current element.
          [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
        }
      }

      function checkAnswer (answer){
        setAnswered(true);

        if(answer===correctAnswer){
            setGoodGuess(true);
            cbIncPoints(true);
        }else {
            cbIncPoints(false);
        }

      }

      function handleNewQuestion () {
        //Calls cb function
        //Restore values for answered and good guess
        
        cbQuestions();
      
        setAnswered(false);
        setGoodGuess(false);
        

      }


  return (

    <div id="question">
        {!answered && <h3>{he.decode(question.question)}</h3>}

        <div id="divAnswers">
          {!answered && allAnswers.map((item,index)=>(
            <p key={index} onClick={()=>checkAnswer(item)} className='answers'>{he.decode(item)}</p>
        ))}
        </div>
        

        {goodGuess && <p>Congrats "{he.decode(correctAnswer)}" is right !</p>}
        {!goodGuess && answered && <p>Ooops, that's not true... <br/>The real answer was {he.decode(correctAnswer)}</p>}

        {answered && <button onClick={handleNewQuestion}>Get a new question</button>}
    </div>
  )
}
