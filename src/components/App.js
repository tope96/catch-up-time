import React from 'react';
import '../styles/timerLayout.css';
import '../styles/mainStyle.css'
import Timer from './Timer';
import { useTranslation } from 'react-i18next';

const App = () => {
    const [t, i18n] = useTranslation();
    return(
        <div>
            <div className="container">
                <div className="row">
                    <div className="col-12 title">
                        Catch-up Time
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <Timer />
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <div className="legal">
                            {i18n.t("legal")}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;