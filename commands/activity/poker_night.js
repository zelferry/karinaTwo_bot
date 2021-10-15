const Discord = require("discord.js"); 

exports.run = async (client, message, args) => {
  if (!message.guild.me.permissions.has("CREATE_INSTANT_INVITE")) return message.reply({content:`<@${message.author.id}>, eu preciso da permissão **criar convites**!`});

  if(message.member.voice.channel) {
    let embed = new Discord.MessageEmbed();
    client.discordTogether.createTogetherCode(message.member.voice.channel.id, 'poker').then(async invite => {
      embed.setTitle("poker-night iniciado!");
      embed.setDescription(`iniciado o **poker-night** no **\`${message.member.voice.channel.name}\`**, agora você pode jogar com seus amigos no discord!\n> [clique aqui para entrar no canal de voz](${invite.code})!`);
      embed.setColor("#7289DA")
      message.reply({ embeds:[embed] })
    })
  } else {
    message.reply({content:"🚫**|** você precisa se conectar em um canal de voz primeiro!"})
  }
};
exports.config = {
    test: false
}
exports.help = {
  name: "poker-night",
  permisoes: "usuario: **nenhuma**\nbot: **criar convites**",
  aliases: ["pokervoice"],
  description: "jogar poker no discord usando o ***discord Games Lab***!",
  usage: "youtubetogether"
}