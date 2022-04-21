let comando = require("../../frameworks/commando/command.js");
let Discord = require("discord.js"); 
let guild_model = require("../../mongoDB/models/guild.js")

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
            ],
            buttonCommands: ["data"]
        })
    }
    async interactionRun(interaction){
        await interaction.deferReply({ ephemeral:  this.deferReply}).catch(() => {});
        let subCOMMAND = interaction.options.getSubcommand();

        if(subCOMMAND === "info"){
            const embed = new Discord.MessageEmbed().setColor('#fd9058').setTitle('Informações do servidor').setThumbnail(interaction.guild.iconURL()).addField('ID', interaction.guild.id.toString()).addField('Nome', interaction.guild.name).addField('Dono', `<@${interaction.guild.ownerId}>`).addField('Membros', interaction.guild.memberCount.toString()).addField('Data de Criação', `<t:${~~(interaction.guild.createdTimestamp / 1000)}>`).addField('Você entrou em', `<t:${~~(interaction.member.joinedTimestamp / 1000)}>`).setTimestamp();

            let databutton = new Discord.MessageButton().setStyle("SUCCESS").setLabel("ver dados do servidor").setCustomId("data");

            if(!interaction.member.permissions.has("ADMINISTRATOR")) databutton.setDisabled();
            
            let row1 = new Discord.MessageActionRow().addComponents(databutton);
            
            await interaction.editReply({
                embeds: [embed],
                components: [row1]
            });

            let buttonFilter = (button) => this.buttonCommands.includes(button.customId) && button.user.id === interaction.user.id;
            let collector = interaction.channel.createMessageComponentCollector(buttonFilter, {
                componentType: 'BUTTON',
                time: 900000
            });

            collector.on("collect", async(i) => {
                i.deferUpdate();

                if(i.customId === "data"){
                    //await interaction.deferReply({ ephemeral: true}).catch(() => {});
                    await interaction.editReply({
                        components: []
                    });

                    let data_ = await guild_model.findOne({ guildId: interaction.guild.id });
                    const embed = new Discord.MessageEmbed().setColor('#fd9058').setTitle('dados do servidor').setDescription("essas informações de seu servidor em minha database:\n```json\n"+data_+"\n```");

                    await interaction.followUp({
                        embeds: [embed],
                        ephemeral: true
                    });
                    
                    collector.stop(80)
                }
            })
        } else if(subCOMMAND === "icon"){
            let avatar = interaction.guild.iconURL({ dynamic: true, format: 'png', size: 1024 });

            let button_ = new Discord.MessageButton().setStyle('LINK').setURL(`${avatar}`).setLabel('ver na web');
            let row2 = new Discord.MessageActionRow().addComponents(button_);
            let embed = new Discord.MessageEmbed().setColor(`#fd9058`).setTitle(`ícone do servidor`).setImage(avatar);

            await interaction.editReply({
                embeds: [embed],
                components: [row2]
            })
        }
    }
} 
module.exports = Command 