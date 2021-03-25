import React, { useEffect, useState } from "react";
import "./Header.css";
import { timeToMinute, getDataFromLocalStorgae, getDifficultyLevel } from "../../utilities/utils"

export default function Header ({showScore = true}) {
    const [score, setScore] = useState("00:00");
    const [playerName, setPlayerName] =  useState("");
    const [level, setLevel] =  useState("EASY");

    useEffect(()=>{
        const id = setInterval(()=>{
            setScore(() => timeToMinute(getDataFromLocalStorgae("score")));
            setLevel(()=> getDifficultyLevel());
        }, 100);
       
        return ()=>{
            clearInterval(id);
        }
    }, [])

    useEffect(()=>{
        if(localStorage.getItem("user") !== null) {
            const user = getDataFromLocalStorgae("user");
            setPlayerName(user.playername.toUpperCase());
            setLevel(user.difficulty.level);
         }
    }, [])

    return(<header>
        <div className="row">
            <div className="left-col"><i className="las la-user"></i> PLAYER_NAME: {playerName}</div>
            <div className="right-col">fast fingers</div>
        </div>
        <div className="row">
            <div className="left-col"><i className="las la-gamepad"></i> LEVEL : {level}</div>
            {showScore ? <div className="right-col">SCORE : {score}</div> : "" }
            
        </div>
    </header>)
}