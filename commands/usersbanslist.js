const Discord = require("discord.js")
const config = require("../config.js")/*
const dbfunc = require("../KariModules/ban.js")
const dblow = dbfunc.dblow
*/
exports.run = async (client, message, args) => {
	message.reply(":x:| comando na manutenção...")

 
	/*
  
  let estbf = new Discord.MessageEmbed()

	var array = dblow.__wrapped__.all
	array.sort(function(a, b) { return b.id - a.id })

	if(config.topMax > 25) return new Error(`CONFIG ERROR: config.topMax nao pode passar de 25`)
	
	for(var i = 0; i < config.topMax; i++) {
		var d = array[i] //Dados da pessoa na DataBase
		var next = array[i + 1] //Próxima pessoa
      var nick = d.id
        if(nick == undefined) { nick = "inexistente"}
        
	const editado = `numero do ID **${i + 1}º** \nnick: <@${nick}> \nID: **${nick}**\nmotivo: **${d.motiv}**`
	
     if(!next){ i = 99 }
      estbf.addField(`----------`,`${editado}`)
	}
	message.channel.send(estbf)*/
}
exports.help = {
  name:"userbanslist",
  permisoes:"ser um dos meus criadores",
  aliases: [],
  description: "lista de usuarioa banidos de usar meus comandos",
  usage: "userbanlist"
}