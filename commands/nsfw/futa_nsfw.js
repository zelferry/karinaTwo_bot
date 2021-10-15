let Discord = require('discord.js');
let ne = require('nekos.life');
let neko = new ne();
const disbut = Discord

exports.run = async (client, message, args) => {
  if (!message.channel.nsfw) return client.extra.utils.message.noNsfw(client, message);
  let button_ = new disbut.MessageButton().setStyle('LINK').setURL('https://nekos.life/').setLabel('ver website original!');
  let arr_2 = await neko.nsfw.futanari()
  let button_2 = new disbut.MessageButton().setStyle('LINK').setURL(arr_2.url).setLabel('ver imagem na web');
  let row1 = new disbut.MessageActionRow().addComponents(button_,button_2);

  
  const embed_2 = new Discord.MessageEmbed().setImage(arr_2.url).setColor("#7B68EE");
    message.reply({
        embeds:[embed_2],
        components:[row1]
    })
}
exports.config = {
    test: false
}
exports.help = {
  name:"futa-nsfw",
  permisoes: "nenhuma",
  aliases: ["gynomorphNsfw","futa","intersexNsfw"],
  description: "||nsfw de... futa?||",
  usage: "futa-nsfw"
}