let comando = require("../../frameworks/commando/command.js");
let Discord = require("discord.js"); 

class Command extends comando {
    constructor(...args) {
        super(...args, {
            name: "ban",
            description: "[ 👩‍⚖️managemen ] ban members who are breaking the rules!",
            category: "management",
            permissions: {
                user: ["BAN_MEMBERS"],
                bot: ["BAN_MEMBERS"]
            },
            deferReply: true,
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
        let reason = interaction.options.getString('reason') || "punição não especificada";

        if(user.id === interaction.user.id){
            interaction.followUp({
                content: t("commands:ban.error.is_me")
            });
            return {}
        } else if(user.id === this.client.user.id){
            interaction.followUp({
                content: t("commands:ban.error.is_bot")
            })
            return {}
        } else if(!user.bannable){
            interaction.followUp({
                content: t("commands:ban.error.no_bannable"),
            })
            return {}
        } else {
            interaction.editReply({
                content: t("commands:ban.success", { userTag: interaction.options.getUser('user').tag, reason_: reason })
            });
            
            user.ban({
                days: 7,
                reason
            });
            return {}
        }
    }

    command_info(){
        return {
            activated: true,
            pt: {
                name: "ban",
                description: "banir aquele membro chato que esta quebrando as regras!",
                permissions: {
                    bot: ["BAN_MEMBERS"],
                    user: ["BAN_MEMBERS"]
                },
                category: "administração",
                usage: "<usuário> [motivo]",
                subCommands: []
            },
            en: {
                name: "ban",
                description: "ban that annoying member who is breaking the rules!",
                permissions: {
                    bot: ["BAN_MEMBERS"],
                    user: ["BAN_MEMBERS"]
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
                bot: "🚫**|** eu não tenho permissões o suficiente para isso!\n💡**|** eu preciso das seguintes permissões: `banir membros`",
                user: "🚫**|** você não tem permissões o suficiente para isso!\n💡**|** você precisa das seguintes permissões: `banir membros`"
            },
            "en-US": {
                bot: "🚫**|** I don't have enough permissions for that!\n💡**|** i need the following permissions: `ban members`",
                user: "🚫**|** you don't have enough permissions for that!\n💡**|** you need the following permissions: `ban members`"
            }
        }
    }
} 
module.exports = Command 
