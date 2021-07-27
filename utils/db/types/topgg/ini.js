var low = require('lowdb');
var fsync = require('../../../../utils/db/plugins/local_footer.js');

var adap = new fsync({db:"db",ftr:"top_gg"},{defaultValue:{"all":[]}});
var db = low(adap);

class data_topgg {
	constructor(){
		
	}
	new(member) {
		if(db.get('all').find({id: member.id}).value() !== undefined) return new Error(`DATABASE ERROR: O Membro já tem registro na DataBase.`)
		db.get('all').push({
			id: member.id,
			votes: 0
		}).write()
	}
	add(c,nw) {
		db.get('all').find({id: c.id}).assign({
			votes: nw
		}).write()
	}
	find(c) {
		return db.get('all').find({id: c.id}).value()
	}
	get_(c) {
		
	}
	set_() {}
}
module.exports = data_topgg;