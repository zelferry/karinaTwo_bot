let Event = require("../../frameworks/event/event.js");
let util = require('../../utils/main.js');
let KariWebhooks = new util.webhooks1();
let Discord = require('discord.js');
let i18next = require('i18next');
let { bansUsers, translations } = require("../../mongoDB/ini.js").user;

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
        
        if(interaction.isCommand()){
            let command =  client.commands2.get(interaction.commandName.toLowerCase());
            //if (!client.commands2.has(interaction.commandName.toLowerCase())) return;
            function KariHandler() {
                new Promise(async (res, rej) => {
                    try {
                        
                        if(!suport_db.has(interaction.user.id)){
                            interaction.channel.send({
                                embeds: [{
                                    description: t("events:slash.extra", { url: process.env.DONATE_PIX }),
                                    color: "#836FFF"
                                }]
                            });
                            suport_db.set(interaction.user.id, interaction.user.id);
                        }
                        
                        await command.interactionRun(interaction, locale);
                    } catch(err) {
                        if(interaction.replied) {
                            await interaction.editReply({
                                content: locale("events:slash.error.interaction")
                            }).catch(() => {});
                        } else {
                            let errorEmbed = new Discord.MessageEmbed().setColor("RED").setTitle(locale("events:slash.error.embed.title")).setDescription(`\ \ \`\`\`js\n${err}\n\`\`\``);
                            await interaction.followUp({ embeds: [errorEmbed], ephemeral: true }).catch(() => {});
                        }
                        console.log(err)
                    };
                })
            }
            
            try {
                let ban_user = await bansUsers.seekAndValidateBan(interaction.user);
                let config__ = await configs.getConfig(interaction.guild, true);

                if(command.permissions.user.length > 0 && !interaction.member.permissions.has(command.permissions.user)){
                    await interaction.deferReply({
                        ephemeral: true
                    }).catch(() => {});
                    
                    interaction.editReply({
                        content: command._permissions()[locale.lng].user
                    });
                    
                    return {}
                } else if(command.permissions.bot.length > 0 && !interaction.guild.me.permissions.has(command.permissions.bot)){
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
                } else {
                    KariHandler();

                    KariWebhooks.commands({
                        embeds: [{
                            title: "comando executado",
                            description: `o comando ***/${interaction.commandName.toLowerCase()}*** foi executado pelo ${interaction.user.tag} com sucesso!`,
                            color: "#EE82EE",
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
        } else if (interaction.isAutocomplete()){
            let command =  client.commands2.get(interaction.commandName.toLowerCase());
            
            command.autocompleteRun(interaction, locale)
        }
    }
}

module.exports = event