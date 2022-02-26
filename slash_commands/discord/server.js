let comando = require("../../frameworks/commando/command.js");
let Discord = require("discord.js"); 

class Command extends comando {
    constructor(...args) {
        super(...args, {
            name: "server",
            description: "[ 📲discord ] coisas de servidores pra você!",
            category: "discord",
            usage: "<sub comando>",
            subCommands: [
                {
                    name: "info",
                    description: "ver informações do servidor!",
                }
            ],
            commandOptions: [
                {
                    name: "info",
                    description: "[ 📲discord ] ver informações do servidor!",
                    type: 1
                }
            ]
        })
    }
    async interactionRun(interaction){
        await interaction.deferReply({ ephemeral:  this.deferReply}).catch(() => {});
        let subCOMMAND = interaction.options.getSubcommand();

        if(subCOMMAND === "info"){
            const embed = new Discord.MessageEmbed().setColor('#f8f8f8').setTitle('Informações do servidor').setThumbnail(interaction.guild.iconURL()).addField('ID', interaction.guild.id.toString()).addField('Nome', interaction.guild.name).addField('Dono', `<@${interaction.guild.ownerId}>`).addField('Membros', interaction.guild.memberCount.toString()).addField('Data de Criação', `<t:${~~(interaction.guild.createdTimestamp / 1000)}>`).addField('Você entrou em', `<t:${~~(interaction.member.joinedTimestamp / 1000)}>`).setTimestamp();
            return interaction.editReply({
                embeds: [embed]
            })
        } /*else if(subCOMMAND === "support"){
            return interaction.reply({
                content: "😁**|** link do servidor de suporte: https://discord.gg/Xmu7HrH3yy\n🤔**|** la você podera pedir suporte, reportar bugs e etc!",
                ephemeral: true
            })
        }*/
    }
} 
module.exports = Command 