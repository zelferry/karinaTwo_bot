let comando = require("../../frameworks/commando/command.js");
let Discord = require("discord.js");

let mathRandom = (number) => ~~(Math.random() * number);

let defaut_options = [
    {
        type: 10,
        name: "size",
        description: "amount of urls to be spawned (maximum: 10)",
        required: true,
        minValue: 1,
        maxValue: 10
    }
]

class Command extends comando {
    constructor(...args) {
        super(...args, {
            name: "spam",
            description: "get from 1 to 10 URLs from some nsfw command",
            category: "nsfw",
            nsfw: true,
            commandOptions: [
                {
                    type: 1,
                    name: "furry_straight",
                    description: "[ 😈nsfw ] get from 1 to 10 URLs of the command /yiff",
                    options: [...defaut_options]
                },
                {
                    type: 1,
                    name: "furry_gay",
                    description: "[ 😈nsfw ] get from 1 to 10 URLs of the command /yiff",
                    options: [...defaut_options]
                },
                {
                    type: 1,
                    name: "furry_gynomorph",
                    description: "[ 😈nsfw ] get from 1 to 10 URLs of the command /yiff",
                    options: [...defaut_options]
                }
            ]
        })

        this.spam = async(data_db, count) => {
            let urls = [];
            
            if (count > 10) {count = 10};
            if (count < 1) {count = 1};

            for (var i = 0; i < count; i++){
                let number1 = mathRandom(data_db.length);
                let result1 = data_db[number1];

                urls.push(result1)
            }
            return urls
        }

        this.img_data = {
            furry_straight: "male/female",
            furry_gay: "male/male",
            furry_gynomorph: "gynomorph"
        }
    }
    async interactionRun(interaction, t){
        await interaction.deferReply({ ephemeral:  this.deferReply}).catch(() => {});
        let subCOMMAND = interaction.options.getSubcommand();
        let url = await this.client.private_api.POST(`api/e621/posts`, { tags: [`${this.img_data[subCOMMAND]}`, `-animated`, `-webm`, `-flash`, `-humanoid`, `-feral`, `-sonic_the_hedgehog_(series)`, `-league_of_legends`, `score:>500`] });

        if(!url.ok){
            interaction.editReply({
                content: t("commands:global.error.api_error")
            });
            return {}
        } else {
            let posts = (url.data.posts).map((x) => `https://e621.net/posts/${x.id}`);
            let results = await this.spam(posts, interaction.options.getNumber("size"));

            await interaction.editReply({
                content: `${t("commands:spam", { number_all: (interaction.options.getNumber("size")).toString() })}\n\n${results.map((x,y) => `[${(y + 1)}] <${x}>`).join("\n")}`
            })
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