const ne = require('nekos.life');
const neko = new ne();

module.exports = {
	name: 'owo',
	description: '《😹 diversão 》owo',
	commandOptions: [],
	global: true,
	async execute(interaction, client) {
		neko.sfw.catText().then(async (catText) => {
            let text = catText.cat;
            
            await interaction.reply({
                content: text
            })
        })
    }
}