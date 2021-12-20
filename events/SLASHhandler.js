exports.type = "interactionCreate";
exports.start = async(client,clusterID,ipc,interaction) => {
    if (!interaction.isCommand()) return;
	if (!client.commands2.has(interaction.commandName.toLowerCase())) return;
	
	try {
		client.commands2.get(interaction.commandName.toLowerCase()).interactionRun(interaction);
	
	} catch (error) {
		console.log(`erro no comando de barra ${interaction.commandName.toLowerCase()} : ${error.message}`);
        
		console.log(`${error.stack}\n`);
    
		await interaction.reply({
            content:"🚫***|*** ouve um erro \"estranho\" ao executar o comando\ndesculpe a inconveniência :(",
            ephemeral: true
        })
	}
	
}