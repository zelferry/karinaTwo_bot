let comando = require("../../frameworks/commando/command.js");
let { profile } = require('../../mongoDB/ini.js').user;
let { millify } = require("millify");

let Discord = require("discord.js"); 

class Command extends comando {
    constructor(...args) {
        super(...args, {
            name: "profile",
            description: "[ 👤social ] veja seu perfil!",
            category: "social",
            usage: "[usuário]",
            commandOptions: [
                {
                    name: "user",
                    description: "usuário (@user/id) para você ver o perfil",
                    type: 6,
                    required: false
                }
            ]
        })
    }
    async interactionRun(interaction){
        await interaction.deferReply({ ephemeral:  this.deferReply}).catch(() => {});
        let user = interaction.options.getUser('user') || interaction.user;
        
        if(user.bot){
            return interaction.editReply({
                content: "🚫**|** esse usuário e um bot!"
            })
        } else {
            let value = await profile.find(user);
            let Manager = require("../../plugins/commands/profile/index.js");

            let options = {
                avatarURL: user.displayAvatarURL({ format: "png", size: 512 }),
                background: "./assets/profile/images/backgrounds/background.jpg",
                username: user.username,
                discriminator: user.discriminator,
                money: millify(value.coins,{
                    units:['', 'K', 'Mi', 'Bi', 'Tri', 'Qua', 'Qui'],
                    space: true
                }),
                aboutme: value.usertext,
                vip: value.vipUser ? "sim" : "não"
            };
            
            Manager(interaction,options)
        }
    }
} 
module.exports = Command 
