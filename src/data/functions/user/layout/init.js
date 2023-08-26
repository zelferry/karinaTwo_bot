let usermodel = require("../../../models/user.js");
let bank = require("../../../extends/economy_extras.js");

class layout extends bank {
	static async newUser(author){
		const isUser = await usermodel.findOne({ UserId: author.id });
		if(isUser) return true;
		
		let new_ = new usermodel({
			UserId: author.id,
            config: {
                layout: {
                    collection: ["simple/black"]//.push(code)
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
        user.config.layout.setted = code;
        user.config.layout.collection.push(code);
		await this.add_for_bank(prize);
		
		user.save().catch(e => console.log(e))
		
		return user
    }
    static async edit(author, code){
        let user = await usermodel.findOne({ UserId: author.id });
		if(!user) return false
        
        user.config.layout.setted = code
		
		user.save().catch(e => console.log(e))
		
		return user
    }
}

module.exports = layout