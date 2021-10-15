const Discord = require("discord.js");
let {afk} = require("../mongoDB/ini.js").user 

exports.type = "messageCreate";
exports.start = async(client,clusterID,ipc,message) => {
    if (!message.guild || message.author.bot) return;

  
const mentioned = message.mentions.members.first()
  
 if(mentioned){
 let stats = await afk.find(mentioned,false) 

if(stats.error !== "404") {
   if(stats.afk.ready){
     const embed = {
  "description": "o <@"+mentioned.id+"> esta `"+stats.afk.reason+"`.\nja ja ele(a) volte para o servidor",
  "color": 8905155
};
     message.channel.send({ embeds: [embed] });
     }
 
 
 }
 	
 }
  
  let userAFK = await afk.find(message.author,false) 
  
  
  if(userAFK.error !== "404"){
      if(userAFK.afk.ready) {
          await afk.deleteAFK(message.author)
              let msg = await message.channel.send({
                  content:`bem vindo de volta <@${message.author.id}> :)`
              });
      }
  }
}