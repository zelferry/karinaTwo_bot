let comando = require("../../frameworks/commando/command.js");

let data_1 = require("../../database/images/nsfw/furry/nsfw.json");
let data_2 = require("../../database/images/nsfw/furry/gay.json");
let data_3 = require("../../database/images/nsfw/furry/gynomorph.json");

let Discord = require("discord.js");

let mathRandom = (number) => ~~(Math.random() * number);

let defaut_options = [
    {
        type: 10,
        name: "size",
        description: "quantidade de urls a ser spawnada(máximo: 10)",
        required: true,
        minValue: 1,
        maxValue: 10
    }
]

class Command extends comando {
    constructor(...args) {
        super(...args, {
            name: "spam",
            description: "obter de 1 ou 10 urls de uma vez",
            category: "nsfw",
            nsfw: true,
            usage: "<sub comando>",
            subCommands: [
                {
                    name: "furry_nsfw",
                    description: "obter de 1 ou 10 urls de uma vez no comando /furry_nsfw"
                },
                {
                    name: "furry_gay",
                    description: "obter de 1 ou 10 urls de uma vez no comando /furry_nsfw"
                },
                {
                    name: "furry_gynomorph",
                    description: "obter de 1 ou 10 urls de uma vez no comando /furry_nsfw"
                }
            ],
            commandOptions: [
                {
                    type: 1,
                    name: "furry_nsfw",
                    description: "[ 😈nsfw ] obter de 1 ou 10 urls de uma vez no comando /furry_nsfw",
                    options: [...defaut_options]
                },
                {
                    type: 1,
                    name: "furry_gay",
                    description: "[ 😈nsfw ] obter de 1 ou 10 urls de uma vez no comando /furry_nsfw",
                    options: [...defaut_options]
                },
                {
                    type: 1,
                    name: "furry_gynomorph",
                    description: "[ 😈nsfw ] obter de 1 ou 10 urls de uma vez no comando /furry_nsfw",
                    options: [...defaut_options]
                }
            ]
        })

        this.spam = async(data_db, count) => {
            let urls = [];
            
            if (count > 10) {count = 10};
            if (count < 1) {count = 1};

            for (var i = 0; i < count; i++){
                let number1 = mathRandom(data_db.length);
                let result1 = data_db[number1];

                urls.push(result1)
            }
            return urls
        }
    }
    async interactionRun(interaction){
        await interaction.deferReply({ ephemeral:  this.deferReply}).catch(() => {});
        let subCOMMAND = interaction.options.getSubcommand();
        
        if(subCOMMAND === "furry_nsfw"){
            let urls1 = await this.spam(data_1, interaction.options.getNumber("size"));

            await interaction.editReply({
                content: `🔼**|** foram obtidos mais de ${interaction.options.getNumber("size")} urls na database local e online\n\n${urls1.map((x,y) => `[${(y + 1)}] <${x}>`).join("\n")}`
            })
        } else if(subCOMMAND === "furry_gay"){
            let urls2 = await this.spam(data_2, interaction.options.getNumber("size"));

            await interaction.editReply({
                content: `🔼**|** foram obtidos mais de ${interaction.options.getNumber("size")} urls na database local e online\n\n${urls2.map((x,y) => `[${(y + 1)}] <${x}>`).join("\n")}`
            })
        } else if(subCOMMAND === "furry_gynomorph"){
            let urls3 = await this.spam(data_3, interaction.options.getNumber("size"));

            await interaction.editReply({
                content: `🔼**|** foram obtidos mais de ${interaction.options.getNumber("size")} urls na database local e online\n\n${urls3.map((x,y) => `[${(y + 1)}] <${x}>`).join("\n")}`
            })
        }
        //7
    }
} 

module.exports = Command 