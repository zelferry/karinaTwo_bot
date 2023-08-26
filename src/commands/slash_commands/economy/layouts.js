const comando = require("../../../structures/commands/command.js");
const Discord = require("discord.js");
const i18next = require('i18next');

const { lydb, profile, translations } = require("../../../data/ini.js").user;
const lydata = require("../../../config/layouts.json");
const Manager = require("../../../utils/profile_draw.js");

class Command extends comando {
    command_data = {
        name: "layout",
        description: "(economy) layout setup commands!",
        description_localizations: {
            "pt-BR": "(economia) comandos de configuração de layout!"
        },
        dmPermission: false,
        nsfw: false,
        options: [
            {
                type: 1,
                name: "buy",
                description: "(economy) buy new layout!",
                name_localizations: {
                    "pt-BR": "comprar"
                },
                description_localizations: {
                    "pt-BR": "(economia) compre um novo layout!"
                },
                options: [
                    {
                        type: 3,
                        name: "layout",
                        description: "select a layout to buy",
                        required: true,
                        autocomplete: true,
                        description_localizations: {
                            "pt-BR": "selecione um layout para comprar"
                        }
                    }
                ]
            },
            {
                type: 1,
                name: "set",
                description: "(economy) change your layout in /profile!",
                name_localizations: {
                    "pt-BR": "definir"
                },
                description_localizations: {
                    "pt-BR": "(economia) mude seu layout do /profile!"
                },
                options: [
                    {
                        type: 3,
                        name: "layout",
                        description: "select a layout to set",
                        required: true,
                        autocomplete: true,
                        description_localizations: {
                            "pt-BR": "selecione um layout para defini-lo"
                        }
                    }
                ]
            }
        ]
    }
    
    constructor(...args) {
        super(...args, {
            name: "layout",
            category: "economy",
            deferReply: true,
            buttonCommands: ["yes"]
        })
    }
    async interactionRun(interaction, t){
        let command = interaction.options.getSubcommand();
        let user = await lydb.find(interaction.user);

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
                let code = await interaction.options.getString("layout");
                let layout = await lydata.find((b) => b.id === code?.toLowerCase());

                await interaction.deferReply({ ephemeral: this.deferReply });

                if (user.config.layout.collection.includes(code)){
                    return interaction.editReply({
                        content: t('commands:layout.buy.alreadyOwned')
                    });
                } else {
                    let value = await profile.find(interaction.user);
                    let options = {
                        avatarURL: "./assets/content/3.png",
                        background: `./assets/backgrounds/1.png`,
                        layout: layout.locate,
                        username: "user",
                        money: abbreviateNumber(1000),
                        aboutme: "é assim que o layout se parece / this is what the layout looks like",
                        reps: "100",
                        vip: t("commands:global.label.yes")
                    };
                    
                    Manager(interaction, options, t, (buffer) => {
                        let bg_locale = layout.localizations[t.lng];
                        
                        let bgInfo = new Discord.EmbedBuilder()
                        .setTitle(bg_locale.name)
                        .setDescription(bg_locale.description)
                        .setImage('attachment://Profile.png')
                        .addFields({
                            name: t('commands:layout.buy.price'),
                            value: layout.panther_coins > 0 ? `${layout.panther_coins} panther-coins` : `free`,
                            inline: true })
                        .setColor("#FA8072");

                        if(!layout.concept == "none") bgInfo.addFields({ name: t('commands:layout.buy.concept'), value: `${layout.concept}`, inline: true });
                        
                        let row = new Discord.ActionRowBuilder()
                        .addComponents(new Discord.ButtonBuilder().setCustomId("yes").setLabel(t('commands:layout.buy.purchase')).setStyle(Discord.ButtonStyle.Success).setEmoji("💳"));
                        
                        let card = new Discord.AttachmentBuilder(buffer, { name: "Profile.png" });

                        interaction.editReply({
                            embeds: [bgInfo],
                            files: [card],
                            components: [row]
                        });
                    });
                    
                    let filter = (button) => this.buttonCommands.includes(button.customId) && button.user.id === interaction.user.id;
                    let collector = interaction.channel.createMessageComponentCollector({ filter, time: 30000 });

                    collector.on('collect', async i => {
                        i.deferUpdate();
                        
                        if (i.customId === 'yes'){
                            if (value.coins < layout.panther_coins){
                                interaction.followUp({
                                    content: t('commands:layout.buy.noMoney'),
                                    ephemeral: true
                                });
                            } else if(layout.only_vip_users && !value.config.vip.active){
                                interaction.followUp({
                                    content: t("commands:layout.buy.noVip")
                                });
                            } else {
                                await lydb.buyAndSet(interaction.user, code, layout.panther_coins);
                                
                                interaction.editReply({
                                    content: t('commands:layout.buy.success', {
                                        name: layout.localizations[t.lng].name,
                                        price: layout.panther_coins.toString()
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
                            .setLabel(t('commands:layout.buy.purchase_expired'))
                            .setStyle(Discord.ButtonStyle.Danger)
                            .setDisabled(true));

                            interaction.editReply({ components: [row] });
                        }
                    })
                }
                break;
            }

            case "set": {
                let code = await interaction.options.getString("layout");
                let layout = await lydata.find((b) => b.id === code?.toLowerCase());

                await interaction.deferReply({ ephemeral: this.deferReply });

                if (!layout){
                    return interaction.editReply({
                        content: t('commands:layout.buy.invalid')
                    });
                } else if(user.config.layout.collection.includes(code)){
                    lydb.edit(interaction.user, code);
                    interaction.editReply({
                        content: t('commands:layout.set.success', { name: layout.name })
                    });
                } else interaction.editReply({
                    content: t('commands:layout.set.notOwned')
                });
                break;
            }
        }
    }
    
    async autocompleteRun(interaction, t){
        let command = interaction.options.getSubcommand();
        let user_translation = await translations.get_lang(interaction.user);
        let user = await lydb.find(interaction.user);
        
        let locale = i18next.getFixedT(user_translation || 'pt-BR').lng;
        
        if (command === "buy"){
            interaction.respond(lydata.filter(b => !user.config.layout.collection.includes(b.id)).map(data => Object({
                name: data.panther_coins > 0 ? `${data.localizations[locale].name} (${data.panther_coins} panther-coins)` : `${data.localizations[locale].name} (free)`,
                value: data.id 
            })));
        } else if(command === "set") {
            interaction.respond(lydata.filter(b => user.config.layout.collection.includes(b.id)).map(b => Object({
                name: b.localizations[locale].name,
                value: b.id
            })));
        }
    }

    command_info(){
        return {
            activated: true,
            pt: {
                name: "layouts",
                description: "comandos para gerenciar seus layouts do /profile!",
                permissions: {
                    bot: [],
                    user: []
                },
                category: "economy",
                usage: "<sub comando>",
                subCommands: []
            },
            en: {
                name: "layouts",
                description: "commands to manage your /profile layouts!",
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