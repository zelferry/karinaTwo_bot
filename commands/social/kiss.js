const Discord = require('discord.js');
//onst db = require("megadb");

exports.run = async (client, message, args) => {
  
let testez = require("../../database/controllers/get/social.js")

var rand = testez.social.gifs.kiss()

var list = [
  'https://imgur.com/iclUiUN.gif',
  'https://imgur.com/lYQt9rx.gif',
  'https://imgur.com/w1TU5mR.gif'
];

//var rand = list[Math.floor(Math.random() * list.length)];
let user = message.mentions.users.first() || client.users.cache.get(args[0])
if (!user) {
return message.reply({content:'lembre-se de mencionar um usuário válido para beijar!'});
} else {
/*
message.channel.send(`${message.author.username} **acaba de beijar** ${user.username}! :heart:`, {files: [rand]});
*/
let avatar = message.author.displayAvatarURL({format: 'png'});
  const embed = new Discord.MessageEmbed()
        .setTitle('Kiss')
        .setColor('#000000')
        .setDescription(`<@${message.author.id}> acaba de beijar <@${user.id}>`)
        .setImage(rand)
        .setTimestamp()
        .setThumbnail(avatar)
        .setFooter('Kissu kissu kissu')
        .setAuthor(message.author.tag, avatar);
  return message.reply({embeds:[embed]});
}
}
exports.config = {
    test: true
}
exports.help = {
  name:"kiss",
  permisoes: "nenhuma",
  aliases: ["beijar","kissu"],
  description: "beije alguem que você ama! U//3//U",
  usage: "kiss <usuário>"
}