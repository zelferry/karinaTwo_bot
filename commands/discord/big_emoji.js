const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {
    if (!args[0]) return message.reply({content: `**${message.author.username}**, insira um emoji!`});
    let emoji = message.guild.emojis.cache.find(emoji => emoji.name === args[0].split(":")[1]);
    
    if (!emoji) {
        message.reply({content: `🚫**|** o emoji ***${args[0]}*** não e um emoji do servidor`});
    } else {
        message.reply({embeds:[
            {
                description:`${args[0].split(":")[1]}`,
                color: "#7289DA",
                image:{
                    url:`${emoji.url}`
                }
            }
        ]});
    }

};
exports.config = {
    test: false
}
exports.help = {
  name:"big-emoji",
  permisoes: "nenhuma",
  aliases: [],
  description: "exite tais emojis MUITOS PEQUENOS NE?",
  usage: "big-emoji :<nome do emoji>:"
}