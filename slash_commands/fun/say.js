let comando = require("../../frameworks/commando/command.js");
let Discord = require("discord.js"); 

class Command extends comando {
    constructor(...args) {
        super(...args, {
            name: "say",
            description: "[ 😂fun ] make me say something on your server!",
            category: "fun",
            deferReply: true,
            usage: "<texto> [canal]",
            commandOptions: [
                {
                    type: 3,
                    name: "args",
                    description: "what will i say?",
                    required: true
                },
                {
                    type: 7,
                    name: "channel",
                    description: "send on a specific text channel",
                    required: false
                }
            ]
        })
    }
    async interactionRun(interaction, t){
        await interaction.deferReply({ ephemeral:  this.deferReply}).catch(() => {});
        let args = interaction.options.getString("args");
        let channel = interaction.options.getChannel('channel') || interaction.channel;

        if(args.length >= 1401){
            interaction.followUp({
                content: t("commands:say.error"),
                //ephemeral: true
            })
            return {}
        } else {
            channel.send({
                content: t("commands:say.success.return", {
                    args_: args,
                    userId: (interaction.user.id).toString()
                })
            });
            
            interaction.editReply({
                content: t("commands:say.success.reply")
                //ephemeral: true
            });
            
            return {}
        }
    }

    command_info(){
        return {
            activated: true,
            pt: {
                name: "say",
                description: "faça eu falar alguma coisa!",
                permissions: {
                    bot: [],
                    user: []
                },
                category: "diversão",
                usage: "<texto> [canal]",
                subCommands: []
            },
            en: {
                name: "say",
                description: "make me say something on your server!",
                permissions: {
                    bot: [],
                    user: []
                },
                category: "fun",
                usage: "<text> [channel]",
                subCommands: []
            }
        }
    }
} 
module.exports = Command 
