const comando = require("../../../structures/commands/command.js");
const { profile } = require('../../../data/ini.js').user;
const bgdata = require("../../../config/background.json");
const lydata = require("../../../config/layouts.json");
const Manager = require("../../../utils/profile_draw.js");

const Discord = require("discord.js");

class Command extends comando {
    command_data = {
        name: "profile",
        description: "(social) see your profile on karinaTwo!",
        name_localizations: {
            "pt-BR": "perfil"
        },
        description_localizations: {
            "pt-BR": "(social) veja seu perfil na karinaTwo!"
        },
        dmPermission: false,
        nsfw: false,
        options: [
            {
                type: 6,
                required: false,
                name: "user",
                description: "user (@user/id)",
                name_localizations: {
                    "pt-BR": "usuário"
                },
                description_localizations: {
                    "pt-BR": "usuário (@usuário/id)"
                }
            }
        ]
    }
    
    constructor(...args) {
        super(...args, {
            name: "profile",
            category: "social"
        })
    }
    async interactionRun(interaction, t){
        await interaction.deferReply({ ephemeral: this.deferReply }).catch(() => {});
        let user = interaction.options.getUser('user') || interaction.user;
        
        if(user.bot && user.id !== process.env.CLIENT_ID){
            return interaction.editReply({
                content: t("commands:global.error.user.isBot")
            })
        } else {
            let value = await profile.find(user);
            let background = bgdata.find(bg => bg.id === value.config.background.setted);
            let layout = lydata.find(bg => bg.id === value.config.layout.setted);

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
            
            let options = {
                avatarURL: user.avatarURL({ dynamic: true, extension: "png", size: 512 }),
                background: `./assets/backgrounds/${background.locate}`,
                layout: layout.locate,
                username: user.username,
                money: abbreviateNumber(value.coins),
                aboutme: value.usertext,
                reps: value.reps,
                vip: user.id !== process.env.CLIENT_ID ? (value.config.vip.active ? t("commands:global.label.yes") : t("commands:global.label.no")) : t("commands:global.label.yes")
            };
            
            Manager(interaction, options, t, (buffer) => {
                let card = new Discord.AttachmentBuilder(buffer, "profile.png");
                interaction.editReply({
                    content: t("commands:profile.name"),
                    files: [card]
                });
            });
        }
    }

    command_info(){
        return {
            activated: true,
            pt: {
                name: "profile",
                description: "veja o seu ou o perfil(também pide ser chamado de cartão) dos outros usuários!",
                permissions: {
                    bot: [],
                    user: []
                },
                category: "social",
                usage: "[usuário]",
                subCommands: []
            },
            en: {
                name: "profile",
                description: "see yours or the profile (also be called a card) of other users!",
                permissions: {
                    bot: [],
                    user: []
                },
                category: "social",
                usage: "[user]",
                subCommands: []
            }
        }
    }
} 
module.exports = Command 
