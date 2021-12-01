// Função que pega a data atual e formata com o padrão ISO

let atualDate = () => {
    data = new Date();
    let today = '0' + data.getDate() + '/' + data.getMonth() + '/' + data.getFullYear();
    return today;
 }

// Selecionando os inputs do form

const btnSub = document.querySelector('#btnSubmit');
const dataLimite = document.querySelector('#datalimite');
const description = document.querySelector('#descricao');
const list = document.querySelector('#lista');
const tasks = document.querySelector('.tasks');

// Assim que a página inicia, a data limite do formulário é setada para a data atual

window.addEventListener('DOMContentLoaded', function() {
    data = new Date();
    let today = data.getFullYear() +'-'+ (data.getMonth() + 1)  +'-'+ 0 + data.getDate();
    dataLimite.setAttribute('min', today)
 });

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
    dateCreated.innerText = `Criado em: ${atualDate()}`

    const dateSet = document.createElement('p')
    dataNew = new Date(dataLimite.value)
    dataFormat = dataNew.toLocaleDateString('pt-BR', {timeZone: 'UTC'});
    dateSet.innerText = `Terminar em: ${dataFormat}`;

    const btDel = document.createElement('button')
    const i = document.createElement('i')
    btDel.classList.add('delete')
    btDel.appendChild(i)
    i.classList = "fas fa-trash"

    const checkbox = document.createElement('input')
    checkbox.type = 'checkbox';
    checkbox.classList = 'checkbox';

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
            description.style.borderBottomColor = 'red';
            alert('A descrição deve ter pelo menos 10 caracteres')
            verify = false;
    }else{
        description.style.borderBottomColor = 'white'
    }

    // Se as informações passarem pela validação, cria-se a tarefa
    if(verify){
        newTask()
        description.value = '';
        dataLimite.value = '';
    }

})
