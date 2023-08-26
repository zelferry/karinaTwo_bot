const Event = require("../../structures/events/event.js");
const { e621_autopost } = require("../../data/ini.js").guild;
const defaut_blacklist_ = require("../../config/config.js").client.blacklist.e621;

const mathRandom = number => ~~(Math.random() * number);
const Discord = require('discord.js');
const fetch = require('node-fetch');


class event extends Event {
    constructor(...args){
        super(...args, {
            name: "ready"
        })
    }
    
    async run(){
        let client = this.client;
        let defaut_blacklist = defaut_blacklist_.map((x) => `-${x}`);

        async function e6_execute(guilds_data){
            for (let i = 0; i < guilds_data.length; i++){
                let guild_data = guilds_data[i];

                let url = await client.private_api.POST(`api/e621/posts`, {
                    tags: [...guild_data.e621_config.tags/*, ...defaut_blacklist*/]
                });

                let posts = (url.data.posts)//.filter((x) => !x.file.url == null);
                if(!posts.length){
                    let { status } = fetch(guild_data.webhook.url, { 'method': 'GET' });

                    if(status === 404){
                        console.log("webhook inexistente");
                        await e621_autopost.delete_webhook({ id: guild_data.guild_id });
                    } else {
                        let hook = new Discord.WebhookClient({ url: guild_data.webhook.url });

                        hook.send({
                            embeds: [
                                {
                                    description: ":br_flag: nenhum post encontrado.\ntente ver se a tag configurada tem posts suficientes para o sistema funcionar"
                                },
                                {
                                    description: ":en_flag: no post found.\ntry to see if the configured tag has enough posts for the system to work"
                                }
                            ]
                        });
                    }
    
                    return {}
                } else {
                    let number = mathRandom(posts.length);
                    let post = posts[number];

                    let id = post.id;
                    let file = post.file.url;
                    let original_description = post.description || null;
                    if (original_description && original_description.length > 1000) {
                        original_description = original_description.substring(0, 997) + '...';
                    }

                    if (!guild_data.cache.includes(id)) {
                        let { status } = fetch(guild_data.webhook.url, { 'method': 'GET' });

                        if (status === 404) {
                            console.log("webhook inexistente");
                            await e621_autopost.delete_webhook({ id: guild_data.guild_id });
                        } else {
                            let hook = new Discord.WebhookClient({ url: guild_data.webhook.url });

                            if (posts.length) {
                                if (file.endsWith('.webm') || file.endsWith('.swf')) {
                                    hook.send({
                                        content: `webm/sfw: ${file}`
                                    });
                                } else {
                                    hook.send({
                                        embeds: [
                                            {
                                                color: 12632256,
                                                description: original_description,
                                                author: {
                                                    name: post.tags.artist.join(' '),
                                                    icon_url: "http://i.imgur.com/RrHrSOi.png"
                                                },
                                                image: {
                                                    url: file
                                                },
                                                timestamp: new Date(post.created_at).toISOString(),
                                                footer: {
                                                    text: `ID: ${id}\n`
                                                }
                                            }
                                        ]
                                    });
                                }

                                await e621_autopost.add_post(id, guild_data.guild_id);
                            }
                        }
                    } else {
                        hook.send({
                            embeds: [
                                {
                                    fields: [
                                        {
                                            name: ":br_flag: post duplicado",
                                            value: "esse post já foi enviado",
                                            inline: true
                                        },
                                        {
                                            name: ":en_flag: duplicate post",
                                            value: "this post has already been sent",
                                            inline: true
                                        }
                                    ],
                                    author: {
                                        name: post.tags.artist.join(' '),
                                        icon_url: "http://i.imgur.com/RrHrSOi.png"
                                    },
                                    image: {
                                        url: file
                                    }
                                }
                            ]
                        });
                    }
                }
            }
        }
        
        setInterval(async() => {
            let get_guilds_data = await e621_autopost.find_all();

            await e6_execute(get_guilds_data);
        }, 60 * 60 * 1000);
    }
}

module.exports = event