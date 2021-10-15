const Discord = require("discord.js")

exports.run = async (client, message, args) => {
var list = [
  'https://cdn.discordapp.com/attachments/753628468398260265/768284648324595722/unknown.png',
  'https://cdn.discordapp.com/attachments/753628468398260265/768284969218736168/unknown.png',
  'https://cdn.discordapp.com/attachments/753628468398260265/768284648324595722/unknown.png',
  'https://cdn.discordapp.com/attachments/753628468398260265/768284969218736168/unknown.png',
  'https://cdn.discordapp.com/attachments/753628468398260265/768284648324595722/unknown.png',
  'https://cdn.discordapp.com/attachments/753628468398260265/768284969218736168/unknown.png',
  'https://cdn.discordapp.com/attachments/753628468398260265/768284648324595722/unknown.png',
  'https://cdn.discordapp.com/attachments/753628468398260265/768284969218736168/unknown.png',
  'https://cdn.discordapp.com/attachments/753628468398260265/768284648324595722/unknown.png',
  'https://cdn.discordapp.com/attachments/753628468398260265/768284969218736168/unknown.png',
  'https://cdn.discordapp.com/attachments/753628468398260265/768284648324595722/unknown.png',
  'https://cdn.discordapp.com/attachments/753628468398260265/768284969218736168/unknown.png',
  "https://cdn.discordapp.com/attachments/812270135540449300/841009657425690644/Screenshot_2021-05-09-14-49-58-1-1.png",
  "https://cdn.discordapp.com/attachments/812270135540449300/841009657425690644/Screenshot_2021-05-09-14-49-58-1-1.png",
  "https://cdn.discordapp.com/attachments/812270135540449300/841009657425690644/Screenshot_2021-05-09-14-49-58-1-1.png"
];
var rand = list[Math.floor(Math.random() * list.length, 9)];

message.reply({
  embed: [{
    title: "sera que o Knuckles aprovou seu meme?",
    color: 1639005,
    image: {
      url: `${rand}`
    }
  }]
})

}
exports.config = {
    test: false
}
exports.help = {
  name:"meme",
  permisoes: "nenhuma",
  aliases: ["Knuckles","aprovar-meme?"],
  description: "\"meme?\"",
  usage: "meme [texto,imagem ou link]"
}