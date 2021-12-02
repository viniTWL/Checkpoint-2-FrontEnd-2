// $(document).ready(function() { // Quando a página é carregada
/*$('#consumir_api').click(function() { // Quando um botão é clicado
    $.get({
        url: 'https://jsonplaceholder.typicode.com/todos/',
        data: {
            // Enviar parametros quando a API aceita
            // completed: true
        }
    })
    .done(function(data) {
        // $('#retorno').append('Quantidade de linhas ' + data.length + '<br><br>');

        for (i = 0; i < data.length; i++) {
            // if (data[i]['completed']) {
            if (data[i]['completed'] == true) {
                classe = 'finished';
            } else {
                classe = 'notfinished';
            }

            $('#lista').append(
                '<div class="card ' + classe + '">'+
                    '<p>' + data[i]['userId'] + ' - ' + data[i]['id'] + ' - ' + data[i]['title'] + '</p>' + 
                    '<p>' +  data[i]['completed'] + '</p>' + 
                '</div>'
            );

            // $('#retorno').append('id = ' + data[i]['id'] + '<br>');
            // $('#retorno').append('title = ' + data[i]['title'] + '<br>');
            // $('#retorno').append('completed = ' + data[i]['completed'] + '<br><br><br>');
        }
    });
});
*/

let dataAtual = () => {
    data = new Date();
  
    let y = data.getFullYear();
    let m = data.getMonth() + 1; // GetMonth retorna o mês iniciando o contador em 0, por isso getMonth + 1
    let d = ('0' + data.getDate()).length == 3 ? data.getDate() : '0' + data.getDate(); // (IF TERNÁRIO) Verifica se o dia já passou de 9 para não acrescentar 0 a partir do dia 10
  
    return y + '-' + m + '-' + d
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