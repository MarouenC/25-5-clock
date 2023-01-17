import React, { useEffect,useState } from 'react';
import './App.css';
function App() {
  const [sessiontimer, setSessiontimer] = React.useState(10);
  const [breaktimer, setBreaktimer] = React.useState(7);
  const [displayTime, setdisplaytime] = React.useState(10);
  const [timerOn, SettimerOn] = React.useState(false);
  const [onBreak, SetonBreak] = React.useState(false);
  const [breakaudio,setbreakaudio]= React.useState(new Audio('./src/beep.mp3'));
const playsound=()=>{
  breakaudio.currentTime = 0;
  breakaudio.play();
}
const convertTime=(time)=>{
  let seconds = Math.floor(time%60);
  let minutes = Math.floor(time/60)
  let FinalTime ="";
  if(minutes<10){
    minutes = "0" + minutes
  }
  if (minutes<1){
    FinalTime = "00" + ":"  + seconds;
  }
  if(seconds<10){
    seconds = "0" + seconds
  }
    FinalTime = minutes + " : " + seconds;
  return FinalTime;
};
const resetTime=()=>{
  setSessiontimer(25*60)
  setBreaktimer(5*60)
  setdisplaytime(25*60)
}
const incrementSession=()=>{
  if (!timerOn){
  if(sessiontimer<60*60 && sessiontimer>0){setSessiontimer(sessiontimer+60)}
  else(setSessiontimer(25*60))
    setdisplaytime(sessiontimer+60)
  }
}
const decrementSession=()=>{
  if (!timerOn){
  if(sessiontimer<60*60 && sessiontimer>0){setSessiontimer(sessiontimer-60)}
  else(setSessiontimer(25*60))
  setdisplaytime(sessiontimer-60)
  }
}
const incrementBreak=()=>{
  if (!timerOn){
  if(breaktimer<60*60 && breaktimer>0){setBreaktimer(breaktimer+60)}
  else(setBreaktimer(5*60))
}
}
const decremenentBreak=()=>{
  if (!timerOn){
  if(breaktimer<60*60 && breaktimer>0){setBreaktimer(breaktimer-60)}
  else(setBreaktimer(5*60))
}
}
const startCountdown = () => {
  let second = 1000;
  let date = new Date().getTime();
  let nextDate = new Date().getTime() + second;
  let onVariableBreak = onBreak;
  if(!timerOn){
    let interval = setInterval(()=>{
      date = new Date().getTime();
      if (date > nextDate){
        setdisplaytime(prev =>{
          if (prev <=0 && !onVariableBreak){
            onVariableBreak = true;
            SetonBreak(true);
            return breaktimer;
          }
          else if( prev <= 0 && onVariableBreak){
            onVariableBreak = false;
            SetonBreak(false);
            return sessiontimer;
          }
          return prev-1;
        })
        nextDate += second;
      }
    },30)
    localStorage.clear();
    localStorage.setItem("interval-id", interval);
  };
  if(timerOn){
    clearInterval(localStorage.getItem("interval-id"))
  }
  SettimerOn(!timerOn);
}
  return (
  <main>
    <div className='container' >
      <h2> 25+5 Clock</h2>
      <div className='row' >
        <div className='col-md-6'>
          <label id="break-label">Break Length</label>
          <div className='d-flex handle-time'>
            <button id="break-increment" className='btn btn-success ' onClick={incrementBreak}><i className="bi bi-arrow-up-circle"></i></button>
            <input id="break-length" name="breakLen" size="2" value={convertTime(breaktimer)}/>
            <button id="break-decrement" className='btn btn-danger ' onClick={decremenentBreak}><i className="bi bi-arrow-down-circle"></i></button>
          </div>
        </div>
        <div className='col-md-6'>
          <label id="session-label">Session length</label>
          <div className='d-flex handle-time'>
            <button id="session-increment" className='btn btn-success ' onClick={incrementSession}><i className="bi bi-arrow-up-circle"></i></button>
            <input id="session-length" size="2" value={convertTime(sessiontimer)}/>
            <button id="session-decrement" className='btn btn-danger ' onClick={decrementSession}><i className="bi bi-arrow-down-circle"></i></button>
          </div>
        </div>
      </div>
      <div>
        <div className='my-5 time-container border d-sm-block border-5 border-success rounded'>
          <h3 id="timer-label">{!onBreak? "Session" : "Break"}</h3>
          <div id="time-left">{convertTime(displayTime)}</div>
        </div>
        <div className="d-flex justify-content-evenly py-2">
          <button id="start_stop" className='btn btn-primary ' onClick={startCountdown}> 
          { timerOn?(<i className="bi bi-pause-fill"></i>) : (<i className="bi bi-play"></i> )}
           <audio id="beep" preload="auto" 
          src="https://goo.gl/65cBl1"></audio></button>
          <button id="reset" className='btn btn-info ' onClick={resetTime}><i className="bi bi-arrow-counterclockwise"></i></button>
        </div>
      </div>
    </div>
  </main>
  );
}

export default App;
