const jwt = require('jsonwebtoken');
const messageRepo = require('../../infrastructure/repositories/message.repository');

const userRepo = require('../repositories/user.repository');

function setupWebsocket(server) {
  const io = require('socket.io')(server, { cors: { origin: '*' } });

  io.use(async (socket, next) => {
    const token = socket.handshake.auth.token;
    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET);
      socket.userId = payload.id;
      next();
    } catch {
      next(new Error('Autenticación fallida'));
    }
  });

  io.on('connection', (socket) => {
    socket.on('sendMessage', async (text) => {
      const msg = await messageRepo.save({ text, user: socket.userId });
      const full = await msg.populate('user', 'email').execPopulate();
      io.emit('newMessage', { id: full._id, text: full.text, user: full.user.email, createdAt: full.createdAt });
    });
  });
}

module.exports = { setupWebsocket };
