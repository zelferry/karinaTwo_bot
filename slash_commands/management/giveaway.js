let comando = require("../../frameworks/commando/command.js");
let Discord = require("discord.js"); 

let ms = require('ms');

class Command extends comando {
    constructor(...args) {
        super(...args, {
            name: "giveaway",
            description: "sweepstakes commands",
            category: "management",
            permissions: {
                user: ["MANAGE_MESSAGES"],
                bot: ["ADMINISTRATOR"]
            },
            commandOptions: [
                {
                    type: 1,
                    name: "start",
                    description: "[ 👩‍⚖️management ] start a giveaway on the server!",
                    options: [
                        {
                            name: 'duration',
                            description: 'How long the draw should last. Example values: 1m, 1h, 1d',
                            type: 3,
                            required: true
                        },
                        {
                            name: 'winners',
                            description: 'How many winners should the lottery have?',
                            type: 4,
                            required: true
                        },
                        {
                            name: 'prize',
                            description: 'What should be the prize of the draw?',
                            type: 3,
                            required: true
                        },
                        {
                            name: 'channel',
                            description: 'the channel to start the draw on the server',
                            channelTypes: ['GUILD_TEXT'],
                            type: 7,
                            required: true
                        }
                    ]
                },
                {
                    type: 1,
                    name: "end",
                    description: "[ 👩‍⚖️management ] finalize a draw",
                    options: [
                        {
                            name: 'message_id',
                            description: "the draw to end (message ID)",
                            type: 3,
                            required: true
                        }
                    ]
                },
                {
                    type: 1,
                    name: "reroll",
                    description: "[ 👩‍⚖️management ] restart a draw",
                    options: [
                        {
                            name: 'message_id',
                            description: "the draw to be reloaded (message ID)",
                            type: 3,
                            required: true
                        }
                    ]
                }
            ]
        })
    }
    async interactionRun(interaction, t){
        await this[interaction.options.getSubcommand()](interaction, t)
    }
    
    async start(interaction, t){
        await interaction.deferReply({ ephemeral: true }).catch(() => {});

        let giveawayChannel = interaction.options.getChannel('channel');
        let giveawayDuration = interaction.options.getString('duration');
        let giveawayWinnerCount = interaction.options.getInteger('winners');
        let giveawayPrize = interaction.options.getString('prize');

        if(!giveawayChannel.isText()){
            return interaction.editReply({
                content: t("commands:giveaway.start.error.no_channel"),
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
                content: t("commands:giveaway.start.success", { giveawayChannel_ : (giveawayChannel.id).toString() })
            });
            //
        }
    }
    async end(interaction, t){
        await interaction.deferReply({ ephemeral: true }).catch(() => {});
        
        let messageId = interaction.options.getString('message_id');
        
        this.client.giveawaysManager.end(messageId).then(() => {
            interaction.editReply({
                content: t("commands:giveaway.end.success")
            })
        }).catch((err) => {
            interaction.editReply({
                content: t("commands:global.error.commands", { error: err })
            })
        })
    }
    async reroll(interaction, t){
        await interaction.deferReply({ ephemeral: true }).catch(() => {});

        let messageId = interaction.options.getString('message_id');

        this.client.giveawaysManager.reroll(messageId, {
            messages: {
                congrat: ':tada:**|** novo(s) vencedor(es): {winners}! parabéns, você ganhou **{this.prize}**!\n{this.messageURL}',
                error: "nenhuma participação válida, nenhum novo(s) vencedor(es) pode(m) ser escolhido(s)!"
            }
        }).then(() => {
            interaction.editReply({
                content: t("commands:giveaway.reroll.success")
            })
        }).catch((err) => {
            interaction.editReply({
                content: t("commands:global.error.commands", { error: err })
            })
        })
    }

    command_info(){
        return {
            activated: true,
            pt: {
                name: "giveaway",
                description: "comandos para realizar sorteios em seu servidor!",
                permissions: {
                    bot: ["ADMINISTRATOR"],
                    user: ["MANAGE_MESSAGES"]
                },
                category: "administração",
                usage: "<sub comando>",
                subCommands: [
                    {
                        name: "start",
                        description: "iniciar o sorteio"
                    },
                    {
                        name: "end",
                        description: "finalizar o sorteio"
                    },
                    {
                        name: "reroll",
                        description:"reiniciar um sorteio"
                    }
                ]
            },
            en: {
                name: "giveaway",
                description: "commands to perform sweepstakes on your server!",
                permissions: {
                    bot: ["ADMINISTRATOR"],
                    user: ["MANAGE_MESSAGES"]
                },
                category: "management",
                usage: "<sub command>",
                subCommands: [
                    {
                        name: "start",
                        description: "start the draw"
                    },
                    {
                        name: "end",
                        description: "finalize the draw"
                    },
                    {
                        name: "reroll",
                        description: "restart a draw"
                    }
                ]
            }
        }
    }

    _permissions(){
        return {
            "pt-BR": {
                bot: "🚫**|** eu não tenho permissões o suficiente para isso!\n💡**|** eu preciso das seguintes permissões: `administrador`",
                user: "🚫**|** você não tem permissões o suficiente para isso!\n💡**|** você precisa das seguintes permissões: `gerenciar mensagens`"
            },
            "en-US": {
                bot: "🚫**|** I don't have enough permissions for that!\n💡**|** I need the following permissions: `administrator`",
                user: "🚫**|** you don't have enough permissions for that!\n💡**|** you need the following permissions: `manage messages`"
            }
        }
    }
} 

module.exports = Command 