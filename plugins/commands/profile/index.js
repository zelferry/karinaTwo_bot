//require("../../../")
const jimp = require("jimp");
const Discord = require("discord.js");

module.exports = async (interaction, options) => {
    //await interaction.deferReply()
	//message.channel.startTyping();

	let avatar = await jimp.read(options.avatarURL);
	let background = await jimp.read(options.background);
	let model = await jimp.read("./assets/profile/images/profile_model.png");
	let mascara = await jimp.read("./assets/profile/images/mascara.png");

	let font70 = await jimp.loadFont("./assets/profile/fonts/benasneue_70.fnt");
	let font36 = await jimp.loadFont("./assets/profile/fonts/benasneue_36.fnt");
	let font36_2 = await jimp.loadFont("./assets/profile/fonts/benasneue_36_2.fnt");
	let font20 = await jimp.loadFont("./assets/profile/fonts/benasneue_20.fnt");

	avatar.resize(145.50, 145.50);
	mascara.resize(145.50, 145.50);
	background.resize(700, 500);
	model.resize(700, 500);

	avatar.mask(mascara);
	model.composite(avatar, 16.50, 15.50);

	model.print(font70, 178, 9, options.username);
	model.print(font36, 337, 91, options.money);
	model.print(font20, 267, 124, options.vip, 690);
	model.print(font20, 9, 405, options.aboutme, 690);

	background.composite(model, 0, 0);
	background.getBuffer(jimp.MIME_PNG, async(err, buffer) => {
    	if (err) {
    		//message.channel.stopTyping(true);
    		return interaction.editReply({
                content:`🚫**|** ouve um erro ao resgatar as informações :(\nnotifique os meus devs sobre o ocorrido.`
            });
    	} else {
    	//	message.channel.stopTyping(true);
            let card = new Discord.MessageAttachment(buffer, "Profile.png")
    		return interaction.editReply({
                content:`📱 **|** perfil`,
                files: [card]
            })
    	};
    });
};
