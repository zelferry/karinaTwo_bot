
const { truncate } = require("fs");
let usermodel = require("../../../models/user.js")

class afkDATA {
	static async newUser(author){
		const isUser = await usermodel.findOne({ UserId: author.id });
		if(isUser) return false;
		
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
	
	static async setAFK(author,reason= "fora no momento"){
		const user = await usermodel.findOne({ UserId: author.id });

		user.afk.ready = true
		user.afk.reason = reason
		
		await user.save().catch(e => console.log(e));
		return user
	}

	static async confirm(author){
		const user = await usermodel.findOne({ UserId: author.id });
		if(!user) return this.newUser(author);
		
		return user ? true : false
	}

	static async find(author){
		const user = await usermodel.findOne({ UserId: author.id });
		if(!user) return this.newUser(author);
		
		return user
	}

	static async deleteAFK(author){
		const user = await usermodel.findOne({ UserId: author.id });
		
		user.afk.ready = false
		user.afk.reason = "fora no momento"
		
		await user.save().catch(e => console.log(e));
		return user
	}
}

module.exports = afkDATA