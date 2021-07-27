const ms = require('ms');

exports.run = async (client, message, args) => {

    // If the member doesn't have enough permissions
    if(!message.member.hasPermission('MANAGE_MESSAGES') && !message.member.roles.cache.some((r) => r.name === "Giveaways")){
        return message.channel.send(':x: você não tem a permissão **MANAGE_MESSAGES** para iniciar um **Giveaway**!');
    }

    // Giveaway channel
    let giveawayChannel = message.mentions.channels.first();
    // If no channel is mentionned
    if(!giveawayChannel){
        return message.channel.send(':x: merciona um canal valido!!');
    }

    // Giveaway duration
    let giveawayDuration = args[1];
    // If the duration isn't valid
    if(!giveawayDuration || isNaN(ms(giveawayDuration))){
        return message.channel.send(':x: insira uma duração valida \n\`exenplos: 1m, 2h, 3d, 24h\`');
    }

    // Number of winners
    let giveawayNumberWinners = args[2];
    // If the specified number of winners is not a number
    if(isNaN(giveawayNumberWinners) || (parseInt(giveawayNumberWinners) <= 0)){
        return message.channel.send(':x: insira uma quantidade de ganhadores validos!');
    }

    // Giveaway prize
    let giveawayPrize = args.slice(3).join(' ');
    // If no prize is specified
    if(!giveawayPrize){
        return message.channel.send(':x: você precisa colocar um prêmio valido!');
    }

    // Start the giveaway
    client.giveawaysManager.start(giveawayChannel, {
        time: ms(giveawayDuration),
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
            timeRemaining: "Tempo restante: **{duration}**!",
            inviteToParticipate: "Reaja em 🎉 para participar!",
            winMessage: "PARABENS {winners}!, você(s) ganhou(ram) **{prize}**!",
            embedFooter: "Giveaways",
            noWinner: "Giveaway cancelado, não a participates válidos.",
            hostedBy: "hospedado por: {user}",
            winners: "ganhador(res)",
            endedAt: "finalizado",
            units: {
                seconds: "segundos",
                minutes: "minutos",
                hours: "horas",
                days: "dias",
                pluralS: false 
            }
        }
    });

    message.channel.send(`Giveaway iniciado em ${giveawayChannel}!`);

};

exports.help = {
  name: "gstart",
  permisoes: "{ADMINISTRATOR}",
  aliases: ["criarsorteio","giveaway"],
  description: "criar um sorteio em seu servidor\nexemplo:\n\`gstart #geral 1m 2 minecraft\`",
  usage: "gstart <canal> <tempo> <número de ganhadores> <premio>"
}