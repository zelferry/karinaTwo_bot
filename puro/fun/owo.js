let comando = require("../../frameworks/commando/command_slash.js");

const ne = require('nekos.life');
const neko = new ne();


class Command extends comando {
    constructor(...args) {
        super(...args, {
            name: "owo",
            description: "[ 😂 diversão ] owo",
            commandOptions: []
        })
    }
    async interactionRun(interaction){
        neko.sfw.catText().then(async (catText) => {
            let text = catText.cat;
            
            await interaction.reply({
                content: text
            })
        })
    }
} 
module.exports = Command 
