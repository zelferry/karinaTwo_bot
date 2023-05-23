let usermodel = require("../../../models/user.js")

class topgg {
	static async newUser(author){
		const isUser = await usermodel.findOne({ UserId: author });
		if(isUser) return true;
		
		let new_ = new usermodel({
			UserId: author,
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
		const user = await usermodel.findOne({ UserId: author });
		
		if(!user) return (await this.newUser(author))
		
		return user 
	}
	static async addUPVOTE(author,VOTES){
		const user = await usermodel.findOne({ UserId: author });
		if(!user){
			const newUser = new usermodel({
				UserId: author,
                userCreationTimestamp: Date.now(),
                config: {
                    background: {
                        collection: ["default"]
                    }
                },
				topggVotes: VOTES || 0
			})
			await newUser.save().catch(e => console.log(e))
			return newUser
		}
		user.topggVotes = VOTES
		
		await user.save().catch(e => console.log(e))
		return user
	}
    static async ready(user, funcion_){
        usermodel.findOne({ UserId:user }, async(err, obj) => { funcion_(err, obj, usermodel) })
    }
}
module.exports = topgg