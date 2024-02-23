/*
 * This file will control what happens during a typing 
 * session. The class should display the words in the 
 * library content section of the site as well.
 */
import {dictionary} from './Dictionary/words.js';
import {Letter} from './Letter.js'

export class TypeSession {

    constructor(){
        /*
        * @param InitialTime in seconds
        * @output void
        */
        this.timeSub = (InitialTime) => {
            //Subtracts a second from the input till 0
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
        };
 
        this.timer = document.querySelector("#Timer_Content");
        this.roomJoin = document.getElementById("Room_Time_Content");
        
        this.libraryContent = document.querySelector('#mainStr');
        /*
        * Keyboard press actions
        */
        this.keymapKey = document.querySelectorAll(".keymapKey");

        //Collection of keys and classlist to manipulate
        this.letterDict = {
            'q':this.keymapKey[0].classList,
            'w':this.keymapKey[1].classList,
            'e':this.keymapKey[2].classList,
            'r':this.keymapKey[3].classList,
            't':this.keymapKey[4].classList,
            'y':this.keymapKey[5].classList,
            'u':this.keymapKey[6].classList,
            'i':this.keymapKey[7].classList,
            'o':this.keymapKey[8].classList,
            'p':this.keymapKey[9].classList,
            '[':this.keymapKey[10].classList,
            ']':this.keymapKey[11].classList,
            'a':this.keymapKey[12].classList,
            's':this.keymapKey[13].classList,
            'd':this.keymapKey[14].classList,
            'f':this.keymapKey[15].classList,
            'g':this.keymapKey[16].classList,
            'h':this.keymapKey[17].classList,
            'j':this.keymapKey[18].classList,
            'k':this.keymapKey[19].classList,
            'l':this.keymapKey[20].classList,
            ';':this.keymapKey[21].classList,
            "'":this.keymapKey[22].classList,
            'z':this.keymapKey[23].classList,
            'x':this.keymapKey[24].classList,
            'c':this.keymapKey[25].classList,
            'v':this.keymapKey[26].classList,
            'b':this.keymapKey[27].classList,
            'n':this.keymapKey[28].classList,
            'm':this.keymapKey[29].classList,
            ',':this.keymapKey[30].classList,
            '.':this.keymapKey[31].classList,
            '/':this.keymapKey[32].classList,
            'Space':this.keymapKey[33].classList
        };
        this.activateListners();
        this.placeInStr = 1;
        this.refreshStr(0)
        this.gameTime;
        this.startTime;
        this.endTime;
    }
    refreshStr(num){
        let randStr = num%5;

        this.dictStr = '';
        this.dictStr = dictionary[randStr];
        this.letterList = this.createLetterList();
        this.currentLetter = this.letterList[0];
        this.placeInStr = 1;
        this.currentLetter.setCaret(true);
        this.displayStr();
        this.currentLetter.flash();
    };
    activateListners(){
            document.addEventListener("keydown",
            (e)=> {
                this.keyPressHandler(e);
            });
            
            document.addEventListener("keyup",
            (e)=> {      
                e.preventDefault(); 
                this.keyPressIndicator(e.key);
            });
    };
    keyPressIndicator(keyPress){
        if(Object.keys(this.letterDict).includes(keyPress) || keyPress==="Space"){
            this.letterDict[keyPress].toggle('pressed');
        }
    };
    
    keyPressHandler(keyPressEvent){
        keyPressEvent.preventDefault();
    
        let kCode = keyPressEvent.code;
        let kPressed = keyPressEvent.key.toLowerCase();
        
        if(keyPressEvent.repeat)return;
    
        if(kCode===32){
            this.keyPressIndicator('Space'); //BUG: 
            this.keyPressed('Space');
        }else if(97<=kCode<=122){
            this.keyPressIndicator(kPressed);
            this.keyPressed(kPressed);
        }else{
            return;
        }
    }
    displayStr(){
        for(let i=0;i<this.letterList.length;i++){
            this.libraryContent.appendChild(this.letterList[i].getCaretDiv());
        }
    }
    setTypeSessionContent(newText){
        this.libraryContent.innerText = newText;
    }

    getCurrentLetter(){
        return this.currentLetter;
    }
    createLetterList(){ 
        let separatedLetterList = this.dictStr.split('');
        let result = [];

        for(let i=0;i<separatedLetterList.length;i++){
            result.push(new Letter(separatedLetterList[i],this.libraryContent,i));
        }
        this.setLetterNeighbors(result);
        return result;
    }
    setLetterNeighbors(letters){
        this.letterList = letters;
        for(let i=0;i<letters.length;i++){
            if(i===letters.length-1){
                //sets the neighbor of the last chr to itself
                letters[i].setNextLetter(letters[i]);
            }else{
                letters[i].setNextLetter(this.letterList[i+1]);
            }
        }
    }

    getLetterList(){
        return this.letterList;
    }
    keyPressed(value){
        //console.log(this.currentLetter.getLetter(), ' value entered');
        if(this.currentLetter.getLetter()===value && this.currentLetter.getIndex()<this.letterList.length-1){
            if(this.currentLetter.getIndex()===0){this.startGame=new Date();}
            //console.log('value pressed was: ', value);
            //let temp = this.currentLetter;
            this.currentLetter.reset();
            this.currentLetter = this.letterList[this.placeInStr];
            
            this.currentLetter.setCaret(true);
            this.currentLetter.flash();
            this.placeInStr++;
        }else if(this.currentLetter.getIndex()===this.letterList.length-1){ //Finished typing
            this.endTime=new Date();
            //Done condition for the last chr typed in the string 
            this.gameTime = (this.endTime.getTime()-this.startGame.getTime())/1000 + 's';
            this.roomJoin.innerText = this.gameTime;
            //console.log(this.gameTime)
            //Work on removing html elements on reset. 
            for(let i = this.libraryContent.children.length-1; i >= 0;i--){
                console.log('Library Child element',typeof(this.libraryContent.children[i]))
                this.libraryContent.children[i].remove();
            }
            this.refreshStr(Math.floor(Math.random() * 5))
        }
    }
    
}




