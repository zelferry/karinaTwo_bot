class Command {
    constructor(client, options = {}){
        this.client = client;
        this.name = options.name
        this.description = options.description ?? 'sem descrição';
        this.category = options.category;
        this.usage = options.usage;
        this.nsfw =  options.nsfw ?? false;
        this.deferReply = options.deferReply ?? false
        this.permissions = {
            bot: options.permissions?.bot ?? [],
            user: options.permissions?.user ?? []
        } 
        this.commandOptions = options.commandOptions || null;
        this.subCommands = options.subCommands || []
        this.buttonCommands = options.buttonCommands || [];

        this.dscordPermissions = options.dscordPermissions/* ?? undefined*/
    }
    async interactionRun(interaction, t) {
        throw new Error(`O comando ${this.name} não tem um metodo de interação válido!`)
    }
    async autocompleteRun(interaction, t){}
    
    command_info(){
        return {
            activated: false,
            pt: {
                name: "??",
                description: "não especificado",
                permissions: {
                    bot: [],
                    user: []
                },
                category: "",
                usage: "??",
                subCommands: []
            },
            en: {
                name: "??",
                description: "not specified",
                permissions: {
                    bot: [],
                    user: []
                },
                category: "",
                usage: "??",
                subCommands: []
            }
        }
    }//

    _permissions(){
        return {
            "pt-BR": {
                bot: "🚫**|** eu não tenho permissões o suficiente para isso!\n💡**|** eu preciso das seguintes permissões: ",
                user: "🚫**|** você não tem permissões o suficiente para isso!\n💡**|** você precisa das seguintes permissões:"
            },
            "en-US": {
                bot: "🚫**|** I don't have enough permissions for that!\n💡**|**",
                user: "🚫**|** you don't have enough permissions for that!\n💡**|**"
            }
        }
    }
}
module.exports = Command