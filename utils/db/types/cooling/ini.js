var low = require('lowdb');
var fsync = require('../../../../utils/db/plugins/local_footer.js');

var adap = new fsync({db:"db",ftr:"cooling"},{defaultValue:{"all":[]}});
var db = low(adap);

class cooling {
	constructor(){}
	new(member) {
		if (db.get('all').find({ id: member.id }).value() !== undefined) return new Error(`DATABASE ERROR: O Membro já tem registro na DataBase.`);
		
		db.get('all').push({id: member.id,daily: 0
			}).write();
	}

	add(c,day) {
		db.get('all').find({ id: c.id }).assign({ daily: day }).write();
	}

	find(c) {
		return db.get('all').find({ id: c.id }).value();
	}

	get_(c) {}

	set_() {}
}
module.exports = cooling;