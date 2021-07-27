const Discord = require('discord.js');

let db = require('megadb')

let PrefixDB = new db.crearDB("Prefix");

module.exports.run = async (client, message, args) => {
  var list = [
  '1',
  '3',
  '5',
  '7',
  '9',
  '11',
  '13',
  '15',
  '17',
  '19',
  '21',
  '23',
  '25',
  '27',
  '29',
  '31',
  '33',
  '35',
  '37',
  '39',
  '41',
  '43',
  '45',
  '47',
  '49',
  '51',
  '53',
  '55',
  '57',
  '59',
  '61',
  '63',
  '65',
  '67',
  '69',
  '71',
  '73',
  '75',
  '77',
  '79',
  '81',
  '83',
  '85',
  '87',
  '89',
  '91',
  '93',
  '95',
  '97',
  '99',
  '101',
  '103',
  '105',
  '107',
  '109',
  '111',
  '113',
  '115',
  '117',
  '119',
  '121',
  '123',
  '125',
  '127',
  '129',
  '131',
  '133',
  '135',
  '137',
  '139',
  '141',
  '143',
  '145',
  '147',
  '149',
  '151',
  '153',
  '155',
  '157',
  '159',
  '161',
  '163',
  '165',
  '167',
  '169',
  '171',
  '173',
  '175',
  '177',
  '179',
  '181',
  '183',
  '185',
  '187',
  '189',
  '191',
  '193',
  '195',
  '197',
  '199',
  '201',
  'mais de 8 mil!!!!'
];
var rand = list[Math.floor(Math.random() * list.length)];
let user = message.mentions.users.first() || client.users.cache.get(args[0]);

    if (!PrefixDB.tiene(`${message.guild.id}`))
    PrefixDB.establecer(`${message.guild.id}`, {
      name: message.guild.name,
      owner: message.guild.owner.user.id,
      prefix: "f/"
    });

let prefixoAtual = await PrefixDB.obtener(`${message.guild.id}.prefix`);
    

if (!user) {
return message.reply({embed: {
  color: 3446103,
  description: 'mercione um usuario valido \n \n exemplo: `'+prefixoAtual+'qi @violet#2184`'
}});
}

message.channel.send({embed: {
  color: 3447003,
  description: `o QI de ${user} e de **` + (rand) + `**`
}});
}
exports.help = {
  name:"qi",
  permisoes: "nenhuma",
  aliases: ["inteligencia"],
  description: "q.i de alguem 😎",
  usage: "qi <usuário>"
}