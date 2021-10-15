const Discord = require("discord.js");

let {economydb} = require("../../mongoDB/ini.js").user 

exports.run = async (client, message, args) => {

let user = message.author;

	let value = await economydb.fech(user)


  if(value.coins <= 1975) return message.reply({content:`🚫**|** Você não tem **Panther-coins** suficientes!\n💸**|** e necessário ter **1,976** ou mais panther-coins para comprar o **vip user**`})
    
  if(value.vipUser == true) return message.reply({content:`Você já é um usuário Vip!`});

  const embed = new Discord.MessageEmbed()
    .setTitle("**Vip User Comprado**")
    .setDescription(`Você comprou: **Vip User** por **1,976 Panther-coins**`)
    .setColor("#be41f4")
  message.channel.send({embeds:[embed]});

 // VipDB.set(`${message.author.id}.vip`, 'Yes')

 // MoneyDB.restar(`${message.author.id}.coins`, 1976)
 await economydb.setVip(user)
  await economydb.removemoney(user,1976)
}
exports.config = {
    test: false
}
exports.help = {
  name:"vip",
  permisoes: "nenhuma",
  aliases: ["vip-user","buyvip"],
  description: "COMPRE VIP USER!",
  usage: "vip"
}