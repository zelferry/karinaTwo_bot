let comando = require("../../frameworks/commando/command.js");
let Discord = require("discord.js");

let Canvas = require('canvas');

let { profile } = require("../../mongoDB/ini.js").user 

class Command extends comando {
    constructor(...args) {
        super(...args, {
            name: "user",
            description: "comandos que tem aver com usuários",
            category: "discord",
            usage: "<sub comando>",
            subCommands: [
                {
                    name: "avatar",
                    description: "sabe aquele avatar lindo que você viu? veja ele por completo"
                },
                {
                    name: "banner",
                    description: "veja a banner de algum usuário!"
                },
                {
                    name: "about_me",
                    description: "alterar o seu \"sobre mim\" do \"/profile\""
                }
            ],
            commandOptions: [
                {
                    type: 1,
                    name: "avatar",
                    description: "[ ❓utilitários ] sabe aquele avatar lindo que você viu? veja ele por completo!",
                    options: [
                        {
                            name: "user",
                            description: "usuário (@user/id) para você ver o avatar dele(a)",
                            type: 6,
                            required: false
                        }
                    ]
                },
                {
                    type: 1,
                    name: "banner",
                    description: "[ ❓utilitários ] veja a banner de algum usuário!",
                    options: [
                        {
                            name: "user",
                            description: "usuário (@user/id) para você ver a banner dele(a)",
                            type: 6,
                            required: false
                        }
                    ]
                },
                {
                    type: 1,
                    name: "about_me",
                    description: "[ 👤social ] alterar o seu \"sobre mim\" do \"/profile\"",
                    options: [
                        {
                            name: "args",
                            description: "qual será o seu novo \"sobre mim\"?",
                            type: 3,
                            required: true
                        }
                    ]
                }
            ]
        })
    }
    async interactionRun(interaction){
        await this[interaction.options.getSubcommand()](interaction)
    }

    /* avatar */
    async avatar(interaction){
        await interaction.deferReply({ ephemeral:  this.deferReply}).catch(() => {});
        let user = interaction.options.getUser('user') || interaction.user;
        let avatar = user.avatarURL({ dynamic: true, format: "png", size: 1024 });


        let button_ = new Discord.MessageButton().setStyle('LINK').setURL(`${avatar}`).setLabel('ver na web');
        let row = new Discord.MessageActionRow().addComponents(button_);
        
        let embed = new Discord.MessageEmbed().setColor(`#4cd8b2`).setTitle(`Avatar de ${user.username}`).setImage(avatar);
        
        await interaction.editReply({
            embeds: [embed],
            components: [row]
        });
    }

    /* banner */
    async banner(interaction){
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

    /* about me */
    async about_me(interaction){
        await interaction.deferReply({ ephemeral:  this.deferReply}).catch(() => {});
        let args = interaction.options.getString('args');
        let value = await profile.find(interaction.user);

        if(!value.vipUser){
            interaction.followUp({
                content: ":x: |apenas usuários **vips** podem alterar os textos personalizados",
                ephemeral: true
            });
            return {}
        } else {
            if(args.length >= 602){
                let embed = new Discord.MessageEmbed().setTitle('Erro').setDescription("**Textos com +603 caracteres não são permitidos, assim, evitarei bugs.**").setColor("#e0000f")
                interaction.followUp({
                    embeds: [embed],
                    ephemeral: true
                });
                return {}
            } else {
                let embed1 = new Discord.MessageEmbed().addField("Novo usser text:", '```txt\n' + args + '```').setColor("#e0000f");
                
                interaction.editReply({
                    embeds: [embed1]
                });
                await profile.setUserText(interaction.user, args);
                return {}
            }
        }
    }
} 
module.exports = Command 