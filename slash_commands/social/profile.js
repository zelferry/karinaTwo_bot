let comando = require("../../frameworks/commando/command.js");
let { profile } = require('../../mongoDB/ini.js').user;
let { millify } = require("millify");

let Discord = require("discord.js"); 
let bgdata = require("../../database/background/ids.json");

class Command extends comando {
    constructor(...args) {
        super(...args, {
            name: "profile",
            description: "[ 👤social ] see your profile on karinaTwo!",
            category: "social",
            usage: "[usuário]",
            commandOptions: [
                {
                    name: "user",
                    description: "username (@user/id) so you can see their profile",
                    type: 6,
                    required: false
                }
            ]
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
            let Manager = require("../../plugins/commands/profile/index.js");
            let background = bgdata.find(bg => bg.id === value.config.background.setted);

            let options = {
                avatarURL: user.displayAvatarURL({ format: "png", size: 512 }),
                background: `./assets/profile/images/backgrounds/${background.locate}`,
                username: user.username,
                discriminator: user.discriminator,
                money: millify(value.coins,{
                    units:['', 'K', 'Mi', 'Bi', 'Tri', 'Qua', 'Qui'],
                    space: true
                }),
                aboutme: value.usertext,
                vip: value.vipUser ? t("commands:global.label.yes") : t("commands:global.label.no")
            };

            Manager(interaction, options, t)
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
