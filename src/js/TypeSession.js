/*
 * This file will control what happens during a typing 
 * session. The class should display the words in the 
 * library content section of the site as well.
 */
import { dictionary } from '../Dictionary/words.js';
import { Letter } from './Letter.js';

const libraryContent = document.querySelector('#mainStr');
/*
 * Keyboard press actions
 */
const keymapKey = document.querySelectorAll(".keymapKey");

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
};
export class TypeSession {

    constructor(){
        this.activateListners()
        this.libraryContent = libraryContent;
        this.dictStr = dictionary[0]
        this.letterList = this.createLetterList();
        //this.setLetterNeighbors();
        this.currentLetter = this.letterList[0];
        this.index = 0;
        this.currentLetter.setCaret(true);
        this.displayStr();
        this.currentLetter.flash();
    }
    activateListners(){
        document.addEventListener("keyup",
        (e)=> {
            this.keyPressHandler(e);
        });
        
        document.addEventListener("keydown",
        (e)=> {       
            this.keyPressIndicator(e.key);
        });
    }

    keyPressIndicator(keyPress){
       // console.log(keyPress," <-- That was typed");
        if(Object.keys(letterDict).includes(keyPress) || keyPress==="_"){ //handle spacebar
            letterDict[keyPress].toggle('pressed');
        }
    };
    
    keyPressHandler(keyPressEvent){
        keyPressEvent.preventDefault();
    
        let kCode = keyPressEvent.keyCode;
        let kPressed = keyPressEvent.key.toLowerCase();
        
        if(keyPressEvent.repeat)return;
    
        if(kCode===32){
            console.log('in space');
            this.keyPressIndicator('_');
            this.keyPressed('_');
        }else if(97<=kCode<=122){
            
            this.keyPressIndicator(kPressed);
            this.keyPressed(kPressed);
        }else{
            return;
        }
    }
    displayStr(){
        console.log(this.getLetterList());
        for(let i=0;i<this.letterList.length;i++){
            console.log(this.letterList[i]);
            this.libraryContent.appendChild(this.letterList[i].getCaretDiv());
        }
    }
    setTypeSessionContent(newText){
        this.libraryContent.innerText = newText;
    }

    getLetter(){
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
            if(i+1>letters.length){
                //...do nothing
            }else{
                letters[i].setNextLetter(this.letterList[i+1]);
            }
        }
        console.log('Completed adding neighbors ',this.letterList);
    }

    getLetterList(){
        return this.letterList;
    }
    keyPressed(value){
        console.log(value, ' value entered');
        if(this.currentLetter.getLetter()===value || value === ' '){
            this.currentLetter.reset();
            this.currentLetter = this.letterList[this.index];
            
            this.currentLetter.setCaret(true);
            this.currentLetter.flash();
            this.index++;
        }
    }
    
}




