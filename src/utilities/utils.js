export function saveDataToLocalStorage(key, data) {
    if(data === undefined || data === "" || data === null) {
        throw new Error("data must not be null or empty");
    }

    localStorage.setItem(key, JSON.stringify(data));
}

export function getDataFromLocalStorgae(key) {
    if(key === undefined || key === "" || key === null) {
        throw new Error();
    }
    return JSON.parse(localStorage.getItem(key));
}

export function timeToString(time) {
    let diffInHrs = time / 3600000;
    let hh = Math.floor(diffInHrs);
  
    let diffInMin = (diffInHrs - hh) * 60;
    let mm = Math.floor(diffInMin);
  
    let diffInSec = (diffInMin - mm) * 60;
    let ss = Math.floor(diffInSec);
  
    let diffInMs = (diffInSec - ss) * 100;
    let ms = Math.floor(diffInMs);
  
    let formattedSS = ss.toString().padStart(2, "0");
    let formattedMS = ms.toString().padStart(2, "0");
  
    return `${formattedSS}:${formattedMS}`;
}

export function saveUserToLocalStorage(key, data) {
    if(data === undefined || data === "" || data === null) {
        throw new Error("data must not be null or empty");
    }

    if(key === undefined || key === "" || key === null) {
        throw new Error("key must not be null or empty");
    }

    if(localStorage.getItem(key)) {
        const userObj = JSON.parse(localStorage.getItem(key));

        if(userObj.playername === data.playername) {
            userObj.difficulty = data.difficulty;
            userObj.gameCount += data.gameCount;
            localStorage.setItem(key, JSON.stringify(userObj));
        
        } else{
            data.gameCount = 1;
            localStorage.setItem(key, JSON.stringify(data));
            localStorage.setItem("scoreboard", JSON.stringify([]));
        }

    } else {
        localStorage.setItem(key, JSON.stringify(data));
        localStorage.setItem("scoreboard", JSON.stringify([]));
    }

}

export function saveCurrentGameScore(score) {
   
    const userObj = JSON.parse(localStorage.getItem("user"));
    const scoreboard = JSON.parse(localStorage.getItem("scoreboard"));

    if(userObj && scoreboard) {
        scoreboard.push(score)
        localStorage.setItem(`scoreboard`, JSON.stringify(scoreboard));
    }
}

export async function getHighScore() {
    const scoreboard = JSON.parse(localStorage.getItem("scoreboard"));
    if(scoreboard) {
      let max = await scoreboard.reduce((acc, val)=>{
                  if(acc < val) {
                    acc = val;
                  }
                  return acc;
         }, 0)
       return max; 
    }
}

export function timeToSecond(time) {
   return `${time}:00`;
}


export function setDifficultyLevel(level, factor) {
    if(localStorage.getItem("user")) {
        const userObj = JSON.parse(localStorage.getItem("user"));
        userObj.difficulty.level = level;
        userObj.difficulty.factor = factor

        localStorage.setItem("user", JSON.stringify(userObj));
    }
}

export function getDifficultyLevel() {
    if(localStorage.getItem("user")) {
        const user = JSON.parse(localStorage.getItem("user"));
        return user.difficulty.level;
    }
}