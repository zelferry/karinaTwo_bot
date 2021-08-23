
module.exports = (client,message) =>{
	let channels_ = message.guild.channels.cache.filter((channel) => channel.nsfw).map(x => "<#"+x.id+">" )
	
	let teste = channels_.length > 0 ? `` : ``
	
	if(aff){
		teste = `tente usar novamente em ${aff}`
	}else{
		teste = "este servidor não tem nenhum canal de texto com a função NSFW ativada :("
	}
	message.channel.send(":x:|o canal não tem a função NSFW ativada, "+teste+"");
}