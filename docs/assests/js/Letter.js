/*
 * Letter class;
 *
 */

export class Letter {

    constructor(value,placement,index){
        this.nextLetter = null;
        this.caret = false;
        this.value = value;
        this.index = index;
        this.caretPlacement = placement;
        //Caret and letter decorations
        this.caretDiv = document.createElement('div');
        this.caretDiv.style.display='inline';
        this.caretDiv.style.height = '1.8rem';
        this.caretDiv.style.width = '1rem';
        this.caretDiv.style.position = 'relative';
        this.caretDiv.style.paddingBottom = '10px';

        this.txt =document.createTextNode(this.value);
        this.caretDiv.appendChild(this.txt);
        this.caretDiv.style.opacity=1;
        this.stringPositionInLetterList = index;
        this.caretDiv.setAttribute('class','wf-Letter_Caret_'+(String(index)));
        this.caretIntervalId;
    }

    getLetter(){
        return this.value;
    }
    getIndex(){
        return this.index;
    }
    setLetter(value){
        this.value = value;
    }
    setCaret(value){
        this.caret=value;
    }
    setNextLetter(letter){
        this.nextLetter = letter;
    }
    getNextLetterHtml(){
        return this.nextLetter.getCaretDiv();
    }
    getCaret(){
        return this.caret;
    }
    getCaretDiv(){
        return this.caretDiv;
    }
    flash(){
        this.caretIntervalId = setInterval(()=>{
            if(this.value === ' '){
                this.caretDiv.style.backgroundColor='black';
            }

            if(this.caret){
                this.caretDiv.style.opacity = 0;
                this.caret = false;
                this.caretPlacement.insertBefore(this.caretDiv,this.getNextLetterHtml());
            }else{
                this.caretDiv.style.opacity = 1;
                this.caret = true;
                this.caretPlacement.insertBefore(this.caretDiv,this.getNextLetterHtml());
            }
        },540);
    }
    getClassName(){
        return this.caretDiv.className;
    }
    clearFlash(){
        clearInterval(this.caretIntervalId);
    }
    reset(){
        if(this.value === ' '){
            this.caretDiv.style.backgroundColor='inherit';
        }
        this.clearFlash();
        this.setCaret(false);
        this.caretDiv.style.opacity=1
    }
};
