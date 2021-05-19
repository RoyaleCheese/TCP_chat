/**
 * SERVIDOR 
 * @abstract Receber e redirecionar as mensagens dos clientes
 * 
 * Codes:
 *  1: Join
 *  2: Global message
 *  3: Private message
 *  4: file share
 *  5: Client disconect
 *  
 */

const WebSocket = require('ws');

const port = 8080;
const hostname = '127.0.0.1';

const server = new WebSocket.Server({
  	port
});

const sockets = [];
const clientsConnected = [];

server.on('connection', function(socket) {
	// Adicionamos cada nova conexão/socket ao array `sockets`

	sockets.push(socket);

	// Quando você receber uma mensagem, enviamos ela para todos os sockets
	socket.on('message', function(msg) {
		manageMessages(msg);
	});
	
	// Quando a conexão de um socket é fechada/disconectada, removemos o socket do array
	socket.on('close', function() {
		sockets = sockets.filter(s => s !== socket);
	});
});

console.log(`Server running at http://${hostname}:${port}/`);


function manageMessages(msg) {
	const stringMsg = JSON.parse(base64ToString(msg));
  	const [code, senderName, text = '', file = ''] = stringMsg;

  	switch(code){
		case 1:
			clientsConnected.push(senderName);
			break;
		case 2:
			sockets.forEach(s => s.send(msg));
			break;
		case 3:
			break;
		case 4:
		break;
		case 5:
			break;
		default:
			break;
	}

};

function toBase64(msg) {
	return Buffer.from('Hello World!').toString('base64')
};

function base64ToString(msg) {
	return Buffer.from(msg, 'base64').toString()
};
