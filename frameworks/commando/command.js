class Command {
    constructor(client, options = {}){
        this.client = client;
        this.name = options.name
        this.description = options.description ?? 'sem descrição';
        this.category = options.category;
        this.usage = options.usage;
        this.nsfw =  options.nsfw ?? false
        this.permissions = {
            bot: options.permissions?.bot ?? [],
            user: options.permissions?.user ?? []
        } 
        this.commandOptions = options.commandOptions || null;
        this.subCommands = options.subCommands || []
        this.buttonCommands = options.buttonCommands || [];
    }
    async interactionRun(interaction) {
        throw new Error(`O comando ${this.name} não tem um metodo de interação válido!`)
    }
}
module.exports = Command