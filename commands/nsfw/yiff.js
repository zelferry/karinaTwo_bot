var yiff = require("yiff_api")
var Discord = require("discord.js")
 
var data_2 = ["gay","straight","lesbian","synormorph","bulge","andromorph"]

var yiff_ = new yiff.yiff()

exports.run = async (client, message, args) => {
	if (!message.channel.nsfw) return client.extra.utils.message.noNsfw(client, message)

	let data = args[0]
	if(!data_2.includes(data)){
	
	let text = data_2.map(x => `\`${x}\``).slice(0, -1).join(", ") + ` e \`${data_2[data_2.length -1]}\``
	
		message.reply({content:":x: | usso inválido\nas tags disponíveis são: "+text+""})
	} else {
		
	var json = await yiff_[`${data}`]()
	
	let embed = new Discord.MessageEmbed().setImage(json.url).setColor("#7B68EE").setDescription([					`[[ShortURL]](${json.shortURL})`,					`[[Reporta imagem?]](${json.reportURL})`,					`${!json.sources || json.sources.length === 0 || !json.sources[0] ? `[sem source]` : `[[source]](${json.sources[0]})`}`].join("\n"))
        message.reply({embeds:[embed]})
	}
}
exports.config = {
    test: false
}
exports.help = {
  name:"yiff",
  permisoes: "nenhuma",
  aliases: [],
  description: "veja ||yiff|| 7-7",
  usage: "yiff <"+data_2.map(x => `${x}`).slice(0, -1).join(", ") + " ou " + data_2[data_2.length -1]+">"
}