let endpoints ={
"mekos":{
	"sfw":["tickle","slap","poke","pat","neko","meow","lizard","kiss","hug","foxGirl","feed","cuddle","nekoGif","kemonomimi","holo","smug","baka","woof","spoiler","wallpaper","goose","gecg","avatar","waifu"],
	"nsfw":["pussy","neko","lesbian","kuni","cumsluts","classic","boobs","bJ","anal","avatar","yuri","trap","tits","girlSolo","pussyArt","kemonomimi","kitsune","keta","holo","holoEro","hentai","futanari","femdom","eroFeet","feet","ero","eroKitsune","eroKemonomimi","eroNeko","eroYuri","cumArts","blowJob","spank","gasm"]
}
}


const ne = require('nekos.life');
const neko = new ne();


const disbut = require('discord-buttons');


const Discord = require('discord.js')
exports.run = async (client, message, args) => {
	let args_1_1 = args[0]
	let args_1_2 = args[1]
	
	let button_ = new disbut.MessageButton().setStyle('url').setURL('https://nekos.life/').setLabel('ver website original!') 
	
	let row1 = new disbut.MessageActionRow().addComponent(button_)

	let {sfw,nsfw} = endpoints.mekos
	
let {prefix} = require("../../mongoDB/ini.js").guild 

    let prefixoAtual = await prefix.findPrefix(message.guild,message,false)
	
	
	function errMessage(input) {
		if(input == "global"){
			
			message.channel.send(new Discord.MessageEmbed().setTitle("usso inválido").setDescription("como usar?:\n\nmodo de usso: `"+prefixoAtual+"nekos <sfw,nsfw> <tag>`\n\nexenplos:\n`"+prefixoAtual+"nekos sfw meow`\n`"+prefixoAtual+"nekos nsfw kuni`").addFields({
   name: "tags sfw",
   value: `${sfw.map((x) => `\`${x}\``).join(", ")}`
}).addFields({
   name: "tags nsfw",
   value: `${nsfw.map((x) => `\`${x}\``).join(", ")}`
}))
		}
		if(input == "sfw_input"){
			message.channel.send(new Discord.MessageEmbed().setTitle("usso inválido").setDescription("como usar?:\n\nmodo de usso: `"+prefixoAtual+"nekos <sfw,nsfw> <tag>`\n\nexenplos:\n`"+prefixoAtual+"nekos sfw meow`").addFields({
   name: "tags sfw",
   value: `${sfw.map((x) => `\`${x}\``).join(", ")}`
}))

		}
		if(input == "nsfw_input"){
			message.channel.send(new Discord.MessageEmbed().setTitle("usso inválido").setDescription("como usar?:\n\nmodo de usso: `"+prefixoAtual+"nekos <sfw,nsfw> <tag>`\n\nexenplos:\n`"+prefixoAtual+"nekos nsfw kuni`").addFields({
   name: "tags nsfw",
   value: `${nsfw.map((x) => `\`${x}\``).join(", ")}`
}))
		}
	}
	
	if(["nsfw","sfw"].includes(args_1_1)){
		if(args_1_1 == "sfw"){
			if(sfw.includes(args_1_2)){
				let arr_1 = await neko.sfw[args_1_2]();
                                               if(!arr_1.url) return message.inlineReply("😥**|** desculpa, mas parece que a imagem não existe ou esta corrompida :(")
				let button_1 = new disbut.MessageButton().setStyle('url').setURL(arr_1.url).setLabel('baixar imagem...') 

				row1.addComponent(button_1)
			
				const embed_1 = new Discord.MessageEmbed().setImage(arr_1.url).setColor("#FA8072")
				
				message.channel.send(embed_1,row1)
				
			} else errMessage("sfw_input")
		}
		if(args_1_1 == "nsfw"){
			if(nsfw.includes(args_1_2)){
				let arr_2 = await neko.nsfw[args_1_2]()
				if (!message.channel.nsfw) return client.extra.utils.message.noNsfw(client, message)
				let button_2 = new disbut.MessageButton().setStyle('url').setURL(arr_2.url).setLabel('baixar imagem...') 

				row1.addComponent(button_2)
				
				const embed_2 = new Discord.MessageEmbed().setImage(arr_2.url).setColor("#7B68EE")
				
				message.channel.send(embed_2,row1)

			} else errMessage("nsfw_input")
		}
	} else errMessage("global")
}
exports.help = {
  name:"nekos",
  permisoes: "nenhuma",
  aliases: ["nekosLife","nekosSearching","nl"],
  description: "pesquisar algo na [nekos.life](https://nekos.life)\no comando tem dupla função, comando __nsfw__ e comando __micaela__",
  usage: "nekos <sfw, nsfw> <tag>"
}