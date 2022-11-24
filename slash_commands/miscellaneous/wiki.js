let comando = require("../../frameworks/commando/command.js");
let choices1 = require("../../database/slash_commands/choices/miscellaneous/wiki.json") 

const Discord = require('discord.js')
const fetch = require('node-fetch')

class Command extends comando {
    constructor(...args) {
        super(...args, {
            name: "wikipedia",
            description: "[ 🤪miscellaneous ] search for something on wikipedia without leaving discord!",
            commandOptions: [
                {
                    type: 3,
                    name: "args",
                    description: "what are you going to search?",
                    required: true
                },
                {
                    type: 3,
                    name: "language",
                    description: "language to search",
                    choices: [...choices1]
                }
            ]
        })
    }
    async interactionRun(interaction, t){
        await interaction.deferReply({ ephemeral:  this.deferReply}).catch(() => {});
        const args1 = interaction.options.getString('args').split(" ");
        const language = interaction.options.getString('language') ?? "en";
    
        const search = args1.join('_');

        const searchword = encodeURI(search);
        const res = await fetch("https://"+language+".wikipedia.org/api/rest_v1/page/summary/" + searchword);
        
        const data = await res.json();
//onsole.log(data)
        const title = data.title;
        const text = data.extract || t("commands:wikipedia.error");

        let thumbnail = data.originalimage ? data.originalimage.source : null 
        let url = data.content_urls ? data.content_urls.desktop.page : null
        let button_ = new Discord.MessageButton().setStyle('LINK').setURL(url ? url:"https://pt.wikipedia.org/").setLabel(t("commands:global.button.web")) 
        if(url == null) button_.setDisabled();

        let embed = new Discord.MessageEmbed().setColor(`#00b140`).setTitle(title).setURL(url).setThumbnail(thumbnail).setDescription(text).setFooter({text:"Powered by Wikipedia", iconURL: "https://i.ibb.co/VWvCzg1/wikipedia.png"});
        
        let row = new Discord.MessageActionRow().addComponents(button_);
        
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