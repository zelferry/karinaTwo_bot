let comando = require("../../frameworks/commando/command.js");

let Discord = require("discord.js"); 
const calculator = require("../../buttonSystem/calculator/index.js");

class Command extends comando {
    constructor(...args) {
        super(...args, {
            name: "calculator",
            description: "[ 📲discord ] Apenas uma calculadora casual.",
            category: "discord",
            commandOptions: []
        })
    }
    async interactionRun(interaction){
        //console.log(interaction.commandId)
        calculator(interaction, {
            /*slash: true,*/
            embedColor: '#075FFF',
            credit: false,
            embedFoot: `use os botões para fazer cálculos matemáticos!`
        })
    }
} 
module.exports = Command 
