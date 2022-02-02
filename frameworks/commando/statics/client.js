let Client = require("@replit/database");

class clientData extends Client {
    constructor(...key){
        super(...key)

        this.cache = [];
        this.validate = function() {
            if(process.env.REPLIT_DB_URL ?? process.env.replitdb){
                return true
            } else {
                return false
            }
        }
    }
    error_no_replit(){
        throw new TypeError(`você não esta usando a replit`);
    }
    async ready(){
        if(!this.validate()) return this.error_no_replit()
        if(!await this.get("all_executed")){
            await this.set("all_executed", 0);
        }
        if(!await this.get("commands")){
            await this.set("commands", []);
        }
        if(!await this.get("most_execute")){
            await this.set("most_execute", {})
        }
    }
    async setCommands(cmd){
        let data = this.get("commands");
    }
}

module.exports = clientData