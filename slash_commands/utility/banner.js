let comando = require("../../frameworks/commando/command.js");
const Discord = require("discord.js");

const Canvas = require('canvas');

class Command extends comando {
    constructor(...args) {
        super(...args, {
            name: "banner",
            description: "[ ❓utilitários ] veja a banner de algum usuário!",
            category: "utility",
            usage: "[usuário]",
            commandOptions: [
                {
                    name: "user",
                    description: "usuário a ser mencionado",
                    type: 6,
                    required: false
                }
            ]
        })
    }
    async interactionRun(interaction){
        await interaction.deferReply({ ephemeral:  this.deferReply}).catch(() => {});
        let user = interaction.options.getUser('user') || interaction.user;
        let user2 = await this.client.api.users[user.id].get().catch(() => {});

        if (!user2){
            interaction.followUp({
                content: "🚫**|** o usuário com o ID `"+user.id+"` não existe :/",
                ephemeral: true
                /*reference: interaction.options.getUser('user')?.id*/
            });
            return {}
        } else if (!user2.banner && !user2.banner_color){
            interaction.followUp({
                content: `🚫**|** o usuário <@${user.id}> não tem uma banner!`,
                ephemeral: true
            });
            return {}
        } else {
            let embed = new Discord.MessageEmbed().setColor(`#4cd8b2`).setTitle(`Banner de ${user.username}`)//.setImage(avatar);
            if(user2.banner){
                const bannerURL = `https://cdn.discordapp.com/banners/${user2.id}/${user2.banner}.${`${user2.banner}`.startsWith('a_') ? 'gif' : 'png'}?size=512`;
                embed.setImage(bannerURL);
                
                let button_ = new Discord.MessageButton().setStyle('LINK').setURL(`${bannerURL}`).setLabel('ver na web');
                let row = new Discord.MessageActionRow().addComponents(button_);

                await interaction.editReply({
                    embeds: [embed],
                    components: [row]
                });
                return {}
            } else if (user2.banner_color){
                let canvas = Canvas.createCanvas(450, 180);
                let canvasCtx = canvas.getContext('2d');
                
                canvasCtx.beginPath();
                canvasCtx.rect(0, 0, 450, 180);
                canvasCtx.fillStyle = user2.banner_color;
                canvasCtx.fill();
                
                canvasCtx.font = '20px sans-serif';
                canvasCtx.fillStyle = '#ffffff';
                canvasCtx.fillText(`${user2.banner_color}`, canvas.width - 90, canvas.height - 8);

                let banner = new Discord.MessageAttachment(canvas.toBuffer(), `${user2.username}_color_banner.png`);
                embed.setImage(`attachment://${user2.username}_color_banner.png`);

                await interaction.editReply({
                    embeds: [embed],
                    files: [banner]
                });
                return {}
            }
        }
    }
} 

module.exports = Command 