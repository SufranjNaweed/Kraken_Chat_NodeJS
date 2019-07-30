var socket = io.connect('http://localhost:9000');
var pseudo = prompt('What\'s your pseudonyme ?');

socket.emit('new_user', pseudo);


// on message receive add to page
socket.on('message', function(data){
    addMessage(data.pseudo, data.message);
});

socket.on('new_user', function(pseudo){
    var template =  templateJointUser(pseudo);
    document.title =  pseudo + " - " + document.title;
    $('#chat_zone').append(template);
});

$('#send_message').click(function() {
    var message = $('#message').val();
    
    socket.emit('message', message);
    addMessage(pseudo, message);
});

function addMessage(pseudo, message){
    var template =  templateMessage(pseudo, message);
    $("#chat_zone").append(template);
    console.log("ok")
}

function templateMessage(pseudo, message){
    var template = `
        <div class="col-xs-12 col-md-6 bg-secondary message"> 
            <span class="pseudo">${pseudo}</span>
            <span class="message-content">${message}</span>
        </div>
    `;
    return template;
}

function templateJointUser(pseudo){
    var template = `<div class="alert alert-success" role="alert">
                        ${pseudo}  joint the the chat.
                    </div>`;
    return template;
}