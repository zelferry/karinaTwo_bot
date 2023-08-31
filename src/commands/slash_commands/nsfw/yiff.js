const comando = require("../../../structures/commands/command.js");
const { profile } = require('../../../data/ini.js').user;

const data_2 = ["gay","straight","lesbian","synormorph","bulge","andromorph"]
const Discord = require("discord.js");
//var yiff_ = new yiff.yiff()


class Command extends comando {
    command_data = {
        name: "yiff",
        description: "(nsfw) get images of a certain category in e621/furaffinity",
        description_localizations: {
            "pt-BR": "(nsfw) obter imagens de uma determinada categoria na e621/furaffinity"
        },
        dmPermission: false,
        nsfw: true,
        options: [
            {
                type: 3,
                required: true,
                name: "type",
                description: "choose the type of image for me to send",
                name_localizations: {
                    "pt-BR": "tipo"
                },
                description_localizations: {
                    "pt-BR": "escolha o tipo de imagem para eu enviar"
                },
                choices: [
                    {
                        name: "straight",
                        value: "straight",
                    },
                    {
                        name: "⭐ gay",
                        value: "gay",
                    },
                    {
                        name: "⭐ lesbian",
                        value: "lesbian",
                    },
                    {
                        name: "gynomorph",
                        value: "synormorph",
                    },
                    {
                        name: "⭐ bulge",
                        value: "bulge",
                    },
                    {
                        name: "andromorph",
                        value: "andromorph",
                    }
                ]
            }
        ]
    }
    
    constructor(...args) {
        super(...args, {
            name: "yiff",
            nsfw: true,
            category: "nsfw"
        })
    }
    async interactionRun(interaction, t){
        await interaction.deferReply({ ephemeral:  this.deferReply}).catch(() => {});
        let data = interaction.options.getString('type');
        let value = await profile.find(interaction.user);
        let json = await this.client.private_api.yiff[data]();
        
        let embed = new Discord.EmbedBuilder().setImage(json.post.url).setColor("#7B68EE").setDescription(`${t("commands:yiff.label.artist")}: ${json.post.author}`);
        
        if((data == "gay" || data == "bulge" || data == "lesbian") && !value.config.vip.active){
            interaction.editReply({
                content: t("commands:global.vip_user_arg", {
                    arg: (data).toString()
                })
            });
            
            return {}
        } else {
            interaction.editReply({
                embeds: [embed]
            });
            
            return {}
        }   
    }

    command_info(){
        return {
            activated: false,
            pt: {
                name: "yiff",
                description: "obter imagens de uma certa caregoria",
                permissions: {
                    bot: [],
                    user: []
                },
                category: "nsfw",
                usage: "<gay | straight | lesbian | gynomorph | bulge | andromorph>",
                subCommands: []
            },
            en: {
                name: "yiff",
                description: "get images of a certain category",
                permissions: {
                    bot: [],
                    user: []
                },
                category: "nsfw",
                usage: "<gay | straight | lesbian | gynomorph | bulge | andromorph>?",
                subCommands: []
            }
        }
    }
}

module.exports = Command