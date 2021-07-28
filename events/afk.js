const Discord = require("discord.js");
let util = require("../utils/main.js")

exports.type = "message";
exports.start = async(client,clusterID,ipc,message) => {
if (message.author.bot) return;
if (message.channel.type === "dm") return;

let db_afk = new util.db.afk()
  
const mentioned = message.mentions.members.first()
  
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
    
    console.log("afk desativado para a/o "+message.author.id+"")
  }
};