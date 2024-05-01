import React,{useState} from 'react'
import Question from './components/Question';
import PointsCounter from './components/PointsCounter';
import  './App.css'

export default function App() {

  const [question,setQuestion]=useState(null);
  const [nbQuestion,setNbQuestions]= useState(0);
  const [points,setPoints]=useState(0);


  function getQuestions(){
    fetch('https://opentdb.com/api.php?amount=1')
    .then((response)=>response.json())
    .then((data)=>{
      console.log(data.results[0]);
      setQuestion(data.results[0]);
    })
  }

  function increasePoints(guess){
    if(guess){
      setPoints(points+1);
    }
    setNbQuestions(nbQuestion+1);
  }

  function getNewQuestion(){
    getQuestions();
  }

  return (
    <div id="app">
      <h1>Quiiiz</h1>
      {!question && <p>Ready to test your general knowledge ?</p>}

      {question && <Question question={question} cbQuestions={getNewQuestion} cbIncPoints={(guess)=>increasePoints(guess)} />}

      {!question && <button onClick={getQuestions}>See questions</button>}

      <PointsCounter points={points} nbQuestion={nbQuestion}/>
    </div>
  )
}
