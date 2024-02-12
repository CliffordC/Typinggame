/*
 * Letter class;
 *
 */
//const caretPlacement = document.querySelector('#mainStr');

export class Letter {

    constructor(value,placement){
        this.caret = false;
        this.value = value;
        this.caretPlacement = placement;
        this.caretDiv = document.createElement('div');
        this.caretDiv.style.display='inline';
        this.caretDiv.style.height = '1.8rem';
        this.caretDiv.style.width = '1rem';
        this.caretDiv.style.paddingBottom = '10px';
        //this.caretDiv.style.backgroundColor='black';
        this.caretDiv.setAttribute('class','wf-Letter_Caret');
        this.txt =document.createTextNode(this.value);
        this.caretDiv.appendChild(this.txt);
        this.caretDiv.style.opacity=1;
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
    getCaretDiv(){
        return this.caretDiv;
    }
    flash(){
        setInterval(()=>{
            if(this.caret){
                console.log(this.caretPlacement);
                this.caretDiv.style.opacity = 0;
                this.caret = false;
                this.caretPlacement.prepend(this.caretDiv);
            }else{
                console.log('in flash else',this.caretDiv);
                this.caretDiv.style.opacity = 1;
                this.caret = true;
                this.caretPlacement.prepend(this.caretDiv);
            }
        },560);
    }
};
