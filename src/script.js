/* Author: Clifford Chirwa
 * Controls for site interactivity.
 */
const colors = {
    pressedStyle: '#121914', 
};

/*
 * Keyboard press actions
 */


const keymapKey = document.querySelectorAll(".keymapKey");
const qbg = (keymapKey[0].dataset.key)
console.log((qbg));

/*
 * TODO: 2/8/24
 * create an array that has all the characters spans 
 * collected in them. Then when a button is pressed
 * the corresponding span can be programmed to change.
 */
document.addEventListener("keydown",
    (e)=> {
        if(e.defaultPrevented){
            return;
        }
        let btn = e.key;
        if(btn==='q'){
            console.log('it was pressed');
        }
        
       //item.style.backgroundColor = colors.pressedStyle; 

     });
   








