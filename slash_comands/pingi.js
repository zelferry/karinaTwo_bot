module.exports = {
	name: 'bot_ping',
	description: '《📱discord》Ping!',
	commandOptions: [],
	global: true,
	async execute(interaction,client) {
	  
		await interaction.reply({
            content: `:ping_pong: Pong: ${client.ws.ping}ms!`
        });
        
	}
};
//interaction.options.getString('options')