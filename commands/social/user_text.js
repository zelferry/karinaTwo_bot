const Discord = require("discord.js");
let {profile} = require("../../mongoDB/ini.js").user 

exports.run = async (client, message, args) => {

let user = message.author
let value = await profile.find(user);


if(!value.vipUser) return message.reply({content:`:x: |apenas usuários **vips** podem alterar os textos personalizados :v`});

  
  const newText = args.join(' ');
 
if(!newText) return message.reply({content:"insira um texto na frente do comando!"})
 
  const embedError = new Discord.MessageEmbed()
    .setTitle('Erro')
    .setDescription("**Textos com +1023 caracteres não são permitidos, assim, evitarei bugs.**")
    .setColor("#e0000f")

 if(newText.length >= 1022) return message.reply({embeds:[embedError]})
//client.user.setUsername(`[${newPrefix}]karinaTwo`);
 
await profile.setUserText(user,newText)
  const embed = new Discord.MessageEmbed()
    .addField("Novo usser text:", '`' + newText + '`')
    .setColor("#e0000f")

  message.reply({embeds:[embed]});
};
exports.config = {
    test: true
}
exports.help = {
  name:"usertext",
  permisoes: "nenhuma",
  aliases: ["profile-text","newtext"],
  description: "altere seu texto do perfil da karinaTwo!(requer vip user)",
  usage: "usertext <texto>"
}