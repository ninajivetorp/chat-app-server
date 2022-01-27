const Message = require('../models/messageModel');
const User = require('../models/userModel');
const Chat = require('../models/chatModel');


const sendMessage = async (req, res) => {
  const { content, chatId } = req.body;
  const tempId = '61ee06332ce9392a507e4680'

  if (!content || !chatId) {
    return res.status(400).send('Need content and chatId to send Message');
  }

  const newMessage = {
    author: tempId,
    content: content,
    chat: chatId,
  };

  try {
    let message = await Message.create(newMessage);
    const fullMessage = await Message.findOne({ _id: message._id }).populate('author', 'username')

    res.status(200).json(fullMessage);

  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = { sendMessage };