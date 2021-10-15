const Discord = require("discord.js");
//const fs = require('fs');
exports.run = async (client, message, args) => {
  
const imagestest = client.images.displayURL(message,args,0)
/*
 if (imagestest) {
const imageIDSpoilef = makeimageID(12)
     const attachment = new Discord.MessageAttachment(imagestest, `SPOILER_${imageIDSpoilef}.png`);

       return message.channel.send(`imagen enviada por ${message.author} `,attachment)
 } else {
      return message.channel.send('você precisa anexar uma imagem!')
    }
    
    */
    
 if (imagestest) {
   if (imagestest) {
     //message.delete()
     if (imagestest){
const imageIDSpoilef = makeimageID(12)

const attachment = new Discord.MessageAttachment(imagestest, `SPOILER_${imageIDSpoilef}.png`);

       return message.reply({content:`📸**|** ${message.author} mídia marcada como spoiler com sucesso!`,files:[attachment]})
     }
      } else {
        return message.reply({content:'você precisa anexar uma imagem!'})
      }
    } else {
      return message.reply({content:"você precisa anexar uma imagem!"})
    }
    
    
    
}
function makeimageID(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}
exports.config = {
    test: false
}
exports.help = {
  name:"spoiler-image",
  permisoes: "nenhuma",
  aliases: ["spimg","esconder-imagem"],
  description: "marca alguma imagem como spoiler",
  usage: "spoilers-image [imagem]"
}