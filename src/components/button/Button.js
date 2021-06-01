import React from "react";
import "./button.css";

export default function button ({iconClass = "", btnName, clickAction, pageName }) {
    return (
        <div className="game-btn">
              <button className="btn btn-transparent" 
              onClick={()=>{clickAction(pageName)}}>
                  { iconClass !== ""?<i className={iconClass}></i>: ""}{btnName}</button>
          </div>
    );
}