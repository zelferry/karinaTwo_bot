let comando = require("../../frameworks/commando/command.js");
let { economydb } = require("../../mongoDB/ini.js").user 

let Discord = require("discord.js"); 
let timeout = 86400000

class Command extends comando {
    constructor(...args) {
        super(...args, {
            name: "daily",
            description: "[ 💸economia ] pegar seus panther-coins diários!",
            category: "economy"/*,
            subCommands: [],
            commandOptions: []*/
        })
    }
    async interactionRun(interaction){
        await interaction.deferReply({ ephemeral:  this.deferReply}).catch(() => {});
        let value = await economydb.fech(interaction.user);

        let pescaresult = Math.floor(Math.random() * 49) + 1;

        if(value.daily !== null && timeout - (Date.now() - value.daily) > 0){
            var time = this.client.dist.modules.parse_ms(timeout - (Date.now() - value.daily));
           // console.log(time)
            interaction.followUp({
                content: `Você já coletou hoje! Aguarde mais **${time.hours}h ${time.minutes}m ${time.seconds}s**!`,
                ephemeral: true
            });
            return {}
        } else {
            let answer = 9 
            
            try {
                if(value.vipUser == true) {
                    answer = pescaresult * pescaresult * 2 + 100
                } else {
                    answer = pescaresult * pescaresult + 10
                }
            } catch (err) {
                return interaction.followUp({
                    embeds: [
                        {
                            fields: [
                                {
                                    name: "aconteceu um erro!",
                                    value: "```js\n"+ err +"\n```"
                                }
                            ]
                        }
                    ],
                    ephemeral: true
                })
            }
            let perf = new Discord.MessageEmbed().setColor("be41f4").setThumbnail(interaction.user.avatarURL()).setDescription("**" + interaction.user.tag + `** | Parabéns, Você pescou \`` + pescaresult + ` pokémon(s) aquático(s)\`!! \nQuantia recebida pela venda dos pokémons: \`${answer} Panther-coins\``).setTimestamp();

            await interaction.editReply({ embeds:[perf] });
            await economydb.addmoney(interaction.user,answer,true)
        } //fim
    }
} 
module.exports = Command 
