// Função que pega a data atual e formata com o padrão ISO

let atualDate = () => {
    data = new Date();
    let today = data.getFullYear() +'-'+ (data.getMonth() + 1)  +'-'+ data.getDate();
    return today;
 }

// Assim que a página inicia, a data limite do formulário é setada para a data atual

window.addEventListener('DOMContentLoaded', function() {
    dataLimite.min = atualDate();
});

// Selecionando os inputs do form

const btnSub = document.querySelector('#btnSubmit');
const dataLimite = document.querySelector('#datalimite');
const description = document.querySelector('#descricao');
const list = document.querySelector('#lista');
const tasks = document.querySelector('.tasks');

 // Função que cria uma nova tarefa, cria os elementos e os coloca nos respectivos parents.

 let newTask = () => {

    const todo = document.createElement('div');
    todo.classList.add('todo');

    const li = document.createElement('li')
    li.classList.add('task')

    const label = document.createElement('label')
    label.classList.add('item')

    const title = document.createElement('p')
    title.innerText = `Tarefa: ${description.value}`

    const dateCreated = document.createElement('p')
    dateCreated.innerText = `Data de Criação: ${atualDate()}`

    const dateSet = document.createElement('p')
    dateSet.innerText = `Data de Término: ${dataLimite.value}`;

    const btDel = document.createElement('button')
    btDel.classList.add('delete')
    btDel.innerText = 'EXCLUIR'

    const checkbox = document.createElement('input')
    checkbox.type = 'checkbox';

    list.appendChild(todo)
    todo.appendChild(li)
    li.appendChild(label)
    label.appendChild(checkbox)
    label.appendChild(title)
    label.appendChild(dateCreated)
    label.appendChild(dateSet)
    label.appendChild(btDel)
    
}

// Função que deleta a tarefa selecionada, abre-se uma tela de confirmação para confirmar a exclusão.

let deleteTask = (element) => {

    const item = element.target

    if(item.classList[0] === 'delete'){
        opc = confirm('Deseja excluir a tarefa?')
        if(opc){
        const task = item.parentElement
        task.remove()
        }
    }
}

tasks.addEventListener('click', deleteTask);

// Evento do botão submit, veriica-se se os campos estão em branco, se a tarefa tem mesno de 10 caracteres
// Se sim, mensagem de erro, se não, cria a tarefa com a função newTask.

btnSub.addEventListener('click', submit => {

    submit.preventDefault();

    //Removendo os espaços em branco da tarefa
    const removeSpace = description.value.replace(/\s+/g, '')

    // Condicionais
    let verify;

    if(dataLimite.value == '' || removeSpace == ''){
        alert('Preencha todos os campos!')
        verify = false;
    }else{
        verify = true;
    }

    if(removeSpace.length <= 10 || removeSpace == ''){
            description.style.border = '3px solid red'
            alert('A descrição deve ter pelo menos 10 caracteres')
            verify = false;
    }else{
        description.style.border = '1px solid'
    }

    // Se as informações passarem pela validação, cria-se a tarefa
    if(verify){
        newTask()
    }

})
