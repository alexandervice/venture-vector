const { Configuration, OpenAIApi } = require("openai");
const apiKey = process.env.CHAT_GPT_API_KEY;

const configuration = new Configuration({
    organization: "org-7SIWOUnZ18FQbvUshQPa3SG6",
    apiKey: apiKey,
});
const openai = new OpenAIApi(configuration);
// const response = await openai.listEngines();

module.exports = {
  chatCompletion: async (req, res) => {
    try {
      const { message } = req.body;
      const inputs = [
        // {"role": "system", "content": "You are a helpful assistant."},
        {role: "system", content: message}
      ];
      const answer = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: inputs
      });
      console.log("ChatGPT has responded")
      // console.log(answer.data.choices[0].message.content)
      const text = answer.data.choices[0].message.content;
      
      // console.log(text)
      res.status(200).json({ text });
    } catch (err) {
      res.status(500).json({
        message: err.message
      });
    }
  }
}