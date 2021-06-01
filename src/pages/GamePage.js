import React, { useEffect, useState } from "react";
import Header from "../components/header/Header";
import ScoreBoard from "../components/scoreboard/ScoreBoard";
import InputArea from "../components/inputarea/InputArea";
import Button from "../components/button/Button"
import { getDataFromLocalStorgae } from "../utilities/utils";

export default function GamePage ({changeScreen, factor = 1}) {
  const [scoreBoardData, setScoreBoardData] = useState([]);
  useEffect(()=>{
    if(getDataFromLocalStorgae("scoreboard")) {
       setScoreBoardData(getDataFromLocalStorgae("scoreboard"));
    }
  }, [])

    return (<div>
        <Header />
        <div className="game-section">
        <ScoreBoard scores={scoreBoardData}/>
        <div className="game-play-section">
          <InputArea factor={factor} gameLost={changeScreen}/>
         </div>

        </div>
        <Button iconClass="las la-times" btnName="STOP GAME" clickAction = {changeScreen} pageName="scorePage"/>
        </div>);
}