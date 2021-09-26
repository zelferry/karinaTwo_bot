const Discord = require('discord.js')

exports.run = async (client, message, args) => {
	if(!message.guild.member(message.author).hasPermission("MANAGE_CHANNELS")){
		return	message.channel.send("🚫 | Você não tem permissão para executar esse comando! Permissão necessária: `gerenciar canais de texto`");
		
	}else if(!message.guild.me.hasPermission("MANAGE_CHANNELS")){
		return	message.channel.send("🚫 | eu não tenho permissão para executar esse comando! Permissão necessária: `gerenciar canais de texto`");

	}else{
	let Slowmode = args[0]

	if(!Slowmode) return message.channel.send("🚫| insira um número!")
	
	if(!parseInt(Slowmode)) return message.channel.send("🚫| insira um número valido!")

    //message.channel.setRateLimitPerUser(Slowmode)
    message.channel.edit({rateLimitPerUser:Slowmode})
    message.channel.send(`🕥| o tempo do Slowmode alterado com sucesso para ${Slowmode} segundos!`)
		
	}
}

exports.help = {
    name: 'slowmode',
    aliases: ['slow'],
    permisoes: "gerenciar canais de texto",
    description: "definit o \"slowmode\" no canal de texto",
    usage: "slowmode <número>"
}