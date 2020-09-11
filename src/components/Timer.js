import React, { useState, useEffect} from 'react';
import CountingMachine from './CoutingMachine';
import Todo from './Todo.js';
import { toggleSound, playSFX } from './SoundFX';
import { ToastContainer, toast } from 'react-toastify';
import ReactTooltip from 'react-tooltip';
import 'react-toastify/dist/ReactToastify.css';
import { useTranslation } from 'react-i18next';
import LanguageSelector from './LanguageSelector';

const Timer = () =>{
    const [t, i18n] = useTranslation();
    const toolTips = {
        workTime: i18n.t("settings.tooltips.workTime"),
        breakTime: i18n.t("settings.tooltips.breakTime"),
        longBreakTime: i18n.t("settings.tooltips.longBreakTime"),
        forceLongBreak: i18n.t("settings.tooltips.forceLongBreak"),
        sound: i18n.t("settings.tooltips.sound"),
        autoplay: i18n.t("settings.tooltips.autoplay"),
        reset: i18n.t("settings.tooltips.reset")
    };
    const oriTimes = {work: 1500, break: 300, longBreak: 900};
    const oriForceBreak = true;
    const [maxTime, setMaxTime] = useState(JSON.parse(localStorage.getItem('times')) || oriTimes);
    const [forceBreak, setForceBreak] = useState(localStorage.getItem('forceBreak') === 'false' ? false: true );
    const [sound, setSound] = useState(localStorage.getItem('sound') === 'false' ? false : true);
    const [autoPlay, setAutoplay] = useState(localStorage.getItem('autoplay') === 'true' ? true : false);

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

        if (minutes.toString().length === 1) {
            minutes = "0" + minutes;
        }

        if (secondsMinutes.toString().length === 1) {
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
                            <ReactTooltip />
                            <div className="modal-dialog" role="document">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="settingsModalLabel"><i className="fa fa-cog"></i> {i18n.t("settings.title")}</h5>
                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick ={() => playSFX('clickSettings')}>
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div className="modal-body">
                                        <div className="form-group row">
                                            <label htmlFor="workSecs" className="col-sm-5 col-form-label" data-tip={toolTips.workTime}>{i18n.t("settings.workTime")}</label>
                                            <div className="col-sm-7">
                                                <div className="input-group ">
                                                    <input
                                                        type="number"
                                                        className="form-control"
                                                        name="inputSecs"
                                                        id="workSecs"
                                                        value={maxTime.work === 0 ? "" : maxTime.work}
                                                        onChange={e =>setMaxTime({...maxTime, work: +(e.target.value)})}
                                                    />
                                                    <div className="input-group-append">
                                                        <span className="input-group-text">{i18n.t("settings.seconds")}</span>
                                                        <span className="input-group-text">{secondsToMinutes(maxTime.work)}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label htmlFor="breakSecs" className="col-sm-5 col-form-label" data-tip={toolTips.breakTime}>{i18n.t("settings.shBreak")}</label>
                                            <div className="col-sm-7">
                                                <div className="input-group ">
                                                    <input
                                                        type="number"
                                                        className="form-control"
                                                        name="inputSecs"
                                                        id="breakSecs"
                                                        value={maxTime.break === 0 ? "" : maxTime.break}
                                                        onChange={e => setMaxTime({...maxTime, break: +(e.target.value)})}
                                                    />
                                                    <div className="input-group-append">
                                                        <span className="input-group-text">{i18n.t("settings.seconds")}</span>
                                                        <span className="input-group-text">{secondsToMinutes(maxTime.break)}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label htmlFor="longBreakSecs" className="col-sm-5 col-form-label" data-tip={toolTips.longBreakTime}>{i18n.t("settings.lnBreak")}</label>
                                            <div className="col-sm-7">
                                                <div className="input-group ">
                                                    <input
                                                        type="number"
                                                        className="form-control"
                                                        name="inputSecs"
                                                        id="longBreakSecs"
                                                        value={maxTime.longBreak === 0 ? "" : maxTime.longBreak}
                                                        onChange={e => setMaxTime({...maxTime, longBreak: +(e.target.value)})}
                                                    />
                                                    <div className="input-group-append">
                                                        <span className="input-group-text">{i18n.t("settings.seconds")}</span>
                                                        <span className="input-group-text">{secondsToMinutes(maxTime.longBreak)}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label htmlFor="forceBreak" className="col-5 col-form-label" data-tip={toolTips.forceLongBreak}>{i18n.t("settings.forceBreak")}</label>
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
                                            <label htmlFor="sound" className="col-5 col-form-label" data-tip={toolTips.sound}>{i18n.t("settings.sound")}</label>
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
                                            <label htmlFor="autoPlay" className="col-5 col-form-label" data-tip={toolTips.autoplay}>{i18n.t("settings.autoplay")}</label>
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
                                        <div className="form-group row">
                                            <label htmlFor="autoPlay" className="col-5 col-form-label" data-tip={toolTips.autoplay}>{i18n.t("settings.language")}</label>
                                            <div className="col-7">
                                                <label className="languageSelector">
                                                    <LanguageSelector />
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="submit" className='btn btn-light iconButton' data-tip={toolTips.reset} onClick={() => resetValues()}>{i18n.t("settings.reset")}</button>
                                        <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={() => playSFX('clickSettings')}><i className="fa fa-times"></i> {i18n.t("close")}</button>
                                        <button type="submit" className="btn btn-success" onClick={() => {playSFX('clickSettings'); toast.success("✔" + i18n.t("saved"), {autoClose: 1500})}}><i className="fa fa-save"></i> {i18n.t("save")}</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                    <CountingMachine maxTime={maxTime} forceBreak={forceBreak} autoPlay={autoPlay}/>
                </div>
            </div>
        <Todo />
        </div>
    )
}

export default Timer;