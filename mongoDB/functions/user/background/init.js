let usermodel = require("../../../models/user.js")

class background {
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
    static async buyAndSet(author, code, prize){
        let user = await usermodel.findOne({ UserId: author.id });
		if(!user) return false
        
		user.coins -= prize;
        user.config.background.setted = code;
        user.config.background.collection.push(code)
		
		user.save().catch(e => console.log(e))
		
		return user
    }
    static async edit(author, code){
        let user = await usermodel.findOne({ UserId: author.id });
		if(!user) return false
        
        user.config.background.setted = code
		
		user.save().catch(e => console.log(e))
		
		return user
    }
}
module.exports = background