
const socket = io.connect('http://localhost:9000');

let pseudo = prompt('Quel est votre pseudo ?');
socket.emit('new_user', pseudo);
