//Pegamdp a data atual e formatando-a
const dataAtual = dayjs().format('YYYY-MM-DD');
document.querySelector('#dataCriacao').setAttribute('value', dataAtual);

// Chama as funções que validam o form
let validate = () => {
  document.querySelector('#validacoes').innerHTML = ""; // Limpa o campo de erros da página

  verificaInputVazio('#dataLimite', 'Data Limite');
  validaInputDataFutura('#dataLimite', 'Data Limite');

  verificaInputVazio('#descricao', 'Descrição');
  verificaCaracteresInput('#descricao', 'Descrição', 10);

  if (document.querySelector('#validacoes').innerHTML == '') { // Se após as validações o campo de erro ainda estiver vazio, pode seguir com a inclusão do card
    criaCard(null, document.querySelector('#descricao').value, document.querySelector('#dataCriacao').value, document.querySelector('#dataLimite').value, false);
    
    limpaForm();
  }
}

// Verifica se o campo está vazio
let verificaInputVazio = (input, name) => {
  if (document.querySelector(input).value == '') { // Se o campo estiver vazio
    document.querySelector(input).classList.add('error'); // Adiciona uma classe de erro no input
    document.querySelector('#validacoes').append(name + ' não pode estar vazio. '); // Adiciona a mensagem no campo para erros do formulário na página
  } else {
    document.querySelector(input).classList.remove('error'); // Remove a classe de erro do input
  }
}

// Verifica se no input tem a quantidade de caracteres informada
let verificaCaracteresInput = (input, name, caracteres) => {
  if (document.querySelector(input).value.length < caracteres) { // Se o numero de caracteres no input for menor que os caracteres informado
    document.querySelector(input).classList.add('error'); // Adiciona uma classe de erro no input
    document.querySelector('#validacoes').append(name + ' não pode ter menos de ' + caracteres + ' caracteres. '); // Adiciona a mensagem no campo para erros do formulário na página
  } else {
    document.querySelector(input).classList.remove('error'); // Remove a classe de erro do input
  }
}

// Verifica a data informada é igual a hoje ou futura
let validaInputDataFutura = (input, name) => {
  let dataInformada = document.querySelector(input).value //Remove todos os "-" da data informada

  if (dataInformada < dataAtual) { // Se a data informada for menor do que hoje
    document.querySelector(input).classList.add('error'); // Adiciona uma classe de erro no input
    document.querySelector('#validacoes').append(name + ' deve ser maior que hoje. '); // Adiciona a mensagem no campo para erros do formulário na página
  } else {
    document.querySelector(input).classList.remove('error'); // Remove a classe de erro do input
  }
}

// Atribuir a data atual no input de data inicial ao carregar a página
window.onload = function() {
  if (document.querySelector('#dataCriacao') != null) {
    document.querySelector('#dataCriacao').value = dataAtual; // Atribui a data atual no input de data de criação
  }
}

// Muda a classe 
let changeClass = () =>{
  let carta = document.querySelectorAll('.card.animate')
  for (i = 0; i < carta.length; i++){
    console.log(carta[i])
   carta[i].setAttribute('class', 'card')
  }
}

let criaCard = (id, descricao, dataInicio, dataLimite, completed) => {
  changeClass()
  if (id == null) {
    var id = document.getElementsByClassName('card').length + 1; // Adiciona mais 1 a conta de cards existentes na tela para atribuir um id único para o card que vai ser adicionado
  }
  
  card = "<div id='card" + id + "' class='card animate'>";

  if (completed != false) {
    card += "<input type='checkbox' class='checkbox' checked>";
  } else {
    card += "<input type='checkbox' class='checkbox'>";
  }
  
  card += "<p>" + descricao + "</p>";

  if (dataInicio == null) {
    var dataInicio = dataAtual;
  }
  card += "<p>Data de Criação: " + dayjs(dataInicio).format(' DD / MM / YYYY') + "</p>";

  if (dataLimite != null) {
    card += "<p>Data Limite: " + dayjs(dataLimite).format(' DD / MM / YYYY') + "</p>";
  } else {
    card += "<p>Data Limite: Não informada</p>";
  }

  card += "<button onClick='excluirCard(\"#card" + id + "\")' class='excluir'><i class='fas fa-trash'></i></button>";
  card += "</div>";

  
  document.querySelector('#lista').innerHTML = card + document.querySelector('#lista').innerHTML; // Adiciona o card no inicio da tela
}

// Utilizando biblioteca sweetalert2

let excluirCard = (id) => {
  Swal.fire({  //Confirm true or false
  title: 'Tem certeza que deseja excluir a tarefa?',
  icon: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'Sim, desejo excluir!',
  cancelButtonText: 'Não'
}).then((result) => {
  if (result.isConfirmed) { // Confirmação da exclusão
    document.querySelector(id).remove() //Exclui o card
    Swal.fire(
      'Excluído!',
      'Sua tarefa foi excluída',
      'success'
    )
  }
})
}

// Limpa os valores do form
let limpaForm = () => {
  document.querySelector('#dataLimite').value = '';
  document.querySelector('#descricao').value = '';

  document.querySelector('#validacoes').innerHTML = ''; // Limpa os erros de validação na tela
}

// Excluir todas as tarefas

let excluirAll = () => {
  let confirmed = confirm('Deseja excluir as tarefas não concluídas também?');
  
  let qtCards = document.querySelectorAll(".card").length;
  
  if (confirmed) {
    for (i = 0; i < qtCards; i++) {
      document.querySelector(".card").remove();
    } 
  } else {
      for (i = 0; i < qtCards; i++) {
      if (document.getElementsByClassName("card")[i] != undefined && document.getElementsByClassName("card")[i].getElementsByTagName('input')[0].checked) {
        document.getElementsByClassName("card")[i].remove();
        i--;
      }
    } 
  }
}
