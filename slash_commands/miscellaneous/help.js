let comando = require("../../frameworks/commando/command.js");
const packag = require("../../package.json");


let Discord = require("discord.js"); 

class Command extends comando {
    constructor(...args) {
        super(...args, {
            name: "help",
            description: "comandos de ajuda!",
            category: "miscellaneous",
            usage: "<sub comando>",
            subCommands: [
                {
                    name: "bot",
                    description: "sobre a bot"
                },
                {
                    name: "devs",
                    description: "sobre os meus desenvolvedores"
                },
                {
                    name: "commands",
                    description: "sobre os comandos existentes"
                }
            ],
            commandOptions: [
                {
                    type: 1,
                    name: "bot",
                    description: "[ 🤪miscelânea ] sobre a bot"
                },
                {
                    type: 1,
                    name: "devs",
                    description: "[ 🤪miscelânea ] sobre os meus desenvolvedores"
                },
                {
                    type: 1,
                    name: "commands",
                    description: "[ 🤪miscelânea ] sobre os comandos existentes"
                }
            ]
        })
    }
    async interactionRun(interaction){
        let subCOMMAND = interaction.options.getSubcommand();

        if(subCOMMAND === "bot"){
            let totalSeconds = this.client.uptime / 1000;
            let days = Math.floor(totalSeconds / 86400);
            let hours = Math.floor(totalSeconds / 3600);
            totalSeconds %= 3600;
            let minutes = Math.floor(totalSeconds / 60);
            let seconds = totalSeconds % 60;

            let uptime = `${days.toFixed()}D ${hours.toFixed()}H ${minutes.toFixed()}M ${seconds.toFixed()}S`;

            interaction.editReply({
                embeds: [
                    {
                        title: "karinaTwo",
                        description: "OH, OLA!!\nsou a karinaTwo!, uma bot multiuso com funções e comandos bem legais!\n\nvocê pode me chamar de KARINA, KARI ou do que vc achar melhor!\n\nsou uma bot focada mais para o público **FURRY**, mas qualquer um pode usar minhas funcionalidades e comandos para se entreter",
                        color: 65531,
                        author: {
                            name: "clique aqui para entrar em meu servidor de suporte",
                            url: this.client.contents.links.server
                        },
                        fields: [
                            {
                                name: "linguagem de programação",
                                value: "fui feita usando a linguagem de programação JAVASCRIPT\neu usso a livraria do [discord.js](https://discord.js.org/#/)"
                            },
                            {
                                name: "uptime",
                                value: `**${uptime}**\nlenbrando: eu sou reiniciada quando tenho que aplicar alguma alteração nos meus comandos e etc...`
                            },
                            {
                                name: "estou...",
                                value: `em ${this.client.guilds.cache.size} servidores!\nposso ser usada em ${this.client.channels.cache.size} canais de texto!`
                            },
                            {
                                name:"informações do meu sistema:",
                                value:"ffpeg: **canvascord**, **jimp**\ndatabase: **mongoose** \nsistema: **discord.js**\nversão da bot: **"+packag.version+"**\nbits do meu sistema: **128 BITS**"

                            }
                        ]
                    }
                ]
            });
            return {}
        } else if(subCOMMAND === "devs"){
            interaction.editReply({
                embeds:[
                    {
                        description: "meus desenvolvedores\ngrassas a eles, eu existo no discord!!",
                        color: 65531,
                        fields: this.client.dist.modules.devs_treat()
                    }
                ]
            })
            return {}
        } else if(subCOMMAND === "commands"){
            let commands1 = this.client.commands2//.filter((cmd) => cmd.category);

            let dataCMDs = [
                {
                    label: `📱 discord(${commands1.filter((cmd) => cmd.category == "discord").size})`,
                    commands: commands1.filter((cmd) => cmd.category == "discord").map((x) => "`"+x.name+"`").join(", ")
                },
                {
                    label: `💸 economia(${commands1.filter((cmd) => cmd.category == "economy").size})`,
                    commands: commands1.filter((cmd) => cmd.category == "economy").map((x) => "`"+x.name+"`").join(", ")
                },
                {
                    label: `🤣 diversão(${commands1.filter((cmd) => cmd.category == "fun").size})`,
                    commands: commands1.filter((cmd) => cmd.category == "fun").map((x) => "`"+x.name+"`").join(", ")
                },
                {
                    label: `📷 imagens(${commands1.filter((cmd) => cmd.category == "image").size})`,
                    commands: commands1.filter((cmd) => cmd.category == "image").map((x) => "`"+x.name+"`").join(", ")
                },
                {
                    label: `👩‍⚖️ administração(${commands1.filter((cmd) => cmd.category == "management").size})`,
                    commands: commands1.filter((cmd) => cmd.category == "management").map((x) => "`"+x.name+"`").join(", ")
                },
                {
                    label: `🤔 miscelânea(${commands1.filter((cmd) => cmd.category == "miscellaneous").size})`,
                    commands: commands1.filter((cmd) => cmd.category == "miscellaneous").map((x) => "`"+x.name+"`").join(", ")
                },
                {
                    label: `✏️ photoshop(${commands1.filter((cmd) => cmd.category == "photoshop").size})`,
                    commands: commands1.filter((cmd) => cmd.category == "photoshop").map((x) => "`"+x.name+"`").join(", ")
                },
                {
                    label: `👤 social(${commands1.filter((cmd) => cmd.category == "social").size})`,
                    commands: commands1.filter((cmd) => cmd.category == "social").map((x) => "`"+x.name+"`").join(", ")
                },
                {
                    label: `🤳 utilitários(${commands1.filter((cmd) => cmd.category == "utility").size})`,
                    commands: commands1.filter((cmd) => cmd.category == "utility").map((x) => "`"+x.name+"`").join(", ")
                }
            ];
            let frields = [];
            //utility
            let channels_ = interaction.guild.channels.cache.filter((channel) => channel.nsfw).map(x => "<#"+x.id+">");
            
            if(channels_.length > 0){
                dataCMDs.push({
                    label: `😈 nsfw(${commands1.filter((cmd) => cmd.category == "nsfw").size})`,
                    commands: commands1.filter((cmd) => cmd.category == "nsfw").map((x) => "`"+x.name+"`").join(", ")
                })
            }
            //photoshop
            for(let i in dataCMDs){
                let data = dataCMDs[i]
                frields.push({
                    name: `${data.label}`,
                    value: `${data.commands.toString()}`
                })
            }
            //console.log(frields)
            let embed = {
                title: "Minha lista de comandos!",
                color: "#7A67EE",
                fields: frields,
                footer: {
                    text: "alguns dos comandos não estão sendo exibidos por serem SubComandos"
                }
            };
            
            interaction.editReply({embeds:[embed]})
            return {}
        }
    }
} 
module.exports = Command 
