let comando = require("../../frameworks/commando/command.js");
const packag = require("../../package.json");


let Discord = require("discord.js"); 

class Command extends comando {
    constructor(...args) {
        super(...args, {
            name: "help",
            description: "help commands!",
            category: "miscellaneous",
            commandOptions: [
                {
                    type: 1,
                    name: "devs",
                    description: "[ 🤪miscellaneous ] about my developers"
                },
                {
                    type: 1,
                    name: "commands",
                    description: "[ 🤪miscellaneous ] over existing commands"
                }
            ]
        })
    }
    async interactionRun(interaction, t){
        await interaction.deferReply({ ephemeral:  this.deferReply}).catch(() => {});
        let subCOMMAND = interaction.options.getSubcommand();

       // console.log(t)
        
        if(subCOMMAND === "devs"){
            interaction.editReply({
                embeds:[
                    {
                        description: t("commands:help.devs"),
                        color: 65531,
                        fields: this.client.dist.modules.devs_treat(t.lng)
                    }
                ]
            });
            
            return {}
        } else if(subCOMMAND === "commands"){
            let commands1 = this.client.commands2//.filter((cmd) => cmd.category);

            let dataCMDs = [
                {
                    label: `${t("commands:help.commands.categorys.discord")}(${commands1.filter((cmd) => cmd.category == "discord").size})`,
                    commands: commands1.filter((cmd) => cmd.category == "discord").map((x) => "`"+x.name+"`").join(", ")
                },
                {
                    label: `${t("commands:help.commands.categorys.economy")}(${commands1.filter((cmd) => cmd.category == "economy").size})`,
                    commands: commands1.filter((cmd) => cmd.category == "economy").map((x) => "`"+x.name+"`").join(", ")
                },
                {
                    label: `${t("commands:help.commands.categorys.fun")}(${commands1.filter((cmd) => cmd.category == "fun").size})`,
                    commands: commands1.filter((cmd) => cmd.category == "fun").map((x) => "`"+x.name+"`").join(", ")
                },
                {
                    label: `${t("commands:help.commands.categorys.image")}(${commands1.filter((cmd) => cmd.category == "image").size})`,
                    commands: commands1.filter((cmd) => cmd.category == "image").map((x) => "`"+x.name+"`").join(", ")
                },
                {
                    label: `${t("commands:help.commands.categorys.management")}(${commands1.filter((cmd) => cmd.category == "management").size})`,
                    commands: commands1.filter((cmd) => cmd.category == "management").map((x) => "`"+x.name+"`").join(", ")
                },
                {
                    label: `${t("commands:help.commands.categorys.miscellaneous")}(${commands1.filter((cmd) => cmd.category == "miscellaneous").size})`,
                    commands: commands1.filter((cmd) => cmd.category == "miscellaneous").map((x) => "`"+x.name+"`").join(", ")
                },
                {
                    label: `${t("commands:help.commands.categorys.social")}(${commands1.filter((cmd) => cmd.category == "social").size})`,
                    commands: commands1.filter((cmd) => cmd.category == "social").map((x) => "`"+x.name+"`").join(", ")
                },
                {
                    label: `${t("commands:help.commands.categorys.utility")}(${commands1.filter((cmd) => cmd.category == "utility").size})`,
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
                title: t("commands:help.commands.title"),
                color: "#7A67EE",
                fields: frields,
                footer: {
                    text: t("commands:help.commands.footer")
                }
            };
            
            interaction.editReply({embeds:[embed]})
            return {}
        }
    }

    command_info(){
        return {
            activated: true,
            pt: {
                name: "help",
                description: "comandos de ajuda",
                permissions: {
                    bot: [],
                    user: []
                },
                category: "micelanea",
                usage: "<sub comando>",
                subCommands: [
                    {
                        name: "devs",
                        description: "sobre meus devs"
                    },
                    {
                        name: "commands",
                        description: "sobre os comandos existentes"
                    }
                ]
            },
            en: {
                name: "help",
                description: "help commands",
                permissions: {
                    bot: [],
                    user: []
                },
                category: "miscellaneous",
                usage: "<sub command>",
                subCommands: [
                    {
                        name: "devs",
                        description: "about my devs"
                    },
                    {
                        name: "commands",
                        description: "over existing commands"
                    }
                ]
            }
        }
    }
} 
module.exports = Command 
