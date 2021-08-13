let usermodel = require("../../../models/user.js")

class bans {
	static async newUser(author){
		const isUser = await usermodel.findOne({ UserId: author.id });
		if(isUser) return false;
		
		let new_ = new usermodel({
			UserId: author.id
		})
		await new_.save().catch(e => console.log(e));
		return new_
	}
	static async addban(author,reason= "não encontrado! [`404`]"){
		const user = await usermodel.findOne({ UserId: author.id });
		if(!user){
			let new_= new usermodel({
				UserId: author.id,
				banned:{
					reason: reason,
					ready: true
				}
			})
			await new_.save().catch(e => console.log(e));
			return new_
		}
		user.banned.reason = reason
		user.banned.ready = true
		
		await user.save().catch(e => console.log(e));
		
		return user
	}
	static async removeBan(author){
		const user = await usermodel.findOne({ UserId: author.id })
		if(!user) return false
		
		user.banned.ready = false
		user.banned.reason = "não encontrado!"
		
		await user.save().catch(e => console.log(e));
		return user
	}
	static async seekAndValidateBan(author){
		const user = await usermodel.findOne({ UserId: author.id })
		if(!user) return false
		
		return user.banned
	}
}
module.exports = bans