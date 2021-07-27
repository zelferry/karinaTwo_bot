module.exports = {
	name: 'bot_ping',
	description: '《📱discord》Ping!',
	commandOptions: null,
	global: true,
	execute(interaction,client) {
	  
		client.api.interactions(interaction.id, interaction.token).callback.post({
			data: {
				type: 4,
				data: {
					content: `:ping_pong: Pong: ${client.ws.ping}ms!`
				}
			}
		});
		
	}
};
