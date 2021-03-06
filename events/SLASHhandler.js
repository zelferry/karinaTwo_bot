let util = require('../utils/main.js');
let KariWebhooks = new util.webhooks1();
let Discord = require('discord.js');

function interactionresolva(int){
    let subCOMMANDs = int._subcommand ? int._subcommand : '';
    let optionsCOMMAND = int._hoistedOptions.length > 0 ? int._hoistedOptions.map((x) => `${x.name}: ${x.value}`).join(" ") : ''

    return `${subCOMMANDs} ${optionsCOMMAND}`
}

let { bansUsers } = require("../mongoDB/ini.js").user
let { configs } = require("../mongoDB/ini.js").guild 
//antiNsfw
exports.type = "interactionCreate";
exports.start = async(client,clusterID,ipc,interaction) => {
    if (!interaction.isCommand()) return;
	if (!client.commands2.has(interaction.commandName.toLowerCase())) return;

    let command =  client.commands2.get(interaction.commandName.toLowerCase());
    
    function KariHandler() {
        new Promise(async (res, rej) => {
            try {
                await command.interactionRun(interaction);
            } catch(err) {
                await interaction.deferReply();
                console.log(err)
                
                let errorEmbed = new Discord.MessageEmbed().setColor("RED").setTitle("Erro ao executar comando").setDescription(`\ \ \`\`\`js\n${err}\n\`\`\``);

                interaction.editReply({ embeds: [errorEmbed], ephemeral: true })
            }
        })
    }
    
	try {
        let vailar = await bansUsers.seekAndValidateBan(interaction.user);
        let config__ = await configs.getConfig(interaction.guild, true);
        
        if(command.permissions.user.length > 0 && !interaction.member.permissions.has(command.permissions.user)) {
            return client.extra.utils.permissions.check.Member({ MemberPerm: command.permissions.user },interaction)
        } else if(command.permissions.bot.length > 0 && !interaction.guild.me.permissions.has(command.permissions.bot)){
            return client.extra.utils.permissions.check.Client({ ClientPerm: command.permissions.bot }, interaction)
        } else if (command.nsfw && !interaction.channel.nsfw){
            return client.extra.utils.message.noNsfw(client, interaction);
        } else if(command.nsfw && config__.antiNsfw){
            await interaction.deferReply({ ephemeral: true }).catch(() => {});
            
            interaction.editReply({
                content: "????**|** voc?? n??o pode utilizar comandos **nsfw** enquanto o m??dulo **anti-nsfw** estiver ativado"
            });
            return {}
        } else if(vailar.ready){
            await interaction.deferReply({ ephemeral: true }).catch(() => {});
            
            interaction.editReply({
                embeds: [
                    {
                        description: ':no_entry_sign: voc?? foi banido de usar meus comandos!',
                        color: 389301,
                        fields: [
                            {
                                name: "com o motivo:",
                                value: `\`\`\`txt\n${vailar.reason}\n\`\`\``
                            }
                        ]
                    }
                ]
            });
            return {}
        } else {
            KariHandler();

            KariWebhooks.commands({
                embeds: [
                    {
                        title: "comando executado",
                        description: `o comando ***/${interaction.commandName.toLowerCase()}*** foi executado pelo ${interaction.user.tag} com sucesso!`,
                        color: "#EE82EE",
                        fields: [
                            {
                                name: "usu??rio:",
                                value: `tag: \`${interaction.user.tag}\`\nid: \`${interaction.user.id}\``
                            },
                            {
                                name: "comando inteiro",
                                value: `\`/${interaction.commandName.toLowerCase()} ${interactionresolva(interaction.options)}\``
                            }
                        ]
                    }
                ]
            });
        }
	} catch (err) {
		console.error(err);
	}
}