const Discord = require("discord.js");
const fetch = require('node-fetch');

//const db = require("megadb");
//let VipDB = new db.crearDB("Vip");
var yiff = require("yiff_api")
let y = new yiff.e621()

exports.run = async (client, message, args) => {
/*
const db = require("megadb");
let VipDB = new db.crearDB("Vip");

  if(!VipDB.tiene(`${message.author.id}`))
      VipDB.establecer(`${message.author.id}`, {
        vip: 'No'
      })

const vip = await VipDB.obtener(`${message.author.id}.vip`);

if(vip == 'No') return message.channel.send(`:x: |apenas para usuários **vips** :v`);
  */
    if (!message.channel.nsfw) return client.extra.utils.message.noNsfw(client, message);

const searchTerms = args[0]
let count = args[1]
let pos = args

if (pos && !Array.isArray(pos)) pos = pos.split(' ');
 
 if (!searchTerms) return message.reply({content:"💢|insira um filtro na frente do comando!"});

const opts = {method: 'GET',headers: {'User-Agent': 'crosdid/1.0',},};
  
//const nada = await message.channel.send(`buscado por **${searchTerms}**...`);

y.getposts(encodeURI(pos)).then(async (json) => {
/*
fetch(`https://e621.net/posts.json?tags=${pos.join("+")}`).then((res) => res.json()).then(async (json) => {
  */
  const {posts} = json
  
  if (!posts.length) {
    return message.reply({content:`nenhum resultado para: \`${pos.join("+")}\` \ntente novamente ♨`});}
 
 //let total = posts.length
/* if(total >= 75){
 	total = "+999"
 }*/
 /*
let test = parseInt(count)
if(!test) {count = 1}
if (count > 5) {count = 5};
if (count < 1) {count = 1};

for (var i = 0; i < count; i++) {
   console.log(i);
*/

let {pages} = require("../../buttonSystem/init.js")

let button_2 = new pages.e621(message,client)

await button_2.buttonPages(posts,pos)

}).catch((err) => {
	console.error(err);
  //message.channel.send
  message.reply({content:"deu erro! \ntente novamente mais tarde\n```"+err+"```"})
});
}
exports.config = {
    test: false
}
exports.help = {
  name:"e621",
  permisoes: "nenhuma",
  aliases: ["e6","e6-buscar","booru_furry"],
  description: "pesquise imagens na e621 no discord",
  usage: "e621 <E621_TAG>"
}