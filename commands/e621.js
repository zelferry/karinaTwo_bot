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
const aff = message.guild.channels.cache.filter((channel) => channel.nsfw).map(x => "<#"+x.id+">" ).join(",")

 let teste;

if(aff){teste = `tente usar novamente em ${aff}`}else{teste = "este servidor não tem nenhum canal de texto com a função NSFW ativada :("}
  
  
if (!message.channel.nsfw) return message.channel.send(":x:|o canal não tem a função NSFW ativada, "+teste+"");

const searchTerms = args[0]
let count = args[1]
let pos = args

if (pos && !Array.isArray(pos)) pos = pos.split(' ');
 
 if (!searchTerms) return message.channel.send("💢|insira um filtro na frente do comando!");

const opts = {method: 'GET',headers: {'User-Agent': 'crosdid/1.0',},};
  
//const nada = await message.channel.send(`buscado por **${searchTerms}**...`);

y.getposts(pos).then(async (json) => {
/*
fetch(`https://e621.net/posts.json?tags=${pos.join("+")}`).then((res) => res.json()).then(async (json) => {
  */
  const {posts} = json
  
  if (!posts.length) {
    return message.channel.send(`nenhum resultado para: \`${pos.join("+")}\` \ntente novamente ♨`);}
 
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
let sla = Math.floor(Math.random() * posts.length)

 let result = posts[sla];
 
let id = result.id;
let file = result.file.url;
let score = result.score.total;
let cestis = `> **votos**: ${score} | **origem**: [original aqui](https://e621.net/post/show/${id})`;

let avatar = message.author.avatarURL({ dynamic: true, format: "png", size: 1024 });

let tags = result.tags.general.concat(result.tags.species, result.tags.character, result.tags.copyright,result.tags.artist,result.tags.invalid,result.tags.lore, result.tags.meta);



const ava9 = require("../database/client/blacklisted.json");

let blacklist = ava9.e6.blacklist
//retorna o texto
function getOne(haystack, arr) {
  return arr.find(v => haystack.includes(v));
}
//buscar se contém um texto específico
function findOne(haystack, arr) {
  return arr.some(v => haystack.includes(v));
}

 if(tags) {
  if (findOne(blacklist,tags)){
    file = "https://en.wikifur.com/w/images/d/dd/E621Logo.png";
    cestis = `**tag(s) na blak-list!** - tag(s): \`${getOne(blacklist,tags)}\` | [**Link**](https://e621.net/posts/${id})`;
  }
}

if (file) {
 if (file.endsWith('.webm') || file.endsWith('.swf')) {
  cestis = `> **votos:** ${score} | **[Link](https://e621.net/post/show/${id})**\n> *arquivos em (webm/swf/mp3/mp4) não são compatíveis com embeds.*`;
 }
}
if(file == null){
 	cestis = `> **votos**:${score} | **[link](https://e621.net/posts/show/${id})*\n\n> **erro 500**\nvocê so pode ver a imagem com uma conta [logada](https://e621.net/users/new) na **e621**(\`so e possível ver no site com uma conta logada\`)`
 }
 
let ava = {
  content: `${message.author}`,
  embed: {
    color: "#C0C0C0",
    description: cestis,
    author: {name: pos.join(" "),icon_url: avatar},
    image: {
      url: file
    },
   footer: { icon_url: 'http://i.imgur.com/RrHrSOi.png', text: `e621 · ${id}`}
  }
}
message.channel.send(ava)
}).catch((err) => {console.error(err);
  //message.channel.send
  message.channel.send("deu erro! \ntente novamente mais tarde\n```"+err+"```")
});
}
exports.help = {
  name:"e621",
  permisoes: "nenhuma",
  aliases: ["e6","e6-buscar","booru_furry"],
  description: "pesquise imagens na e621 no discord",
  usage: "e621 <E621_TAG>"
}