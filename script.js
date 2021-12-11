class Calculadora{
    constructor(){
        this.buttons = document.querySelectorAll(".button");
        this.view = document.getElementById("result");
        this.list = [];
        this.buttonsClick();
    }
    buttonsClick(){
        this.buttons.forEach(button =>{
            button.addEventListener("click",()=>{
                this.addButton(button.textContent)
            })
        })
    }
    addButton(button){
        switch (button) {
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
            case '0':
                this.configButton(parseInt(button));
                break;
            case 'C':
                this.clear();
                break;
            case 'A':
                this.clearLast();
                break;
            case '=':
                this.calc();
                break;
            case "%":
            case '/':
            case '-':
            case '+':
            case '.':
                this.configButton(button);
                break;
            case 'x':
                this.configButton('*');
            break;
            default:
                break;
        }
    }
    calc(){
        if(this.list.indexOf('%') > -1){
            const index = this.list.indexOf('%');
            this.list[index] = '*';
            const porcent = eval(this.list.join(''))
            this.list = [porcent/100]
            this.atualizarView();
            
        }else{
            const calc = eval(this.list.join(''))
            this.list = [calc]
            this.atualizarView();
        }

        
    }
    clearLast(){
        this.list.pop()
        this.atualizarView()
    }
    clear(){
        this.view.textContent = '';
        this.list = [];
    }
    atualizarView(){
        this.view.textContent = this.list.join('');
    }
    lastOperation(){
        if(this.list[this.list.length-1] == undefined){
          return '';	
        }
        else{
          return this.list[this.list.length-1];
        }	
    }
    isOperator(btn){
        if(['+','-','*','/'].indexOf(btn) > -1){
            return true;
        }
        else{
            return false;
        }
    }
    configButton(btn){
        if(isNaN(btn)){
        //Recebe um operador
            if(this.isOperator(this.lastOperation())){
            //Troca operador caso o ultimo é um operador
                this.list[this.list.length-1] = btn;
                this.atualizarView();
        
            }
            if(!isNaN(this.lastOperation())){
            //Adiciona operador caso ultimo é um numero
                let operator = false;
                
                this.list.forEach(item=>{
                    if(typeof(item) == 'string'){//Verifica se já tem um operador antes de adicionar outro
                        const result = eval(this.list.join(''))
                        this.list = [result]
                        this.atualizarView()
                    }
                })
                if(operator == false){
                    this.list.push(btn);
                    this.atualizarView();	
                }
               
            }
        }	
        else{
            //Recebe um numero

            //Adiciona um numero
                this.list.push(btn);
                this.atualizarView();
        }
        console.log(this.list)
    }
}
const calculadora = new Calculadora();
