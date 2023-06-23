

module.exports = app => {
  app.get("/places/search", authenticate, ChatController.chatCompletion);
}