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
        if(!this.nextLetter){
            return this.getCaretDiv()
        }else{
            return this.nextLetter.getCaretDiv();
        }
    }
    getCaret(){
        return this.caret;
    }
    getCaretDiv(){
        return this.caretDiv;
    }
    async flash(){
        this.caretIntervalId = setInterval(()=>{
            if(this.value === ' '){
                this.caretDiv.style.backgroundColor='black';
            }

            if(this.caret){
                this.caretDiv.style.opacity = 0;
                this.caret = false;

                try{
                    this.caretPlacement.insertBefore(this.caretDiv,this.getNextLetterHtml());
                }catch(err){
                  /*
                        The following is happening in the background up a word reset:
                        DOMException: Failed to execute 'insertBefore' on 'Node': 
                        The node before which the new node is to be inserted is not a child of this node.
                        
                        After clearing the dom element, #mainStr, to insert a new str,
                        I think so calls create an element and then manipulate that element
                        are getting mixed up causing this resource access issue. Will ivestigate
                        when I've got less fun things to do teehee.
                        //console.log(err)
                        */
                }
                }else{
                this.caretDiv.style.opacity = 1;
                this.caret = true;
               try{
                    this.caretPlacement.insertBefore(this.caretDiv,this.getNextLetterHtml());
                }catch(err){
                    //...
                }
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
