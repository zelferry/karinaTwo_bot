const Discord = require('discord.js')
const fetch = require('node-fetch')
const disbut = require('discord-buttons');
/*
choices: [
                { name: "pg", value: "pg" },
                { name: "pg13", value: "pg13" },
                { name: "r", value: "r" }
            ]
            */
module.exports = {
	name: 'wiki',
	description: '《🔁 micelânea》pesquisar algo na wikipédia!',
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
            choices:[
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
    ],
	global: true,
	async execute(interaction,client) {
		const args1 = interaction.data.options[0].value.split(" ")
const language = interaction.data.options[1] ? interaction.data.options[1].value : "pt"
    
        const search = args1.join('_');

        const searchword = encodeURI(search)
        
const res = await fetch("https://"+language+".wikipedia.org/api/rest_v1/page/summary/" + searchword);
        const data = await res.json();
//onsole.log(data)
        const title = data.title;
        const text = data.extract || "Não foi possível recuperar nenhum resultado. Tente pesquisar com distinção entre maiúsculas e minúsculas.";

        let thumbnail = data.originalimage ? data.originalimage.source : null 
        let url = data.content_urls ? data.content_urls.desktop.page : null
        let button_ = new disbut.MessageButton().setStyle('url').setURL(url ? url:"https://pt.wikipedia.org/").setLabel('ver mais na web') 
        if(url == null) button_.setDisabled()

        const embed = new Discord.MessageEmbed()
            .setColor(`#00b140`)
            .setTitle(title)
            .setURL(url)
            .setThumbnail(thumbnail)
            .setDescription(text)
            .setFooter("Powered by Wikipedia", "https://i.ibb.co/VWvCzg1/wikipedia.png")
            
client.api.interactions(interaction.id, interaction.token).callback.post({data: {
                type: 4,
                data: {
                        embeds: [embed],
                        components:[{ type: 1, components: [button_] }]
                    }
                }
            })
	}
}
