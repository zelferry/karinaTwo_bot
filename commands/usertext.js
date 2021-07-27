const Discord = require("discord.js");
const db = require("megadb");

let textDB = new db.crearDB("userText");
let VipDB = new db.crearDB("Vip");

exports.run = async (client, message, args) => {

if(!VipDB.tiene(`${message.author.id}`))
      VipDB.establecer(`${message.author.id}`, {
        vip: 'No'
      })

const vip = await VipDB.obtener(`${message.author.id}.vip`);

if(vip == 'No') return message.channel.send(`:x: |apenas usuários **vips** podem alterar os textos personalizados :v`);

  if (!textDB.tiene(`${message.author.id}`))
    textDB.establecer(`${message.author.id}`, {
      texto: "\"kari e minha amiga :3, sabia que você pode mudar esse texto usando o **usertext**?(requer vip user)\""
    });

  let prefix = await textDB.obtener(`${message.author.id}.texto`);

  const newPrefix = args.join(' ');
 
if(!newPrefix) return message.channel.send("insira um texto na frente do comando!")
 
  const embedError = await new Discord.MessageEmbed()
    .setTitle('Erro')
    .setDescription("**Textos com +1023 caracteres não são permitidos, assim, evitarei bugs.**")
    .setColor("#e0000f")

  if(newPrefix.length >= 1022) return message.channel.send(embedError)
//client.user.setUsername(`[${newPrefix}]karinaTwo`);
 
  textDB.set(`${message.author.id}.texto`, newPrefix)

  const embed = await new Discord.MessageEmbed()
    .addField("Novo usser text:", '`' + newPrefix + '`')
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