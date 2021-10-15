exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
	var time = args[0];
	var reminder = args.splice(1).join(' ');

	if (!time) return message.reply({ content:'Não posso te lembrar se você não definir um tempo...' });
	if (!reminder) return message.reply({ content:'Você esqueceu de inserir uma mensagem!' });

	// This will not work if the bot is restarted or stopped

	time = await time.toString();

	if (time.indexOf('s') !== -1) { // Seconds
		var timesec = await time.replace(/s.*/, '');
		var timems = await timesec * 1000;
	} else if (time.indexOf('m') !== -1) { // Minutes
		var timemin = await time.replace(/m.*/, '');
		timems = await timemin * 60 * 1000;
	} else if (time.indexOf('h') !== -1) { // Hours
		var timehour = await time.replace(/h.*/, '');
		timems = await timehour * 60 * 60 * 1000;
	} else if (time.indexOf('d') !== -1) { // Days
		var timeday = await time.replace(/d.*/, '');
		timems = await timeday * 60 * 60 * 24 * 1000;
	}	else {
		return message.reply({content:'O tempo deve ser númerico [s/m/h/d]'});
	}

	message.reply({content: `Eu vou lembrar você de \`${reminder}\` daqui \`${time}\` na sua dm!`});

	setTimeout(function () {
		message.author.send({embeds: [{
  color: 3447003,
  description: `Você me pediu para te lembrar de \`${reminder}\` `
}]});
	}, parseInt(timems));

};
exports.config = {
    test: false
}
exports.help = {
  name:"lembrete",
  permisoes: "nenhuma",
  aliases: ["lenbrar"],
  description: "esqueceu do ep novo do seu anime? \n ent use este comandos para não esquecer de novo!",
  usage: "lembrete <tempo> <texto>"
}