const Discord = require("discord.js");
//const fs = require('fs');
exports.run = async (client, message, args) => {
  
const imagestest = client.get_images(message,args)
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
     message.delete()
     if (imagestest){
const imageIDSpoilef = makeimageID(12)

const attachment = new Discord.MessageAttachment(imagestest, `SPOILER_${imageIDSpoilef}.png`);

       return message.channel.send(`imagen enviada por ${message.author} `,attachment)
     }
      } else {
        return message.channel.send('você precisa anexar uma imagem!')
      }
    } else {
      return message.channel.send("você precisa anexar uma imagem!")
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
exports.help = {
  name:"spoiler-image",
  permisoes: "nenhuma",
  aliases: ["spimg","esconder-imagem"],
  description: "marca alguma imagem como spoiler",
  usage: "spoilers-image [imagem anexada ou avatar e um usuário]"
}