import React, { useState } from 'react';
import StartPage from "./pages/StartPage";
import GamePage from "./pages/GamePage";
import ScorePage from "./pages/ScorePage";
import { getDataFromLocalStorgae } from "./utilities/utils";
import './App.css';

function App() {
  const [gameScreen, setGameScreen] = useState("startPage");
  const changeScreen = (value) => {
     setGameScreen(value)
  }

  if(gameScreen === "startPage") {
    return (
      <div className="App" >
        <StartPage changeScreen = {changeScreen}/>
    </div>
    )
  }
  else if(gameScreen === "gamePage") {
    const UserObject = getDataFromLocalStorgae("user");
    const {factor} = UserObject.difficulty;
    
    return (
      <div className="App">
        <GamePage changeScreen = {changeScreen} factor = {factor}/>
    </div>
    )
  }
  
  return (
    <div className="App">
      <ScorePage changeScreen = {changeScreen}/>
    </div>
  );
}

export default App;
