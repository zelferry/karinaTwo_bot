const Discord = require('discord.js');

exports.run = async (client, message, args) => {

let testez = require("../../database/controllers/get/social.js")

var rand = testez.social.gifs.hug()

let user = message.mentions.users.first() || client.users.cache.get(args[0]);
if (!user) {
return message.reply({content:'lembre-se de mencionar um usuário válido para abrasar!'});
}
/*
message.channel.send(`${message.author.username} **acaba de beijar** ${user.username}! :heart:`, {files: [rand]});
*/
let avatar = message.author.displayAvatarURL({format: 'png'});
  const embed = new Discord.MessageEmbed()
        .setTitle(':3c')
        .setColor('#139080')
        .setDescription(`<@${message.author.id}> acaba de abrasar <@${user.id}>`)
        .setImage(rand)
        .setTimestamp()
        .setThumbnail(avatar)
        .setFooter('Kissu kissu kissu')
        .setAuthor(message.author.tag, avatar);
  await message.reply({embeds:[embed]});

}
exports.config = {
    test: true
}
exports.help = {
  name:"hug",
  permisoes: "nenhuma",
  aliases: ["abraso"],
  description: "abrace alguem!",
  usage: "hug <usuário>"
}