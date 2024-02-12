/*
 * This file will control what happens during a typing 
 * session. The class should display the words in the 
 * library content section of the site as well.
 */
import { dictionary } from '../Dictionary/words.js';
import { Letter } from './Letter.js';

const libraryContent = document.querySelector('#mainStr');

export class TypeSession {


    constructor(){
        this.libraryContent = libraryContent;
        this.dictStr = dictionary[0]
        this.letterList = this.createLetterList();
        this.currentLetter = this.letterList[0];
        this.currentLetter.setCaret(true);
        this.displayStr();
        this.currentLetter.flash();
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
            result.push(new Letter(separatedLetterList[i],this.libraryContent));
        }
        return result;
    }

    getLetterList(){
        return this.letterList;
    }
    /*
     * How to flash the current position in the typed
     * word.
     */

    
}




