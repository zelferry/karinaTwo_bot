let comando = require("../../frameworks/commando/command.js");
let Discord = require("discord.js"); 

class Command extends comando {
    constructor(...args) {
        super(...args, {
            name: "ban",
            description: "[ 👩‍⚖️administração ] banir membros que estão quebrando as regras!",
            category: "management",
            permissions: {
                user: ["BAN_MEMBERS"],
                bot: ["BAN_MEMBERS"]
            },
            deferReply: true,
            usage: "<usuário> [motivo]",
            commandOptions: [
                {
                    type: 6,
                    name: "user",
                    description: "mencionar um usuário",
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
        let reason = interaction.options.getString('reason') || "...não sei ._.";

        if(user.id === interaction.user.id){
            interaction.followUp({
                content: "❌**|** você não pode se banir"
            });
            return {}
        } else if(user.id === this.client.user.id){
            interaction.followUp({
                content: "❌**|** você não pode me banir\n😭**|** você me odeia? :("
            })
            return {}
        } else if(!user.bannable){
            interaction.followUp({
                content: "❌**|** você não pode punir o membro, pois esse membro não é **Banivel**",
            })
            return {}
        } else {
            interaction.editReply({
                content: `😡| o usuário **${interaction.options.getUser('user').tag}** foi banido com sucesso por causa de: **${reason}**`
            });
            user.ban({
                days: 7,
                reason
            })
            return {}
        }
    }
} 
module.exports = Command 
