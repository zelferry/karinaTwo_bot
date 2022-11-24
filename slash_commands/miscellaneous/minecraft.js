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
            commandOptions: [
                {
                    type: 1,
                    name: "creeper",
                    description: "[ 🤪miscellaneou ] did you see a creeper, and what was your reaction?",
                },
                {
                    type: 1,
                    name: "mcc",
                    description: "[ 🤪miscellaneous ] create an achievement board!",
                    options: [...subCOMMAND_opition1_1]
                },
                {
                    type: 1,
                    name: "server_status",
                    description: "[ 🤪miscellaneous ] see information of a minecraft server",
                    options: [...subCOMMAND_opition2_1]
                }
            ]
        })
    }
    async interactionRun(interaction, t){
        await interaction.deferReply({ ephemeral:  this.deferReply}).catch(() => {});
        let subCOMMAND = interaction.options.getSubcommand();

        if(subCOMMAND === "creeper"){
            //let data = this.client.contents.minecraft.crepeer[Math.floor(Math.random() * this.client.contents.minecraft.crepeer.length)];

            interaction.editReply({
                content: `🏔**|** "${t("commands:minecraft.crepeer.label_"+(Math.floor(Math.random() * 10) + 1)+"")}"`
            });
            return {}
        } else if(subCOMMAND === "mcc"){
            let title1 =  interaction.options.getString("title") ? (interaction.options.getString("title") + " | ") : ""+t("commands:minecraft.mcc.defaut_title")+" | "
            let args = `${title1}${interaction.options.getString("description")}`
            //console.log(args)
            let [title, contents] = args.split("|"); 

            let rnd = Math.floor((Math.random() * 28) + 1);

            if (title.length > 24 || contents.length > 22){
                interaction.followUp({
                    content: t("commands:minecraft.mcc.error"),
                    ephemeral: true
                })
                return {}
            } else {
                const url = `https://skinmc.net/en/achievement/${rnd}/${encodeURIComponent(title)}/${encodeURIComponent(contents)}`;

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
                    content: t("commands:minecraft.server.error"),
                    ephemeral: true
                });
                return {}
            } else {
                let attachment = new Discord.MessageAttachment(Buffer.from(body.favicon.substr('data:image/png;base64,'.length), 'base64'), "icon.png");
                 let embed = new Discord.MessageEmbed().setThumbnail("attachment://icon.png").addField(t("commands:minecraft.server.label.version"), body.server.name).addField(t("commands:minecraft.server.label.connected"), `${body.players.now} players`).addField(t("commands:minecraft.server.label.max"), `${body.players.max} players`).addField("status", (body.online ? "online" : "offline")).addField("motd:", `\`\`\`\n${body.motd}\n\`\`\``).setColor("#FF0000");

                interaction.editReply({
                    files: [attachment],
                    embeds: [embed]
                })
                return {}
            }
        }
    }

    command_info(){
        return {
            activated: true,
            pt: {
                name: "minecraft",
                description: "blocos e bixo verde",
                permissions: {
                    bot: [],
                    user: []
                },
                category: "micelanea",
                usage: "<sub comando>",
                subCommands: [
                    {
                        name: "creeper",
                        description: "um **bixo verde** apareceu no seu mundo!"
                    },
                    {
                        name: "mcc",
                        description: "criar uma plac de conquista"
                    },
                    {
                        name: "server",
                        description: "ver informações de um servidor de minecraft!"
                    }
                ]
            },
            en: {
                name: "minecraft",
                description: "blocks and green bug",
                permissions: {
                    bot: [],
                    user: []
                },
                category: "miscellaneous",
                usage: "<sub command>",
                subCommands: [
                    {
                        name: "creeper",
                        description: "a **green bug** has appeared in your world!"
                    },
                    {
                        name: "mcc",
                        description: "create an achievement board"
                    },
                    {
                        name: "server",
                        description: "see information of a minecraft server!"
                    }
                ]
            }
        }
    }
} 
module.exports = Command 