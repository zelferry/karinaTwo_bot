
let usermodel = require("../../../models/user.js")

class profile {
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
	static async find(author){
		const user = await usermodel.findOne({ UserId: author.id });
		
		if(!user) return this.newUser(author)
		
		return user 
	}
	static async setUserText(author,text){
		const user = await usermodel.findOne({ UserId: author.id });
		if(!user) return false

		user.usertext = text
		
		await user.save().catch(e => console.log(e));
		return user
	}
}
module.exports = profile