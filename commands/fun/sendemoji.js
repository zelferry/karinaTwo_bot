const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {
	let {prefix} = require("../../mongoDB/ini.js").guild 

    let prefixoAtual = await prefix.findPrefix(message.guild,message,false)
	


  message.delete();
  if (!args[0])
    return message.channel.send(
      `**${message.author.username}, a sintaxe correta é:** ` +
        "`" +
        "" + prefixoAtual + "emojisend nomedoemoji`"
    ); 
  let emoji = message.guild.emojis.cache.find(emoji => emoji.name === args[0]);

  if (!emoji) {
    message.channel.send(
      "`" + args[0] + "` **não é um emoji deste servidor.**"
    );
  } else if (emoji.animated === true) {
    message.channel.send(`<a:${args[0]}:${emoji.id}>`);
  } else {
    message.channel.send(`<:${args[0]}:${emoji.id}>`);
  }
//onsole.log(`comando f/emoji usado`);
};
exports.help = {
  name:"emojisend",
  permisoes: "nenhuma",
  aliases: ["send-emoji"],
  description: "fassa eu enviar um emogi de seu servidor",
  usage: "emojisend <nome do emoji>"
}