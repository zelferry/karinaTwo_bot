var yiff = require("yiff_api")
var Discord = require("discord.js")
 
var data_2 = ["gay","straight","lesbian","synormorph","bulge","andromorph"]

var yiff_ = new yiff.yiff()

exports.run = async (client, message, args) => {
	const aff = message.guild.channels.cache.filter((channel) => channel.nsfw).map(x => "<#"+x.id+">" ).join(",")
	
	let teste;
	
	if(aff){
		teste = `tente usar novamente em ${aff}`
	}else{
		teste = "este servidor não tem nenhum canal de texto com a função NSFW ativada :("
	}
  
  if (!message.channel.nsfw) return message.channel.send(":x:|o canal não tem a função NSFW ativada, "+teste+"");

	let data = args[0]
	if(!data_2.includes(data)){
	
	let text = data_2.map(x => `\`${x}\``).slice(0, -1).join(", ") + ` e \`${data_2[data_2.length -1]}\``
	
		message.channel.send(":x: | usso inválido\nas tags disponíveis são: "+text+"")
	} else {
		
	var json = await yiff_[`${data}`]()
	
	let embed = new Discord.MessageEmbed().setImage(json.url).setColor("#7B68EE").setDescription([					`[[ShortURL]](${json.shortURL})`,					`[[ReportURL]](${json.reportURL})`,					`${!json.sources || json.sources.length === 0 || !json.sources[0] ? `[NoSource]` : `[[source]](${json.sources[0]})`}`				].join("\n"))
	
	message.channel.send(embed)

	}
}

exports.help = {
  name:"yiff",
  permisoes: "nenhuma",
  aliases:[],
  description: "veja ||yiff|| 7-7",
  usage: "yiff <"+data_2.map(x => `${x}`).slice(0, -1).join(", ") + " ou " + data_2[data_2.length -1]+">"
}