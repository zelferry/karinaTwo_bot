let comando = require("../../frameworks/commando/command.js");

let data_1 = require("../../database/images/nsfw/nsfw.hentai.json");
let data_2 = require("../../database/images/nsfw/nsfw.gay.json")

let Discord = require("discord.js"); 

let mathRandom = (number) => ~~(Math.random() * number);

class Command extends comando {
    constructor(...args) {
        super(...args, {
            name: "nsfw",
            description: "comandos nsfw",
            category: "nsfw",
            nsfw: true,
            usage: "<sub comando>",
            subCommands: [
                {
                    name: "straight",
                    description: "nsfw straight"
                },
                {
                    name: "gay",
                    description: "nsfw gay"
                },
                {
                    name: "futa",
                    description: "nsfw futa"
                },
                {
                    name: "trap",
                    description: "nsfw trap"
                }
            ],
            commandOptions: [
                {
                    type: 1,
                    name: "straight",
                    description: "[ 😈nsfw ] nsfw straight"
                },
                {
                    type: 1,
                    name: "gay",
                    description: "[ 😈nsfw ] nsfw gay"
                },
                {
                    type: 1,
                    name: "futa",
                    description: "[ 😈nsfw ] nsfw futa"
                },
                {
                    type: 1,
                    name: "trap",
                    description: "[ 😈nsfw ] nsfw tral"
                }
            ]
        })
    }
    async interactionRun(interaction){
        let subCOMMAND = interaction.options.getSubcommand();

        if(subCOMMAND === "straight"){
            let number1 = mathRandom(data_1.length);
            let data1 = data_1[number1];
            
            let embed1 = new Discord.MessageEmbed().setImage(data1).setColor("#7B68EE").setFooter(`${number1 + 1} / ${data_1.length}`);

            interaction.editReply({
                embeds: [embed1]
            });
            return {}
        } else if(subCOMMAND === "gay"){
            let number2 = mathRandom(data_2.length);
            let data2 = data_2[number2];

            let embed2 = new Discord.MessageEmbed().setImage(data2).setColor("#7B68EE").setFooter(`${number2 + 1} / ${data_2.length}`);

            interaction.editReply({
                embeds: [embed2]
            });
            return {}
        } else if(subCOMMAND === "futa"){
            let url = await this.client.getContainer("api/nekos/nsfw/futanari");
            if(url.send === false){
                interaction.followUp({
                    content: "😭**|** desculpe, mas parece que a RERIMBOCADAPARAFUZETA do servidor estourou :c"
                })
                return {}
            } else {
                let button_1 = new Discord.MessageButton().setStyle('LINK').setURL('https://nekos.life/').setLabel('ver website original!');
                let button_2 = new Discord.MessageButton().setStyle('LINK').setURL(url.url).setLabel('ver imagem na web');
                let row1 = new Discord.MessageActionRow().addComponents(button_1,button_2);
                let embed3 = new Discord.MessageEmbed().setImage(url.url).setColor("#7B68EE");
                interaction.editReply({
                    embeds: [embed3],
                    components: [row1]
                });
            }
            return {}
        } else if(subCOMMAND === "trap"){
            let url = await this.client.getContainer("api/nekos/nsfw/trap");
            if(url.send === false){
                interaction.followUp({
                    content: "😭**|** desculpe, mas parece que a RERIMBOCADAPARAFUZETA do servidor estourou :c",
                    ephemeral: true
                })
                return {}
            } else {
                let button_1 = new Discord.MessageButton().setStyle('LINK').setURL('https://nekos.life/').setLabel('ver website original!');
                let button_2 = new Discord.MessageButton().setStyle('LINK').setURL(url.url).setLabel('ver imagem na web');
                let row1 = new Discord.MessageActionRow().addComponents(button_1,button_2);
                let embed3 = new Discord.MessageEmbed().setImage(url.url).setColor("#7B68EE");
                interaction.editReply({
                    embeds: [embed3],
                    components: [row1]
                });
            }
            return {}
        }
    }
} 
module.exports = Command 