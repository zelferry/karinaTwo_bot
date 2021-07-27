const Discord = require("discord.js");
const pitaya = require("../database/imagens/Daieny.json");

module.exports.run = async (client, message, args) => {
 const m = await message.channel.send('pitaya?');

var rand = pitaya[Math.floor(Math.random() * pitaya.length)];
setTimeout(() => {
m.edit({
  content: "",
  embed: {
    title: "pitaya?",
    description: "conheça a [rainha das pitayas](https://twitter.com/DaienySchuttz) no twitter!",
    color: 16399825,
    image: {
      url: `` + (rand) + ``
    }
  }
})}, 1000)
}
exports.help = {
  name:"pitaya",
  permisoes: "nenhuma",
  aliases: ["DaienySchuttz"],
  description: "comando dedicado para a [rainha das pitayas!](https://twitter.com/DaienySchuttz)",
  usage: "pitaya"
}