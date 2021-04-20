// Tuto : https://medium.com/dailyjs/combining-react-with-socket-io-for-real-time-goodness-d26168429a34
// Socket io server : https://www.npmjs.com/package/socket.io
const httpServer = require("http").createServer();
const io = require("socket.io")(httpServer, {
	cors: {
		origin: "http://localhost:3000",
		methods: ["GET", "POST"]
	}
  // ...
});

// io.on : la socket s'ouvre lorsque le client se connecte
io.on('connection', (client) => {
	// client.on : le client nous envoi un interval
	client.on('subscribeToTimer', (interval) => {
		console.log('client is subscribing to timer with interval ', interval);
		setInterval(() => {
			// client.emit : on envoi au client la date rafraîchie avec
			// l'interval spécifié par ce dernier
			client.emit('timer', new Date());
		}, interval);
	});
});

const port = 8000;
// On écoute sur les port 8000 en attente qu'un client se connecte...
httpServer.listen(port);
console.log('listening on port ', port);
