const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
  messages: [
    {
      role: {
        type: String,
        enum: ['user', 'model'],
        required: true
      },
      parts: [{ text: {
        type: String,
        required: true
      }, }],
      
    }
  ]
}
);

const Chat = mongoose.model('Chat', chatSchema);
module.exports = Chat;
