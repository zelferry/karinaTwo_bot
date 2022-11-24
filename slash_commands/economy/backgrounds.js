let comando = require("../../frameworks/commando/command.js");
let jimp = require("jimp");
let Discord = require("discord.js");
let { millify } = require("millify");

let { bgdb, profile } = require("../../mongoDB/ini.js").user;
let bgdata = require("../../database/background/ids.json");

class Command extends comando {
    constructor(...args) {
        super(...args, {
            name: "background",
            description: "background setup commands!",
            category: "economy",
            deferReply: true,
            buttonCommands: ["yes"],
            commandOptions: [
                {
                    type: 1,
                    name: "buy",
                    description: "[ 💸economy ] buy new funds!",
                    options: [
                        {
                            type: 3,
                            name: "background",
                            description: "select a background to buy",
                            required: true,
                            autocomplete: true
                        }
                    ]
                },
                {
                    type: 1,
                    name: "set",
                    description: "[ 💸economy ] change your background in /profile!",
                    options: [
                        {
                            type: 3,
                            name: "background",
                            description: "select a background to set",
                            required: true,
                            autocomplete: true
                        }
                    ]
                }
            ]
        })
    }
    async interactionRun(interaction, t){
        let command = interaction.options.getSubcommand();
        let user = await bgdb.find(interaction.user);

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
                        avatarURL: interaction.user.displayAvatarURL({ format: "png", size: 512 }),
                        background: `./assets/profile/images/backgrounds/${background.locate}`,
                        username: interaction.user.username,
                        discriminator: interaction.user.discriminator,
                        money: millify(value.coins,{
                            units:['', 'K', 'Mi', 'Bi', 'Tri', 'Qua', 'Qui'],
                            space: true
                        }),
                        aboutme: value.usertext,
                        vip: value.vipUser ? t("commands:global.label.yes") : t("commands:global.label.no")
                    };

                    let avatar = await jimp.read(options.avatarURL);
                    let background1 = await jimp.read(options.background);
                    let model = await jimp.read("./assets/profile/images/profile_model.png");
                    let mascara = await jimp.read("./assets/profile/images/mascara.png");

                    let font70 = await jimp.loadFont("./assets/profile/fonts/benasneue_70.fnt");
                    let font36 = await jimp.loadFont("./assets/profile/fonts/benasneue_36.fnt");
                    let font36_2 = await jimp.loadFont("./assets/profile/fonts/benasneue_36_2.fnt");
                    let font20 = await jimp.loadFont("./assets/profile/fonts/benasneue_20.fnt");
                    avatar.resize(145.50, 145.50);
                    mascara.resize(145.50, 145.50);
                    background1.resize(700, 500);
                    model.resize(700, 500);

                    avatar.mask(mascara);
                    model.composite(avatar, 16.50, 15.50);
                    model.print(font70, 178, 9, options.username);
                    model.print(font36, 337, 91, options.money);
                    model.print(font20, 267, 124, options.vip, 690);
                    model.print(font20, 9, 405, options.aboutme, 690);
                    background1.composite(model, 0, 0);
                    
                    const bgInfo = new Discord.MessageEmbed().setTitle(background.name).setDescription(background.description).setColor("BLURPLE").addField(t('commands:background.buy.price'), `${background.panther_coins} panther-coins`, true).addField(t('commands:background.buy.concept'), `${background.concept}`, true).setImage('attachment://Profile.png');

                    let row = new Discord.MessageActionRow().addComponents(new Discord.MessageButton().setCustomId("yes").setLabel(t('commands:background.buy.purchase')).setStyle("SUCCESS").setEmoji("💳"));
                    
                    background1.getBuffer(jimp.MIME_PNG, async(err, buffer) => {
                        if (err) {
                            return interaction.editReply({ content: t("commands:global.error.commands", { error: err }) });
                        } else {
                            let card = new Discord.MessageAttachment(buffer, "Profile.png");

                            interaction.editReply({ embeds: [bgInfo], files: [card], components: [row] })
                        };
                    });
                    let buttonFilter = (button) => this.buttonCommands.includes(button.customId) && button.user.id === interaction.user.id;
                    
                    let collector = interaction.channel.createMessageComponentCollector(buttonFilter, {
                        componentType: 'BUTTON',
                        time: 15_000,
                        max: 1
                    });

                    collector.on('collect', async i => {
                        i.deferUpdate();
                        
                        if (i.customId === 'yes'){
                            if (value.coins < background.panther_coins){
                                interaction.followUp({ content: t('commands:background.buy.noMoney'), ephemeral: true });
                            } else {
                                await bgdb.buyAndSet(interaction.user, code, background.panther_coins);

                                interaction.editReply({
                                    content: t('commands:background.buy.success', { name: background.name, price: background.panther_coins.toString() }), ephemeral: true, components: [], embeds: [] });
                            }
                            collector.stop();
                        }
                    });
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
        let user = await bgdb.find(interaction.user);

        if (command === "buy") interaction.respond(bgdata.map(data => Object({ name: data.name, value: data.id })));
        else if (command === "set") interaction.respond(bgdata.filter(b => user.config.background.collection.includes(b.id)).map(b => Object({ name: b.name, value: b.id })));
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