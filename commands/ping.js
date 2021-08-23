module.exports.run = async (client, message, args) => {
	let results = await client.cluster.broadcastEval("this.ws.ping");
	const m = await message.channel.send('ping?');

   m.edit(`🏓 **| Pong!** (cluster[**${client.cluster.id}**/**${client.cluster.count}**])\nLatência do Server: **${m.createdTimestamp -
      message.createdTimestamp}-ms.**\nLatência da API: **${Math.round(results.reduce((prev, val) => prev + val, 0))}-ms**`
  );
};
exports.help = {
  name:"ping",
  permisoes: "nenhuma",
  aliases: ["latencia"],
  description: "meu ping esta otimo?",
  usage: "ping"
}