import React, { useState, useEffect, useCallback } from 'react';
import '../styles/timerLayout.css';
import addNotification from 'react-push-notification';

const CalculateTimeLeft = (props) => {
    const [secondsSetByUser, setsecondsSetByUser] = useState(props.maxTime);
    const [seconds, setSeconds] = useState(secondsSetByUser.work);
    const [isActive, setIsActive] = useState(false);
    const [buttonName, setButtonName] = useState("Start");
    const [timeText, setTimeText] = useState("25:00");
    const [cssClass, setCssClass] = useState("btn btn-success actionButton")
    const [currentMode, setCurrentMode] = useState("work");

    const toggleActive = useCallback(()=>{
        setIsActive(!isActive);

        if(isActive){
            setCssClass("btn btn-success actionButton");
            setButtonName("Start");
        }else{
            setCssClass("btn btn-danger actionButton")
            setButtonName("Stop");
        }

        document.title = "Pomodoro Timer"
    },[isActive])

    function setTimerTo(seconds){
        let seconds1 = parseInt(seconds);
        let minutes = Math.floor(seconds1 / 60);
        let secondsMinutes = seconds1 - minutes * 60;

        if(minutes.toString().length === 1){
            minutes = "0" + minutes;
        }

        if(secondsMinutes.toString().length === 1){
            secondsMinutes = "0" + secondsMinutes;
        }

        setSeconds(seconds1);
        setTimeText(minutes + ":" + secondsMinutes);
    }
    
    const workTime = useCallback(() => {
        setCurrentMode("work");
        setTimerTo(secondsSetByUser.work);
        setIsActive(false);
        setCssClass("btn btn-success actionButton");
        setButtonName("Start");
    },[secondsSetByUser.work]);

    const breakTime = useCallback(() => {
        setCurrentMode("break");
        setTimerTo(secondsSetByUser.break);
        setIsActive(false);
        setCssClass("btn btn-success actionButton");
        setButtonName("Start");
    },[secondsSetByUser.break]);

    const longBreakTime = useCallback(() => {
        setCurrentMode("longBreak");
        setTimerTo(secondsSetByUser.longBreak);
        setIsActive(false);
        setCssClass("btn btn-success actionButton");
        setButtonName("Start");
    }, [secondsSetByUser.longBreak]);

    const toggleReset = useCallback(() => {
        if(currentMode === "work"){
            workTime();
        }else if(currentMode === "break"){
            breakTime();
        }else if(currentMode === "longBreak"){
            longBreakTime();
        }
        document.title = "Pomodoro Timer"
    },[currentMode, workTime, breakTime, longBreakTime])

    useEffect(() => {
        setsecondsSetByUser(props.maxTime);

        toggleReset();
    }, [props.maxTime, toggleReset])

    useEffect(() => {
        let interval = null;
        
        if (isActive) {
            if (seconds !== -1) {
                interval = setInterval(() => {
                    setTimerTo(seconds-1)
                }, 1000);
                return () => clearInterval(interval);
            }else{
                toggleActive();
                document.title = "Times up!";
                addNotification({
                    title: 'Time is up!',
                    subtitle: 'Pomodoro',
                    theme: 'darkblue',
                    duration: 3000,
                    native: true
                });
                if(currentMode === "work"){
                    breakTime();
                }else if(currentMode === "break"){
                    workTime();
                }
            }
        }
    }, [seconds, isActive, timeText, breakTime, currentMode, toggleActive, workTime]);


    return(
        <div>
            <div className="allButtonsTimeOptions">
                <button className="btn btn-danger buttonTimeOptions" onClick={() => workTime()}>Work</button>
                <button className="btn btn-danger buttonTimeOptions" onClick={() => breakTime()}>Short break</button>
                <button className="btn btn-danger buttonTimeOptions" onClick={() => longBreakTime()}>Long break</button>
            </div>
            <div className="timerText">{timeText}</div><br />
            <button className={cssClass} onClick={() => toggleActive()}>{buttonName}</button>
            <button className="btn btn-warning actionButton" onClick={() => toggleReset()}>Reset timer</button>
        </div>
    );
};

export default CalculateTimeLeft;