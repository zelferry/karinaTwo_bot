const comando = require("../../../structures/commands/command.js");
const Discord = require("discord.js");
const os = require("os")

class Command extends comando {
    command_data = {
        name: "status",
        description: "(discord) status and ping from karinaTwo",
        description_localizations: {
            "pt-BR": "(discord) status e ping da karinaTwo"
        },
        dmPermission: false,
        nsfw: false,
        options: []
    }
    
    constructor(...args) {
        super(...args, {
            name: "status",
            category: "discord"
        })
    }
    async interactionRun(interaction, t){
        await interaction.deferReply({ ephemeral: this.deferReply }).catch(() => {});
        /*{"servidores: {{guild}}\nusuários: {{users}}\ncomandos no total: {{cmds}}"}*/
        let internal_system_summary = t('commands:status.system.description', {
            model: (os.cpus().map(c => c.model)[0]).toString(),
            ram: ((process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)).toString(),
            cpu_usage: ((process.cpuUsage().system / 1024 / 1024).toFixed(2)).toString(),
            bits: (process.arch).toString(),
            platform: (process.platform).toString()
        });

        let info_summary = t('commands:status.info.description', {
            guild: (this.client.guilds.cache.size).toString(),
            users: (this.client.users.cache.size).toString(),
            cmds: (client.commands2.toJSON().length).toString()
        });
        
        let embed = new Discord.EmbedBuilder().setTitle("🦊 | karinaTwo status").addFields({ name: `💻 | ${t('commands:status.system.title')}`, value: `\`${internal_system_summary}\`` },
                       {
                           name: "🕞 | ping",
                           value: `\`gateway Ping: ${Math.round(this.client.ws.ping)}ms\nAPI Ping: ${Date.now() - interaction.createdTimestamp}ms\ndatabase ping: ${Math.round(await this.client.db.ping())}ms\ncluster: ${Number(this.client.cluster.id) + 1}/${this.client.cluster.count}\``
                       },
                       { name: `💙 | ${t('commands:status.info.title')}`, value: `\`${info_summary}\``, inline: true },
             { name: `💁‍♀️ | ${t('commands:status.version')}`, value: `\`node: ${process.version}\ndiscord.js: ${require("../../../../package.json").dependencies["discord.js"]}\nbot: ${require("../../../../package.json").version} (${require("../../../../package.json").version_name})\``, inline: true })
        
        interaction.editReply({ embeds: [embed] });
    }
    
    command_info(){
        return {
            activated: true,
            pt: {
                name: "status",
                description: "status da bot",
                permissions: {
                    bot: [],
                    user: []
                },
                category: "discord",
                subCommands: []
            },
            en: {
                name: "status",
                description: "bot status",
                permissions: {
                    bot: [],
                    user: []
                },
                category: "discord",
                subCommands: []
            }
        }
    }
} 
module.exports = Command