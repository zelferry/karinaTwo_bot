const Discord = require('discord.js');

exports.run = async (client, message, args) => {

var list = [
  'https://media.tenor.com/images/da71bb2ac997dea9857c15b109f62937/tenor.gif',
  'https://media.tenor.com/images/647b3050c0eb860b83cfff354d3c0751/tenor.gif',
  'https://media.giphy.com/media/rCHD5w7QpKB0c/giphy.gif',
  'https://64.media.tumblr.com/cfd039730669f89c064f69e57e0877af/tumblr_nj6ipiNACJ1t8s6eeo1_250.gif',
  'https://loritta.website/assets/img/actions/dance/male_x_male/gif_245.gif',
  'https://media.tenor.com/images/575a488ce4eb564abeb8074d32b18657/tenor.gif',
  'https://media.tenor.com/images/f775a57b776b455985139447b9411644/tenor.gif',
  'https://media.tenor.com/images/116d4bf39aabeb3663f89256773b4b4c/tenor.gif'
  
  
];

var rand = list[Math.floor(Math.random() * list.length)];
let user = message.mentions.users.first() || client.users.cache.get(args[0]);
if (!user) {
return message.reply('lembre-se de mencionar um usuário válido para dancar \n \n PA PO PE ');
}
/*
message.channel.send(`${message.author.username} **acaba de beijar** ${user.username}! :heart:`, {files: [rand]});
*/
let avatar = message.author.displayAvatarURL({format: 'png'});
  const embed = new Discord.MessageEmbed()
        .setTitle('TAP')
        .setColor('#169597')
        .setDescription(`${message.author} e ${user} estão dancando :D`)
        .setImage(rand)
        .setThumbnail(avatar)
        .setFooter('PA PO PE')
        .setAuthor(message.author.tag, avatar);
  await message.channel.send(embed);
message.delete().catch(O_o => {});
console.log(`comando f/dancar usado`);
}
exports.help = {
  name:"dancar",
  permisoes: "nenhuma",
  aliases: ["balada"],
  description: "dance com alguém!",
  usage: "dancar <usuario>"
}