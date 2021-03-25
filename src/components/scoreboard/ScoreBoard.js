import React from "react";
import "./ScoreBoard.css";
import { timeToSecond } from "../../utilities/utils"

export default function ScoreBoard ({scores}) {
    const scoreboard = scores.map((score, id)=>{
        
        return (<div className="game-score" key={id}>Game {id+1} : {timeToSecond(score)}</div>)
    })
    return (<aside className="score-board">
        <div className="scoreboard-heading"><p>SCORE BOARD</p></div>
        {scoreboard}        
        </aside>)
}