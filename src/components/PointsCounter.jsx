import React from 'react'
import "../style/pointCounter.css"

export default function PointsCounter({points, nbQuestion}) {

    let percentage = Math.round((points/nbQuestion)*100);

  return (
    <div id="pointCounter">
        <p>Points : {points}</p>
        <p>Questions asked : {nbQuestion}</p>
        <p>True percentage : <span className={`percentageSpan ${percentage>50? "GoodP":"BadP"} ${nbQuestion>1 && points===0? "ZeroP":""}`}>{points? percentage: 0}%</span></p>
    </div>
  )
}
