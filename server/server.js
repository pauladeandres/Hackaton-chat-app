require('dotenv/config');
const express = require('express');
const app = express();

const path = require('path');
app.use(express.static(path.join(__dirname, '/build')));

app.use((req, res) => {
  // If no routes match, send them the React HTML.
  res.sendFile(__dirname + '/build/index.html');
});

require('./error-handling')(app);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`);
});
const io = require('socket.io')(server);

io.on('connection', (socket) => {
  const id = socket.handshake.query.id;
  socket.join(id);

  socket.on('send-message', ({ recipients, text }) => {
    recipients.forEach((recipient) => {
      const newRecipients = recipients.filter((r) => r !== recipient);
      newRecipients.push(id);
      socket.broadcast.to(recipient).emit('receive-message', {
        recipients: newRecipients,
        sender: id,
        text,
      });
    });
  });
});
