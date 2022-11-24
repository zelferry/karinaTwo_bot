let comando = require("../../frameworks/commando/command.js");
let Discord = require("discord.js");

//et Canvas = require('canvas');

let { profile } = require("../../mongoDB/ini.js").user 

class Command extends comando {
    constructor(...args) {
        super(...args, {
            name: "user",
            description: "commands that have to do with users",
            category: "discord",
            usage: "<sub command>",
            subCommands: [
                {
                    name: "avatar",
                    description: "you know that beautiful avatar you saw? see him clearly"
                },
                {
                    name: "banner",
                    description: "see the banner of some user!"
                },
                {
                    name: "about_me",
                    description: "change your \"about me\" from \"/profile\""
                }
            ],
            commandOptions: [
                {
                    type: 1,
                    name: "avatar",
                    description: "[ ❓utilities ] you know that beautiful avatar you saw? see him clearly",
                    options: [
                        {
                            name: "user",
                            description: "username (@user/id) so you can see their avatar",
                            type: 6,
                            required: false
                        }
                    ]
                },
                {
                    type: 1,
                    name: "banner",
                    description: "[ ❓utilities ] see the banner of some user!",
                    options: [
                        {
                            name: "user",
                            description: "username (@user/id) so you can see his/her banner",
                            type: 6,
                            required: false
                        }
                    ]
                },
                {
                    type: 1,
                    name: "aboutme",
                    description: "[ 👤social ] change your \"about me\" from \"/profile\"",
                    options: [
                        {
                            name: "args",
                            description: "what will be your new \"about me\"?",
                            type: 3,
                            required: true
                        }
                    ]
                }
            ]
        })
    }
    async interactionRun(interaction, t){
        await this[interaction.options.getSubcommand()](interaction, t)
    }

    /* avatar */
    async avatar(interaction, t){
        await interaction.deferReply({ ephemeral:  this.deferReply}).catch(() => {});
        let user = interaction.options.getUser('user') || interaction.user;
        let avatar = user.avatarURL({ dynamic: true, format: "png", size: 1024 });


        let button_ = new Discord.MessageButton().setStyle('LINK').setURL(`${avatar}`).setLabel(t("commands:global.button.web"));
        let row = new Discord.MessageActionRow().addComponents(button_);
        
        let embed = new Discord.MessageEmbed().setColor(`#4cd8b2`).setTitle(t("commands:user.avatar", { userName: user.username })).setImage(avatar);
        
        await interaction.editReply({
            embeds: [embed],
            components: [row]
        });
    }

    /* banner */
    async banner(interaction, t){
        await interaction.deferReply({ ephemeral:  this.deferReply}).catch(() => {});
        let user = interaction.options.getUser('user') || interaction.user;
        let user2 = await this.client.api.users[user.id].get().catch(() => {});

        if (!user2){
            interaction.followUp({
                content: t("commands:user.banner.error.noUser", { userId: user.id }),
                ephemeral: true
                /*reference: interaction.options.getUser('user')?.id*/
            });
            return {}
        } else if (!user2.banner && !user2.banner_color){
            interaction.followUp({
                content: t("commands:user.banner.error.noBanner", { userName: user2.username }),
                ephemeral: true
            });
            return {}
        } else {
            let embed = new Discord.MessageEmbed().setColor(`#4cd8b2`).setTitle(t("commands:user.banner.success", { userName: user.username }))//.setImage(avatar);
            if(user2.banner){
                const bannerURL = `https://cdn.discordapp.com/banners/${user2.id}/${user2.banner}.${`${user2.banner}`.startsWith('a_') ? 'gif' : 'png'}?size=512`;
                embed.setImage(bannerURL);
                
                let button_ = new Discord.MessageButton().setStyle('LINK').setURL(`${bannerURL}`).setLabel(t("commands:global.button.web"));
                let row = new Discord.MessageActionRow().addComponents(button_);

                await interaction.editReply({
                    embeds: [embed],
                    components: [row]
                });
                return {}
            } else if (user2.banner_color){
                embed.setDescription(t("commands:user.banner.description", { color: user2.banner_color }));
                embed.setColor(user2.banner_color);
                /*let canvas = Canvas.createCanvas(450, 180);
                let canvasCtx = canvas.getContext('2d');
                
                canvasCtx.beginPath();
                canvasCtx.rect(0, 0, 450, 180);
                canvasCtx.fillStyle = user2.banner_color;
                canvasCtx.fill();
                
                canvasCtx.font = '20px sans-serif';
                canvasCtx.fillStyle = '#ffffff';
                canvasCtx.fillText(`${user2.banner_color}`, canvas.width - 90, canvas.height - 8);

                let banner = new Discord.MessageAttachment(canvas.toBuffer(), `${user2.username}_color_banner.png`);
                embed.setImage(`attachment://${user2.username}_color_banner.png`);*/

                await interaction.editReply({
                    embeds: [embed]
                });
                return {}
            }
        }
    }

    /* about me */
    async aboutme(interaction, t){
        await interaction.deferReply({ ephemeral:  this.deferReply}).catch(() => {});
        let args = interaction.options.getString('args');
        let value = await profile.find(interaction.user);

        if(!value.vipUser){
            interaction.followUp({
                content: t("commands:user.about_me.error.noVipUser"),
                ephemeral: true
            });
            return {}
        } else {
            if(args.length >= 602){
                let embed = new Discord.MessageEmbed().setTitle('Erro').setDescription(t("commands:user.about_me.error.manyCharacters")).setColor("#e0000f")
                interaction.followUp({
                    embeds: [embed],
                    ephemeral: true
                });
                return {}
            } else {
                let embed1 = new Discord.MessageEmbed().addField(t("commands:user.about_me.success"), '```txt\n' + args + '```').setColor("#e0000f");
                
                interaction.editReply({
                    embeds: [embed1]
                });
                await profile.setUserText(interaction.user, args);
                return {}
            }
        }
    }

    command_info(){
        return {
            activated: true,
            pt: {
                name: "user",
                description: "comandos sobre usuários!",
                permissions: {
                    bot: [],
                    user: []
                },
                category: "discord",
                usage: "<sub comando>",
                subCommands: [
                    {
                        name: "avatar",
                        description: "ver o avatar de um usuário em HD!"
                    },
                    {
                        name: "banner",
                        description: "retornar a banner de algum usuário (se o usuário so tiver a cor como banner, irei retornar a cor em HEXADECIMAL)"
                    },
                    {
                        name: "aboutme",
                        description: "alterar o \"sobre mim\" do \"/profile\"!"
                    }
                ]
            },
            en: {
                name: "user",
                description: "commands on users!",
                permissions: {
                    bot: [],
                    user: []
                },
                category: "discord",
                usage: "<sub command>",
                subCommands: [
                    {
                        name: "avatar",
                        description: "view a user's avatar in HD!"
                    },
                    {
                        name: "banner",
                        description: "return a user's banner (if the user only has the color as a banner, I will return the color in HEXADECIMAL)"
                    },
                    {
                        name: "aboutme",
                        description: "change the \"about me\" of \"/profile\"!"
                    }
                ]
            }
        }
    }
} 
module.exports = Command 