let comando = require("../../frameworks/commando/command.js"); 

let Discord = require('discord.js');
let fetch = require('node-fetch');
let lang = (language) => {
    switch (language){
        case "pt-BR":
            return "pt"
        case "en-US":
            return "en"
        default:
            return "en"
    }
}

class Command extends comando {
    command_data = {
        name: "wikipedia",
        description: "(miscellaneous) search for something on wikipedia without leaving discord!",
        descriptionLocalizations: {
            "pt-BR": "(diversos) procure algo na wikipedia sem sair do discord!"
        },
        dmPermission: false,
        nsfw: false,
        options: [
            {
                type: 3,
                required: true,
                name: "args",
                description: "what are you going to search?",
                nameLocalizations: {
                    "pt-BR": "pesquisa"
                },
                descriptionLocalizations: {
                    "pt-BR": "o que você vai pesquisar?"
                }
            }
        ]
    }
    
    constructor(...args) {
        super(...args, {
            name: "wikipedia",
            category: "miscellaneous"
        })
    }
    async interactionRun(interaction, t){
        await interaction.deferReply({ ephemeral:  this.deferReply}).catch(() => {});
        
        let args1 = interaction.options.getString('args').split(" ");
        let language = lang(t.lng);
        let search = args1.join('_');

        let searchword = encodeURI(search);
        let res = await fetch("https://"+language+".wikipedia.org/api/rest_v1/page/summary/" + searchword);
        
        let data = await res.json();
        let title = data.title;
        let text = data.extract || t("commands:wikipedia.error");

        let thumbnail = data.originalimage ? data.originalimage.source : null;
        let url = data.content_urls ? data.content_urls.desktop.page : null;
        let button_ = new Discord.ButtonBuilder().setStyle(Discord.ButtonStyle.Link).setURL(url ? url:"https://pt.wikipedia.org/").setLabel(t("commands:global.button.web"));
        
        if(url == null) button_.setDisabled(true);

        let embed = new Discord.EmbedBuilder().setColor(`#00b140`).setTitle(title).setURL(url).setThumbnail(thumbnail).setDescription(text).setFooter({text:"Powered by Wikipedia", iconURL: "https://i.ibb.co/VWvCzg1/wikipedia.png"});
        
        let row = new Discord.ActionRowBuilder().addComponents(button_);
        
        await interaction.editReply({
            embeds: [embed],
            components: [row]
        })
    }

    command_info(){
        return {
            activated: true,
            pt: {
                name: "wikipedia",
                description: "pesquise algo na wikipedia dentro do discord!",
                permissions: {
                    bot: [],
                    user: []
                },
                category: "micelanea",
                usage: "<pesquisa> [linguagem]",
                subCommands: []
            },
            en: {
                name: "wikipedia",
                description: "search for something on wikipedia inside discord!",
                permissions: {
                    bot: [],
                    user: []
                },
                category: "miscellaneous",
                usage: "<search> [language]",
                subCommands: []
            }
        }
    }
} 
module.exports = Command 