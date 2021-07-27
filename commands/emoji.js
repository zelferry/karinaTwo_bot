const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {

    let db = require('megadb')

    let PrefixDB = new db.crearDB("Prefix");

    if (!PrefixDB.tiene(`${message.guild.id}`))
    PrefixDB.establecer(`${message.guild.id}`, {
      name: message.guild.name,
      owner: message.guild.owner.user.id,
      prefix: "f/"
    });

    let prefixoAtual = await PrefixDB.obtener(`${message.guild.id}.prefix`);

  message.delete();
  if (!args[0])
    return message.channel.send(
      `**${message.author.username}, a sintaxe correta é:** ` +
        "`" +
        "" + prefixoAtual + "emoji nomedoemoji`"
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
console.log(`comando f/emoji usado`);
};
exports.help = {
  name:"emoji",
  permisoes: "nenhuma",
  aliases: ["send-emoji"],
  description: "fassa eu enviar um emogi de seu servidor",
  usage: "emoji <nome do emoji>"
}