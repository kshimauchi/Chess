var board;
var game;

var initGame = function() {
   var cfg = {
       draggable: true,
       position: 'start',
       onDrop: handleMove,
   };
   board = new ChessBoard('gameBoard', cfg);
   game = new Chess();
};
window.onload = function () {
    initGame();
};
//express is handling endpoint 
var socket = io();

window.onclick= function(e) {
    socket.emit('message', 'hello world!');
}

var handleMove = function(source, target ) {
    var move = game.move({from: source, to: target});
    if (move === null)  return 'snapback';
    //check the serialization on this
    //everyone but sender
    else socket.emit('move', move);
};

socket.on('move', function(msg) {
    
    game.move(msg);
    console.log(msg);      //test
    board.position(game.fen());  //board layout
    
});