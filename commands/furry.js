const Discord = require("discord.js")
const muttubus = require("../database/imagens/muttubus.json");

module.exports.run = async (client, message, args) => {
  /*
  await message.delete();
  var rand89 = muttubus[Math.floor(Math.random() * muttubus.length)];

  const embed = await new Discord.MessageEmbed()
    .setAuthor(`${message.author.username}`, `${message.author.displayAvatarURL({ dynamic: true })}`)
    .setTitle("UwU")
    .setImage(rand89)
    .setColor("#FF00FF")
    .setTimestamp()
  message.channel.send(embed)
  */
let {pages} = require("../buttonSystem/init.js")

let button_2 = new pages.normal(message,client)
await button_2.buttonPages(muttubus)
};
exports.help = {
  name:"furry",
  permisoes: "nenhuma",
  aliases: ["peludos"],
  description: "veja imagens furrys UwU",
  usage: "furry"
}