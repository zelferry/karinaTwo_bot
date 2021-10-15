const Discord = require('discord.js')

exports.run = async (client, message, args) => {
	if(!message.member.permissions.has("MANAGE_CHANNELS")){
		return	message.reply("🚫**|** Você não tem permissão para executar esse comando! Permissão necessária: `gerenciar canais de texto`");
		
	}else if(!message.guild.me.permissions.has("MANAGE_CHANNELS")){
		return	message.reply({content:"🚫**|** eu não tenho permissão para executar esse comando! Permissão necessária: `gerenciar canais de texto`"});

	}else{
	let Slowmode = args[0]

	if(!Slowmode) return message.reply({content:"🚫| insira um número!"})
	
	if(!parseInt(Slowmode)) return message.reply({content:"🚫**|** insira um número valido!"})

    //message.channel.setRateLimitPerUser(Slowmode)
    message.channel.edit({rateLimitPerUser:Slowmode})
    message.reply({content:`🕥**|** o tempo do Slowmode alterado com sucesso para **${Slowmode} segundos**!`})
		
	}
}
exports.config = {
    test: false
}
exports.help = {
    name: 'slowmode',
    aliases: ['slow'],
    permisoes: "gerenciar canais de texto",
    description: "definit o \"slowmode\" no canal de texto",
    usage: "slowmode <número>"
}