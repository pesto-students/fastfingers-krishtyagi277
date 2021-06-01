import React, { useEffect, useRef, useState } from "react";
import "./inputarea.css";
import data from "./dictionary.json";
import { timeToString, setDifficultyLevel } from "../../utilities/utils";

export default function InputArea ({factor = 1, gameLost}) {
   const [wordToType, setWordToType] = useState("");
   const [displayWord, setDisplayWord] = useState("");
   const [wordsArray, setWordsArray] = useState([data[0]]);
   const [typingTime, setTypingTime] = useState(2);
   const [difficultyFactor, setDifficultyFactor] = useState(factor);
   const [currentScore, setCurrentScore] = useState(-2);
   const [strokeDasharrayValue, setStrokeDasharrayValue] = useState("361, 361");
   const [timerValue, setTimerValue] = useState("00:00");
   const [timeLimit, setTimeLimit] = useState(typingTime * 1000);
   const [stroke, setStroke] = useState("#4DD637");
   const [callMediumLevelFn, setCallMediumLevelFn] =  useState(true); 
   const [callHardLevelFn, setCallHardLevelFn] =  useState(true); 
   let timerInterval = null;
   let angle = 361;
   let angle_increment  = 360/(timeLimit/1000);
   const inputFieldRef = useRef(null);

   const handleOnInputValue = (e) => {
     setWordToType(e.target.value.toUpperCase());
  }

    const fillWordsArray = () => {
      setWordsArray([]);
        let filterWordsArray = [];
         if(difficultyFactor === 1) {
             filterWordsArray = data.filter((element) => element.length <= 4)
        }
        else if (difficultyFactor >= 1.5 && difficultyFactor < 2) {
            filterWordsArray = data.filter((element) => element.length >= 5 && element.length <= 8);
        }
        else {
            filterWordsArray = data.filter((element) => element.length > 8);
        }
       setWordsArray(filterWordsArray);
}

    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
    }

    const calculateTypingTime = async (word) => {
    if(word === undefined) {
      return;
    }
    const timeToType = Math.round( word.length / difficultyFactor);
    await setTypingTime(0);
    setTypingTime(  timeToType > 2 ? timeToType : 2 );
    
  }

const  startTimer = ()=> {
  let currTime =  Date.now();
  let endTime = currTime + timeLimit;
  let elapsedTime = 0;
  timerInterval = setInterval(()=>{
    elapsedTime = endTime - currTime;
    setStrokeDasharrayValue(`${angle}, 361`);
    setTimerValue(timeToString(elapsedTime));
    if( elapsedTime === 0) {
      onTimesUp();
    gameLost("scorePage");
    }
    currTime+=10;
    angle -= angle_increment/(1000/10);
    if(angle < 180 && angle > 90) {
      setStroke("#1B98F5");
    }
    else if(angle < 90 ) {
      setStroke("#ff5155");
    }
    else {
      setStroke("#4DD637");
    }
  }, 10);
}

function onTimesUp () {
  setStrokeDasharrayValue(`0, 361`);
  clearInterval(timerInterval);
}

useEffect(()=>{
  async function fillWords(){
   await fillWordsArray();
  }
  fillWords();
  inputFieldRef.current.focus();
  return () => {
    onTimesUp();
  }
 // eslint-disable-next-line react-hooks/exhaustive-deps
 }, [])

useEffect(()=>{
  if(wordToType === displayWord) {
    const wordToRender = wordsArray[getRandomInt(0, wordsArray.length-1)]
    calculateTypingTime(wordToRender);
    setDifficultyFactor(difficultyFactor + 0.01);
    setDisplayWord(wordToRender.toUpperCase());
    setWordToType("");
  }
  
 // eslint-disable-next-line react-hooks/exhaustive-deps
 }, [wordToType]);

useEffect(()=>{
  setCurrentScore(currentScore+typingTime);
  setTimeLimit(typingTime * 1000);
  return () => {
    onTimesUp();
  }
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [typingTime])

useEffect(()=>{
  startTimer();
  return ()=>{
    onTimesUp();
  }
// eslint-disable-next-line react-hooks/exhaustive-deps
},[timeLimit]);

useEffect(()=>{
  async function fillWords(){
    await fillWordsArray();
  }
  if(difficultyFactor >= 1.5 && difficultyFactor < 2 && callMediumLevelFn) {
    fillWords();
     setDifficultyLevel("MEDIUM", 1.5);
     setCallMediumLevelFn(false);
  }
  else if(difficultyFactor >= 2 && callHardLevelFn) {
   fillWords();
   setDifficultyLevel("HARD", 2);
   setCallHardLevelFn(false);
  }
  
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [difficultyFactor]);

useEffect(()=>{
  localStorage.setItem("score",JSON.stringify(currentScore));
},[currentScore])


return (<div className="game-play-area">
     <div className="timer">
     <svg id="loader-svg" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 300 300" preserveAspectRatio="none" >
     <circle cx="100" cy="100" r="57" id="pink-halo" fill="none" stroke={stroke} strokeWidth="7" strokeDasharray={strokeDasharrayValue} transform="rotate(-90,100,100)" />
     <text id="timer-text" textAnchor="middle" x="100" y="110" fill="white">{timerValue}</text>
    </svg>
  </div>
    <div className="game-play-input-area">
        <div className="word-to-type">{displayWord}</div>
          <div className="input-field-area">
              <input ref={inputFieldRef} className="input-field" type="text"  name="wordToType" value={wordToType} onChange={handleOnInputValue}/>
          </div>
        </div>
    </div>);
}
