import React, { useEffect, useState } from "react";
import Header from "../components/header/Header";
import Button from "../components/button/Button";
import { getDataFromLocalStorgae, timeToMinute,  saveCurrentGameScore, getHighScore} from "../utilities/utils";

export default function ScorePage ({changeScreen}) {
    const [score, setScore] = useState(2);
    const [newHighScore, setNewHighScore] = useState(false);
    useEffect(()=> {
      if(getDataFromLocalStorgae("score")){
          const currScore = getDataFromLocalStorgae("score");
          setScore(currScore);
          saveCurrentGameScore(currScore);
          getHighScore().then(result=>result > currScore?setNewHighScore(false):setNewHighScore(true));
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (<div>
        <Header showScore={false}/>
        <div className="score-detail-section">
           <p className="game-number">SCORE : GAME </p>
           <p className="game-time">{timeToMinute(score)}</p>
           {newHighScore?<p className="game-high-score">New High Score</p>:""}
           {newHighScore?<p className="game-high-png"><img src="/highScore.png" alt="high-score"/></p>:""}
           <Button iconClass="las la-redo-alt" btnName="PLAY AGAIN" clickAction={changeScreen} pageName="startPage"/>
        </div>
        <Button btnName="QUIT" clickAction={changeScreen} pageName="startPage"/>
        </div>
    );
}