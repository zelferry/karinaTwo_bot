let comando = require("../../frameworks/commando/command.js");
let Discord = require("discord.js"); 

class Command extends comando {
    constructor(...args) {
        super(...args, {
            name: "kick",
            description: "[ 👩‍⚖️administração ] expulsar membros que estão quebrando as regras!",
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
                    description: "usuário (@user/id) a ser punido",
                    required: true
                },
                {
                    type: 3,
                    name: "reason",
                    description: "reação da punição",
                    required: false
                }
            ]
        })
    }
    async interactionRun(interaction){
        await interaction.deferReply({ ephemeral:  this.deferReply}).catch(() => {});
        let user = interaction.guild.members.cache.get(interaction.options.getUser('user').id)
        //onsole.log(user.kickable)
        let reason = interaction.options.getString('reason') || "...não sei ._.";

        if(user.id === interaction.user.id){
            interaction.followUp({
                content: "❌**|** você não pode se expulsar",
            });
            return {}
        } else if(user.id === this.client.user.id){
            interaction.followUp({
                content: "❌**|** você não pode me expulsar\n😭**|** você me odeia? :("
            })
            return {}
        } else if(!user.kickable){
            interaction.followUp({
                content: "❌**|** você não pode punir o membro, pois esse membro não é **expulsavel**"
            })
            return {}
        } else {
            interaction.editReply({
                content: `😡| o usuário **${interaction.options.getUser('user').tag}** foi expulso com sucesso por causa de: **${reason}**`
            });
            user.kick(reason)
            return {}
        }
    }
} 
module.exports = Command 