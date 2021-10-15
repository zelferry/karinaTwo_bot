const ms = require('ms');

module.exports = {
    name:"start-giveaway",
    description: '《👩‍⚖️ administração》iniciar um sorteio',
    commandOptions: [
        {
            name: 'duration',
            description: 'Quanto tempo o sorteio deve durar. Valores de exemplo: 1m, 1h, 1d',
            type: 3,
            required: true
        },
        {
            name: 'winners',
            description: 'Quantos vencedores o sorteio deve ter?',
            type: 4,
            required: true
        },
        {
            name: 'prize',
            description: 'Qual deve ser o prêmio do sorteio?',
            type: 3,
            required: true
        },
        {
            name: 'channel',
            description: 'O canal para iniciar o sorteio em',
            type: 7,
            required: true
        }
    ],
    global: true,
    execute: async (interaction,client) => {
        if(!interaction.member.permissions.has('MANAGE_MESSAGES') && !interaction.member.roles.cache.some((r) => r.name === "Giveaways")){
            return interaction.reply({
                content: ':x:**|** Você precisa ter permissão para gerenciar mensagens para iniciar brindes.',
                ephemeral: true
            });
        }
    
        const giveawayChannel = interaction.options.getChannel('channel');
        const giveawayDuration = interaction.options.getString('duration');
        const giveawayWinnerCount = interaction.options.getInteger('winners');
        const giveawayPrize = interaction.options.getString('prize');
        
        if(!giveawayChannel.isText()) {
            return interaction.reply({
                content: ':x:**|** O canal selecionado não é baseado em texto.',
                ephemeral: true
            });
        }
    
        // Start the giveaway
        /*client.giveawaysManager.start(giveawayChannel, {
            // The giveaway duration
            duration: ms(giveawayDuration),
            // The giveaway prize
            prize: giveawayPrize,
            // The giveaway winner count
            winnerCount: giveawayWinnerCount,
            // Who hosts this giveaway
            hostedBy: client.config.hostedBy ?  : null,
            // Messages
            messages
        });*/
        client.giveawaysManager.start(giveawayChannel, {
        duration: ms(giveawayDuration),
        prize: giveawayPrize,
        winnerCount: giveawayWinnerCount,
        hostedBy: interaction.user,
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

    
        interaction.reply(`sorteio iniciado em ${giveawayChannel}!`);
    
    } 

};