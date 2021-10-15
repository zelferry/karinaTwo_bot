const Discord = require('discord.js');
const furryGay  = require("../../database/imagens/furryPorn/furryFuta.json");
//const db = require("megadb");

//et VipDB = new db.crearDB("Vip");

module.exports.run = async (client, message, args) => {
  /*
is para usuários **vips** :v`);
*/
    if (!message.channel.nsfw) return client.extra.utils.message.noNsfw(client, message)

let {pages} = require("../../buttonSystem/init.js")

let button_2 = new pages.normal(message,client)

await button_2.buttonPages(furryGay)
};
exports.config = {
    test: false
}
exports.help = {
  name:"furry-gynomorph",
  permisoes: "nenhuma",
  aliases: ["gynomorph-furry","furrygynomorph"],
  description: "veja inagens furrys ||gynomorph||",
  usage: "furry-gynomorph"
}