import React from "react";
import "./ScoreBoard.css";
import { timeToMinute } from "../../utilities/utils"

export default function ScoreBoard ({scores}) {
    const scoreboard = scores.map((score, id)=>{
        
        return (<div className="game-score" key={id}>Game {id+1} : {timeToMinute(score)}</div>)
    })
    return (<aside className="score-board">
        <div className="scoreboard-heading"><p>SCORE BOARD</p></div>
        {scoreboard}        
        </aside>)
}