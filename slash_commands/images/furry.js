let comando = require("../../frameworks/commando/command.js");
let database_image = require("../../database/images/sfw/furry.json");

let mathRandom = (number) => ~~(Math.random() * number);

let Discord = require("discord.js"); 

class Command extends comando {
    constructor(...args) {
        super(...args, {
            name: "furry",
            description: "[ 🖨imagem ] imagens de furries! 030",
            category: "image"
        })
    }
    async interactionRun(interaction){
        await interaction.deferReply({ ephemeral:  this.deferReply}).catch(() => {});
        let number = mathRandom(database_image.length)
        let data = database_image[number];

        let embed = new Discord.MessageEmbed().setImage(data).setColor("#7B68EE").setFooter({text:`${number+1} / ${database_image.length}`});

        interaction.editReply({
            embeds: [embed]
        })
    }
} 
module.exports = Command 
