let Discord = require('discord.js');
let ne = require('nekos.life');
let neko = new ne();
const disbut = require('discord-buttons');

exports.run = async (client, message, args) => {
  if (!message.channel.nsfw) return client.extra.utils.message.noNsfw(client, message);
  let button_ = new disbut.MessageButton().setStyle('url').setURL('https://nekos.life/').setLabel('ver website original!');
  let arr_2 = await neko.nsfw.trap()
  let button_2 = new disbut.MessageButton().setStyle('url').setURL(arr_2.url).setLabel('ver imagem na web');
  let row1 = new disbut.MessageActionRow().addComponent(button_);

  row1.addComponent(button_2);
  
  const embed_2 = new Discord.MessageEmbed().setImage(arr_2.url).setColor("#7B68EE");
	message.channel.send(embed_2,row1)
}
exports.help = {
  name:"trap-nsfw",
  permisoes: "nenhuma",
  aliases: ["nsfwtrap","tn"],
  description: "||nsfw de... femboy?||",
  usage: "trap-nsfw"
}