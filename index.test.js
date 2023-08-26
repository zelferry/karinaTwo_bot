require('dotenv').config();

const key = process.env.OPENAI_API_KEY;
const personalityFilter = (process.env.PERSONALITY_FILTER);
const ai = require("openai");

//const config = new ai.Configuration();

const openai = new ai({ 
    apiKey: key
  });

let GPT35Turbo = async (message) => {
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {"role": "system", "content": "Responda a essa mensagem contendo traços meio doidas e de uma psicótica, com um pouco de charme nas palavras. Faça com que sua resposta seja meio curta ou longa quanto você gostar: " },
      {"role": "user", "content": message}
    ],
    temperature: 0.7,
    max_tokens: 512,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });

  return response.choices[0].message.content
}

(async() => {
   let kk = await GPT35Turbo("ola")
   console.log(kk)
})()