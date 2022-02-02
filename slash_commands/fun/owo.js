let comando = require("../../frameworks/commando/command.js");

let smileys = require('smileys');

class Command extends comando {
    constructor(...args) {
        super(...args, {
            name: "owo",
            description: "[ 😂diversão ] cat faces!",
            category: "fun"
        })
    }
    async interactionRun(interaction){
        let output = smileys.cat();

        interaction.reply({
            content: `${output}`
        })
    }
} 
module.exports = Command 