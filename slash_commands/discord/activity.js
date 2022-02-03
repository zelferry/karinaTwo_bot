let comando = require("../../frameworks/commando/command.js");

const {
  MessageEmbed
} = require('discord.js');

class Command extends comando {
    constructor(...args) {
        super(...args, {
            name: "activity",
            description: "[ 📲discord ] iniciar uma atividade no discord!",
            permissions: {
                bot: ["CREATE_INSTANT_INVITE"]
            },
            category: "discord",
            usage: "<tipo> <canal de voz>",
            commandOptions: [
                {
                    type: 3,
                    name: "type",
                    description: "tipo de atividade",
                    required: true,
                    choices: require("../../database/slash_commands/choices/discord/activity.json")
                },
                {
                    name: "channel",
                    description: "canal de voz que você deseja usar.",
                    required: true,
                    type: 7,
                }
            ]
        })
    }
    async interactionRun(interaction){
        let data1 = interaction.options.getChannel("channel");
        let data2 = interaction.options.getString('type');
        let embed = new MessageEmbed();
        
        let channel = this.client.channels.cache.get(data1.id);

        if(channel.type !== "GUILD_VOICE") return await interaction.followUp({
            content: "❌| o canal selecionado não e um canal de voz!\nusse o comando novamente",
            ephemeral: true
        });

        this.client.discordTogether.createTogetherCode(channel.id, data2).then(async(in_) => {
            embed.setTitle("YouTube Together iniciado!");
            embed.setDescription(`iniciado o **YouTube Together** no \`${channel.name}\`, agora você pode escutar suas músicas e vídeos também direto do YT para o discord!\n> [clique aqui para entrar no canal de voz](https://discord.gg/${in_.code})!`);
            embed.setColor("#7289DA");

            await interaction.editReply({
                embeds: [embed]
            });
        })
    }
} 
module.exports = Command 