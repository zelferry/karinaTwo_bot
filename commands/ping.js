module.exports.run = async (client, message, args) => {
  const m = await message.channel.send('ping?');

   m.edit(`🏓 **| Pong!**\nLatência do Server: **${m.createdTimestamp -
      message.createdTimestamp}-ms.**\nLatência da API: **${Math.round(client.ws.ping)}-ms**`
  );
};
exports.help = {
  name:"ping",
  permisoes: "nenhuma",
  aliases: ["latencia"],
  description: "meu ping esta otimo?",
  usage: "ping"
}