const WebSocket = require("ws");

// Initialize the server
const wss = new WebSocket.Server({ host:"https://websocket-brown.vercel.app/", port: 3000 });

// Array to store connected clients
const clients = [];

// Function to broadcast the text changes to all connected clients
function broadcastChanges(message) {
  clients.forEach((client) => client.send(message));
}

// WebSocket server event listeners
wss.on("connection", function connection(ws) {
  clients.push(ws);

  ws.on("message", function incoming(message) {
    broadcastChanges(message);
  });

  ws.on("close", function () {
    const index = clients.indexOf(ws);
    if (index !== -1) {
      clients.splice(index, 1);
    }
  });
});
