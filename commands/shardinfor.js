const Discord = require("discord.js");

exports.run = async (client, message, args) => {
const embed = new Discord.MessageEmbed().setColor('#FF00FF')
			.setAuthor(message.author.username, message.author.displayAvatarURL(), message.author.displayAvatarURL());
		const shardArray = await message.client.shard.fetchClientValues('shard.client.guilds');
		const shardStatus = await message.client.shard.fetchClientValues('shard.mode');
		const shardPings = await message.client.shard.fetchClientValues('shard.client.ws.ping');
		let totalMembers = 0;
		let totalGuilds = 0;
		let totalChannels = 0;
		let pings = [];
		for (let i = 0; i < shardArray.length; i++) {
			let members = 0;
			let guilds = 0;
			let channels = 0;
			let ping = 0;
			for (let j = 0; j < shardArray[i].length; j++) {
				members += shardArray[i][j].memberCount;
				totalMembers += shardArray[i][j].memberCount;
				channels += shardArray[i][j].channels.length;
				totalChannels += shardArray[i][j].channels.length;
				guilds++;
				totalGuilds++;
			}
			ping = shardPings[i];
			pings.push(ping.toFixed(0));
			const status = shardStatus[i] === 'process' ? "[online]" : "[offline]";
			embed.addField(`${status}\nShard ${i}`, `${members} usuários\n${guilds} servidores\n${channels} canais\n${ping.toFixed(0)} ms`, true);
		}
		const avgShardPing = (pings.reduce((a, ping) => a + ping, 0) / pings.length).toFixed(0);
		embed.addField('Total', `${totalGuilds} servidores\n${totalMembers} usuários\n${totalChannels} canais`)
			.setFooter(`Avg Ping: ${avgShardPing} ms`);
		message.channel.send(embed);
}

exports.help = {
  name:"shardinfor",
  permisoes: "nenhuma",
  aliases: ["sh","shardind"],
  description: "informações sobre os shards",
  usage: "shardinfor"
}
