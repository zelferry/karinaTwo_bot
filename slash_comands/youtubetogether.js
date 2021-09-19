const {
  MessageEmbed
} = require('discord.js');

module.exports = {
	name: 'youtubetogether',
	description: '《📱discord》escutar musicas e ver videos com seus amigos em canais de voz!',
	commandOptions: [
        {
            name: "channel",
            description: "Canal de voz que você deseja usar.",
            required: true,
            type: 7,
        }
    ],
	global: true,
	execute(interaction,client) {
        let data1 = interaction.data.options[0].value;
        let channel = client.channels.cache.get(data1);
        let embed = new MessageEmbed();

        
        if(channel.type !== "voice") return client.api.interactions(interaction.id, interaction.token).callback.post({
            data: {
                type: 4,
                data: {
                    content: "❌| o canal selecionado não e um canal de voz!\nusse o comando novamente"
                }
            }
        });
        channel.activityInvite("755600276941176913").then((in_) => {
            embed.setTitle("YouTube Together iniciado!");
            embed.setDescription(`iniciado o **YouTube Together** no \`${channel.name}\`, agora você pode escutar suas músicas e vídeos também direto do YT para o discord!\n> [clique aqui para entrar no canal de voz](https://discord.gg/${in_.code})!`);
            embed.setColor("#7289DA")

            client.api.interactions(interaction.id, interaction.token).callback.post({data: {
                type: 4,
                data: {
                    embeds: [embed]
                }
            }
                                                                                     })
        })
    }
}