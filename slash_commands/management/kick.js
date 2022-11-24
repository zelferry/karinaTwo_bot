let comando = require("../../frameworks/commando/command.js");
let Discord = require("discord.js"); 

class Command extends comando {
    constructor(...args) {
        super(...args, {
            name: "kick",
            description: "[ 👩‍⚖️management ] kick out annoying members who keep breaking the rules",
            category: "management",
            permissions: {
                user: ["KICK_MEMBERS"],
                bot: ["KICK_MEMBERS"]
            },
            deferReply: true,
            usage: "<usuário> [motivo]",
            commandOptions: [
                {
                    type: 6,
                    name: "user",
                    description: "user (@user/id) to be punished",
                    required: true
                },
                {
                    type: 3,
                    name: "reason",
                    description: "punishment reaction",
                    required: false
                }
            ]
        })
    }
    async interactionRun(interaction, t){
        await interaction.deferReply({ ephemeral:  this.deferReply}).catch(() => {});
        let user = interaction.guild.members.cache.get(interaction.options.getUser('user').id)
        //onsole.log(user.kickable)
        let reason = interaction.options.getString('reason') || "?¿";

        if(user.id === interaction.user.id){
            interaction.followUp({
                content: t("commands:kick.error.is_me")
            });
            return {}
        } else if(user.id === this.client.user.id){
            interaction.followUp({
                content: t("commands:kick.error.is_bot")
            }); 
            return {}
        } else if(!user.kickable){
            interaction.followUp({
                content: t("commands:kick.error.no_kickable")
            })
            return {}
        } else {
            interaction.editReply({
                content: t("commands:kick.success", { userTag: interaction.options.getUser('user').tag, reason_: reason })
            });
            
            user.kick(reason)
            return {}
        }
    }

    command_info(){
        return {
            activated: true,
            pt: {
                name: "kick",
                description: "expulsar membros chatos que vivem quebrando as regras",
                permissions: {
                    bot: ["KICK_MEMBERS"],
                    user: ["KICK_MEMBERS"]
                },
                category: "administração",
                usage: "<usuário> [motivo]",
                subCommands: []
            },
            en: {
                name: "??",
                description: "kick out annoying members who keep breaking the rules",
                permissions: {
                    bot: ["KICK_MEMBERS"],
                    user: ["KICK_MEMBERS"]
                },
                category: "management",
                usage: "<user> [reason]",
                subCommands: []
            }
        }
    }

    _permissions(){
        return {
            "pt-BR": {
                bot: "🚫**|** eu não tenho permissões o suficiente para isso!\n💡**|** eu preciso das seguintes permissões: `expulsar membros`",
                user: "🚫**|** você não tem permissões o suficiente para isso!\n💡**|** você precisa das seguintes permissões: `expulsar membros`"
            },
            "en-US": {
                bot: "🚫**|** I don't have enough permissions for that!\n💡**|** i need the following permissions: `kick members`",
                user: "🚫**|** you don't have enough permissions for that!\n💡**|** you need the following permissions: `kick members`"
            }
        }
    }
} 
module.exports = Command 