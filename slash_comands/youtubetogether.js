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
	async execute(interaction,client) {
        
        let data1 = interaction.options.getChannel("channel");
        let channel = client.channels.cache.get(data1.id);
        let embed = new MessageEmbed();

        
        if(channel.type !== "GUILD_VOICE") return await interaction.reply({
            content: "❌| o canal selecionado não e um canal de voz!\nusse o comando novamente",
            ephemeral: true
        });
        client.discordTogether.createTogetherCode(channel.id,"youtube").then(async(in_) => {
            embed.setTitle("YouTube Together iniciado!");
            embed.setDescription(`iniciado o **YouTube Together** no \`${channel.name}\`, agora você pode escutar suas músicas e vídeos também direto do YT para o discord!\n> [clique aqui para entrar no canal de voz](https://discord.gg/${in_.code})!`);
            embed.setColor("#7289DA")

            await interaction.reply({
                embeds: [embed]
            })
        })
        
    }
}