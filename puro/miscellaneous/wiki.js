let comando = require("../../frameworks/commando/command_slash.js");

const Discord = require('discord.js')
const fetch = require('node-fetch')

class Command extends comando {
    constructor(...args) {
        super(...args, {
            name: "wiki",
            description: "[ 🤪 miscelânea ] pesquiss algo na wikipedia sem sair do discord!",
            commandOptions: [
                {
			type: 3,
            name: "search-query",
            description: "o que você vai pesquisar?",
            required: true
		},
		{
			type: 3,
            name: "language",
            description: "idioma para a pesquisar na wiki!",
            required: false,
            choices: [
            	{
            		name:"português",
            		value:"pt"
            	},
            	{
            		name:"inglês (english)",
            		value:"en"
            	}
            ]
        }
            ]
        })
    }
    async interactionRun(interaction){
        const args1 = interaction.options.getString('search-query').split(" ");
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

        let embed = new Discord.MessageEmbed().setColor(`#00b140`).setTitle(title).setURL(url).setThumbnail(thumbnail).setDescription(text).setFooter("Powered by Wikipedia", "https://i.ibb.co/VWvCzg1/wikipedia.png");
        
        let row = new Discord.MessageActionRow().addComponents(button_);
        
        await interaction.reply({
            embeds: [embed],
            components: [row]
        })
    }
} 
module.exports = Command 