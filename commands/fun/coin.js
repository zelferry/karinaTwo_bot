const Discord = require("discord.js")
let {economydb} = require("../../mongoDB/ini.js").user 

exports.run = async (client, message, args) => {
  let value = await economydb.fech(message.author);
  if(value.coins <= 19) return message.reply({content:"🚫**|** você não tem panther-coins suficientes!\n💸**|** e necessário ter **20** ou mais panther-coins para girar a moeda"})
  
  var array1 = ["cara", "coroa"];
  var array2 = ["<:heards:823247399040319498>","<:tails:823247556591091753>"] 

  var rand = Math.floor(Math.random() * array1.length);

  if (!args[0] || (args[0].toLowerCase() !== "cara" && args[0].toLowerCase() !== "coroa")) {
    message.reply({content:"insira **cara** ou **coroa** na frente do comando."});
  } else if (args[0].toLowerCase() == array1[rand]) {
  await economydb.addmoney(message.author,20,false)
    message.reply({content:""+array2[rand]+"**|** Deu **" + array1[rand] + "**, você ganhou dessa vez!\n💸**|** adiconei **20** panther-coins na sua carreira!"});
  } else if (args[0].toLowerCase() != array1[rand]) {
  await economydb.removemoney(message.author,20)
    message.reply({content:""+array2[rand]+"**|** Deu **" + array1[rand] + "**, você perdeu dessa vez!\n💸**|** retirei **20** panther-coins da sua carreira pela derrota"});
  }
};
exports.config = {
    test: false
}
exports.help = {
  name:"coin",
  permisoes: "nenhuma",
  aliases: ["moeda"],
  description: "aposte cara ou coroa comigo!",
  usage: "coin <cara,coroa>"
}