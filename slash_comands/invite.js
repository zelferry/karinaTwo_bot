const convite = process.env.LINK_ADD;


module.exports = {
	name: 'invite',
	description: '《📱discord》adicionar a karina!',
	commandOptions: null,
	global: true,
	execute(interaction,client) {
	  
		client.api.interactions(interaction.id, interaction.token).callback.post({
			data: {
				type: 4,
				data: {
					content: `sem os comandos de **/barra**: ${convite} \n\ncom os comandos de **/barra**: https://discord.com/api/oauth2/authorize?client_id=${process.env.BOT_ID}&permissions=805317758&scope=bot%20applications.commands`
				}
			}
		});
		
	}
};
