import React from 'react';
import '../styles/timerLayout.css';
import '../styles/mainStyle.css'
import Timer from './Timer';

const App = () => {
    return(
        <div>
            <div className="container">
                <div>
                    <Timer />
                </div>
            </div>
        </div>
    );
}

export default App;