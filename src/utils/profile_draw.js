const jimp = require("jimp");

module.exports = async(interaction, options, t, function_) => {
	const type_1 = options.layout;
	const type_config = require(`../../assets/profile/${type_1}/config.json`);

	const avatar = await jimp.read(options.avatarURL);
	const background = await jimp.read(options.background);
	const model = await jimp.read("./assets/profile/"+type_1+"/images/profile_model.png");
	const mascara = await jimp.read("./assets/profile/"+type_1+"/images/mascara.png");
    
	const font13 = await jimp.loadFont("./assets/profile/"+type_1+"/fonts/lemon_13.fnt");
    const font19 = await jimp.loadFont("./assets/profile/"+type_1+"/fonts/lemo_19.fnt");
    const font32 = await jimp.loadFont("./assets/profile/"+type_1+"/fonts/lemo_32.fnt");

	avatar.resize(type_config.avatar.resize.w, type_config.avatar.resize.h);
	mascara.resize(type_config.mascara.resize.w, type_config.mascara.resize.h);
	background.resize(type_config.background.resize.w, type_config.background.resize.h);
	model.resize(type_config.model.resize.w, type_config.model.resize.h);

	avatar.mask(mascara);
	model.composite(avatar, type_config.avatar.composite_local.x, type_config.avatar.composite_local.y);

	model.print(font32, type_config.fonts.f32.one.x, type_config.fonts.f32.one.y, `@${options.username}`);
	model.print(font19, type_config.fonts.f19.one.x, type_config.fonts.f19.one.y, options.money);
	model.print(font19, type_config.fonts.f19.two.x, type_config.fonts.f19.two.y, options.vip);
    model.print(font19, type_config.fonts.f19.tree.x, type_config.fonts.f19.tree.y, options.reps, type_config.fonts.f19.tree.max_width);
	model.print(font13, type_config.fonts.f13.one.x, type_config.fonts.f13.one.y, options.aboutme, type_config.fonts.f13.one.max_width);
	model.print(font13, type_config.fonts.f13.two.x, type_config.fonts.f13.two.y, t("commands:profile.about_me"));
    
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