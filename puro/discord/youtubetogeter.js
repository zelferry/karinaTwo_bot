let comando = require("../../frameworks/commando/command_slash.js");

const {
  MessageEmbed
} = require('discord.js');

class Command extends comando {
    constructor(...args) {
        super(...args, {
            name: "youtubetogether",
            description: "[ 📱 discord ] veja vídeos do YouTube no discord!!",
            commandOptions: [
                {
            name: "channel",
            description: "Canal de voz que você deseja usar.",
            required: true,
            type: 7,
        }
            ]
        })
    }
    async interactionRun(interaction){
        let data1 = interaction.options.getChannel("channel");
        let channel = this.client.channels.cache.get(data1.id);
        let embed = new MessageEmbed();

        
        if(channel.type !== "GUILD_VOICE") return await interaction.reply({
            content: "❌| o canal selecionado não e um canal de voz!\nusse o comando novamente",
            ephemeral: true
        });
        this.client.discordTogether.createTogetherCode(channel.id,"youtube").then(async(in_) => {
            embed.setTitle("YouTube Together iniciado!");
            embed.setDescription(`iniciado o **YouTube Together** no \`${channel.name}\`, agora você pode escutar suas músicas e vídeos também direto do YT para o discord!\n> [clique aqui para entrar no canal de voz](https://discord.gg/${in_.code})!`);
            embed.setColor("#7289DA")

            await interaction.reply({
                embeds: [embed]
            })
        })
    }
} 
module.exports = Command 
