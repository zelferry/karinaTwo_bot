const Discord = require("discord.js");
const db = require("megadb");

let MoneyDB = new db.crearDB("Economy");
let VipDB = new db.crearDB("Vip");

exports.run = async (client, message, args) => {

 if(!MoneyDB.tiene(`${message.author.id}`))
      MoneyDB.establecer(`${message.author.id} `, {
        coins: 0
    })

  const ruby = await MoneyDB.obtener(`${message.author.id}.coins`);

  if(ruby <= 1975) return message.channel.send(`Você não tem **Panther-coins** suficientes!`)
    
  if(!VipDB.tiene(`${message.author.id}`))
      VipDB.establecer(`${message.author.id}`, {
        vip: 'No'
      })

  const vip = await VipDB.obtener(`${message.author.id}.vip`);

  if(vip == 'Yes') return message.channel.send(`Você já é um usuário Vip!`);

  const embed = new Discord.MessageEmbed()
    .setTitle("**Vip User Comprado**")
    .setDescription(`Você comprou: ** Vip User** por **1,976 Panther-coins**`)
    .setColor("#be41f4")
  message.channel.send(embed);

  VipDB.set(`${message.author.id}.vip`, 'Yes')  
  MoneyDB.restar(`${message.author.id}.coins`, 1976)
  
}
exports.help = {
  name:"vip",
  permisoes: "nenhuma",
  aliases: ["vip-user","buyvip"],
  description: "COMPRE VIP USER!",
  usage: "vip"
}