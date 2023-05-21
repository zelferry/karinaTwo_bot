let comando = require("../../frameworks/commando/command.js");
let { profile } = require('../../mongoDB/ini.js').user;

let Discord = require("discord.js"); 
let bgdata = require("../../database/background/ids.json");

class Command extends comando {
    command_data = {
        name: "profile",
        description: "(social) see your profile on karinaTwo!",
        nameLocalizations: {
            "pt-BR": "perfil"
        },
        descriptionLocalizations: {
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
                nameLocalizations: {
                    "pt-BR": "usuário"
                },
                descriptionLocalizations: {
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
        await interaction.deferReply({ ephemeral:  this.deferReply}).catch(() => {});
        let user = interaction.options.getUser('user') || interaction.user;
        
        if(user.bot){
            return interaction.editReply({
                content: t("commands:global.error.user.isBot")
            })
        } else {
            let value = await profile.find(user);
            let Manager = require("../../dist/client/commands/profile.js");
            let background = bgdata.find(bg => bg.id === value.config.background.setted);

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
                background: `./assets/profile/images/backgrounds/${background.locate}`,
                username: user.username,
                discriminator: user.discriminator,
                money: abbreviateNumber(value.coins),
                aboutme: value.usertext,
                reps: value.reps,
                vip: value.config.vip.active ? t("commands:global.label.yes") : t("commands:global.label.no")
            };
            
            Manager(interaction, options, t, (buffer) => {
                let card = new Discord.AttachmentBuilder(buffer, "profile.png");
                interaction.editReply({
                    content: t("commands:profile.name"),
                    files: [card]
                });
            })
            //Manager(interaction, options, t)
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
