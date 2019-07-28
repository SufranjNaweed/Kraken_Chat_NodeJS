const   express         = require('express');
const   app             = express();

const   PORT            = process.env.PORT || 9000;
const   HOST            = '0.0.0.0';

const   server          = require('http').createServer(app);
const   io              = require("socket.io").listen(server);
const   ent             = require("ent");                           // equivalente of htmlentities


//  TEMPLATE
app.set('views', './views');
app.set('view engine', 'ejs');

app.use('/public', express.static('public'));


// Load index.html page
app.get('/', (req, res) => {
    res.render('index');
});

io.sockets.on('connection', (socket, pseudo) => {

    // When we receive 
    socket.on('new_user', (pseudo) => {
        pseudo          =  ent.encode(pseudo);
        socket.pseudo   = pseudo;
        socket.broadcast.emit('new_user', pseudo);
    });

    // Handle message get and resend to every users
    socket.on('message', (message) => {
        message = ent.encode(message);
        socket.broadcast.emit('message', {pseudo: socket.pseudo, message: message});
    });
    
});

server.listen(PORT, () => { console.log('app open on server : ' + PORT)});