const Discord = require("discord.js");
let {economydb} = require("../../mongoDB/ini.js").user 

exports.run = async (client, message, args) => {
    let user = message.mentions.users.first() || client.users.cache.get(args[0]);
    let user_ = message.author;
    let value_ = await economydb.fech(user);
    let value = await economydb.fech(user_)

  
  let ruby = value.coins;

  if(ruby < args[1]) return message.reply({content:`Você não tem **Panther-coins** suficientes!`})

 const count = parseInt(args[1], 10);

if (!user) {
        return message.reply({content:`mercione um usuario! \n \n ex: \`<prefixo>pay @user-aleatorio 200\``})
    }

if (!count) {
        return message.reply({content:`forneça um numero! \n \n ex: \`<prefixo>pay @user-aleatorio 200\``})
    }
    if (args[1] <= 0) {
        return message.reply({content:'numeros neativos não comtam!'})
    }

  const embed = new Discord.MessageEmbed()
    .setDescription(`<@${message.author.id}> finalmente te deu os ${args[1]} Panther-coins da passoca :)`)
    .setColor("#be41f4")
  message.reply({embeds:[embed]});

await economydb.pay(user_,user,args[1])

}
exports.config = {
    test: false
}
exports.help = {
  name:"pay",
  permisoes: "nenhuma",
  aliases: ["passar"],
  description: "transfira Panther-coins para seu amigo!",
  usage: "pay <usuario>"
}