const Discord = require("discord.js"); 
const botID = process.env.BOT_ID;

exports.run = async (client, message, args) => {
	
	let input =message.mentions.users.first() ? message.mentions.users.first().id : (parseInt(args[0]) ? args[0] : message.author.id)

  let user = await client.users.fetch(input)
  
  let avatar = user.avatarURL({ dynamic: true, format: "png", size: 1024 });
  
  let avatardrscri = `[clique aqui para baixar-la!](${avatar})`

if(user.id === botID) {
  avatardrscri = "meu avatar foi desenhado pelo **M&M**\n\n conhesa o trabalho dele no:\n[Twitter!](https://twitter.com/Miguel94244829)"
}

  let embed = new Discord.MessageEmbed() 
    .setColor(`#4cd8b2`) 
    .setTitle(`Avatar de ${user.username}`)
    .setDescription(avatardrscri)
    .setImage(avatar) 
    .setFooter(`• Autor: ${message.author.tag}`, message.author.displayAvatarURL({format: "png"}));
 await message.channel.send(embed); 

console.log(`comando f/avatar usado`);
};
exports.help = {
  name:"avatar",
  permisoes: "nenhuma",
  aliases: ["icon"],
  description: "sabe aquele avatar lindo que você viu? veja ela em em seu eatado FULL!",
  usage: "avatar [usuário]"
}