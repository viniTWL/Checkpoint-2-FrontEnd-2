// $(document).ready(function() { // Quando a página é carregada
$('#consumir_api').click(function() { // Quando um botão é clicado
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