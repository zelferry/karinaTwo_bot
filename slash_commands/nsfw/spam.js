let comando = require("../../frameworks/commando/command.js");
let Discord = require("discord.js");

let mathRandom = (number) => ~~(Math.random() * number);

let defaut_options = [
    {
        type: 10,
        minValue: 1,
        maxValue: 15,
        required: true,
        name: "size",
        description: "amount of urls to be spawned (maximum: 15)",
        nameLocalizations: {
            "pt-BR": "quantidade"
        },
        descriptionLocalizations: {
            "pt-BR": "quantidade de urls a serem gerados (máximo: 15)"
        }
    }
]

class Command extends comando {
    command_data = {
        name: "spam",
        description: "(nsfw + ⭐vip) get from 1 to 15 URLs from some nsfw command",
        descriptionLocalizations: {
            "pt-BR": "(nsfw + ⭐vip) obtenha de 1 a 15 URLs de algum comando nsfw"
        },
        dmPermission: false,
        nsfw: true,
        options: [
            {
                type: 2,
                name: "yiff",
                description: "(nsfw) nsfw yiff",
                options: [
                    {
                        type: 1,
                        name: "straight",
                        description: "(nsfw) yiff straight",
                        options: defaut_options
                    },
                    {
                        type: 1,
                        name: "gay",
                        description: "(nsfw) yiff gay",
                        options: defaut_options
                    },
                    {
                        type: 1,
                        name: "gynomorph",
                        description: "(nsfw) yiff gynomorph",
                        options: defaut_options
                    },
                    {
                        type: 1,
                        name: "femboy",
                        description: "(nsfw) yiff femboy",
                        options: defaut_options
                    },
                    {
                        type: 1,
                        name: "misc",
                        description: "(nsfw) random yiff (may contain strange content)",
                        descriptionLocalizations: {
                            "pt-BR": "yiff aleatório (pode conter conteúdo estranho)"
                        },
                        options: defaut_options
                    }
                ]
            }/*,
            {
                type: 2,
                name: "hentai",
                description: "(nsfw) hentai",
                options: [
                    {
                        type: 1,
                        name: "straight",
                        description: "(nsfw) nsfw straight",
                        options: defaut_options
                    },
                    {
                        type: 1,
                        name: "yaoi",
                        description: "(nsfw) nsfw yaoi",
                        options: defaut_options
                    }, 
                    {
                        type: 1,
                        name: "futa",
                        description: "(nsfw) nsfw futa",
                        options: defaut_options
                    },
                    {
                        type: 1,
                        name: "femboy",
                        description: "(nsfw) nsfw fefemboy",
                        options: defaut_options
                    }
                ]
            }*/
        ]
    }
    
    constructor(...args) {
        super(...args, {
            name: "spam",
            category: "nsfw",
            nsfw: true,
            vip: true
        })

        this.spam = async(data_db, count) => {
            let urls = [];
            
            if (count > 15) {count = 15};
            if (count < 1) {count = 1};

            for (var i = 0; i < count; i++){
                let number1 = mathRandom(data_db.length);
                let result1 = data_db[number1];

                urls.push(result1)
            }
            return urls
        }
        
        this.tags = {
            yiff: {
                straight: "male/female",
                gay: "male/male",
                gynomorph: "gynomorph",
                femboy: "femboy",
                misc: "-1999"
            }
        }
    }

    async interactionRun(interaction, t){
        await this[interaction.options.getSubcommandGroup()](interaction, t)
    }

    //yiff
    async yiff(interaction, t){
        await interaction.deferReply({ ephemeral:  this.deferReply}).catch(() => {});
        let subCOMMAND = interaction.options.getSubcommand();
        let url = await this.client.private_api.POST(`api/e621/posts`, { tags: [`${this.tags.yiff[subCOMMAND]}`, `-animated`, `-webm`, `-flash`, `-humanoid`, `-feral`, `-sonic_the_hedgehog_(series)`, `-league_of_legends`, `score:>500`] });

        if(!url.ok){
            interaction.editReply({
                content: t("commands:global.error.api_error")
            });
            return {}
        } else {
            let posts = (url.data.posts).map((x) => `https://e621.net/posts/${x.id}`);
            let results = await this.spam(posts, interaction.options.getNumber("size"));

            await interaction.editReply({
                content: `${t("commands:spam", { number_all: (interaction.options.getNumber("size")).toString() })}\n\n${results.map((x,y) => `[${(y + 1)}] ${x}`).join("\n")}`
            });
            
            return {}
        }
    }

    command_info(){
        return {
            activated: true,
            pt: {
                name: "spam",
                description: "obter de 1 a 10 urls do /yiff",
                permissions: {
                    bot: [],
                    user: []
                },
                category: "nsfw",
                usage: "<sub comando>",
                subCommands: [
                    {
                        name: "furry_nsfw",
                        description: "obter de 1 ou 10 urls de uma vez no comando /yiff"
                    },
                    {
                        name: "furry_gay",
                        description: "obter de 1 ou 10 urls de uma vez no comando /yiff"
                    },
                    {
                        name: "furry_gynomorph",
                        description: "obter de 1 ou 10 urls de uma vez no comando /yiff"
                    }
                ]
            },
            en: {
                name: "spam",
                description: "get from 1 to 10 URLs from some nsfw command",
                permissions: {
                    bot: [],
                    user: []
                },
                category: "nsfw",
                usage: "<sub command>",
                subCommands: [
                    {
                        name: "furry_nsfw",
                        description: "get from 1 to 10 URLs of the command /yiff"
                    },
                    {
                        name: "furry_gay",
                        description: "get from 1 to 10 URLs of the command /yiff"
                    },
                    {
                        name: "furry_gynomorph",
                        description: "get from 1 to 10 URLs of the command /yiff"
                    }
                ]
            }
        }
    }
}

module.exports = Command