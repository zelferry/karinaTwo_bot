const convite = process.env.LINK_ADD;
let Discord = require('discord.js');

module.exports = {
	name: 'invite',
	description: '《📱discord》adicionar a karina!',
	commandOptions: [],
	global: true,
	async execute(interaction,client) {
        let link = client.generateInvite({
            permissions: [...client.defautPermissions],
            scopes: ['bot','applications.commands']
        });
        await interaction.reply({
            content: `me adicione em seu servidor!\n${link}`
        })
	}
};
