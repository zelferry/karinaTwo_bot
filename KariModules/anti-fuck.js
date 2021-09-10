ifunction getOne(haystack, arr) {
  return arr.find(v => haystack.includes(v));
}

function findOne(ops = {
  listPalvroes:[],
  ignoreUsers:[]
},message) {

  const arr = message.content
  const haystack = ops.listPalvroes
  
 if(ops.ignoreUsers.includes(message.author.id)) return false;
/*
if(test){
  message.channel.send("EI!,\nmodere sua linguagem!")
 } else {
 cmd.run(client, message, args);
}*/
  return arr.includes(haystack)
  //arr.some(v => haystack.includes(v)) && message
}
module.exports = {
  findOne:findOne,
  getOne:getOne
};