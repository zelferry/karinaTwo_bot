let comando = require("../../frameworks/commando/command.js");
let config = require(`${process.cwd()}/dist/primary_configuration.js`);
let Discord = require("discord.js");
let os = require("os")

class Command extends comando {
    constructor(...args) {
        super(...args, {
            name: "status",
            description: "[ 📲discord ] bot status",
            category: "discord",
            commandOptions: []
        })
    }
    async interactionRun(interaction, t){
        await interaction.deferReply({ ephemeral: this.deferReply }).catch(() => {});

        const embed = new Discord.MessageEmbed().setTitle("🦊 | karinaTwo status").addFields({ name: `💻 | ${t('commands:status.model')}`, value: `\`\`\`${os.cpus().map(c => c.model)[0]}\`\`\`` },
                       { name: `💙 | ${t('commands:status.guilds')}`, value: `\`\`\`${this.client.guilds.cache.size}\`\`\``, inline: true },
                { name: `💛 | ${t('commands:status.users')}`, value: `\`\`\`${this.client.users.cache.size}\`\`\``, inline: true },
                { name: `✨ | ${t('commands:status.ram')}`, value: `\`\`\`${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB\`\`\``, inline: true },
                { name: `🛠 | ${t('commands:status.cpuUsage')}`, value: `\`\`\`${(process.cpuUsage().system / 1024 / 1024).toFixed(2)}%\`\`\``, inline: true },
                { name: `💁‍♀️ | ${t('commands:status.node')}`, value: `\`\`\`${process.version}\`\`\``, inline: true },
                { name: `🖥 | ${t('commands:status.arch')}`, value: `\`\`\`${process.arch}\`\`\``, inline: true },
                { name: `⛏ | ${t('commands:status.platform')}`, value: `\`\`\`${process.platform}\`\`\``, inline: true })
        
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