const simplydjs = require("simply-djs")

exports.run = async (client, message, args) => {
	simplydjs.calculator(message, {
        embedColor: '#075FFF',
        credit: false,
        embedFoot: `use os botões para fazer cálculos matemáticos!`
    })
};
exports.config = {
    test: false
}
exports.help = {
  name:"calculator",
  permisoes: "nenhuma",
  aliases: ["calculadora"],
  description: "fazer cálculos matemáticos dentro do discord! ",
  usage: "calculator"
}