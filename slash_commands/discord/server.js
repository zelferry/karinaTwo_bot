let comando = require("../../frameworks/commando/command.js");
let Discord = require("discord.js"); 
let guild_model = require("../../mongoDB/models/guild.js")

class Command extends comando {
    constructor(...args) {
        super(...args, {
            name: "server",
            description: "[ 📲discord ] servers stuff for you!",
            category: "discord",
            commandOptions: [
                {
                    name: "info",
                    description: "[ 📲discord ] see server information!",
                    type: 1
                },
                {
                    name: "icon",
                    description: "[ 📲discord ] see the server icon!",
                    type: 1
                }
            ],
            buttonCommands: ["data"]
        })
    }
    async interactionRun(interaction, t){
        await interaction.deferReply({ ephemeral:  this.deferReply}).catch(() => {});
        let subCOMMAND = interaction.options.getSubcommand();

        if(subCOMMAND === "info"){
            const embed = new Discord.MessageEmbed().setColor('#fd9058').setTitle(t("commands:server.info.title")).setThumbnail(interaction.guild.iconURL()).addField(t("commands:server.info.id"), interaction.guild.id.toString()).addField(t("commands:server.info.name"), interaction.guild.name).addField(t("commands:server.info.owner"), `<@${interaction.guild.ownerId}>`).addField(t("commands:server.info.members"), interaction.guild.memberCount.toString()).addField(t("commands:server.info.date_create"), `<t:${~~(interaction.guild.createdTimestamp / 1000)}>`).addField(t("commands:server.info.date_join"), `<t:${~~(interaction.member.joinedTimestamp / 1000)}>`).setTimestamp();

            let databutton = new Discord.MessageButton().setStyle("SUCCESS").setLabel(t("commands:server.info.button.name")).setCustomId("data");

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
                    const embed = new Discord.MessageEmbed().setColor('#fd9058').setTitle(t("commands:server.info.button.embed.title")).setDescription(""+t("commands:server.info.button.embed.description")+"\n```json\n"+data_+"\n```");
                    
                    await interaction.followUp({
                        embeds: [embed],
                        ephemeral: true
                    });
                    
                    collector.stop(80)
                }
            })
        } else if(subCOMMAND === "icon"){
            let avatar = interaction.guild.iconURL({ dynamic: true, format: 'png', size: 1024 });

            let button_ = new Discord.MessageButton().setStyle('LINK').setURL(`${avatar}`).setLabel(t("commands:global.button.web"));
            let row2 = new Discord.MessageActionRow().addComponents(button_);
            let embed = new Discord.MessageEmbed().setColor(`#fd9058`).setTitle(t("commands:server.icon")).setImage(avatar);

            await interaction.editReply({
                embeds: [embed],
                components: [row2]
            })
        }
    }

    command_info(){
        return {
            activated: true,
            pt: {
                name: "server",
                description: "comandos sobre servidor",
                permissions: {
                    bot: [],
                    user: []
                },
                category: "discord",
                usage: "<sub comando>",
                subCommands: [
                    {
                        name: "info",
                        description: "retornar informações sobre seu servidor"
                    },
                    {
                        name: "icon",
                        description: "retorna o ícone do servidor"
                    }
                ]
            },
            en: {
                name: "server",
                description: "server commands",
                permissions: {
                    bot: [],
                    user: []
                },
                category: "discord",
                usage: "<sub command>",
                subCommands: [
                    {
                        name: "info",
                        description: "return information about your server"
                    },
                    {
                        name: "icon",
                        description: "return server icon"
                    }
                ]
            }
        }
    }
} 
module.exports = Command 