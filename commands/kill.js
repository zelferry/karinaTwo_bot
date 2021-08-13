const Discord = require('discord.js');

exports.run = async (client, message, args) => {
  
let testez = require("../database/controllers/get/social.js")

var rand = testez.social.gifs.kill()
let user = message.mentions.users.first() || client.users.cache.get(args[0]);
if (!user) {
return message.reply('lembre-se de mencionar um usuário válido para a vingança!');
}
/*
message.channel.send(`${message.author.username} **acaba de beijar** ${user.username}! :heart:`, {files: [rand]});
*/
let avatar = message.author.displayAvatarURL({format: 'png'});
  const embed = new Discord.MessageEmbed()
        .setTitle('BOOOMMM!!')
        .setColor('#000000')
        .setDescription(`${message.author} matou o(a)${user}`)
        .setImage(rand)
        .setTimestamp()
        .setThumbnail(avatar)
        .setFooter('morreu!')
        .setAuthor(message.author.tag, avatar);
  await message.channel.send(embed);
}
exports.help = {
  name:"kill",
  permisoes: "nenhuma",
  aliases: ["matar"],
  description: "mate alguem!",
  usage: "kill <usuário>"
}