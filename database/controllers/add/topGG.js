var low = require('lowdb');
var fsync = require('lowdb/adapters/FileSync');

var adap = new fsync('database/topgg/votedusers.json');
var db = low(adap);

class dblg {
	static newUser(entradaTOP) {
		if (db.get('all').find({ id: entradaTOP }).value() !== undefined)
			return new Error(`DATABASE ERROR: O Membro já tem registro na DataBase.`);
			
		db.get('all').push({
			id: entradaTOP,
			votes: 0
		}).write();
	}
	static add(user) {}
}

module.exports = {
	t: dblg
};
