let usermodel = require("../../../models/user.js");
let vip_keymodel = require("../../../models/vip_keys.js")

class eco {
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
		let user = await usermodel.findOne({ UserId: author.id });
		
		if(!user) return (await this.newUser(author))
		
		return user 
    }
    static async daily_panther_coins(data){
        let user = await usermodel.findOne({ UserId: data });

        user.coins += 200

        user.save().catch(e => console.log(e));

        return user
    }
    static async find_all(){
        let data1 = await usermodel.find();
        
		return [...data1].filter((x) => x.config.vip.active == true)
    }
    static async delete_vip(author){
        let user = await usermodel.findOne({
            UserId: author.id
        });

        user.config.vip.active = false;
        await user.save().catch(e => console.log(e));
        return user
    }
	static async set_vip_1(author){
		let user = await usermodel.findOne({
            UserId: author.id
        });

        let expiration_date = new Date();
        expiration_date.setDate(expiration_date.getDate() + 30);
		
		if(!user) {
            let new_user = new usermodel({
                UserId: author.id,
                userCreationTimestamp: Date.now(),
                config: {
                    vip: {
                        active: true,
                        expires_in: expiration_date,
                        activated_in: Date.now()
                    },
                    background: {
                        collection: ["default"]
                    }
                }
            });

            await new_user.save().catch(e => console.log(e));
            return new_user
        } else {
            user.config.vip.active = true;
            user.config.vip.expires_in = expiration_date;
            user.config.vip.activated_in = Date.now();

            await user.save().catch(e => console.log(e));
            return user
        }
    }
    static async set_vip_2(author){
		let user = await usermodel.findOne({
            UserId: author.id
        });

        let expiration_date = new Date();
        expiration_date.setDate(expiration_date.getDate() + 60);
		
		if(!user) {
            let new_user = new usermodel({
                UserId: author.id,
                userCreationTimestamp: Date.now(),
                coins: 1000000,
                config: {
                    vip: {
                        active: true,
                        expires_in: expiration_date,
                        activated_in: Date.now()
                    },
                    background: {
                        collection: ["default"]
                    }
                }
            });

            await new_user.save().catch(e => console.log(e));
            return new_user
        } else {
            user.config.vip.active = true;
            user.coins += 1000000;
            user.config.vip.expires_in = expiration_date;
            user.config.vip.activated_in = Date.now();

            await user.save().catch(e => console.log(e));
            return user
        }
    }

    static async find_key(key1){
        let key_data = await vip_keymodel.findOne({ key: key1 });

        if(!key_data){
            return { success: false, data: {} }
        } else {
            return { success: true, data: key_data }
        }
    }
    static async use_key(key1){
        await vip_keymodel.deleteMany({ key: key1 }).catch(e => console.log(e));
		return {}
    }
}


module.exports = eco