let usermodel = require("../../../models/user.js");
let bank = require("../../../extends/economy_extras.js");

class eco extends bank {
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

	static async addmoney(author, money, timer){
		const user = await usermodel.findOne({ UserId: author.id });
		if(!user) return false
		
		user.coins += money
		if(timer == true) user.config.cooldow.daily = Date.now()
		
		await user.save().catch(e => console.log(e))
		return user
	}

	static async removemoney(author, money){
		const user = await usermodel.findOne({ UserId: author.id });
		if(!user) return false
		user.coins -= money

		await this.add_for_bank(money);
		user.save().catch(e => console.log(e))
		
		return user
	}

	static async pay(author, user, money){
		let user_1 = await usermodel.findOne({ UserId: author.id });
		let user_2 = await usermodel.findOne({ UserId: user.id });
		
		user_1.coins -= Math.floor(parseInt(money))
		user_2.coins += Math.floor(parseInt(money))
		
		user_1.save().catch(e => console.log(e));
		user_2.save().catch(e => console.log(e));
		
		return {
			user1: user_1,
			user2: user_2
		}
	}

	static async fech(author){
		const user = await usermodel.findOne({ UserId: author.id });
		if(!user) return this.newUser(author)
		return user //929440325179670579
	}

    static async add_reps(membro1, membro2){
        let user_1 = await usermodel.findOne({ UserId: membro1.id });
		let user_2 = await usermodel.findOne({ UserId: membro2.id });

        user_1.config.cooldow.reps = Date.now();
        user_2.reps += 1;

        user_1.save().catch(e => console.log(e));
        user_2.save().catch(e => console.log(e));

        return {
			user1: user_1,
			user2: user_2
		}
    }

	static async top_(){
		const user = await usermodel.find();
		const data = user.sort((a, b) => b.coins - a.coins);

		return {
			partial: data.slice(0, 10),
			all: data
		}
	}
}

module.exports = eco