require('dotenv/config');
const express = require('express');
const app = express();

const PORT = process.env.PORTSERVER || 5000;

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
