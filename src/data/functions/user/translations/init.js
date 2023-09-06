let usermodel = require("../../../models/user.js")

class translations {
	static async newUser(author){
		const isUser = await usermodel.findOne({ UserId: author.id });
		if(isUser) return true;
		
		let new_ = new usermodel({
			UserId: author.id,
            config: {
                background: {
                    collection: ["default"]//.push(code)
                }
            },
            userCreationTimestamp: Date.now()
		})
		await new_.save().catch(e => console.log(e));
		return new_
	}
	static async find(author){
		const user = await usermodel.findOne({ UserId: author.id });
		
		if(!user) return (await this.newUser(author))
		
		return user 
    }
    static async get_lang(author){
        const user = await usermodel.findOne({ UserId: author.id });

        if(!user){
            let user_new = await this.newUser(author);

            return user_new.config.lang
        }
        
        return user.config.lang
    }
    static async set_lang(author, lang_){
        const user = await usermodel.findOne({ UserId: author.id });

        let langs = {
            "pt-BR": {
                lang: "pt-BR",
                lang_simple: "pt"
            },
            "en-US": {
                lang: "en-US",
                lang_simple: "en"
            },
            "es": {
                lang: "es",
                lang_simple: "es"
            }
        }

        if(!user) {
            let new_ = new usermodel({
                UserId: author.id,
                userCreationTimestamp: Date.now(),
                config: {
                    lang: langs[lang_].lang,
                    lang_simple: langs[lang_].lang_simple,
                    background: {
                        collection: ["default"]
                    }
                }
            });
            await new_.save().catch(e => console.log(e));

            return new_
        }

        user.config.lang = langs[lang_].lang
        user.config.lang_simple = langs[lang_].lang_simple

        await user.save().catch(e => console.log(e))

        return user
    }
}
module.exports = translations