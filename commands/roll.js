const Discord = require("discord.js");
const db = require("megadb");
const talkedRecently = new Set();

let MoneyDB = new db.crearDB("Economy");

exports.run = async (client, message, args) => {

  if (!MoneyDB.tiene(`${message.author.id}`))
    MoneyDB.establecer(`${message.author.id}`, { coins: 0 });

  let ruby = await MoneyDB.obtener(`${message.author.id}.coins`);

  if (ruby <= "49")
    return message.channel.send(
      `:x:| Você não tem Panther-coins o suficiente para girar o roll! Necessários: **50 Panther-coins**`
    );

  let user = message.author;

  if (talkedRecently.has(message.author.id)) {
    message.channel.send(
      `:x:| Espere 10 segundos para poder usar o roll novamente - ${message.author}`
    );
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
      "💸"
      ];

    let reels = Math.floor(Math.random() * roll.length);
    let reels1 = Math.floor(Math.random() * roll.length);
    let reels2 = Math.floor(Math.random() * roll.length);

    let result = "Desculpa, você perdeu.";
    if (reels === reels1 && reels1 === reels2) {
      result = "Parabéns! Você ganhou.";
      MoneyDB.sumar(`${user.id}.coins`, "250");
      message.channel.send(
        "Foi adicionada a quantia de `250 Panther-coins` a sua carteira por você ter ganhado!"
      );
    }
    const embed = new Discord.MessageEmbed()
      .setTitle("🎰 Slot Machine 🎰")
      .setDescription(
        "[ " + roll[reels] + " | " + roll[reels1] + " | " + roll[reels2] + " ]"
      )
      .setColor("#be41f4")
      .setFooter(` ${result}`)
      .setTimestamp();

    await message.channel.send(embed);

    if (result === "Desculpa, você perdeu.")
      return MoneyDB.restar(`${user.id}.coins`, "50").then(
        message.channel.send(
          "Você perdeu... Retirei 50 Panther-coins da sua carteira pela derrota."
        )
      );

    talkedRecently.add(message.author.id);
    setTimeout(() => {
      // Removes the user from the set after a minute
      talkedRecently.delete(message.author.id);
    }, 10000 /* 300000 */);
  }
};
exports.help = {
  name:"roll",
  permisoes: "nenhuma",
  aliases: ["gacha","aposta"],
  description: "aposte seus Panther-coins na SLOT MACHINE!",
  usage: "roll"
}