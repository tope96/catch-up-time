import ding from '../sfx/ding.mp3';
import clickStart from '../sfx/clickStart.mp3';
import clickReset from '../sfx/clickReset.mp3';
import clickSettings from '../sfx/clickSettings.mp3';

var sound = true;

export function toggleSound(state){
    sound = state;
}

export function getSound() {
    return sound;
}

export function playSFX (name) {
    if (sound === true){
        var snd = new Audio();
        switch(name){
            case 'ding':
                snd.src = ding;
                break;
            case 'clickStart':
                snd.src = clickStart;
                break;
            case 'clickReset':
                snd.src = clickReset;
                break;
            case 'clickSettings':
                snd.src = clickSettings;
                break;
            default:
                console.log('No such sound ' + name);
                break;
        }
        snd.play();
    }
}
export default playSFX;