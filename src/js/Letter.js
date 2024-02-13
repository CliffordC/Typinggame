/*
 * Letter class;
 *
 */

export class Letter {

    constructor(value,placement,index){
        this.nextLetter = null;
        this.caret = false;
        this.value = value;
        this.caretPlacement = placement;
        this.caretDiv = document.createElement('div');
        this.caretDiv.style.display='inline';
        this.caretDiv.style.height = '1.8rem';
        this.caretDiv.style.width = '1rem';
        this.caretDiv.style.position = 'relative';
        this.caretDiv.style.paddingBottom = '10px';
        //this.caretDiv.style.backgroundColor='black';
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
    setLetter(value){
        this.value = value;
    }
    setCaret(value){
        this.caret=value;
    }
    setNextLetter(letter){
        this.nextLetter = letter;
    }
    getNextLetter(){
        return this.nextLetter;
    }
    getCaret(){
        return this.caret;
    }
    getCaretDiv(){
        return this.caretDiv;
    }
    flash(){
        this.caretIntervalId=setInterval(()=>{
            if(this.caret){
                this.caretDiv.style.opacity = 0;
                this.caret = false;
                //this.caretPlacement.insertBefore(this.caretDiv.className,this.nextLetter.className);
            }else{
                this.caretDiv.style.opacity = 1;
                this.caret = true;
                //this.caretPlacement.insertBefore(this.caretDiv.className,this.caretDiv.className);
            }
        },560);
    }
    clearFlash(){
        clearInterval(this.caretIntervalId);
    }
    reset(){
        this.clearFlash();
        this.setCaret(false);
        this.caretDiv.style.opacity=1
    }
};
