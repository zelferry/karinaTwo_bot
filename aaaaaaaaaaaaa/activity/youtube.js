const Discord = require("discord.js"); 

exports.run = async (client, message, args) => {
  if (!message.guild.me.hasPermission("CREATE_INSTANT_INVITE")) return message.inlineReply(`<@${message.author.id}>, eu preciso da permissão **criar convites**!`);
  if(message.member.voice.channel) {
    let embed = new Discord.MessageEmbed();
    client.discordTogether.createTogetherCode(message.member.voice.channelID, 'youtube').then(async invite => {
      embed.setTitle("YouTube Together iniciado!");
      embed.setDescription(`iniciado o **YouTube Together** no **\`${message.member.voice.channel.name}\`**, agora você pode escutar suas músicas e vídeos também direto do YT para o discord!\n> [clique aqui para entrar no canal de voz](${invite.code})!`);
      embed.setColor("#7289DA")
      message.inlineReply(embed)
    })
  } else {
    message.inlineReply("🚫**|** você precisa se conectar em um canal de voz primeiro!")
  }
};
exports.help = {
  name: "youtubetogether",
  permisoes: "usuario: **nenhuma**\nbot: **criar convites**",
  aliases: ["youtube","yttg"],
  description: "escutar musicas e ver videos com seus amigos em canais de voz usando o ***discord Games Lab***!",
  usage: "youtubetogether"
}