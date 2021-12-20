class Command {
    constructor(client, options){
        this.client = client;
        this.name = options.name;
        this.category = null; 
        this.aliases = options.aliases || [];
        this.description = options.description || "sem descrição";
        this.usage = options.usage;
        this.permissions = {
            bot: options.permissions.bot || [],
            user: options.permissions.user|| []
        } 
    }
    /*
     * @private
    */
    static setCategory(input){
        this.category = input;
        return this;
    }
    async run(message, args){
        throw new Error(``)
    }
}
module.exports = Command