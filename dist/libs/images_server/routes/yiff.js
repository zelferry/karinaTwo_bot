let Yiffy = require("yiffy");

class yiff extends Yiffy {
	constructor() {
		super();
	}
    
	async gay() {
		let result = await this.furry.yiff.gay('json', 1);
		return result.constructor === Array ? result[0] : result;
	}
	async straight() {
		let result = await this.furry.yiff.straight('json', 1);
		return result.constructor === Array ? result[0] : result;
	}
	async lesbian() {
		let result = await this.furry.yiff.lesbian('json', 1);
		return result.constructor === Array ? result[0] : result;
	}
	async synormorph() {
		let result = await this.furry.yiff.gynomorph('json', 1);
		return result.constructor === Array ? result[0] : result;
	}
	async bulge() {
		let result = await this.furry.bulge('json', 1);
		return result.constructor === Array ? result[0] : result;
	}
	async andromorph(){
		let result = await this.furry.yiff.andromorph('json', 1);
		return result.constructor === Array ? result[0] : result;
	}
	async butts() {
		let result = await this.furry.butts('json', 1);
		return result.constructor === Array ? result[0] : result;
	}
}

module.exports = yiff;