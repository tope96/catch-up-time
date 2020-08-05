import ding from '../sfx/ding.mp3';
import clickStart from '../sfx/clickStart.mp3';
import clickReset from '../sfx/clickReset.mp3';
import clickSettings from '../sfx/clickSettings.mp3';

const dingSFX = new Audio(ding);
const clickStartSFX = new Audio(clickStart);
const clickResetSFX = new Audio(clickReset);
const clickSettingsSFX = new Audio(clickSettings);
var sound = true;

// export function toggleSound () {
//    sound = (!sound);
// }

export function toggleSound(state){
    sound = state;
}

export function getSound() {
    return sound;
}

export function playSFX (name) {
    if (sound ===true){
        switch(name){
            case 'ding': 
                dingSFX.play();
                break;
            case 'clickStart': 
                clickStartSFX.play();
                break;
            case 'clickReset': 
                clickResetSFX.play();
                break;
            case 'clickSettings': 
                clickSettingsSFX.play();
                break;
            default:
                console.log('No such sound ' + name);
                break;
        }
    } else{
        console.log('Sound is off');
    }
}
export default playSFX;