var express = require('express');
var app = express();
app.use(express.static('public'))
var http = require('http').Server(app);
var port = process.env.PORT || 3000;

var io = require('socket.io')(http);

/* Basic Socket IO */
io.on('connection', function(socket) {
    console.log('new connection');
    
    socket.on('move', function(msg){
        socket.broadcast.emit('move' , msg);
    });
});


/*Basic Express Server */
app.get('/', function(req, res){
    res.sendFile(__dirname + '/public/default.html');
});

http.listen(port, function(req, res){
    console.log('listening on *: ' + port)
});

