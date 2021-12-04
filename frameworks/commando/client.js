


class clientCommando {
    constructor(client,options = {}){
        if(typeof options.commandEditableDuration === 'undefined') options.commandEditableDuration = 30;
        if(typeof options.nonCommandEditable === 'undefined') options.nonCommandEditable = true;
        
        this.client = client
        this.registry
    }
}