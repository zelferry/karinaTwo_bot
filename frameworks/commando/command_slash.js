class Command {
    constructor(client, options = {}){
        this.client = client;
        this.name = options.name
        this.description = options.description || 'sem descrição';
        this.commandOptions = options.commandOptions || [];
        this.buttonCommands = options.buttonCommands || [];
    }
    async interactionRun(interaction) {
        throw new Error(`O comando ${this.name} não tem um metodo de interação válido!`)
    }
}
module.exports = Command