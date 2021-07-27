const Discord = require("discord.js");
const db = require("megadb");
const talkedRecently = new Set();
//const math = require("mathjs");

const ms = require("parse-ms")
const timeout = 86400000
let dbfunc = require("../KariModules/db-low.js")

let MoneyDB = new db.crearDB("Economy");
let util = require("../utils/main.js")

let _cooling = new util.db.cooling()

exports.run = async (client, message, args) => {

  if (!MoneyDB.tiene(`${message.author.id}`))
    MoneyDB.establecer(`${message.author.id}`, { coins: 0 });

  let ruby = await MoneyDB.obtener(`${message.author.id}.coins`);
  
const db = require("megadb");
let VipDB = new db.crearDB("Vip");

  if(!VipDB.tiene(`${message.author.id}`))
      VipDB.establecer(`${message.author.id}`, {
        vip: 'No'
      })

const vip = await VipDB.obtener(`${message.author.id}.vip`);

  
  let user = message.author;

  let pesca = ["1", "2", "3", "4", "5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30","40","50","60","70","80","90","100"];

  let pescaresult = Math.floor(Math.random() * pesca.length);

var value = _cooling.find(message.author)// dbfunc.db.get('all').find({id: message.author.id}).value()

	if(value == undefined) {
		_cooling.new(message.author)
		message.reply(`Você não estava na minha DataBase de cowdon, use o comando novamente.`)
		return
	}

  /*if (talkedRecently.has(message.author.id)) {
    message.channel.send(
      `:x:| Espere 1 dia para poder usar o comando novamente! - ${message.author}`
    );
  }*/ 
  
if(value.daily !== null && timeout - (Date.now() - value.daily) > 0) {
		var time = ms(timeout - (Date.now() - value.daily))
		message.reply(`Você já coletou hoje! Aguarde mais **${time.hours}h ${time.minutes}m ${time.seconds}s**!`)
} else {
    let answer;
    try {
     // answer = pesca[pescaresult] * pesca[pescaresult] + 10
      if(vip == 'Yes') {
        answer = pesca[pescaresult] * pesca[pescaresult] *2+ 100
      } else {
        answer = pesca[pescaresult] * pesca[pescaresult] + 10
      }
      
      //math.evaluate(pesca[pescaresult] + " * 10");
    } catch (err) {
      return message.reply(`**Quantia inválida** ${err}`);
    }

    let perf = new Discord.MessageEmbed()
      .setColor("be41f4")
      .setThumbnail(message.author.avatarURL())
      //.setImage('https://media0.giphy.com/media/2HvoTVcuSOnS0/giphy.gif')
      .setDescription(
        "**" +
          message.author.tag +
          `** | Parabéns, Você pescou \`` +
          pesca[pescaresult] +
          ` pokémon(s) aquático(s)\`!! \nQuantia recebida pela venda dos pokémons: \`${answer} Panther-coins\``
      )
      .setTimestamp();
      
    message.channel.send(perf);
    MoneyDB.sumar(`${message.author.id}.coins`, answer);

/*dbfunc.db.get('all').find({id: message.author.id}).assign({
			daily: Date.now()
		}).write()*/
_cooling.add(message.author, Date.now())
  }
 /* talkedRecently.add(message.author.id);
  setTimeout(() => {
    // Removes the user from the set after a minute
    talkedRecently.delete(message.author.id);
  }, 86400000);*/
};
exports.help = {
  name:"daily",
  permisoes: "nenhuma",
  aliases: ["diaria","diária"],
  description: "PEGUE SEUS PANTHER-COINS DIÁRIOS!",
  usage: "daily"
}