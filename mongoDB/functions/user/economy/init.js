
let usermodel = require("../../../models/user.js")

class eco {
	static async newUser(author){
		const isUser = await usermodel.findOne({ UserId: author.id });
		if(isUser) return false;
		
		let new_ = new usermodel({
			UserId: author.id
		})
		await new_.save().catch(e => console.log(e));
		return new_
	}
	static async addmoney(author,money,timer){
		const user = await usermodel.findOne({ UserId: author.id });
		if(!user) return false/*{
			let new_ = new usermodel({
				UserId: author.id,
				daily: new Date()
			})
			await new_.save().catch(e => console.log(e));
			return new_
		}*/
		user.coins += money
		if(timer == true) user.daily = Date.now()
		
		await user.save().catch(e => console.log(e))
		return user
	}
	static async removemoney(author,money){
		const user = await usermodel.findOne({ UserId: author.id });
		if(!user) return false
		user.coins -= money
		
		user.save().catch(e => console.log(e))
		
		return user
	}
	static async pay(author,user,money){
		const user_ = await usermodel.findOne({ UserId: author.id });
		
		const user_2 = await usermodel.findOne({ UserId: user.id });
		
		user_.coins -= Math.floor(parseInt(money))
		user_2.coins += Math.floor(parseInt(money))
		
		user_.save().catch(e => console.log(e))
		user_2.save().catch(e => console.log(e))
		
		return {
			user1: user_,
			user2: user_2
		}
	}
	static async setVip(author){
		const user = await usermodel.findOne({ UserId: author.id });
		
		if(!user) return false
		
		user.vipUser = true
		
		user.save().catch(e => console.log(e))
		
		return user 
	}
	static async fech(author){
		const user = await usermodel.findOne({ UserId: author.id });
		if(!user) return this.newUser(author)
		return user 
	}
}
module.exports = eco
