const comando = require("../../../structures/commands/command.js");
const Discord = require("discord.js");
const i18next = require('i18next');

const { bgdb, profile, translations } = require("../../../data/ini.js").user;
const bgdata = require("../../../config/background.json");
const Manager = require("../../../utils/profile_draw.js");

class Command extends comando {
    command_data = {
        name: "background",
        description: "(economy) background setup commands!",
        description_localizations: {
            "pt-BR": "(economia) comandos de configuração de fundo!"
        },
        dmPermission: false,
        nsfw: false,
        options: [
            {
                type: 1,
                name: "buy",
                description: "(economy) buy new background!",
                name_localizations: {
                    "pt-BR": "comprar"
                },
                description_localizations: {
                    "pt-BR": "(economia) compre um novo fundo!"
                },
                options: [
                    {
                        type: 3,
                        name: "background",
                        description: "select a background to buy",
                        required: true,
                        autocomplete: true,
                        description_localizations: {
                            "pt-BR": "selecione um plano de fundo para comprar"
                        }
                    }
                ]
            },
            {
                type: 1,
                name: "set",
                description: "(economy) change your background in /profile!",
                name_localizations: {
                    "pt-BR": "definir"
                },
                description_localizations: {
                    "pt-BR": "(economia) mude seu plano de fundo do /profile!"
                },
                options: [
                    {
                        type: 3,
                        name: "background",
                        description: "select a background to set",
                        required: true,
                        autocomplete: true,
                        description_localizations: {
                            "pt-BR": "selecione um plano de fundo para defini-lo"
                        }
                    }
                ]
            }
        ]
    }
    
