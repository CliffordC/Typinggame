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


const letterDict = {
    'q':keymapKey[0].classList,
}


document.addEventListener("keydown",
    (e)=> {
        if(e.defaultPrevented){
            return;
        }
        let btn = e.key;
        
        console.log(btn);
        if(btn==='q'){
            letterDict[btn].toggle('pressed');
        }

});

document.addEventListener("keyup",
    (e)=> {
        if(e.defaultPrevented){
            return;
        }
        let btn = e.key;
        
        console.log(btn);
        if(btn==='q'){
            letterDict[btn].toggle('pressed');
        }
});






