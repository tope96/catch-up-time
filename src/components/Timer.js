import React, { useState, useEffect} from 'react';
import CountingMachine from './CoutingMachine';
import { toggleSound, playSFX } from './SoundFX';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Timer = () =>{
    const oriTimes = {work: 1500, break: 300, longBreak: 900}
    const oriForceBreak = true;
    const [maxTime, setMaxTime] = useState(JSON.parse(localStorage.getItem('times')) || oriTimes);
    const [forceBreak, setForceBreak] = useState(localStorage.getItem('forceBreak')==='false' ? false: true );
    const [sound, setSound] = useState(localStorage.getItem('sound')==='false' ? false : true);
    const [autoPlay, setAutoplay] = useState(localStorage.getItem('autoplay')==='true' ? true : false);

    const handleSubmit = (event) => {
        event.preventDefault();
        localStorage.setItem('forceBreak', forceBreak);
        localStorage.setItem('times', JSON.stringify(maxTime));
        localStorage.setItem('sound', sound);
        localStorage.setItem('autoplay', autoPlay);
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
        setMaxTime(oriTimes);
        setForceBreak(oriForceBreak);
    }

    useEffect(() => {
        toggleSound(sound);
    }, [sound])

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
                                                    <input 
                                                        type="number"
                                                        className="form-control"
                                                        name="inputSecs"
                                                        id="workSecs"
                                                        value={maxTime.work}
                                                        onChange={e => setMaxTime({...maxTime, work: parseInt(e.target.value)})}
                                                    />
                                                    <div className="input-group-append">
                                                        <span className="input-group-text">seconds</span>
                                                        <span className="input-group-text">{secondsToMinutes(maxTime.work)}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label htmlFor="breakSecs" className="col-sm-5 col-form-label">Short break time</label>
                                            <div className="col-sm-7">
                                                <div className="input-group ">
                                                    <input
                                                        type="number"
                                                        className="form-control"
                                                        name="inputSecs"
                                                        id="breakSecs"
                                                        value={maxTime.break}
                                                        onChange={e => setMaxTime({...maxTime, break: parseInt(e.target.value)})} 
                                                    />
                                                    <div className="input-group-append">
                                                        <span className="input-group-text">seconds</span>
                                                        <span className="input-group-text">{secondsToMinutes(maxTime.break)}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label htmlFor="longBreakSecs" className="col-sm-5 col-form-label">Long break time</label>
                                            <div className="col-sm-7">
                                                <div className="input-group ">
                                                    <input
                                                        type="number"
                                                        className="form-control"
                                                        name="inputSecs"
                                                        id="longBreakSecs"
                                                        value={maxTime.longBreak}
                                                        onChange={e => setMaxTime({...maxTime, longBreak: parseInt(e.target.value)})} 
                                                    />
                                                    <div className="input-group-append">
                                                        <span className="input-group-text">seconds</span>
                                                        <span className="input-group-text">{secondsToMinutes(maxTime.longBreak)}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label htmlFor="forceBreak" className="col-5 col-form-label">Force long break</label>
                                            <div className="col-7">
                                                <label className="switch">
                                                    <input
                                                        type="checkbox"
                                                        name="checkboxForceBreak"
                                                        id="forceBreak"
                                                        checked={forceBreak}
                                                        onChange={e => {
                                                            setForceBreak(!forceBreak);
                                                            playSFX('clickSettings');
                                                            }}
                                                    />
                                                    <span className="slider round"></span>
                                                </label>
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label htmlFor="sound" className="col-5 col-form-label">Sound</label>
                                            <div className="col-7">
                                                <label className="switch">
                                                    <input
                                                        type="checkbox"
                                                        name="checkboxSound"
                                                        id="sound"
                                                        checked={sound}
                                                        onChange={e => {
                                                            setSound(e.target.checked);
                                                            playSFX('clickSettings');
                                                            }}
                                                    />
                                                    <span className="slider round"></span>
                                                </label>
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label htmlFor="autoPlay" className="col-5 col-form-label">Autoplay</label>
                                            <div className="col-7">
                                                <label className="switch">
                                                    <input
                                                        type="checkbox"
                                                        name="checkboxSound"
                                                        id="autoPlay"
                                                        checked={autoPlay}
                                                        onChange={e => {
                                                            setAutoplay(e.target.checked);
                                                            playSFX('clickSettings');
                                                            }}
                                                    />
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
                    <CountingMachine maxTime={maxTime} forceBreak={forceBreak} autoPlay={autoPlay}/>
                </div>
            </div>
        </div>
    )
}

export default Timer;