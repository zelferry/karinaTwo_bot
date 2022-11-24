let comando = require("../../frameworks/commando/command.js");

var data_2 = ["gay","straight","lesbian","synormorph","bulge","andromorph"]

//var yiff = require("yiff_api")

var Discord = require("discord.js")
//var yiff_ = new yiff.yiff()


class Command extends comando {
    constructor(...args) {
        super(...args, {
            name: "yiff",
            description: "[ 😈 nsfw ] get images of a certain category",
            nsfw: true,
            category: "nsfw",
            usage: "<gay | straight | lesbian | gynomorph | bulge | andromorph>",
            commandOptions: [
                {
                    type: 3,
                    name: "type_image",
                    description: "choose the type of image for me to send",
                    required: true,
                    choices: [
                        {
                            name: "gay",
                            value: "gay"
                        },
                        {
                            name: "straight",
                            value: "straight"
                        },
                        {
                            name: "lesbian",
                            value: "lesbian"
                        },
                        {
                            name: "gynomorph",
                            value: "synormorph"
                        },
                        {
                            name: "bulge",
                            value: "bulge"
                        },
                        {
                            name: "andromorph",
                            value: "andromorph"
                        }
                    ]
                }
            ]
        })
    }
    async interactionRun(interaction, t){
        await interaction.deferReply({ ephemeral:  this.deferReply}).catch(() => {});
        let data = interaction.options.getString('type_image');
        let json = await this.client.private_api.yiff[data]();
        
        let embed = new Discord.MessageEmbed().setImage(json.yiffMediaURL).setColor("#7B68EE").setDescription(`${t("commands:yiff.label.artist")}: ${json.artists.length > 0 ? json.artists.map((c) => `\`${c}\``).join(", ") : t("commands:yiff.label.no_foud")}`);
        interaction.editReply({ embeds: [embed] })
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