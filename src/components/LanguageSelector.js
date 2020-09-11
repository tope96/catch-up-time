import React, {useState} from 'react';
import '../styles/timerLayout.css';
import '../styles/mainStyle.css'
import { useTranslation } from 'react-i18next';

const LanguageSelector = () => {
    const { i18n } = useTranslation("en");
    const [selectedLang, setSelectedLang] = useState(localStorage.getItem('lang') === null ? 'en' : localStorage.getItem('lang'));

    const setLanguage = (language) => {
        i18n.changeLanguage(language);
        localStorage.setItem('lang', language);
        setSelectedLang(language);
      }

    return(
        <select className="form-control form-control-sm" onChange={(e) => {setLanguage(e.target.value);}} value={selectedLang}>
            <option value="de">🇩🇪 Deutsche</option>
            <option value="en">🇺🇸 English</option>
            <option value="pl">🇵🇱 Polski</option>
        </select>
    )
}

export default LanguageSelector;