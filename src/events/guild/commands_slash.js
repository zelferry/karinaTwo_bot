let Event = require("../../frameworks/event/event.js");
let util = require('../../utils/main.js');
let KariWebhooks = new util.webhooks1();
let Discord = require('discord.js');
let i18next = require('i18next');
let  data_warn = require("../../database/client/client_config.json")
let { bansUsers, translations, profile } = require("../../mongoDB/ini.js").user;
let { configs } = require("../../mongoDB/ini.js").guild;

let suport_db = new Discord.Collection();

function interactionresolva(int){
    let subCOMMANDs = int._subcommand ? int._subcommand : '';
    let optionsCOMMAND = int._hoistedOptions.length > 0 ? int._hoistedOptions.map((x) => `${x.name}: ${x.value}`).join(" ") : ''

    return `${subCOMMANDs} ${optionsCOMMAND}`
}

class event extends Event {
    constructor(...args){
        super(...args, {
            name: "interactionCreate"
        })
    }
    
    async run(interaction){
        let client = this.client;
        
        let user_translation = await translations.get_lang(interaction.user);
        let locale = global.t = i18next.getFixedT(user_translation || 'pt-BR');
        
        if(interaction.isChatInputCommand()){
            let command =  client.commands2.get(interaction.commandName.toLowerCase());
            
            //if (!client.commands2.has(interaction.commandName.toLowerCase())) return;
            function KariHandler() {
                new Promise(async (res, rej) => {
                    try {
                        await command.interactionRun(interaction, locale);
                    } catch(err) {
                        if(interaction.replied) {
                            await interaction.editReply({
                                content: locale("events:slash.error.interaction")
                            }).catch(() => {});
                        } else {
                            let errorEmbed = new Discord.EmbedBuilder().setColor("Red").setTitle(locale("events:slash.error.embed.title")).setDescription(`\ \ \`\`\`js\n${err}\n\`\`\``);
                            await interaction.followUp({ embeds: [errorEmbed], ephemeral: true }).catch(() => {});
                        }
                        console.log(err)
                    };
                })
            }
            
            try {
                let ban_user = await bansUsers.seekAndValidateBan(interaction.user);
                let user_data = await profile.find(interaction.user);
                let config__ = await configs.getConfig(interaction.guild, true);

                if(command.permissions.user.length > 0 && !client.guilds.cache.get(interaction.guild.id).members.cache.get(interaction.member.id).permissions.has(command.permissions.user)){
                    await interaction.deferReply({
                        ephemeral: true
                    }).catch(() => {});
                    
                    interaction.editReply({
                        content: command._permissions()[locale.lng].user
                    });
                    
                    return {}
                } else if(command.permissions.bot.length > 0 && !client.guilds.cache.get(interaction.guild.id).members.cache.get(client.user.id).permissions.has(command.permissions.bot)){
                    await interaction.deferReply({
                        ephemeral: true
                    }).catch(() => {});

                    interaction.editReply({
                        content: command._permissions()[locale.lng].bot
                    });

                    return {}
                } else if (command.nsfw && !interaction.channel.nsfw){
                    return client.extra.utils.message.noNsfw(client, interaction);
                } else if(ban_user.ready) {
                    await interaction.deferReply({
                        ephemeral: true
                    }).catch(() => {});
                    
                    interaction.editReply({
                        embeds: [{
                            description: locale("events:slash.banned.description"),
                            color: 389301,
                            fields: [{
                                name: locale("events:slash.banned.fields_name"),
                                value: `\`\`\`txt\n${vailar.reason}\n\`\`\``
                            }]
                        }]
                    });
                    return {}
                } else if(command.vip && !user_data.config.vip.active){
                    await interaction.deferReply({ ephemeral: true }).catch(() => {});

                    interaction.editReply({
                        content: locale("commands:global.vip_user")
                    });
                    
                    return {}
                } else {
                    KariHandler();

                    KariWebhooks.commands({
                        embeds: [{
                            title: "comando executado",
                            description: `o comando ***/${interaction.commandName.toLowerCase()}*** foi executado pelo ${interaction.user.tag} com sucesso!`,
                            color: 16777200,
                            fields: [{
                                name: "comando inteiro",
                                value: `\`/${interaction.commandName.toLowerCase()} ${interactionresolva(interaction.options)}\``
                            }]
                        }]
                    });
                }
            } catch (err) {
                console.log(err)
            }
        } else if(interaction.isAutocomplete()){
            let command =  client.commands2.get(interaction.commandName.toLowerCase());
            
            command.autocompleteRun(interaction, locale)
        } else if(interaction.isModalSubmit()){
            if(interaction.customId === "modal_support"){
                let support_input = interaction.fields.getTextInputValue("modal_support_input");
                
                KariWebhooks.suport({
                    embeds: [{
                        color: 16777200,
                        fields: [{
                            name: "autor:",
                            value: `tag: \`${interaction.user.tag}\`\nid: \`${interaction.user.id}\``
                        },
                        {
                            name: "suporte:",
                            value: `${support_input}`
                        }]
                    }]
                });

                await interaction.deferReply({ ephemeral:  true }).catch(() => {});
                await interaction.editReply({ content: locale("commands:support.send.success") });

                return {}
            } else if(interaction.customId === "modal_aboutme"){
                let aboutme_input = interaction.fields.getTextInputValue("modal_aboutme_input");
                
                let embed = new Discord.EmbedBuilder().addFields({ name: locale("commands:user.about_me.success"), value: '```txt\n' + aboutme_input + '```'}).setColor("#e0000f");

                await interaction.deferReply({ ephemeral:  true }).catch(() => {});
                interaction.editReply({
                    embeds: [embed]
                });
                await profile.setUserText(interaction.user, aboutme_input);
            }
        }
    }
}

module.exports = event