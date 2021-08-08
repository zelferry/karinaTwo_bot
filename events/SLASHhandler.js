exports.type = "INTERACTION_CREATE";
exports.start = async(client,clusterID,ipc,interaction) => {
	
if (!client.commands2.has(interaction.data.name)) return;

	try {
		client.commands2.get(interaction.data.name).execute(interaction, client);
	} catch (error) {
		console.log(
			`erro no comando de barra ${interaction.data.name} : ${error.message}`
		);
		console.log(`${error.stack}\n`);
		client.api.interactions(interaction.id, interaction.token).callback.post({
			data: {
				type: 4,
				data: {
					content: `ops!\ndeu um erro\"estranho\" ao executar o comando!`
				}
			}
		});
	}
	
}