    constructor(...args) {
        super(...args, {
            name: "background",
            category: "economy",
            deferReply: true,
            buttonCommands: ["yes"]
        })
    }
    async interactionRun(interaction, t){
        let command = interaction.options.getSubcommand();
        let user = await bgdb.find(interaction.user);

        function abbreviateNumber(value) {
            var newValue = value;
            if (value >= 1000) {
            var suffixes = ['', 'K', 'Mi', 'Bi', 'Tri', 'Qua', 'Qui'];
            var suffixNum = Math.floor( (""+value).length/3 );
            var shortValue = '';
                    
            for (var precision = 2; precision >= 1; precision--) {
                shortValue = parseFloat( (suffixNum != 0 ? (value / Math.pow(1000,suffixNum) ) : value).toPrecision(precision));
                var dotLessShortValue = (shortValue + '').replace(/[^a-zA-Z 0-9]+/g,'');
                if (dotLessShortValue.length <= 2) { break; }
            }
                if (shortValue % 1 != 0)  shortValue = shortValue.toFixed(1);
                newValue = shortValue+suffixes[suffixNum];
            }
            return newValue;
        }
        
        switch (command) {
            case "buy": {
                let code = await interaction.options.getString("background");
                let background = await bgdata.find((b) => b.id === code?.toLowerCase());

                await interaction.deferReply({ ephemeral: this.deferReply });

                if (user.config.background.collection.includes(code)){
                    return interaction.editReply({
                        content: t('commands:background.buy.alreadyOwned')
                    });
                } else {
                    let value = await profile.find(interaction.user);
                    let options = {
                        avatarURL: interaction.user.displayAvatarURL({ extension: "png", size: 512 }),
                        background: `./assets/backgrounds/${background.locate}`,
                        username: interaction.user.username,
                        money: abbreviateNumber(value.coins),
                        aboutme: value.usertext,
                        reps: value.reps,
                        vip: value.config.vip.active ? t("commands:global.label.yes") : t("commands:global.label.no")
                    };
                    
                    Manager(interaction, options, t, (buffer) => {
                        let bg_locale = background.localizations[t.lng];
                        
                        let bgInfo = new Discord.EmbedBuilder()
                        .setTitle(bg_locale.name)
                        .setDescription(bg_locale.description)
                        .setImage('attachment://Profile.png')
                        .addFields({
                            name: t('commands:background.buy.price'),
                            value: `${background.panther_coins} panther-coins`,
                            inline: true })
                        .setColor("#FA8072");

                        if(!background.concept == "none") bgInfo.addFields({ name: t('commands:background.buy.concept'), value: `${background.concept}`, inline: true });
                        
                        let row = new Discord.ActionRowBuilder()
                        .addComponents(new Discord.ButtonBuilder().setCustomId("yes").setLabel(t('commands:background.buy.purchase')).setStyle(Discord.ButtonStyle.Success).setEmoji("💳"));
                        
                        let card = new Discord.AttachmentBuilder(buffer, { name: "Profile.png" });

                        interaction.editReply({
                            embeds: [bgInfo],
                            files: [card],
                            components: [row]
                        });
                    });
                    
                    let filter = (button) => this.buttonCommands.includes(button.customId) && button.user.id === interaction.user.id;
                    let collector = interaction.channel.createMessageComponentCollector({ filter, time: 15_000 });

                    collector.on('collect', async i => {
                        i.deferUpdate();
                        
                        if (i.customId === 'yes'){
                            if (value.coins < background.panther_coins){
                                interaction.followUp({
                                    content: t('commands:background.buy.noMoney'),
                                    ephemeral: true
                                });
                            } else if(background.only_vip_users && !value.config.vip.active){
                                interaction.followUp({
                                    content: t("commands:background.buy.noVip")
                                });
                            } else {
                                await bgdb.buyAndSet(interaction.user, code, background.panther_coins);
                                
                                interaction.editReply({
                                    content: t('commands:background.buy.success', {
                                        name: background.localizations[t.lng].name,
                                        price: background.panther_coins.toString()
                                    }),
                                    ephemeral: true,
                                    components: [],
                                    files: [],
                                    embeds: []
                                });

                                collector.stop("bought");
                            }
                        }
                    });

                    collector.on('end', async (i, stop_id) => {
                        if(stop_id == "bought"){
                            return {}
                        } else {
                            let row = new Discord.ActionRowBuilder()
                            .addComponents(new Discord.ButtonBuilder()
                            .setCustomId("yes")
                            .setLabel(t('commands:background.buy.purchase_expired'))
                            .setStyle(Discord.ButtonStyle.Danger)
                            .setDisabled(true));

                            interaction.editReply({ components: [row] });
                        }
                    })
                }
                break;
            }

            case "set": {
                let code = await interaction.options.getString("background");
                let background = await bgdata.find((b) => b.id === code?.toLowerCase());

                await interaction.deferReply({ ephemeral: this.deferReply });

                if (!background){
                    return interaction.editReply({
                        content: t('commands:background.buy.invalid')
                    });
                } else if(user.config.background.collection.includes(code)){
                    bgdb.edit(interaction.user, code);
                    interaction.editReply({
                        content: t('commands:background.set.success', { name: background.name })
                    });
                } else interaction.editReply({
                    content: t('commands:background.set.notOwned')
                });
                break;
            }
        }
    }
    
    async autocompleteRun(interaction, t){
        let command = interaction.options.getSubcommand();
        let user_translation = await translations.get_lang(interaction.user);
        let user = await bgdb.find(interaction.user);
        
        let locale = i18next.getFixedT(user_translation || 'pt-BR').lng;
        
        /*if (command === "buy") interaction.respond(bgdata.map(data => Object({ name: data.localizations[locale].name, value: data.id })));
        else if (command === "set") interaction.respond(bgdata.filter(b => user.config.background.collection.includes(b.id)).map(b => Object({ name: b.localizations[locale].name, value: b.id })));*/
        if (command === "buy"){
            interaction.respond(bgdata.filter(b => !user.config.background.collection.includes(b.id)).map(data => Object({
                name: data.localizations[locale].name,
                value: data.id 
            })));
        } else if(command === "set") {
            interaction.respond(bgdata.filter(b => user.config.background.collection.includes(b.id)).map(b => Object({
                name: b.localizations[locale].name,
                value: b.id
            })));
        }
    }

    command_info(){
        return {
            activated: true,
            pt: {
                name: "backgrounds",
                description: "comandos para gerenciar seus backgrounds do /profile!",
                permissions: {
                    bot: [],
                    user: []
                },
                category: "economy",
                usage: "<sub comando>",
                subCommands: []
            },
            en: {
                name: "backgrounds",
                description: "commands to manage your /profile backgrounds!",
                permissions: {
                    bot: [],
                    user: []
                },
                category: "economy",
                usage: "<sub command>",
                subCommands: []
            }
        }
    }
}

module.exports = Command