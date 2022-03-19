let comando = require("../../frameworks/commando/command.js");
let choices1 = require("../../database/slash_commands/choices/miscellaneous/wiki.json") 

const Discord = require('discord.js')
const fetch = require('node-fetch')

class Command extends comando {
    constructor(...args) {
        super(...args, {
            name: "wikipedia",
            description: "[ 🤪miscelânea ] pesquise algo na wikipedia sem sair do discord!",
            commandOptions: [
                {
                    type: 3,
                    name: "args",
                    description: "oque você vai pesquisar?",
                    required: true
                },
                {
                    type: 3,
                    name: "language",
                    description: "idioma a ser pesquisada",
                    choices: [...choices1]
                }
            ]
        })
    }
    async interactionRun(interaction){
        await interaction.deferReply({ ephemeral:  this.deferReply}).catch(() => {});
        const args1 = interaction.options.getString('args').split(" ");
        const language = interaction.options.getString('language') ?? "pt";
    
        const search = args1.join('_');

        const searchword = encodeURI(search);
        const res = await fetch("https://"+language+".wikipedia.org/api/rest_v1/page/summary/" + searchword);
        
        const data = await res.json();
//onsole.log(data)
        const title = data.title;
        const text = data.extract || "Não foi possível recuperar nenhum resultado. Tente pesquisar com distinção entre maiúsculas e minúsculas.";

        let thumbnail = data.originalimage ? data.originalimage.source : null 
        let url = data.content_urls ? data.content_urls.desktop.page : null
        let button_ = new Discord.MessageButton().setStyle('LINK').setURL(url ? url:"https://pt.wikipedia.org/").setLabel('ver mais na web') 
        if(url == null) button_.setDisabled();

        let embed = new Discord.MessageEmbed().setColor(`#00b140`).setTitle(title).setURL(url).setThumbnail(thumbnail).setDescription(text).setFooter({text:"Powered by Wikipedia", iconURL: "https://i.ibb.co/VWvCzg1/wikipedia.png"});
        
        let row = new Discord.MessageActionRow().addComponents(button_);
        
        await interaction.editReply({
            embeds: [embed],
            components: [row]
        })
    }
} 
module.exports = Command 