import React from 'react';
import '../styles/timerLayout.css';
import '../styles/mainStyle.css'
import Timer from './Timer';

const App = () => {
    return(
        <div>
            <div className="container">
                <div className="row">
                    <div className="col-12 title">
                        Pomodoro Timer
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <Timer />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;