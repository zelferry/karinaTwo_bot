const Discord = require('discord.js');
const db = require("megadb");

exports.run = async (client, message, args) => {
  let MoneyDB = new db.crearDB("Economy");

  if (!MoneyDB.tiene(`${message.author.id}`))
    MoneyDB.establecer(`${message.author.id}`, { coins: 0 });

  let ruby = await MoneyDB.obtener(`${message.author.id}.coins`);
  
let testez = require("../database/controllers/get/social.js")

var rand = testez.social.gifs.kiss()

var list = [
  'https://imgur.com/iclUiUN.gif',
  'https://imgur.com/lYQt9rx.gif',
  'https://imgur.com/w1TU5mR.gif'
];

//var rand = list[Math.floor(Math.random() * list.length)];
let user = message.mentions.users.first() || client.users.cache.get(args[0]);
if (!user) {
return message.reply('lembre-se de mencionar um usuário válido para beijar!');
}
/*
message.channel.send(`${message.author.username} **acaba de beijar** ${user.username}! :heart:`, {files: [rand]});
*/
let avatar = message.author.displayAvatarURL({format: 'png'});
  const embed = new Discord.MessageEmbed()
        .setTitle('Kiss')
        .setColor('#000000')
        .setDescription(`${message.author} acaba de beijar ${user}`)
        .setImage(rand)
        .setTimestamp()
        .setThumbnail(avatar)
        .setFooter('Kissu kissu kissu')
        .setAuthor(message.author.tag, avatar);
  await message.channel.send(embed);
console.log(`comando f/kiss usado`);
MoneyDB.sumar(`${message.author.id}.coins`, 12)
}
exports.help = {
  name:"kiss",
  permisoes: "nenhuma",
  aliases: ["beijar","kissu"],
  description: "beije alguem que você ama! U//3//U",
  usage: "kiss <usuário>"
}