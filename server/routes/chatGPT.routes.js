const ChatController = require("../controllers/chatGPT.controllers");
const {authenticate} = require('../config/jwt.config')

module.exports = app => {
  app.post("/chat", authenticate, ChatController.chatCompletion);
}