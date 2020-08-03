import React, { useState} from 'react';
import CountingMachine from './CoutingMachine';
import {getSound, toggleSound, playSFX} from './SoundFX';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Timer = () =>{
    const oriWorkTime = 1500;
    const oriBreakTime = 300;
    const oriLongBreakTime = 900;
    const oriForceBreak = true;
    const [workTime, setWorkTime] = useState(1500);
    const [breakTime, setBreakTime] = useState(300);
    const [longBreakTime, setLongBreakTime] = useState(900);
    const [workMinutes, setWorkMinutes] = useState(secondsToMinutes(1500));
    const [breakMinutes, setBreakMinutes] = useState(secondsToMinutes(300));
    const [longBreakMinutes, setlongBreakMinutes] = useState(secondsToMinutes(900));
    const [maxTime, setMaxTime] = useState({work: workTime, break: breakTime, longBreak: longBreakTime});
    const [forceBreak, setForceBreak] = useState(true);
    const [sound, setSound] = useState(true);

    const handleSubmit = (event) => {
        event.preventDefault();
        setMaxTime({work: workTime, break: breakTime, longBreak: longBreakTime});
    }

    function secondsToMinutes(seconds){
        let minutes = Math.floor(seconds / 60);
        let secondsMinutes = seconds - minutes * 60;

        if(minutes.toString().length === 1){
            minutes = "0" + minutes;
        }

        if(secondsMinutes.toString().length === 1){
            secondsMinutes = "0" + secondsMinutes;
        }

        return minutes + ":" + secondsMinutes;
    }

    function resetValues(){
        playSFX('clickReset');
        setWorkTime(oriWorkTime);
        setBreakTime(oriBreakTime);
        setLongBreakTime(oriLongBreakTime);
        setForceBreak(oriForceBreak);
    }

    return(
        <div>
            <ToastContainer />
            <div className="timer"> 
                <div className="timerWithButtons effect8">
                    <form onSubmit={handleSubmit}>
                        <div className="row">
                            <div className="col-12">
                                <button type="button" className="iconButton floatRight" data-toggle="modal" data-target="#settingsModal" aria-label="settings" onClick ={() => playSFX('clickSettings')}>
                                    <i className="fa fa-cog"></i>
                                </button>                            
                            </div>
                        </div>


                        <div className="modal fade" id="settingsModal" tabIndex="-1" role="dialog" aria-labelledby="settingsModalLabel" aria-hidden="true">
                            <div className="modal-dialog" role="document">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="settingsModalLabel"><i className="fa fa-cog"></i> Settings</h5>
                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick ={() => playSFX('clickSettings')}>
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div className="modal-body">
                                        <div className="form-group row">
                                            <label htmlFor="workSecs" className="col-sm-5 col-form-label">Work time</label>
                                            <div className="col-sm-7">
                                                <div className="input-group ">
                                                    <input type="number" className="form-control" name="inputSecs" id="workSecs" value={workTime} onChange={e => {setWorkTime(e.target.value); setWorkMinutes(secondsToMinutes(e.target.value))}} />
                                                    <div className="input-group-append">
                                                        <span className="input-group-text">seconds</span>
                                                        <span className="input-group-text">{workMinutes}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label htmlFor="breakSecs" className="col-sm-5 col-form-label">Short break time</label>
                                            <div className="col-sm-7">
                                                <div className="input-group ">
                                                    <input type="number" className="form-control" name="inputSecs" id="breakSecs" value={breakTime} onChange={e => {setBreakTime(e.target.value); setBreakMinutes(secondsToMinutes(e.target.value))}} />
                                                    <div className="input-group-append">
                                                        <span className="input-group-text">seconds</span>
                                                        <span className="input-group-text">{breakMinutes}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label htmlFor="longBreakSecs" className="col-sm-5 col-form-label">Long break time</label>
                                            <div className="col-sm-7">
                                                <div className="input-group ">
                                                    <input type="number" className="form-control" name="inputSecs" id="longBreakSecs" value={longBreakTime} onChange={e => {setLongBreakTime(e.target.value); setlongBreakMinutes(secondsToMinutes(e.target.value))}} />
                                                    <div className="input-group-append">
                                                        <span className="input-group-text">seconds</span>
                                                        <span className="input-group-text">{longBreakMinutes}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label htmlFor="forceBreak" className="col-5 col-form-label">Force long break</label>
                                            <div className="col-7">
                                                <label className="switch">
                                                    <input type="checkbox" name="checkboxForceBreak" id="forceBreak" checked={forceBreak} onChange={e => {setForceBreak(!forceBreak); playSFX('clickSettings')}} />
                                                    <span className="slider round"></span>
                                                </label>
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label htmlFor="sound" className="col-5 col-form-label">Sound</label>
                                            <div className="col-7">
                                                <label className="switch">
                                                    <input type="checkbox" name="checkboxSound" id="sound" checked={sound} onChange={e => {toggleSound(); setSound(getSound); playSFX('clickSettings'); }}  />
                                                    <span className="slider round"></span>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="submit" className='btn btn-light iconButton' onClick={() => resetValues()}>Reset</button>
                                        <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={() => playSFX('clickSettings')}><i className="fa fa-times"></i> Close</button>
                                        <button type="submit" className="btn btn-success" onClick={() => {playSFX('clickSettings'); toast.success("✔ Saved", {autoClose: 1500})}}><i className="fa fa-save"></i> Save</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                    <CountingMachine maxTime={maxTime} forceBreak={forceBreak}/>
                </div>
            </div>
        </div>
    )
}

export default Timer;