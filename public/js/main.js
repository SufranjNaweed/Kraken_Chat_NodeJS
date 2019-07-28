
var socket = io.connect('http://localhost:9000');

var pseudo = prompt('Quel est votre pseudo ?');
socket.emit('new_user', pseudo);
document.title =  pseudo + " - " + document.title;

// on message receive add to page
socket.on('message', function(data){
    addMessage(data.pseudo, data.message);
});

//
socket.on('new_user', function(pseudo){
    $('#chat_zone').prepend('<p><em>' + pseudo + ' joint the the chat <em><p>');
});

$('#send_message').click(function() {
    var message = $('#message').val();
    
    socket.emit('message', message);
    addMessage(pseudo, message);
});

function addMessage(pseudo, message){
    var template =  templateMessage(pseudo, message);
    $("#chat_zone").prepend(template);
}

function templateMessage(pseudo, message){
    var template = `
        <div class="message"> 
            <span class="pseudo">${pseudo}</span>
            <span class="message-content">${message}</span>
        </div>
    `;
    return template;
}