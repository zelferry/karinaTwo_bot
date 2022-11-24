class Event {
    constructor(client, options = {}) {
        this.name = options.name;
        this.client = client;
        this.type = options.once ? 'once' : 'on';
        this.emitter = (typeof options.emitter === 'string' ? this.client[options.emitter] : options.emitter) || this.client;
    };
    async run(...args) {
        throw new Error(`método indisponível 
para ${this.name}`);
    };
};

module.exports = Event