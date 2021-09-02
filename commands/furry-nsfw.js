const Discord = require('discord.js');
const furryNsfw = require("../database/imagens/furryPorn/furrynsfw.json");
//const db = require("megadb");

//et VipDB = new db.crearDB("Vip");

module.exports.run = async (client, message, args) => {
  /*
if(!VipDB.tiene(`${message.author.id}`))
      VipDB.establecer(`${message.author.id}`, {
        vip: 'No'
      })

  const vip = await VipDB.obtener(`${message.author.id}.vip`);

if(vip == 'No') return message.channel.send(`:x: |apenas para usuários **vips** :v`);
  */
  
if (!message.channel.nsfw) return client.extra.utils.message.noNsfw(client, message)

/*
  var randGay = furryNsfw[Math.floor(Math.random() * furryNsfw.length)];

const embed = new Discord.MessageEmbed()
     .setImage(randGay)
     .setColor("#7B68EE")
    message.channel.send(embed);
*/

let {pages} = require("../buttonSystem/init.js")

let button_2 = new pages.normal(message,client)
await button_2.buttonPages(furryNsfw)

};
exports.help = {
  name:"furry-nsfw",
  permisoes: "nenhuma",
  aliases: ["fn","nsfw-furry"],
  description: "veja inagens furrys ||nsfw||",
  usage: "furry-nsfw"
}