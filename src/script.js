/* Author: Clifford Chirwa
 * Controls for site interactivity.
 */
const colors = {
    pressedStyle: '#121914', 
};

/*
 * Timer display.
 */
let  timer = document.querySelector("#Timer_Content");

/*
 * @param InitialTime in seconds
 * @output void
 */
const timeSub = (InitialTime) => {
    let time = InitialTime;
    let cntTerminator = 0;

    setInterval(
        ()=>{
            time--;
        
            if(time>=cntTerminator){    
                timer.innerText = time;
            }else{
                return;
            }
        }
     ,1000);
}

/*
 * Keyboard press actions
 */


const keymapKey = document.querySelectorAll(".keymapKey");
const qbg = (keymapKey[0].dataset.key)

/*
 * TODO: 2/8/24
 * create an array that has all the characters spans 
 * collected in them. Then when a button is pressed
 * the corresponding span can be programmed to change.
 */

//Collection of keys and classlist to manipulate
const letterDict = {
    'q':keymapKey[0].classList,
    'w':keymapKey[1].classList,
    'e':keymapKey[2].classList,
    'r':keymapKey[3].classList,
    't':keymapKey[4].classList,
    'y':keymapKey[5].classList,
    'u':keymapKey[6].classList,
    'i':keymapKey[7].classList,
    'o':keymapKey[8].classList,
    'p':keymapKey[9].classList,
    '[':keymapKey[10].classList,
    ']':keymapKey[11].classList,
    'a':keymapKey[12].classList,
    's':keymapKey[13].classList,
    'd':keymapKey[14].classList,
    'f':keymapKey[15].classList,
    'g':keymapKey[16].classList,
    'h':keymapKey[17].classList,
    'j':keymapKey[18].classList,
    'k':keymapKey[19].classList,
    'l':keymapKey[20].classList,
    ';':keymapKey[21].classList,
    "'":keymapKey[22].classList,
    'z':keymapKey[23].classList,
    'x':keymapKey[24].classList,
    'c':keymapKey[25].classList,
    'v':keymapKey[26].classList,
    'b':keymapKey[27].classList,
    'n':keymapKey[28].classList,
    'm':keymapKey[29].classList,
    ',':keymapKey[30].classList,
    '.':keymapKey[31].classList,
    '/':keymapKey[32].classList,
    '_':keymapKey[33].classList
}

const keyPressIndicator = (keyPress) => {
    letterDict[keyPress].toggle('pressed');
}

document.addEventListener("keydown",
    (e)=> {
        e.preventDefault();
        let btn = e.key.toLowerCase();

        if(e.keyCode === 32){
            keyPressIndicator('_');
        }
        else if(65< e.keyCode<=90){
            keyPressIndicator(btn);
        }

});

document.addEventListener("keyup",
    (e)=> {
       // if(e.defaultPrevented){
      //      return;
       // }
        let btn = e.key;
       
        if(e.keyCode === 32){
            e.preventDefault();
            keyPressIndicator('_');
        }
        keyPressIndicator(btn);
});






