const Discord = require("discord.js");/*
const megaDB = require("megadb")
let afk = new megaDB.crearDB("afk")
*/
let util = require("../utils/main.js")
module.exports = async (client, message) => {
if (message.author.bot) return;
if (message.channel.type === "dm") return;
let db_afk = new util.db.afk()
  
const mentioned = message.mentions.members.first()
  
//const mentionedtexto = message.content.includes(mentioned.id)
  
 if(mentioned){
 let stats = db_afk.find(mentioned);
   if(stats){
     const embed = {
  "description": "o <@"+mentioned.id+"> esta `"+stats.afk+"`.\nja ja ele(a) volte para o servidor",
  "color": 8905155
};
     message.channel.send({ embed });
     }
 }
  
  if(db_afk.find(message.author)) {
    
    db_afk.delete(message.author)
    message.channel.send(`bem vindo de volta <@${message.author.id}> :)`).then(msg => msg.delete({timeout: 5000}))
   return console.log("afk desativado para a/o "+message.author.id+"")//message.channel.send("bem vindo de volta <@"+message.author.id+">!\nvocê ficou um tempinho longe do teclado!, agora podemos ZOAR AVONTADE!").then(msg => msg.delete({ timeout: 3000 }))
			}
}