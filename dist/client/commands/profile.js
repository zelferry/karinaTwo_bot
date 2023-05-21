const jimp = require("jimp");
const Discord = require("discord.js");

module.exports = async(interaction, options, t, function_) => {
	const avatar = await jimp.read(options.avatarURL);
	const background = await jimp.read(options.background);
	const model = await jimp.read(`./assets/profile/images/profile_model.png`);
	const mascara = await jimp.read("./assets/profile/images/mascara.png");
    
	const font13 = await jimp.loadFont("./assets/profile/fonts/lemon_13.fnt");
    const font19 = await jimp.loadFont("./assets/profile/fonts/lemo_19.fnt");
    const font32 = await jimp.loadFont("./assets/profile/fonts/lemo_32.fnt");
    const font32_2 = await jimp.loadFont("./assets/profile/fonts/lemo_32_2.fnt");


	avatar.resize(145.50, 145.50);
	mascara.resize(145.50, 145.50);
	background.resize(700, 500);
	model.resize(700, 500);

	avatar.mask(mascara);
	model.composite(avatar, 16.50, 13.50);

	model.print(font32, 180, 8.5, options.username, (err, i1, i2) => {
        model.print(font32_2, i2.x, 8.5, `#${options.discriminator}`);
    });
	model.print(font19, 374.5, 63.9, options.money);
	model.print(font19, 298.5, 88.9, options.vip, 690);
    model.print(font19, 253.5, 113.9, options.reps, 690);
	model.print(font13, 9, 405, options.aboutme, 693);
	model.print(font13, 8.3, 374.9, t("commands:profile.about_me"), 693);
    
	background.composite(model, 0, 0);
	background.getBuffer(jimp.MIME_PNG, async(err, buffer) => {
        
    	if (err) {
    		return interaction.editReply({
                content: t("commands:global.error.commands", { error: err })
            });
    	} else {
            return function_(buffer);
    	};
    });
};