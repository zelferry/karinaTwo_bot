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
                },
                {
                    name: "icon",
                    description: "ver o ícone do servidor"
                }
            ],
            commandOptions: [
                {
                    name: "info",
                    description: "[ 📲discord ] ver informações do servidor!",
                    type: 1
                },
                {
                    name: "icon",
                    description: "[ 📲discord ] ver o ícone do servidor!",
                    type: 1
                }
            ]
        })
    }
    async interactionRun(interaction){
        await interaction.deferReply({ ephemeral:  this.deferReply}).catch(() => {});
        let subCOMMAND = interaction.options.getSubcommand();

        if(subCOMMAND === "info"){
            const embed = new Discord.MessageEmbed().setColor('#fd9058').setTitle('Informações do servidor').setThumbnail(interaction.guild.iconURL()).addField('ID', interaction.guild.id.toString()).addField('Nome', interaction.guild.name).addField('Dono', `<@${interaction.guild.ownerId}>`).addField('Membros', interaction.guild.memberCount.toString()).addField('Data de Criação', `<t:${~~(interaction.guild.createdTimestamp / 1000)}>`).addField('Você entrou em', `<t:${~~(interaction.member.joinedTimestamp / 1000)}>`).setTimestamp();
            return interaction.editReply({
                embeds: [embed]
            })
        } else if(subCOMMAND === "icon"){
            let avatar = interaction.guild.iconURL({ dynamic: true, format: 'png', size: 1024 });

            let button_ = new Discord.MessageButton().setStyle('LINK').setURL(`${avatar}`).setLabel('ver na web');
            let row = new Discord.MessageActionRow().addComponents(button_);
            let embed = new Discord.MessageEmbed().setColor(`#fd9058`).setTitle(`ícone do servidor`).setImage(avatar);

            await interaction.editReply({
                embeds: [embed],
                components: [row]
            })
        }
    }
} 
module.exports = Command 