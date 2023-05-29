const { Collection } = require('discord.js');
const { connect, connection: db } = require('mongoose');


class database {
    constructor(client){
        this.client = client;
        this.cache = new Collection();
    }
    async ping(){
        let cNano = process.hrtime();
        await db.db.command({ ping: 1 });
        let time = process.hrtime(cNano);
        return (time[0] * 1e9 + time[1]) * 1e-6;
    }
}

module.exports = database