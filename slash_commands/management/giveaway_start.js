let comando = require("../../frameworks/commando/command.js");
let Discord = require("discord.js"); 

let ms = require('ms');

class Command extends comando {
    constructor(...args) {
        super(...args, {
            name: "giveaway",
            description: "comandos de sorteios",
            category: "management",
            permissions: {
                user: ["MANAGE_MESSAGES"]
            },
            usage: "<sub comando>",
            subCommands: [
                {
                    name: "start",
                    description: "iniciar um sorteio no servidor!"
                },
                {
                    name: "end",
                    description: "finalizar um sorteio"
                },
                {
                    name: "reroll",
                    description: "[ 👩‍⚖️administração ] reiniciar um sorteio"
                }
            ],
            commandOptions: [
                {
                    type: 1,
                    name: "start",
                    description: "[ 👩‍⚖️administração ] iniciar um sorteio no servidor!",
                    options: [
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
                            description: 'O canal para iniciar o sorteio',
                            type: 7,
                            required: true
                        }
                    ]
                },
                {
                    type: 1,
                    name: "end",
                    description: "[ 👩‍⚖️administração ] finalizar um sorteio",
                    options: [
                        {
                            name: 'message_id',
                            description: "o sorteio a terminar (ID da mensagem)",
                            type: 3,
                            required: true
                        }
                    ]
                },
                {
                    type: 1,
                    name: "reroll",
                    description: "[ 👩‍⚖️administração ] reiniciar um sorteio",
                    options: [
                        {
                            name: 'message_id',
                            description: "o sorteio  a ser recaregada (ID da mensagem)",
                            type: 3,
                            required: true
                        }
                    ]
                }
            ]
        })
    }
    async interactionRun(interaction){
        await this[interaction.options.getSubcommand()](interaction)
    }
    async start(interaction){
        await interaction.deferReply({ ephemeral: true }).catch(() => {});

        let giveawayChannel = interaction.options.getChannel('channel');
        let giveawayDuration = interaction.options.getString('duration');
        let giveawayWinnerCount = interaction.options.getInteger('winners');
        let giveawayPrize = interaction.options.getString('prize');

        if(!giveawayChannel.isText()){
            return interaction.editReply({
                content: ':x:**|** O canal selecionado não é baseado em texto.',
                ephemeral: true
            })
        } else {
            this.client.giveawaysManager.start(giveawayChannel, {
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
                    winMessage: "PARABENS {winners}!\nvocê(s) ganhou(ram) **{this.prize}**!",
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
            
            interaction.editReply({
                content: `🔆**|** sorteio iniciado em ${giveawayChannel}!`
            });
            //
        }
    }
    async end(interaction){
        await interaction.deferReply({ ephemeral: true }).catch(() => {});
        
        let messageId = interaction.options.getString('message_id');
        
        this.client.giveawaysManager.end(messageId).then(() => {
            interaction.editReply({
                content: "✅**|** sucesso!\n sorteio finalizado!"
            })
        }).catch((err) => {
            interaction.editReply({
                content: `🚫**|** ocorreu um erro, verifique e tente novamente.\n\`${err}\` `
            })
        })
    }
    async reroll(interaction){
        await interaction.deferReply({ ephemeral: true }).catch(() => {});

        let messageId = interaction.options.getString('message_id');

        this.client.giveawaysManager.reroll(messageId, {
            messages: {
                congrat: ':tada:**|** novo(s) vencedor(es): {winners}! parabéns, você ganhou **{this.prize}**!\n{this.messageURL}',
                error: "nenhuma participação válida, nenhum novo(s) vencedor(es) pode(m) ser escolhido(s)!"
            }
        }).then(() => {
            interaction.editReply({
                content: "✅**|** sucesso!\n sorteio reiniciado!"
            })
        }).catch((err) => {
            interaction.editReply({
                content: `🚫**|** ocorreu um erro, verifique e tente novamente.\n\`${err}\` `
            })
        })
    }
} 

module.exports = Command 