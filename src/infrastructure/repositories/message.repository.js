// src/infrastructure/repositories/message.repository.js
const Message = require('../../domain/models/message.model');

class MessageRepository {
  async save({ text, user }) {
    const msg = new Message({ text, user });
    return await msg.save();
  }
}

module.exports = new MessageRepository();
