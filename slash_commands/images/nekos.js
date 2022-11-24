let comando = require("../../frameworks/commando/command.js");
let datacoices = require("../../database/slash_commands/sub_commands/nekos.js")
let Discord = require("discord.js");

let endpoint1 = [
    "tickle",
    "slap",
    "poke",
    "pat",
    "neko",
    "meow",
    "lizard",
    "kiss",
    "hug",
    "foxGirl",
    "feed",
    "cuddle",
    "nekoGif",
    "kemonomimi",
    "holo",
    "smug",
    "baka",
    "woof",
    "wallpaper",
    "goose",
    "gecg",
    "avatar",
    "waifu"
];

class Command extends comando {
    constructor(...args) {
        super(...args, {
            name: "nekos",
            description: "[ 🖨Image ] nekos commands!",
            category: "images",
            usage: "<sub comando>",
            commandOptions: [
                {
                    type: 3,
                    name: "type",
                    description: "image type",
                    required: true,
                    choices: endpoint1.map((x) => {
                        return {
                            name: x,
                            value: x
                        }
                    })
                }
            ]
        })
    }
    async interactionRun(interaction, t){
        await interaction.deferReply({ ephemeral:  this.deferReply}).catch(() => {});
        let data1 = interaction.options.getString('type')
        let url1 = await this.client.private_api.nekos[data1]();

        if(url1.success === false){
            interaction.followUp({
                content: t("commands:global.error.api_error"),
                ephemeral: true
            });
            return {}
        } else {
            let embed_1 = new Discord.MessageEmbed().setImage(url1.url).setColor("#FA8072");
            interaction.editReply({
                embeds: [embed_1]
            });
            return {}
        }
    }

    command_info(){
        return {
            activated: true,
            pt: {
                name: "nekos",
                description: "comandos de nekos!!",
                permissions: {
                    bot: [],
                    user: []
                },
                category: "imagens",
                usage: "<categoria>",
                subCommands: []
            },
            en: {
                name: "nekos",
                description: "nekos commands!",
                permissions: {
                    bot: [],
                    user: []
                },
                category: "images",
                usage: "<category>",
                subCommands: []
            }
        }
    }
}

module.exports = Command