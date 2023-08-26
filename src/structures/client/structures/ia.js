const key = process.env.OPENAI_API_KEY;
const personality_filter = process.env.PERSONALITY_FILTER;
const ai = require("openai");

const openai = new ai({
  apiKey: key
});

module.exports = async (message) => {
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      { "role": "system", "content": `${personality_filter}: ` },
      { "role": "user", "content": message }
    ],
    temperature: 0.7,
    max_tokens: 512,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });

  return response.choices[0].message.content
}