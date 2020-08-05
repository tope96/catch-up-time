import React, { useState, useEffect, useCallback } from 'react';
import '../styles/timerLayout.css';
import addNotification from 'react-push-notification';
import {playSFX} from './SoundFX.js';

const CalculateTimeLeft = (props) => {
    const buttonActive = "btn btn-danger actionButton";
    const buttonInactive = "btn btn-outline-danger actionButton";
    const [secondsSetByUser, setsecondsSetByUser] = useState(props.maxTime);
    const [seconds, setSeconds] = useState(secondsSetByUser.work);
    const [isActive, setIsActive] = useState(false);
    const [buttonName, setButtonName] = useState("Start");
    const [timeText, setTimeText] = useState("25:00");
    const [actionButtonState, setActionButtonState] = useState("btn btn-success actionButton");
    const [activeButton, setActiveButton] = useState({work: buttonActive, breake:buttonInactive, longBreak: buttonInactive });
    const [currentMode, setCurrentMode] = useState("work");
    const [workIter, setWorkIter] = useState(1);

    const setActiveState = useCallback((activeState)=>{
        setIsActive(activeState)
        if(activeState){
            setActionButtonState("btn btn-danger actionButton")
            setButtonName("Stop");
        }else{
            setActionButtonState("btn btn-success actionButton");
            setButtonName("Start");
        }
    },[])

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
        setActiveButton({work: buttonActive, breake:buttonInactive, longBreak: buttonInactive })
        setCurrentMode("work");
        setTimerTo(secondsSetByUser.work);
    },[secondsSetByUser.work, buttonActive, buttonInactive]);

    const breakTime = useCallback(() => {
        setActiveButton({work: buttonInactive, breake:buttonActive, longBreak: buttonInactive })
        setCurrentMode("break");
        setTimerTo(secondsSetByUser.break);
    },[secondsSetByUser.break, buttonActive, buttonInactive]);

    const longBreakTime = useCallback(() => {
        setActiveButton({work: buttonInactive, breake:buttonInactive, longBreak: buttonActive })
        setCurrentMode("longBreak");
        setTimerTo(secondsSetByUser.longBreak);
    }, [secondsSetByUser.longBreak, buttonActive, buttonInactive]);

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
                setActiveState(props.autoPlay);
 
                playSFX('ding');
                var title = ['Time is up!', currentMode==='work' ? 'Take a break!' : 'Do some work!'].join(' ');
                addNotification({
                    title: title,
                    subtitle: 'Pomodoro',
                    theme: 'darkblue',
                    duration: 3000,
                    native: true
                });

                if (currentMode === "work"){
                    if(props.forceBreak && workIter >= 4){
                        longBreakTime();
                        setWorkIter(1);
                    } else {
                        setWorkIter(workIter+1);
                        breakTime();
                    }
                } else if (currentMode === "break" || currentMode === "longBreak"){
                    workTime();
                }
            }
        }
    }, [seconds, isActive, timeText, breakTime, currentMode, setActiveState, workTime, longBreakTime, workIter, props.forceBreak, props.autoPlay]);


    return(
        <div>
            <div className="allButtonsTimeOptions">
                <button className={activeButton.work} onClick={() => {playSFX('clickSettings'); workTime()}}>Work</button>
                <button className={activeButton.breake} onClick={() => {playSFX('clickSettings'); breakTime()}}>Short break</button>
                <button className={activeButton.longBreak} onClick={() => {playSFX('clickSettings'); longBreakTime()}}>Long break</button>
            </div>
            <div className="timerText">{timeText}</div><br />
            <button className={actionButtonState} onClick={() => {playSFX('clickStart'); setActiveState(!isActive)}}>{buttonName}</button>
            <button className="btn btn-warning actionButton" onClick={() => {playSFX('clickReset'); toggleReset()}}>Reset timer</button>
        </div>
    );
};

export default CalculateTimeLeft;