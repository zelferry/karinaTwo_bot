const Discord = require("discord.js");
const ne = require('nekos.life');
const neko = new ne();
//let client = global.client 
exports.run = async (client, message, args) => {
  neko.sfw.catText().then((catText) =>{
    message.reply({content:`${catText.cat}`})
   //   let aa = require("../../../aa.j") 
  })
}
exports.config = {
    test: false
}
exports.help = {
  name: "owo",
  permisoes: "nenhuma",
  aliases: ["catText"],
  description: "retorna uma CATTEXT aleatório!",
  usage: "owo"
}