const Discord = require('discord.js');
const furryGay  = require("../database/imagens/furryPorn/furrygay.json");
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

let {pages} = require("../buttonSystem/init.js")

let button_2 = new pages.normal(message,client)

await button_2.buttonPages(furryGay)
};
exports.help = {
  name:"furry-gay",
  permisoes: "nenhuma",
  aliases: ["fg","gay-furry","furrygay"],
  description: "veja inagens furrys ||gays||",
  usage: "furry-gay"
}