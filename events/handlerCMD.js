let Discord = require('discord.js');
let ms = require('ms');

let clientConfig = require('../database/client/config.json');
let util = require('../utils/main.js');

let { prefix } = clientConfig.owners
let { ids } = clientConfig.owners

exports.type = "messageCreate";
exports.start = async(client,clusterID,ipc,message) => {
    if(!message.guild || message.author.bot) return;
    if(message.channel.partial) await message.channel.fetch();
    if(message.partial) await message.fetch();
    if(!message.content.toLowerCase().startsWith(prefix.toLowerCase())) return;
    if(message.content.startsWith(`<@!${client.user.id}>`) || message.content.startsWith(`<@${client.user.id}>`)) return;
    
    let args = message.content.trim().slice(prefix.length).split(/ +/g);
    let comando = args.shift().toLowerCase();

    try {
        if(ids.includes(message.author.id)){
            var cmd = client.commands.get(comando.slice(prefix.lenght)) || client.commands.get(client.aliases.get(comando.slice(prefix.lenght)));
            cmd.run(client, message, args);
        } else {
            message.reply({
                embeds: [
                    {
                        title: "que tal usar os comandos de barra!?",
                        description: "Este comando está disponível via Slash Commands (comandos com `/`)\ncomandos que não usam slash irão desaparecer em **Abril de 2022**, então é melhor ir se acostumando com eles!\n\nas versões dos comandos em **slash Commands são *superiores* as versões originais**, então você não terá nada a perder usando meus slash commands em vez das versões originais!",
                        fields: [
                            {
                                name: "\"mas.. por que?\"",
                                value: "Em **Abril**, o acesso a conteúdo de mensagens se tornará uma Intent Privilegiada-assim como os dados de presença e de membros da guilda - para desenvolvedores que estejam criando ou administrando bots e aplicativos verificados no Discord."
                            },
                            {
                                name: "os comandos de barra não estão aparecendo?",
                                value: "nSe os meus slash commands não estão aparecendo no seu servidor, [me autorize a criar slash commands no seu servidor](https://discord.com/api/oauth2/authorize?client_id=793530706319114261&scope=bot+applications.commands&permissions=550360165470), verifique se o seu cargo possui permissão para \"Usar comandos de aplicativo\", verifique se a opção \"Use comandos de barra\" está ativada nas suas configurações e verifique se o seu Discord está atualizado! Caso você precise de ajuda, [entre no meu servidor de suporte](https://discord.gg/Xmu7HrH3yy)!\n\n( e não se esqueça, os comandos de barra são àqueles que usam a **`/`**! )"
                            }
                        ]
                    }
                ]
            });
            return {}
        }
    } catch (err) {}
}