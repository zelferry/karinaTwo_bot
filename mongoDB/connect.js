let colors = require("colors");
let mongoose = require("mongoose");

let dbOptions = {
    useUnifiedTopology: true,
    useNewUrlParser: true
};

module.exports = (opts) => {
    try {
        mongoose.connect(process.env.MONGOOSE, dbOptions).then(() => {
            console.log(colors.yellow(`[DATABASE] - mongoose foi conectado com sucesso no ${opts}!`));
        })
    } catch (error) {
        return console.log(colors.red(`[DATABASE] - ocorreu um erro ao conectar ao mongoose no ${opts}:\n${error}`));
    }
}