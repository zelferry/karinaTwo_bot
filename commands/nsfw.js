const Discord = require('discord.js');
const listNsfw = require("../database/imagens/Nsfwa.json")

//const db = require("megadb");

//let VipDB = new db.crearDB("Vip");

module.exports.run = async (client, message, args) => {
/*
if(!VipDB.tiene(`${message.author.id}`))
      VipDB.establecer(`${message.author.id}`, {
        vip: 'No'
      })

  const vip = await VipDB.obtener(`${message.author.id}.vip`);

if(vip == 'No') return message.channel.send(`:x: |apenas para usuários **vips**`);
  
*/
const aff = message.guild.channels.cache.filter((channel) => channel.nsfw).map(x => "<#"+x.id+">" ).join(",")

 let teste;

if(aff){teste = `tente usar novamente em ${aff}`}else{teste = "este servidor não tem nenhum canal de texto com a função NSFW ativada :("}
  
if (!message.channel.nsfw) return message.channel.send(":x:|o canal não tem a função NSFW ativada, "+teste+"");

/*
var randNsfw = listNsfw[Math.floor(Math.random() * listNsfw.length)];

const embed = new Discord.MessageEmbed().setImage(randNsfw);
   message.channel.send(embed);
  */
  
let {pages} = require("../buttonSystem/init.js")

let button_2 = new pages.normal(message,client)
await button_2.buttonPages(listNsfw)

};
exports.help = {
  name:"nsfw",
  permisoes: "nenhuma",
  aliases: ["hentai"],
  description: "veja imagens ||nsfw||",
  usage: "nsfw"
}