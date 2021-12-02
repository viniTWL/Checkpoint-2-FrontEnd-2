let dataAtual = () => {
  data = new Date();

  let y = data.getFullYear();
  let m = data.getMonth() + 1; // GetMonth retorna o mês iniciando o contador em 0, por isso getMonth + 1
  let d = ('0' + data.getDate()).length == 3 ? data.getDate() : '0' + data.getDate(); // (IF TERNÁRIO) Verifica se o dia já passou de 9 para não acrescentar 0 a partir do dia 10

  return y + '-' + m + '-' + d
}

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
  let hoje = dataAtual().replace(/-/g, ""); // Executa a função que retorna a data atual, e remove todos os "-"
  let dataInformada = document.querySelector(input).value.replace(/-/g, ""); // Remove todos os "-" da data informada

  if (dataInformada < hoje) { // Se a data informada for menor do que hoje
    document.querySelector(input).classList.add('error'); // Adiciona uma classe de erro no input
    document.querySelector('#validacoes').append(name + ' deve ser maior que hoje. '); // Adiciona a mensagem no campo para erros do formulário na página
  } else {
    document.querySelector(input).classList.remove('error'); // Remove a classe de erro do input
  }
}

// Atribuir a data atual no input de data inicial ao carregar a página
window.onload = function() {
  if (document.querySelector('#dataCriacao') != null) {
    let hoje = dataAtual(); // Executa a função que retorna a data atual
    document.querySelector('#dataCriacao').value = hoje; // Atribui a data atual no input de data de criação
  }
}

let criaCard = (id, descricao, dataInicio, dataLimite, completed) => {  
  if (id == null) {
    var id = document.getElementsByClassName('card').length + 1; // Adiciona mais 1 a conta de cards existentes na tela para atribuir um id único para o card que vai ser adicionado
  }
  
  card = "<div id='card" + id + "' class='card'>";

  if (completed != false) {
    card += "<input type='checkbox' class='checkbox' checked>";
  } else {
    card += "<input type='checkbox' class='checkbox'>";
  }
  
  card += "<p>" + id + ". " + descricao + "</p>";

  if (dataInicio == null) {
    var dataInicio = dataAtual();
  }
  card += "<p>Data de Criação: " + dataInicio + "</p>";

  if (dataLimite != null) {
    card += "<p>Data Limite: " + dataLimite + "</p>";
  } else {
    card += "<p>Data Limite: Não informada</p>";
  }

  card += "<button onClick='excluirCard(\"#card" + id + "\")' class='excluir'><i class='fas fa-trash'></i></button>";
  card += "</div>";
  
  document.querySelector('#lista').innerHTML = card + document.querySelector('#lista').innerHTML; // Adiciona o card no inicio da tela
}

let excluirCard = (id) => {
  let confirmed = confirm('Deseja excluir a tarefa?'); // Confirmação da exclusão
  
  if (confirmed) {
    document.querySelector(id).remove(); // Remover card da lista
  }
}

// Limpa os valores do form
let limpaForm = () => {
  document.querySelector('#dataLimite').value = '';
  document.querySelector('#descricao').value = '';

  document.querySelector('#validacoes').innerHTML = ''; // Limpa os erros de validação na tela
}

// Funções para a tela de consumo da api
let consumirApi = () => {
  
  let url = 'https://jsonplaceholder.typicode.com/todos/';
  
  fetch(url) // Busca a URL
  .then(result => result.json()) // Transformar em JSON
  .then(json => consumirJson(json)); // Manda pra função que consome o JSON
}

let consumirJson = (json) => {
  for (i = 0; i < json.length; i++) { // Laço de repetição para criar cada card
    criaCard(json[i]['id'], json[i]['title'], null, null, json[i]['completed']);
  }
}