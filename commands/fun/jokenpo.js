exports.run = async (client, message, args) => {
    const rng = Math.floor((Math.random() * 100) + 1);
    function makeContent(aaa){
        return {
            content: aaa.toString()
        }
    }

    if (args[0] === 'pedra' && rng > 0 && rng <= 34) {
        return message.channel.send(makeContent('Pedra, empatamos :)'));
    } else if (args[0] === 'pedra' && rng > 34 && rng <= 67) {
        return message.channel.send(makeContent('Papel, você perdeu! '));
    } else if (args[0] === 'pedra' && rng > 67 && rng <= 100) {
        return message.channel.send(makeContent('Tesoura, eu perdi :('));
    } else if (args[0] === 'papel' && rng > 0 && rng <= 34) {
        return message.channel.send(makeContent('Papel, empatamos :)'));
    } else if (args[0] === 'papel' && rng > 34 && rng <= 67) {
        return message.channel.send(makeContent('Tesoura, você perdeu!'));
    } else if (args[0] === 'papel' && rng > 67 && rng <= 100) {
        return message.channel.send(makeContent('Pedra, eu perdi :('));
    } else if (args[0] === 'tesoura' && rng > 0 && rng <= 34) {
        return message.channel.send(makeContent('Tesoura, empatamos :)'));
    } else if (args[0] === 'tesoura' && rng > 34 && rng <= 67) {
        return message.channel.send(makeContent('Pedra, você perdeu!'));
    } else if (args[0] === 'tesoura' && rng > 67 && rng <= 100) {
        return message.channel.send(makeContent('Papel, eu perdi :('));
    }

    if (args[0] !== 'pedra' || args[0] !== 'papel' || args[0] !== 'tesoura') {
        return message.reply({content:'❌| Por favor, insira `pedra`, `papel` ou `tesoura`.'});
    }
}
exports.config = {
    test: false
}
exports.help = {
    name: "jokempo",
    permisoes: "nenhuma",
    aliases: ["pedraPapelTesoura"],
    description: "vamos jogar pedra, papel e tesoura!? ",
    usage: "jokempo <pedra,papel,tesoura>"
}