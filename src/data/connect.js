let colors = require("colors");
let mongoose = require("mongoose");

module.exports = (opts) => {
    try {
        mongoose.connect(process.env.MONGOOSE).then(() => {
            console.log(colors.yellow(`[DATABASE] - mongoose foi conectado com sucesso no ${opts}!`));
        })
    } catch (error) {
        return console.log(colors.red(`[DATABASE] - ocorreu um erro ao conectar ao mongoose no ${opts}:\n${error}`));
    }
}