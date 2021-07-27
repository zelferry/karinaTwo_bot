const ne = require('nekos.life');
const neko = new ne();

module.exports = {
	name: 'owo',
	description: '《😹 diversão 》owo',
	commandOptions: null,
	global: true,
	execute(interaction, client) {
		neko.sfw.catText().then(catText => {
			client.api.interactions(interaction.id, interaction.token).callback.post({
				data: {
					type: 4,
					data: {
						content: catText.cat
					}
				}
			});
		});
	}
};
