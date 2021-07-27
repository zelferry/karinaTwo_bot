const Discord = require("discord.js");
const db = require("megadb");
let MoneyDB = new db.crearDB("Economy");
let PrefixDB = new db.crearDB("Prefix");

exports.run = async (client, message, args) => {

  if (!PrefixDB.tiene(`${message.guild.id}`))
    PrefixDB.establecer(`${message.guild.id}`, {
      name: message.guild.name,
      prefix: "f/"
    });

  let prefixoAtual = await PrefixDB.obtener(`${message.guild.id}.prefix`);

let user;
if (message.mentions.users.first() || client.users.cache.get(args[0])) {
  user = message.mentions.users.first() || client.users.cache.get(args[0]);
} else {
    user = message.author;
}
  if (!MoneyDB.tiene(`${user.id}`))
    MoneyDB.establecer(`${user.id}`, { coins: 0 });

  let ruby = await MoneyDB.obtener(`${message.author.id}.coins`);

  if(ruby < args[1]) return message.channel.send(`Você não tem **Panther-coins** suficientes!`)

 const deleteCount = parseInt(args[1], 10);

if (!user) {
        return message.channel.send(`mercione um usuario! \n \n ex: ${prefixoAtual}pay @user-aleatorio 200`)
    }

if (!deleteCount) {
        return message.channel.send(`forneça um numero! \n \n ex: ${prefixoAtual}pay @user-aleatorio 200`)
    }
    if (message.content.includes('-')) {
        return message.channel.send('numeros neativos não comtam!')
    }

  const embed = new Discord.MessageEmbed()
    .setDescription(`<@${message.author.id}> finalmente te deu os ${args[1]} Panther-coins da passoca :)`)
    .setColor("#be41f4")
  message.channel.send(embed);

  MoneyDB.sumar(`${user.id}.coins`, args[1])
  MoneyDB.restar(`${message.author.id}.coins`, args[1])

}
exports.help = {
  name:"pay",
  permisoes: "nenhuma",
  aliases: ["passar"],
  description: "transfira Panther-coins para seu amigo!",
  usage: "pay <usuario>"
}