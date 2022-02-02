let comando = require("../../frameworks/commando/command.js");
let { profile } = require("../../mongoDB/ini.js").user 

let Discord = require("discord.js"); 

class Command extends comando {
    constructor(...args) {
        super(...args, {
            name: "usertext",
            description: "[ 👤social ] alterar o seu \"sobre mim\" do \"/profile\"",
            category: "social",
            usage: "<texto>",
            commandOptions: [
                {
                    type: 3,
                    name: "args",
                    description: "qual será o seu novo \"sobre mim\"?",
                    required: true
                }
            ]
        })
    }
    async interactionRun(interaction){
        let args = interaction.options.getString('args');
        let value = await profile.find(interaction.user);

        if(!value.vipUser){
            interaction.reply({
                content: ":x: |apenas usuários **vips** podem alterar os textos personalizados",
                ephemeral: true
            });
            return {}
        } else {
            if(args.length >= 602){
                let embed = new Discord.MessageEmbed().setTitle('Erro').setDescription("**Textos com +603 caracteres não são permitidos, assim, evitarei bugs.**").setColor("#e0000f")
                interaction.reply({
                    embeds: [embed],
                    ephemeral: true
                });
                return {}
            } else {
                let embed1 = new Discord.MessageEmbed().addField("Novo usser text:", '```txt\n' + args + '```').setColor("#e0000f");
                
                interaction.reply({
                    embeds: [embed1]
                });
                await profile.setUserText(interaction.user, args);
                return {}
            }
        }
    }
} 
module.exports = Command 
