
let usermodel = require("../../../models/user.js")

class afkDATA {
	static async newUser(author){
		const isUser = await usermodel.findOne({ UserId: author.id });
		if(isUser) return false;
		
		let new_ = new usermodel({
			UserId: author.id
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
	static async find(author,chequer){
		const user = await usermodel.findOne({ UserId: author.id });
		if(chequer == true) if(!user) return this.newUser(author)
		
		return user ? user : {"error":"404"}
	}
	static async deleteAFK(author){
		const user = await usermodel.findOne({ UserId: author.id });
		
		user.afk.ready = false
		user.afk.reason = "forafo no momento"
		
		await user.save().catch(e => console.log(e));
		return user
	}
}
module.exports = afkDATA