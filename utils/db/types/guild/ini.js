const Discord = require('discord.js');


const db = require('megadb');

let afk = new db.crearDB('afk');
let InviteDB = new db.crearDB('anti_raid');
let PrefixDB = new db.crearDB('Prefix');
let levels_db = new db.crearDB('db_levels', 'db.level');
let comfig_level = new db.crearDB('levels', 'db.level');

module.exports.delete = async (message) => {
	if (InviteDB.tiene(`${message.id}`)) {
		InviteDB.eliminar(`${message.id}`);
	}

	if (afk.tiene(`${message.id}`)) {
		afk.eliminar(`${message.id}`);
	}

	if (PrefixDB.tiene(`${message.id}`)) {
		PrefixDB.eliminar(`${message.id}`);
	}

	if (levels_db.tiene(`${message.id}`)) {
		levels_db.eliminar(`${message.id}`);
	}

	if (comfig_level.tiene(`${message.id}`)) {
		comfig_level.eliminar(`${message.id}`);
	}
};
