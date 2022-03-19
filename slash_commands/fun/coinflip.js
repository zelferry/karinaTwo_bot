let comando = require("../../frameworks/commando/command.js");
let choices1 = require("../../database/slash_commands/choices/fun/coinflip.json");
let { economydb } = require("../../mongoDB/ini.js").user;

let Discord = require("discord.js"); 

class Command extends comando {
    constructor(...args) {
        super(...args, {
            name: "coinflip",
            description: "[ 😂diversão ] aposte cara ou coroa comigo!",
            category: "fun",
            usage: "<cara | coroa>",
            commandOptions: [
                {
                    type: 3,
                    name: "side",
                    description: "qual será o lado que você ira escolher?",
                    required: true,
                    choices: [...choices1]
                }
            ]
        })
        this.coinflip_system = [
            {
                value: "cara",
                emoji: "<:heards:823247399040319498>"
            },
            {
                value: "coroa",
                emoji: "<:tails:823247556591091753>"
            }
        ]
    }
    async interactionRun(interaction){
        await interaction.deferReply({ ephemeral:  this.deferReply}).catch(() => {});
        let data = interaction.options.getString("side");
        let value = await economydb.fech(interaction.user);
        let array = this.coinflip_system[Math.floor(Math.random() * this.coinflip_system.length)];

        if(value.coins <= 19){
            return interaction.followUp({
                content: "🚫**|** você não tem panther-coins suficientes!\n💸**|** e necessário ter **20** ou mais panther-coins para girar a moeda!"
            })
        } else if(data == array.value){
            await economydb.addmoney(interaction.user, 20, false);
            interaction.editReply({
                content: `${array.emoji}**|** deu **${array.value}**, você ganhou dessa vez!\n💸**|** adiconei **20** panther-coins na sua carteira!`
            })
            return {}
        } else if(data != array.value){
            await economydb.removemoney(interaction.user, 20);
            interaction.editReply({
                content: `${array.emoji}**|** deu **${array.value}**, você perdeu dessa vez!\n💸**|** retirei **20** panther-coins da sua carteira pela derrota`
            })
            return {}
        }
    }
} 
module.exports = Command 
