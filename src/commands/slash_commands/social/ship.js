const comando = require("../../../structures/commands/command.js");

const Discord = require("discord.js"); 

class Command extends comando {
    command_data = {
        name: "ship",
        description: "(social) ship a user with you and find out if he/she is your soul mate!",
        descriptionLocalizations: {
            "pt-BR": "(social) ship um usuário com você e descubra se ele/ela é sua alma gêmea!"
        },
        dmPermission: false,
        nsfw: false,
        options: [
            {
                type: 6,
                required: true,
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
            name: "ship",
            category: "social"
        })
    }
    async interactionRun(interaction, t){
        await interaction.deferReply({ ephemeral: this.deferReply }).catch(() => {});
        let membro1 = interaction.options.getUser("user");
        let membro2 = interaction.user

        if(membro1.id === membro2.id){
            let avatar = interaction.user.avatarURL({ dynamic: true, format: "png", size: 1024 });
            let amorEmbed = new Discord.EmbedBuilder().setColor('#ffffff').setDescription(`:sparkling_heart: ${t("commands:ship.primary")} :sparkling_heart:\n\`${membro2.username}\` + \`${membro2.username}\` = \`${membro2.username}\`\n:heart: ${t("commands:ship.label.me")} :heart:\n\n**104%** [🟪🟪🟪🟪🟪🟪🟪🟪🟪🟪🟪]`).setImage(avatar);
            
            interaction.followUp({
                embeds: [amorEmbed]
            });
            return {}
        } else {
            let amor = Math.floor(Math.random() * 100);
            let loveIndex = Math.floor(amor / 10);
            let color92;

            if(amor > 90){
                color92 = "🟩"
            } else if(amor >= 70){
                color92 = "🟨"
            } else if(amor >= 45){
                color92 = "🟫"
            } else {
                color92 = "🟥"
            }

            let loveLevel = color92.repeat(loveIndex) + "⬛".repeat(10 - loveIndex);

            let nomeFim1 = membro1.username.length;
            let nomeFim2 = membro2.username.length;

            let calc1 = nomeFim1 - 3
            let calc2 = nomeFim2 - 3
            
            let nomeship;
            if(amor > 60) {
                nomeship = membro1.username.slice(0, 3) + membro2.username.slice(0, 3);
            } else if(amor >= 40) {
                nomeship = membro1.username.slice(0, calc1) + membro2.username.slice(0, calc2)
            } else {
                nomeship = membro1.username.slice(calc1, nomeFim1) + membro2.username.slice(calc2, nomeFim2)
            }

            /*et emoticon;
            if(amor > 60) {
                emoticon = ("https://cdn.glitch.com/00963c7e-8e86-4a55-8d85-36add9e330d7%2Femoji_2.png?v=1593651528429");
            } else if(amor >= 40) {
                emoticon = ("https://cdn.glitch.com/00963c7e-8e86-4a55-8d85-36add9e330d7%2Femoji_3-1.png?v=1593652255529");
            } else {
                emoticon = ("https://cdn.glitch.com/00963c7e-8e86-4a55-8d85-36add9e330d7%2Femoji_1.png?v=1593651511900"); 
            }*/

            let desc;
            if(amor > 60) {
                desc = (`:sparkling_heart: ${t("commands:ship.primary")} :sparkling_heart:\n\`${membro1.username}\` + \`${membro2.username}\` = \`${nomeship}\`\n:heart: ${t("commands:ship.label.perfect")} :heart:`);
            } else if(amor >= 70) {
                desc = (`:sparkling_heart: ${t("commands:ship.primary")} :sparkling_heart:\n\`${membro1.username}\` + \`${membro2.username}\` = \`${nomeship}\`\n:neutral_face: ${t("commands:ship.label.making_out")} :neutral_face:`); //neutral_face
            } else if(amor >= 45) {
                desc = (`:sparkling_heart: ${t("commands:ship.primary")} :sparkling_heart:\n\`${membro1.username}\` + \`${membro2.username}\` = \`${nomeship}\`\n:no_mouth: ${t("commands:ship.label.want", { userName: membro2.username })} :no_mouth:`); //no_mouth
            } else {
                desc = (`:sparkling_heart: ${t("commands:ship.primary")} :sparkling_heart:\n\`${membro1.username}\` + \`${membro2.username}\` = \`${nomeship}\`\n:cry: ${t("commands:ship.label.cry")} :cry:`); //cry
            }
            
            let amorEmbed = new Discord.EmbedBuilder().setColor('#ffffff').setDescription(""+desc+"\n\n**"+amor+"%** ["+loveLevel+"]")//setImage('attachment://chances-image.png');

            interaction.editReply({
                embeds: [amorEmbed]/*,
                files: [amorat]*/
            })
        }
    }

    command_info(){
        return {
            activated: true,
            pt: {
                name: "ship",
                description: "veja se tal usuário pode ser sua futura crush!",
                permissions: {
                    bot: [],
                    user: []
                },
                category: "social",
                usage: "<usuário>",
                subCommands: []
            },
            en: {
                name: "ship",
                description: "see if such a user can be your future crush!",
                permissions: {
                    bot: [],
                    user: []
                },
                category: "social",
                usage: "<user>",
                subCommands: []
            }
        }
    }
} 

module.exports = Command 