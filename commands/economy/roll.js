
const Discord = require("discord.js");
//const db = require("megadb");
const talkedRecently = new Set();

let {economydb} = require("../../mongoDB/ini.js").user 

exports.run = async(client, message, args) => {
	let user = message.author;

	let value = await economydb.fech(user);
	

  if (value.coins <= 49)
    return message.channel.send({content:`:x:| Você não tem Panther-coins o suficiente para girar o roll! Necessários: **50 Panther-coins**`});

//  let user = message.author;

  if (talkedRecently.has(message.author.id)) {
    message.channel.send({content:`:x:| Espere 10 segundos para poder usar o roll novamente - ${message.author}`});
  } else {
    let roll = [
      "🍌", 
      "😊", 
      "😈", 
      "♍",
      "👻", 
      "🕖", 
      "💳", 
      "💜", 
      "💸",
      "🤡"
      ];

    let reels = Math.floor(Math.random() * roll.length);
    let reels1 = Math.floor(Math.random() * roll.length);
    let reels2 = Math.floor(Math.random() * roll.length);

    let result = "Desculpa, você perdeu.";
    if (reels === reels1 && reels1 === reels2) {
      result = "Parabéns! Você ganhou.";
      await economydb.addmoney(user,250,false)
      
      message.channel.send({content:"Foi adicionada a quantia de `250 Panther-coins` a sua carteira por você ter ganhado!"});
    }
    const embed = new Discord.MessageEmbed()
      .setTitle("🎰 Slot Machine 🎰")
      .setDescription(
        "[ " + roll[reels] + " | " + roll[reels1] + " | " + roll[reels2] + " ]"
      )
      .setColor("#be41f4")
      .setFooter(` ${result}`)
      .setTimestamp();

    await message.channel.send({embeds:[embed]});

    if (result === "Desculpa, você perdeu.")
      return economydb.removemoney(user,50).then(
        message.channel.send({content: "Você perdeu... Retirei 50 Panther-coins da sua carteira pela derrota."})
      );

    talkedRecently.add(message.author.id);
    setTimeout(() => {
      talkedRecently.delete(message.author.id);
    }, 10000 /* 300000 */);
  }
};
exports.config = {
    test: false
}
exports.help = {
  name:"roll",
  permisoes: "nenhuma",
  aliases: ["gacha","aposta"],
  description: "aposte seus Panther-coins na SLOT MACHINE!",
  usage: "roll"
}