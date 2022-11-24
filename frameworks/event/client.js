const path = require('path');
const { promisify } = require('util');
const glob = promisify(require('glob'));
const Event = require("./event.js");

class EventRegister {
    constructor(bot, config){
        this.client = bot;
    };
    isClass(input) {
        return typeof input === 'function' &&
            typeof input.prototype === 'object' &&
            input.toString().substring(0, 5) === 'class';
    };
    
    async load() {
        return glob(`${process.cwd()}/events/**/*.js`).then(events => {
            for (const eventFile of events) {
                delete require.cache[eventFile];
                const { name } = path.parse(eventFile);
                const File = require(eventFile);
                if (!this.isClass(File)) throw new TypeError(`o evento ${name} não foi exportado como uma classe!`);
                const event = new File(this.client);
                if (!(event instanceof Event)) throw new TypeError(`o evento ${name} foi mau estruturado`);
                //this.bot.events.set(event.name, event);
                //onsole.log(event)
                event.emitter[event.type](event.name, (...args) => event.run(...args));
            };
        });
    };
}

module.exports = EventRegister