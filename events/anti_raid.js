const AntiSpam = require('discord-anti-spam');
const antiSpam = new AntiSpam({
    warnThreshold: 3, 
  	muteThreshold: 4,
  	kickThreshold: 7,
  	banThreshold: 7, 
    maxInterval: 5000,
    warnMessage: '{@user}, Por Favor Pare De Spamar/flooda nesse servidor.',
    kickMessage: '😠|**{user_tag}** Foi Kicado do Server por **raid/flood**.',
    banMessage: '🔨| **{user_tag}** Foi BANIDO Por **raid/flood**.',
    muteMessage: '🔇|**{user_tag}** foi silenciado por Spamar/floodar nesse servidor.',
  	maxDuplicatesWarning: 6,
  	maxDuplicatesKick: 10,
  	maxDuplicatesBan: 12,
  	maxDuplicatesMute: 8,
    exemptPermissions: ['ADMINISTRATOR'],
    ignoreBots: true,
    verbose: true,
    muteRoleName: "antiraid_role",
  	removeMessages: true,
    ignoredUsers: ["793188009498378270"],
    errorMessages:  true,
    kickErrorMessage: 'não foi possível expulsar o **{user_tag}** por conta que eu não tenho a permissão **expulsar membros** em meu cargo principal.',
    banErrorMessage: 'não foi possível banir o  **{user_tag}** por conta que eu não tenho a permissão **banir membros** em meu cargo principal.',
    muteErrorMessage: 'Não foi possível silenciar **{user_tag}** devido a permissões impróprias ou a função mudo não pôde ser encontrada',
    debug: true,
});
const Discord = require("discord.js");



exports.type = "message";
exports.start = async(client,clusterID,ipc,message) => {}