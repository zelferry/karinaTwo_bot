let Discord = require("discord.js");

const fetch = require('node-fetch')

exports.run = async (client, message, args) => {
	
	if(args.length <= 0 || !args.length){
		message.channel.send("❌ | insira sua PESQUISA!")
	}
	
	const search = args.join('_');

        const searchword = encodeURI(search)

        const res = await fetch("https://pt.wikipedia.org/api/rest_v1/page/summary/" + searchword);
        const data = await res.json();

        const title = data.title;
        const text = data.extract || "Não foi possível recuperar nenhum resultado. Tente pesquisar com distinção entre maiúsculas e minúsculas.";

        let thumbnail = data.originalimage ? data.originalimage.source : null 
        let url = data.content_urls ? data.content_urls.desktop.page : null

        const embed = new Discord.MessageEmbed()
            .setColor(`#00b140`)
            .setTitle(title)
            .setURL(url)
            .setThumbnail(thumbnail)
            .setDescription(text)
            .setFooter("Powered by Wikipedia", "https://i.ibb.co/VWvCzg1/wikipedia.png")
message.channel.send(embed)
	
}

exports.help = {
  name:"wiki",
  permisoes: "nenhuma",
  aliases: ["wikipedia","dicionario"],
  description: "pesquise algo na Wikipédia!",
  usage: "wiki <texto>"
}