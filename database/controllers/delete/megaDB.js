const Discord = require('discord.js');

const db = require('megadb');

let afk = new db.crearDB('afk');
let InviteDB = new db.crearDB('anti_raid');
let PrefixDB = new db.crearDB('Prefix');


module.exports = async (message) => {
	if (InviteDB.tiene(`${message.id}`)) {
		InviteDB.eliminar(`${message.id}`);
	}

	if (afk.tiene(`${message.id}`)) {
		afk.eliminar(`${message.id}`);
	}

	if (PrefixDB.tiene(`${message.id}`)) {
		PrefixDB.eliminar(`${message.id}`);
	}

};
