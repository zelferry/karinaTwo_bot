module.exports.run = async (client, message, args) => {
	let results = await client.cluster.broadcastEval((c) => c.ws.ping);
	const m = await message.reply({content:'ping?'});

   m.edit({content: `🏓 **| Pong!** (cluster[**${client.cluster.id}**/**${client.cluster.info.CLUSTER_COUNT}**])\nLatência do Server: **${m.createdTimestamp -
      message.createdTimestamp}-ms.**\nLatência da API: **${Math.round(results.reduce((prev, val) => prev + val, 0))}-ms**`});
};
exports.config = {
    test: false
}
exports.help = {
  name:"ping",
  permisoes: "nenhuma",
  aliases: ["latencia"],
  description: "meu ping esta otimo?",
  usage: "ping"
}