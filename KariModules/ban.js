const low = require("lowdb")
const fsync = require("lowdb/adapters/FileSync")
const adap = new fsync('database/IDs/bansUsers/bans.json')
const dblow = low(adap)

exports.dblow = dblow

exports.addBan = async function(member,motivoban){
  
  if(!motivoban) {motivoban = "{não.encontrado_404}"}
  
	if(this.dblow.get('all').find({id: member}).value() !== undefined) return new Error(`DATABASE ERROR: O Membro já tem registro na DataBase.`)
	this.dblow.get('all').push({
		id: member,
		motiv: motivoban
	}).write()
}

exports.removeBan = async function(member){
	if(this.dblow.get("all").find({id: member}).value() == undefined) return new Error(`DATABASE ERRO: O Membro não tem registro para ser deletado.`)
	this.dblow.get('all').remove({id: member}).write()
}