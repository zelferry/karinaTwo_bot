let comando = require("../../frameworks/commando/command.js");
let fetch = require("node-fetch"); 
let Discord = require("discord.js"); 

class Command extends comando {
    constructor(...args) {
        super(...args, {
            name: "animals",
            description: "[ 🖨imagem ] IMAGENS de animais fofos!",
            category: "images",
            usage: "<categoria>",
            commandOptions: [
                {
                    type: 3,
                    name: "type",
                    description: "qual será o tipo?",
                    required: true,
                    choices: [
                        {
                            name: "birb",
                            value: "birb"
                        },
                        {
                            name: "cats",
                            value: "meow"
                        },
                        {
                            name: "dog",
                            value: "dog"
                        },
                        {
                            name: "duck",
                            value: "duck"
                        },
                        {
                            name: "fox",
                            value: "fox"
                        },
                        {
                            name: "rabbit",
                            value: "rabbit"
                        }
                    ]
                }
            ]
        })
    }
    async interactionRun(interaction){
        await interaction.deferReply({ ephemeral:  this.deferReply}).catch(() => {});
        
        let data = interaction.options.getString('type');
        let url1 = null

        if(data === "birb"){
            let url = await fetch("https://some-random-api.ml/img/birb").then(rep => rep.json());
            url1 = url.link
        } else if(data === "meow"){
            let url = await fetch("https://aws.random.cat/meow").then(rep => rep.json());
            url1 = url.file
        } else if(data === "dog"){
            let url = await fetch("https://random.dog/woof.json").then(rep => rep.json());
            url1 = url.url
        } else if(data === "duck"){
            let url = await fetch("https://random-d.uk/api/v1/random?type=gif").then(rep => rep.json());
            url1 = url.url
        } else if(data === "fox"){
            let url = await fetch("https://randomfox.ca/floof/").then(rep => rep.json());
            url1 = url.image
        } else if(data === "rabbit"){
            let url = await fetch("https://api.bunnies.io/v2/loop/random/?media=gif,png").then(rep => rep.json());
            url1 = url.media.gif
        }
        //console.log(url1); eu amo javascript
        
        let embed = new Discord.MessageEmbed().setImage(url1).setColor("#FF69B4").setAuthor({ name: "clique aqui se não estiver aparecendo", url: url1})
        
        interaction.editReply({
            embeds: [embed]
        });
    }
} 

module.exports = Command 