let Discord = require("discord.js");

const fetch = require('node-fetch')

const disbut = require('discord-buttons');

/*

const disbut = require('discord-buttons');

let button_ = new disbut.MessageButton()
  .setStyle('url')
  .setURL('https://npmjs.com/discord-buttons') 
  .setLabel('My First URL Button!') 
 
let button = new disbut.MessageButton().setStyle('red').setLabel('My First Button!').setID('click_to_function') 

//.setDisabled();
let row1 = new disbut.MessageActionRow()
    .addComponent(button).addComponent(button_)

*/
exports.run = async (client, message, args) => {
	
	if(args.length <= 0 || !args.length){
		message.channel.send("❌ | insira sua PESQUISA!")
	}
	
	const search = args.join('_');

        const searchword = encodeURI(search)

        const res = await fetch("https://pt.wikipedia.org/api/rest_v1/page/summary/" + searchword);
        const data = await res.json();
//onsole.log(data)
        const title = data.title;
        const text = data.extract || "Não foi possível recuperar nenhum resultado. Tente pesquisar com distinção entre maiúsculas e minúsculas.";

        let thumbnail = data.originalimage ? data.originalimage.source : null 
        let url = data.content_urls ? data.content_urls.desktop.page : null
        let button_ = new disbut.MessageButton().setStyle('url').setURL(url ? url:"https://pt.wikipedia.org/").setLabel('ver mais na web') 
        if(url == null) button_.setDisabled()

        const embed = new Discord.MessageEmbed()
            .setColor(`#00b140`)
            .setTitle(title)
            .setURL(url)
            .setThumbnail(thumbnail)
            .setDescription(text)
            .setFooter("Powered by Wikipedia", "https://i.ibb.co/VWvCzg1/wikipedia.png")
message.channel.send(embed,button_)
	
}

exports.help = {
  name:"wiki",
  permisoes: "nenhuma",
  aliases: ["wikipedia","dicionario"],
  description: "pesquise algo na Wikipédia!",
  usage: "wiki <texto>"
}