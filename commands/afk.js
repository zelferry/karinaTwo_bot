const Discord = require("discord.js");
let util = require("../utils/main.js")
let db_afk = new util.db.afk()

exports.run = async (client, message, args) => {
	
	let content = args.length > 0 ? args.join(" ") : "fora no momento"
	
	
var value = db_afk.find(message.author)

if(value == undefined) {
		db_afk.new(message.author, content, Date.now())
		
     message.channel.send("💤| afk ativado! \nos usuários irão saber que você esta "+content+"\n\npara sua conivência, eu irei desativar o seu afk quando você falar algo no chat! 😉")

		return
	}
if(db_afk.find(message.author) !== undefined) return message.channel.send(`:x:| você ja esta com o afk ativo!`)
 
	/*
  let afk = new (require("megadb")).crearDB("afk")
  
  if (!afk.tiene(`${message.guild.id}.${message.author.id}`)) return message.channel.send("não encontrei seus dados na database\nuse o  comando novamente!") && afk.establecer(`${message.guild.id}.${message.author.id}`,{})
  
        let razon = args.join(" ")
		if(!razon) return message.channel.send("adicione um motivo para o afk!")
		afk.establecer(`${message.guild.id}.${message.author.id}.reason`, razon)
		afk.establecer(`${message.guild.id}.${message.author.id}.id`, message.author.id)
     message.channel.send("💤| afk ativado! \nos usuários irão saber que você esta "+razon, {allowedMentions: {parse: []}}+"\n\npara sua conivência, eu irei desativar o seu afk quando você falar algo no chat! 😉")*/
}
exports.help = {
  name: "afk",
  permisoes: "nenhuma",
  aliases: ["awayfromthekeyboard"],
  description: "ative o modo afk para os usuários saberem que você deu um tempo no teclado!",
  usage: "afk <texto>"
}