let comando = require("../../frameworks/commando/command.js");
let subCOMMAND_opition1_1 = require("../../database/slash_commands/sub_commands/minecraft.mcc.json");
let subCOMMAND_opition2_1 = require("../../database/slash_commands/sub_commands/minecraft.server_status.json")

let Discord = require("discord.js");
let fetch = require('node-fetch')

class Command extends comando {
    constructor(...args) {
        super(...args, {
            name: "minecraft",
            description: "comandos de minecraft!",
            category: "miscellaneous",
            usage: "<sub comando>",
            subCommands: [
                {
                    name: "creeper",
                    description: "\"AHHW MEN!\""
                },
                {
                    name: "mcc",
                    description: "criar uma placa de conquista!"
                }
            ],
            commandOptions: [
                {
                    type: 1,
                    name: "creeper",
                    description: "[ 🤪miscelânea ] você viu um creeper, e qual foi a sua reação",
                },
                {
                    type: 1,
                    name: "mcc",
                    description: "[ 🤪miscelânea ] criar uma placa de conquista!",
                    options: [...subCOMMAND_opition1_1]
                },
                {
                    type: 1,
                    name: "server_status",
                    description: "[ 🤪miscelânea ] veja informações de um servidor de minecraft",
                    options: [...subCOMMAND_opition2_1]
                }
            ]
        })
    }
    async interactionRun(interaction){
        await interaction.deferReply({ ephemeral:  this.deferReply}).catch(() => {});
        let subCOMMAND = interaction.options.getSubcommand();

        if(subCOMMAND === "creeper"){
            let data = this.client.contents.minecraft.crepeer[Math.floor(Math.random() * this.client.contents.minecraft.crepeer.length)];

            interaction.editReply({
                content: `🏔**|** ${data}`
            });
            return {}
        } else if(subCOMMAND === "mcc"){
            let title1 =  interaction.options.getString("title") ? (interaction.options.getString("title") + " | ") : "Conquista desbloqueada! | "
            let args = `${title1}${interaction.options.getString("description")}`
            //console.log(args)
            let [title, contents] = args.split("|"); 

            let rnd = Math.floor((Math.random() * 39) + 1);
            if (args.toLowerCase().includes("burn")) rnd = 38;
            if (args.toLowerCase().includes("cookie")) rnd = 21;
            if (args.toLowerCase().includes("cake")) rnd = 10;

            if (title.length > 24 || contents.length > 22){
                interaction.followUp({
                    content: "❌**|** a descrição precisa ter no maximo **22 letras**!",
                    ephemeral: true
                })
                return {}
            } else {
                const url = `https://www.minecraftskinstealer.com/achievement/a.php?i=${rnd}&h=${encodeURIComponent(title)}&t=${encodeURIComponent(contents)}`;

                interaction.editReply({
                    files:[
                        new Discord.MessageAttachment(url, 'mcconquista.png')
                    ]
                })
                return {}
            }
        } else if(subCOMMAND === "server_status"){
            let ip = interaction.options.getString("ip");
            let port = interaction.options.getNumber("port") ?? 25565;

            let url = `http://mcapi.us/server/status?ip=${ip}&port=${port}`;

            let res = await fetch(url);
            let body = await res.json()

            if(body.status === "error"){
                interaction.followUp({
                    content: "❌**|** aconteceu um pequeno erro\n🌐**|** insira um IP válido",
                    ephemeral: true
                });
                return {}
            } else {
                let attachment = new Discord.MessageAttachment(Buffer.from(body.favicon.substr('data:image/png;base64,'.length), 'base64'), "icon.png");
                 let embed = new Discord.MessageEmbed().setThumbnail("attachment://icon.png").addField("versão", body.server.name).addField("conectados", `${body.players.now} players`).addField("maximo", `${body.players.max} players`).addField("status", (body.online ? "online" : "offline")).addField("motd:", `\`\`\`\n${body.motd}\n\`\`\``).setColor("#FF0000");

                interaction.editReply({
                    files: [attachment],
                    embeds: [embed]
                })
                return {}
            }
        }
    }
} 
module.exports = Command 