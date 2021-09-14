let formValidator = {
    handleSubmit:(event)=>{
        event.preventDefault();//Parando o evento de submit
        let send = true;

        let inputs = form.querySelectorAll('input'); //Capturando os inputs

        formValidator.clearErrors(); //Antes de verificar, limpar os erros já existentes 

        for(let i=0; i<inputs.length; i++){ 
            let input = inputs[i]; //anexando a variavel meus inputs
            let check = formValidator.checkInput(input); 
            if(check !== true){
                send = false;
                formValidator.showError(input, check);
            }
        }     

        if(send){
            form.submit();
        }

    },
    checkInput:(input)=>{
        let rules = input.getAttribute('data-rules'); //Atribuindo a variavel os inputs com regras

        if(rules !== null){//Se tem regras.
            rules = rules.split('|'); //criando um array e separando as regras
            for(let k in rules){//Verificando todas as regras
                let rDetails = rules[k].split('=');
                switch(rDetails[0]){
                    case 'required':
                        if(input.value == ''){
                            return 'Campo não pode ser vazio.';
                        }
                        break;
                    case 'min':
                        if(input.value.length < rDetails[1]){
                            return 'Campo tem que tem que ter pelomenos '+rDetails[1]+' caractes';
                        }
                        break;
                    case 'email':
                        if(input.value != ''){//Expressoes regulares| verifica se foi digitado um email
                            let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                            if(regex.test(input.value.toLowerCase())){
                                return 'Email digitado não é valido! ';
                            }
                        }
                        break
                }
            }
        }
        return true;
    },
    showError:(input, error)=>{ //Adicionando os erros ao layout
        input.style.borderColor = "#FF0000"

        let errorElement = document.createElement('div');
        errorElement.classList.add('error');
        errorElement.innerHTML = error;

        input.parentElement.insertBefore(errorElement, input.ElementSibling);
    },
    clearErrors:()=>{ //Função para retirar o erro
        let inputs = form.querySelectorAll('input');
        for(let i=0;i<inputs.length;i++){
            inputs[i].style = '';
        }
        let errorElements = document.querySelectorAll('.error');
        for(let i=0;i<errorElements.length;i++){
            errorElements[i].remove();
        }
    }
};

let form = document.querySelector('.cvalidator');
form.addEventListener ('submit', formValidator.handleSubmit) //Monitorar quando o form tiver um subimit para realizar uma ação