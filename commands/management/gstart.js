const ms = require('ms');

exports.run = async (client, message, args) => {
    if(!message.member.permissions.has('MANAGE_MESSAGES') && !message.member.roles.cache.some((r) => r.name === "Giveaways")){
        return message.reply({content:':x:**|** você não tem a permissão **MANAGE_MESSAGES** para iniciar um **Giveaway**!'});
    }

    let giveawayChannel = message.mentions.channels.first();

    if(!giveawayChannel){
        return message.reply({content:':x:**|** merciona um canal valido!!'});
    }

    let giveawayDuration = args[1];

    if(!giveawayDuration || isNaN(ms(giveawayDuration))){
        return message.reply({content:':x:**|** insira uma duração valida \n\`exenplos: 1m, 2h, 3d, 24h\`'});
    }

 
    let giveawayNumberWinners = args[2];

    if(isNaN(giveawayNumberWinners) || (parseInt(giveawayNumberWinners) <= 0)){
        return message.reply({content:':x:**|** insira uma quantidade de ganhadores validos!'});
    }

    let giveawayPrize = args.slice(3).join(' ');
 
    if(!giveawayPrize){
        return message.reply({content:':x: você precisa colocar um prêmio valido!'});
    }

    client.giveawaysManager.start(giveawayChannel, {
        duration: ms(giveawayDuration),
        prize: giveawayPrize,
        winnerCount: parseInt(giveawayNumberWinners),
        hostedBy: message.author,
        lastChance: {
        	enabled: true,
        	content: '⚠️ **ULTIMA CHANCE!** ⚠️',
        	threshold: 9000,
        	embedColor: '#FF0000'
        },
        messages: {
            giveaway: "🎉 GIVEAWAY 🎉",
            giveawayEnded: "🎉 GIVEAWAY finalizado 🎉",
            drawing: "Tempo restante: **{timestamp}**!",
            inviteToParticipate: "Reaja em 🎉 para participar!",
            winMessage: "PARABENS {winners}!, você(s) ganhou(ram) **{this.prize}**!",
            embedFooter: "{this.winnerCount} ganhadores",
            noWinner: "Giveaway cancelado, não a participates válidos.",
            hostedBy: "hospedado por: {this.hostedBy}",
            winners: "ganhador(res)",
            endedAt: "finalizado",
            units: {
                seconds: "segundos",
                minutes: "minutos",
                hours: "horas",
                days: "dias",
                pluralS: true 
            }
        }
    });

    message.channel.send({content: `Giveaway iniciado em <#${giveawayChannel.id}>!`});

};
exports.config = {
    test: false
}
exports.help = {
  name: "gstart",
  permisoes: "administrador",
  aliases: ["criarsorteio","giveaway"],
  description: "criar um sorteio em seu servidor\nexemplo:\n\`gstart #geral 1m 2 minecraft\`",
  usage: "gstart <canal> <tempo> <número de ganhadores> <premio>"
}