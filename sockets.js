var sockets = {};
console.log('here');
sockets.init = function (server) {
    // socket.io setup
    var io = require('socket.io').listen(8000);
    io.sockets.on('connection', function (socket) {
        console.log('socket connected');
        socket.on('subscribeToTimer', (interval) => {
		    console.log('client is subscribing to timer with interval ', interval);
		    setInterval(() => {
		      socket.emit('timer', new Date());
		    }, interval);
		  });
    });

}

module.exports = sockets;