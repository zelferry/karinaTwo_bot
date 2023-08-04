let usermodel = require("../models/user.js")

module.exports = class bank {
	static async add_for_bank(money){
		const user = await usermodel.findOne({ UserId: process.env.CLIENT_ID });
		
		user.coins += money
		
		await user.save().catch(e => console.log(e));
	}
}