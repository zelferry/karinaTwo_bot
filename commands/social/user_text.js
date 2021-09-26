const Discord = require("discord.js");
let {profile} = require("../../mongoDB/ini.js").user 

exports.run = async (client, message, args) => {

let user = message.author
let value = await profile.find(user);


if(!value.vipUser) return message.channel.send(`:x: |apenas usuários **vips** podem alterar os textos personalizados :v`);

  
  const newText = args.join(' ');
 
if(!newText) return message.channel.send("insira um texto na frente do comando!")
 
  const embedError = await new Discord.MessageEmbed()
    .setTitle('Erro')
    .setDescription("**Textos com +1023 caracteres não são permitidos, assim, evitarei bugs.**")
    .setColor("#e0000f")

 if(newText.length >= 1022) return message.channel.send(embedError)
//client.user.setUsername(`[${newPrefix}]karinaTwo`);
 
await profile.setUserText(user,newText)
  const embed = await new Discord.MessageEmbed()
    .addField("Novo usser text:", '`' + newText + '`')
    .setColor("#e0000f")

  message.channel.send(embed);
};
exports.help = {
  name:"usertext",
  permisoes: "nenhuma",
  aliases: ["profile-text","newtext"],
  description: "altere seu texto do perfil da karinaTwo!(requer vip user)",
  usage: "usertext <texto>"
}