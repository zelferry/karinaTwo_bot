const Discord = require("discord.js");

//onst db = require("megadb");
const talkedRecently = new Set();
//const math = require("mathjs");
const cooldown = new Set();

let {economydb} = require("../../mongoDB/ini.js").user 

exports.run = async (client, message, args) => {

  
let user = message.author;

	let value = await economydb.fech(user)


  var test = "dias";

  let random = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10","11","12","13","14","15","16","17","18","19","20"];

  let work  = ["Garçom", "DJ", "Traficante", "Secretário", "Caçador", "Entregador", "Gari", "Pedreiro", "Illuminati","adm do discord", "desenhista", "gacha-tuber", "progamador", "trava zap", "progamador da loritta", "progamador de bots e de apps", "bailarino", "ajudante", "FURRY OwO", "fursuit maker", "desenhista MSFW", "desenhista NSFW GAY"];
  
  let workresult  = Math.floor(Math.random() * work.length,3 + 9);
  let randomresult = Math.floor(Math.random() * random.length);

  let trab = work[workresult];
  
  let answer;
  try {
    answer = random[randomresult] * 10;
  } catch (err) {
    return message.reply(`**Quantia inválida** ${err}`);
  }

if(random[randomresult] < 2) {
  test = "dia";
}

 
  if (cooldown.has(message.author.id)) {
      message.delete();
     return message.channel.send(
      `:x:| **Você precisa esperar 1 hora para usar esse comando!**`
    ); }
  else {     //esse else tem valor de AI
    cooldown.add(message.author.id); //aqui ele tem valor se nao
    setTimeout(() => {
    cooldown.delete(message.author.id);
  },  3600000)
  
  }
  

  let perf = new Discord.MessageEmbed()
    .setColor("#be41f4")
    .setDescription(
      message.author.tag+
        ` | Você trabalhou **`+
        random[randomresult]+
        ` `+test+` ** de **`+trab+
        `** e recebeu **`+answer+
        ` Panther-coins**`
    )
    .setTimestamp();

  message.channel.send(perf);

await economydb.addmoney(user,answer,false)

  
};
exports.help = {
  name:"work",
  permisoes: "nenhuma",
  aliases: ["trabalhar"],
  description: "você trabalhou demais, meresse alguns Panther-coins",
  usage: "work"
}