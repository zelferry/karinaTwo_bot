const low = require("lowdb")
const fsync = require("lowdb/adapters/FileSync")
const adap = new fsync('cowdown/db.json')
const db = low(adap)

const Discord = require("discord.js")

exports.db = db

exports.createNewUser = async function(member){
	if(this.db.get('all').find({id: member}).value() !== undefined) return new Error(`DATABASE ERROR: O Membro já tem registro na DataBase.`)
	this.db.get('all').push({
		id: member,
		daily: 0,
	}).write()
}

exports.deleteUser = async function(member){
	if(this.db.get("all").find({id: member}).value() == undefined) return new Error(`DATABASE ERRO: O Membro não tem registro para ser deletado.`)
	this.db.get('all').remove({id: member}).write()
}