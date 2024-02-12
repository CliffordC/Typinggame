/*
 * Letter class;
 *
 */
const caretPlacement = document.querySelector('#mainStr');

export class Letter {

    constructor(value){
        this.caret = false;
        this.value = value;
        this.caretDiv = document.createElement('div');
        this.caretDiv.style.height = '1.8rem';
        this.caretDiv.style.width = '1rem';
        this.caretDiv.style.paddingBottom = '10px';
        this.caretDiv.style.backgroundColor='black';
        this.caretDiv.style.className='wf-Letter_Caret';
        this.caretDiv.style.opacity=1;
        this.caretDiv.style.marginBottom='10px';
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
    getCaret(){
    return this.caret;
    }
    flash(){
        setInterval(()=>{
            console.log('inside flash');
            if(this.caret){
                this.caretDiv.style.opacity = 0;
                this.caret = false;
                caretPlacement.appendChild(this.caretDiv);
            }else{
                this.caretDiv.style.opacity = 1;
                this.caret = true;
                caretPlacement.appendChild(this.caretDiv);
            }
        },220);
    }
};
