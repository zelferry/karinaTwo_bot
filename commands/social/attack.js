const Discord = require('discord.js');

let testez = require("../../database/controllers/get/social.js")

exports.run = async (client, message, args) => {

var rand = testez.social.gifs.kill()

let user = message.mentions.users.first() || client.users.cache.get(args[0]);
if (!user) {
return message.reply('lembre-se de mencionar um usuário válido para atacar! \n \nso n mata a pesoa viu!');
}
/*
message.channel.send(`${message.author.username} **acaba de atacar** ${user.username}! :heart:`, {files: [rand]});
*/
let avatar = message.author.displayAvatarURL({format: 'png'});
  const embed = new Discord.MessageEmbed()
        .setTitle('atack')
        .setColor('#000000')
        .setDescription(`${message.author} acaba de atacar ${user}`)
        .setImage(rand)
        .setThumbnail(avatar)
        .setFooter('e moreu :D')
        .setAuthor(message.author.tag, avatar);
  await message.channel.send(embed);
  
}
exports.help = {
  name:"atack",
  permisoes: "nenhuma",
  aliases: ["atacar"],
  description: "ALGUEM ESQUESEU DO DINHEIRO DA PASSOCA!, ENT ATAQUE ELA! >:)",
  usage: "atack <usuario>"
}