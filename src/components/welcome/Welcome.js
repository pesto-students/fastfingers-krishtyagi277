import React, { useEffect, useState } from "react";
import "./welcome.css";
import { saveUserToLocalStorage, getDataFromLocalStorgae } from "../../utilities/utils"

export default function Welcome ({changeScreen}){
    const [playername, setPlayerName] = useState("");
    const [difficulty, setDifficulty] = useState({level:'EASY', factor:1});
    const [showValidationMessage, setShowValidationMessage] =useState(false);
    const [gameCount, setGameCount] =useState(1);
    const [showMenu, setShowMenu] = useState(false);


    const difficultyOptions = [{level:'EASY', factor:1},{level:'MEDIUM', factor:1.5}, {level:'HARD', factor:2}]
    const handleNameChange = (e)=>{
      const {target:{value = ""}} = e;
      
      setPlayerName(value);
    }

    const showMenuOnClick = () => {
        setShowMenu(!showMenu);
    }

    const handleSelectDifficulty = (value) => {
      setDifficulty(value);
      showMenuOnClick();
    }

    const setDifficultyMenu = difficultyOptions.map((item, id)=>{
        return (<h4 key={id} onClick={()=>{handleSelectDifficulty(item)}}>{item.level}</h4>)
    })

    const handleSubmit = (e) =>{
       e.preventDefault();

       if(playername === "" || playername === undefined || playername === null) {
           setShowValidationMessage(true)
           setTimeout(()=>{setShowValidationMessage(false)}, 4000);
           return;
       }

       const UserObject = {
           playername,
           difficulty,
           gameCount,
       }


       saveUserToLocalStorage("user", UserObject);
       changeScreen("gamePage");

    }

    useEffect(()=>{
       if(localStorage.getItem("user") !== null) {
        const user = getDataFromLocalStorgae("user");
        setPlayerName(user.playername);
        setDifficulty(user.difficulty);
        setGameCount(user.gameCount);
      }
    }, []);

    return(<div>
        <div className="start-page">
            <div className="icon-keyboard"><i className="las la-keyboard"></i></div>
            <div className="heading"><p>fast fingers</p></div>
            <div className="ultimate-title"><div className="line"></div><div> the ultimate typing game</div><div className="line"></div></div>
            <div className="form-fields">
                <form onSubmit={handleSubmit}>
                    <div className="form-item">
                        <input type="text" name="playername" value={playername} onChange={handleNameChange} placeholder="TYPE YOUR NAME"/>
                        {showValidationMessage ?  <div className="validation-message"><p>!PLEASE FILL YOUR NAME</p></div> : ""}
                        </div>
                    <div className="form-item">
                        <input type="text" name="difficulty" value={difficulty.level} onClick={showMenuOnClick} readOnly/> <i className="las la-caret-down" onClick={showMenuOnClick}></i>
                        {showMenu === true ?  <div className="difficulty-menu">
                           {setDifficultyMenu}
                        </div> : ""}
                    </div>
                    <div className="form-item">
                       <button className="btn btn-transparent"><i className="las la-play"></i> START GAME</button>
                    </div>
                </form>
            </div>
        </div>
    </div>)
}
