// Selecionando os inputs do form

const btnSub = document.querySelector('#btnSubmit');
const dataLimite = document.querySelector('#datalimite');
const task = document.querySelector('#tarefa');
const list = document.querySelector('#list');

// Função que pega a data atual e formata com o padrão ISO

let AtualDate = () => {
    data = new Date();
    let today = data.getFullYear() +'-'+ (data.getMonth() + 1)  +'-'+ data.getDate();
    return today;
 }

 // Função que cria um novo card, o elemento colocado no parametro será o pai.

 let newCard = (element) => {

    const li = document.createElement('li');
    li.setAttribute('class', 'task')

    li.innerHTML = `
                            <div class="title">
                                <p class="taskanme">${task.value}</p>
                            </div>
                            <div class="dateCreate">
                                <p class="dateTask">Criado em: ${AtualDate()}</p>
                            </div>
                            <div class="dateEnd">
                                <p class="date">Terminar em: ${dataLimite.value}</p>
                            </div>
                         `
    element.appendChild(li);
}

// Evento quando inicia a página, a data limite do input date é setado como a data atual

window.addEventListener('DOMContentLoaded', function() {
    dataLimite.min = AtualDate();
});

// Evento do botão submit, veriica-se se os campos estão em branco, se a tarefa tem mesno de 10 caracteres
// Se sim, mensagem de erro, se não, cria a tarefa com a função newCard.

btnSub.addEventListener('click', submit => {

    submit.preventDefault();

    let verify = false;

    if(dataLimite.value == '' || task.value == ''){
        alert('Preencha todos os campos!')
        verify = false;
    }else{
        verify = true;
    }

    if(task.value.length <= 10){
            alert('A descrição deve ter pelo menos 10 caracteres')
            verify = false;
    }else{
        verify = true;
    }

    if(verify){
        newCard(list)
    }
}) 